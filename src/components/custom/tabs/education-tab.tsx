"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";
import React from "react";
import { useFormContext } from "react-hook-form";
import { IEducation, IResumeData } from "@/types";
import FormError from "@/components/custom/form-error";

const EducationTab = () => {
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext<IResumeData>();

  const formData = getValues().education as IEducation[];

  const addEducation = () => {
    const newEducation = [
      ...getValues().education,
      {
        school: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ];

    console.log("newEducation", newEducation);

    setValue("education", newEducation);
  };

  const removeEducation = (index: number) => {
    const newEducation = [...formData];
    newEducation.splice(index, 1);
    setValue("education", newEducation);
  };

  console.log("formData", formData);

  return (
    <TabsContent value="education" className="space-y-6">
      {formData.map((edu: IEducation, index: number) => (
        <Card key={index}>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Education #{index + 1}</h3>

              {formData && formData.length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeEducation(index)}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Remove
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`school-${index}`}>School/University</Label>
                <Input
                  id={`school-${index}`}
                  {...register(`education.${index}.school`, {
                    required: { value: true, message: "School is required" },
                  })}
                  placeholder="Harvard University"
                />
                {errors.education?.[index]?.school && (
                  <FormError
                    message={errors.education[index]?.school?.message || ""}
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={`degree-${index}`}>Degree</Label>
                <Input
                  id={`degree-${index}`}
                  {...register(`education.${index}.degree`, {
                    required: { value: true, message: "Degree is required" },
                  })}
                  placeholder="Bachelor of Science"
                />
                {errors.education?.[index]?.degree && (
                  <FormError
                    message={errors.education[index]?.degree?.message || ""}
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={`fieldOfStudy-${index}`}>Field of Study</Label>
                <Input
                  id={`fieldOfStudy-${index}`}
                  {...register(`education.${index}.fieldOfStudy`, {
                    required: {
                      value: true,
                      message: "Field of study is required",
                    },
                  })}
                  placeholder="Computer Science"
                />
                {errors.education?.[index]?.fieldOfStudy && (
                  <FormError
                    message={
                      errors.education[index]?.fieldOfStudy?.message || ""
                    }
                  />
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                  <Input
                    id={`startDate-${index}`}
                    {...register(`education.${index}.startDate`, {
                      required: {
                        value: true,
                        message: "Start date is required",
                      },
                    })}
                    placeholder="09/2018"
                  />
                  {errors.education?.[index]?.startDate && (
                    <FormError
                      message={
                        errors.education[index]?.startDate?.message || ""
                      }
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`endDate-${index}`}>End Date</Label>
                  <Input
                    id={`endDate-${index}`}
                    {...register(`education.${index}.endDate`, {
                      required: {
                        value: true,
                        message: "End date is required",
                      },
                    })}
                    placeholder="05/2022 or Present"
                  />
                  {errors.education?.[index]?.endDate && (
                    <FormError
                      message={errors.education[index]?.endDate?.message || ""}
                    />
                  )}
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor={`description-${index}`}>Description</Label>
                <Textarea
                  id={`description-${index}`}
                  {...register(`education.${index}.description`)}
                  placeholder="Relevant coursework, achievements, or activities..."
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button type="button" onClick={addEducation} className="w-full">
        Add Education
      </Button>
    </TabsContent>
  );
};

export default EducationTab;
