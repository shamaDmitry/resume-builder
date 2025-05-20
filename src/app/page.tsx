"use client";

import Footer from "@/components/custom/base/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import html2canvas from "html2canvas";
import { Download, Eye, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import jsPDF from "jspdf";
import { IResumeData } from "@/types";
import { toast } from "sonner";
import PreviewDialog from "@/components/custom/preview-dialog";
import TabsWrapper from "@/components/custom/tabs/tabs-wrapper";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const methods = useForm<IResumeData>({
    defaultValues: {
      photo: "",
      personalInfo: {
        name: "",
        title: "",
        email: "",
        phone: "",
        address: "",
        summary: "",
      },
      educations: [
        {
          school: "",
          degree: "",
          fieldOfStudy: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
      experiences: [
        {
          company: "",
          position: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
      skills: [
        {
          name: "",
        },
      ],
    },
  });

  const [photo, setPhoto] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const [resumeId, setResumeId] = useState<string>(() => {
    // Check if we're in the browser and if there's an ID in the URL
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get("id") || uuidv4();
    }

    return uuidv4();
  });

  const exportToPDF = async () => {
    setPreviewOpen(true);

    // Wait for the dialog to be fully rendered
    await new Promise((resolve) => setTimeout(resolve, 100));

    try {
      // Show loading toast
      toast.loading("Generating PDF...");

      // Get the preview element
      const previewElement = document.getElementById("resume-preview");

      if (!previewElement) {
        throw new Error("Preview element not found");
      }

      // Create a canvas from the preview element
      const canvas = await html2canvas(previewElement, {
        scale: 2, // Higher scale for better quality
        useCORS: true, // Enable CORS for images
        logging: false,
      });

      // Create PDF with A4 dimensions
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Calculate dimensions to fit the content properly
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add the image to the PDF
      pdf.addImage(
        canvas.toDataURL("image/jpeg", 1.0),
        "JPEG",
        0,
        0,
        imgWidth,
        imgHeight
      );

      // Generate filename based on user's name or default
      const filename = methods.getValues().personalInfo.name
        ? `${methods
            .getValues()
            .personalInfo.name.toLowerCase()
            .replace(/\s+/g, "-")}-resume.pdf`
        : "resume.pdf";

      // Save the PDF
      pdf.save(filename);

      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);

      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      // Close the preview dialog
      setPreviewOpen(false);
    }
  };

  const saveResume = (data: IResumeData) => {
    console.log("data", data);

    try {
      localStorage.setItem(
        `resume-${resumeId}`,
        JSON.stringify({
          formData: data,
          photo,
          lastUpdated: new Date().toISOString(),
        })
      );

      // If we're not already on a URL with this ID, update the URL
      if (typeof window !== "undefined") {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get("id") !== resumeId) {
          router.push(`?id=${resumeId}`);
        }
      }

      toast(
        "Resume saved successfully! You can bookmark this URL to access your resume later."
      );
    } catch (error) {
      console.error("Error saving resume:", error);
      alert("There was an error saving your resume. Please try again.");
    }
  };

  useEffect(() => {
    const loadResume = (id: string) => {
      try {
        const savedResume = localStorage.getItem(`resume-${id}`);

        if (savedResume) {
          const { formData: savedFormData, photo: savedPhoto } =
            JSON.parse(savedResume);

          methods.reset(savedFormData);
          setPhoto(savedPhoto);

          return true;
        }

        return false;
      } catch (error) {
        console.error("Error loading resume:", error);

        return false;
      }
    };

    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get("id");

      if (id) {
        setResumeId(id);
        const loaded = loadResume(id);

        if (!loaded) {
          // If we couldn't load the resume with this ID, create a new one
          setResumeId(uuidv4());
        }
      }
    }
  }, [methods]);

  const handlePreFill = () => {
    methods.reset({
      personalInfo: {
        name: "Name Surname",
        title: "developer",
        email: "test@test.com",
        phone: "123-456-7890",
        address: "123 Main St, City, Country",
        summary:
          "Experienced developer with a passion for building web applications.",
      },
      educations: [
        {
          school: "University of Example",
          degree: "Bachelor of Science",
          fieldOfStudy: "Computer Science",
          startDate: "2015-09-01",
          endDate: "2019-05-15",
          description: "Studied computer science and software engineering.",
        },
      ],
      experiences: [
        {
          company: "Example Inc.",
          position: "Software Engineer",
          location: "City, Country",
          startDate: "2019-06-01",
          endDate: "2022-01-01",
          description:
            "Worked on various web applications and contributed to open-source projects.",
        },
      ],
      skills: [
        { name: "JavaScript" },
        { name: "React" },
        { name: "Node.js" },
        { name: "HTML" },
        { name: "CSS" },
      ],
    });
  };

  return (
    <>
      <main className="flex-1">
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">
            <span>Resume Builder</span>

            <Button onClick={handlePreFill}>Pre-fill</Button>
          </h1>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(saveResume)}>
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-3/4">
                  <TabsWrapper />
                </div>

                <div className="w-full lg:w-1/4 space-y-4 mt-14">
                  <Card className="sticky top-4">
                    <CardContent className="space-y-4">
                      <h3 className="font-medium text-center">Actions</h3>

                      <Button
                        type="button"
                        onClick={() => setPreviewOpen(true)}
                        className="w-full"
                        variant="outline"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Preview Resume
                      </Button>

                      <Button
                        type="button"
                        onClick={exportToPDF}
                        className="w-full"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export to PDF
                      </Button>

                      <Button
                        type="submit"
                        className="w-full"
                        variant="secondary"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save & Get Link
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </main>

      <Footer />

      <PreviewDialog
        previewOpen={previewOpen}
        setPreviewOpen={setPreviewOpen}
        formData={methods.getValues()}
        photo={photo}
      />
    </>
  );
}
