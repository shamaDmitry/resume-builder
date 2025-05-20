"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { use } from "react";
import { IResumeData, ISkills } from "@/types";

const ResumePage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [loading, setLoading] = useState(true);
  const [resumeData, setResumeData] = useState<{
    formData: IResumeData;
    photo: string | null;
    lastUpdated: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { id } = use(params);

  useEffect(() => {
    const loadResume = async () => {
      try {
        // First try to load from localStorage
        if (typeof window !== "undefined") {
          const savedResume = localStorage.getItem(`resume-${id}`);

          if (savedResume) {
            const parsed = JSON.parse(savedResume);

            setResumeData(parsed);
            setLoading(false);
            return;
          }
        }

        // If not in localStorage, try to fetch from API
        // In a real app, this would fetch from your database
        setError("Resume not found. Please check the ID and try again.");
        setLoading(false);
      } catch (error) {
        console.error("Error loading resume:", error);
        setError("An error occurred while loading the resume.");
        setLoading(false);
      }
    };

    loadResume();
  }, [id]);

  const exportToPDF = async () => {
    try {
      const resumeElement = document.getElementById("resume-view");
      if (!resumeElement) {
        console.error("Resume element not found");
        return;
      }

      const canvas = await html2canvas(resumeElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(
        `resume-${resumeData?.formData?.personalInfo?.name || "untitled"}.pdf`
      );
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an error generating the PDF. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-16 px-4 flex justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Loading resume...</h2>
          <p>Please wait while we retrieve the resume data.</p>
        </div>
      </div>
    );
  }

  if (error || !resumeData) {
    return (
      <div className="container mx-auto py-16 px-4 flex justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-xl font-semibold mb-2">Resume Not Found</h2>
          <p className="mb-4">
            {error ||
              "This resume could not be found. Please check the URL and try again."}
          </p>
          <Button onClick={() => (window.location.href = "/")}>
            Create a New Resume
          </Button>
        </div>
      </div>
    );
  }

  const { formData, photo } = resumeData;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Resume</h1>
        <Button onClick={exportToPDF}>
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
      </div>

      <Card className="p-8 max-w-4xl mx-auto">
        <div id="resume-view" className="bg-white">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            {photo && (
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 flex-shrink-0 mx-auto md:mx-0">
                <Image
                  src={photo || "/placeholder.svg"}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex-grow text-center md:text-left">
              <h1 className="text-2xl font-bold">
                {formData.personalInfo.name || "Your Name"}
              </h1>
              <p className="text-gray-600 mb-2">
                {formData.personalInfo.title || "Professional Title"}
              </p>
              <div className="text-sm space-y-1">
                {formData.personalInfo.email && (
                  <p>{formData.personalInfo.email}</p>
                )}
                {formData.personalInfo.phone && (
                  <p>{formData.personalInfo.phone}</p>
                )}
                {formData.personalInfo.address && (
                  <p>{formData.personalInfo.address}</p>
                )}
              </div>
            </div>
          </div>

          {formData.personalInfo.summary && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold border-b pb-1 mb-2">
                Professional Summary
              </h2>
              <p className="text-sm">{formData.personalInfo.summary}</p>
            </div>
          )}

          {formData.experiences.some((exp) => exp.company || exp.position) && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold border-b pb-1 mb-2">
                Work Experiences
              </h2>
              {formData.experiences.map(
                (exp, index: number) =>
                  (exp.company || exp.position) && (
                    <div key={index} className="mb-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between mb-1">
                        <div>
                          <h3 className="font-medium">
                            {exp.position || "Position"}
                          </h3>
                          <p className="text-sm">
                            {exp.company || "Company"}
                            {exp.location && `, ${exp.location}`}
                          </p>
                        </div>
                        {(exp.startDate || exp.endDate) && (
                          <p className="text-sm text-gray-600">
                            {exp.startDate || "Start Date"} -{" "}
                            {exp.endDate || "End Date"}
                          </p>
                        )}
                      </div>
                      {exp.description && (
                        <p className="text-sm mt-1">{exp.description}</p>
                      )}
                    </div>
                  )
              )}
            </div>
          )}

          {formData.educations.some((edu) => edu.school || edu.degree) && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold border-b pb-1 mb-2">
                Educations
              </h2>

              {formData.educations.map(
                (edu, index) =>
                  (edu.school || edu.degree) && (
                    <div key={index} className="mb-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between mb-1">
                        <div>
                          <h3 className="font-medium">
                            {edu.degree || "Degree"}
                            {edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}
                          </h3>
                          <p className="text-sm">
                            {edu.school || "School/University"}
                          </p>
                        </div>
                        {(edu.startDate || edu.endDate) && (
                          <p className="text-sm text-gray-600">
                            {edu.startDate || "Start Date"} -{" "}
                            {edu.endDate || "End Date"}
                          </p>
                        )}
                      </div>
                      {edu.description && (
                        <p className="text-sm mt-1">{edu.description}</p>
                      )}
                    </div>
                  )
              )}
            </div>
          )}

          {formData.skills.some((skill: ISkills) => skill) && (
            <div>
              <h2 className="text-lg font-semibold border-b pb-1 mb-2">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map(
                  (skill: ISkills, index: number) =>
                    skill && (
                      <span
                        key={index}
                        className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                      >
                        {skill.name}
                      </span>
                    )
                )}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ResumePage;
