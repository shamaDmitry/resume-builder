import React, { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { IResumeData } from "@/types";

interface PreviewDialogProps {
  previewOpen: boolean;
  setPreviewOpen: (open: boolean) => void;
  formData: IResumeData;
  photo: string | null;
}

const PreviewDialog: FC<PreviewDialogProps> = ({
  previewOpen,
  setPreviewOpen,
  formData,
  photo,
}) => {
  return (
    <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Resume Preview</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[70vh]">
          <div className="bg-white pr-4">
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

            {formData.experience.some((exp) => exp.company || exp.position) && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold border-b pb-1 mb-2">
                  Work Experience
                </h2>
                {formData.experience.map(
                  (exp, index) =>
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

            {formData.education.some((edu) => edu.school || edu.degree) && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold border-b pb-1 mb-2">
                  Education
                </h2>

                {formData.education.map(
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

            {formData.skills.some((skill) => skill) && (
              <div>
                <h2 className="text-lg font-semibold border-b pb-1 mb-2">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map(
                    (skill, index) =>
                      skill && (
                        <span
                          key={index}
                          className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      )
                  )}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewDialog;
