"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { IEducation, IResumeData } from "@/types";

const EducationTab = () => {
  const { register, control } = useFormContext<IResumeData>();

  const { fields, remove, append } = useFieldArray({
    name: "educations",
    control,
  });

  return (
    <TabsContent value="education" className="space-y-6">
      {fields.map((edu: IEducation, index: number) => {
        return (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium min-h-9">Education #{index + 1}</h3>

                {fields.length > 1 && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => remove(index)}
                    className="border-destructive text-destructive hover:bg-destructive hover:text-white"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`school-${index}`}>School/University</Label>

                  <Input
                    id={`school-${index}`}
                    {...register(`educations.${index}.school`)}
                    placeholder="Harvard University"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`degree-${index}`}>Degree</Label>

                  <Input
                    id={`degree-${index}`}
                    {...register(`educations.${index}.degree`)}
                    placeholder="Bachelor of Science"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`fieldOfStudy-${index}`}>
                    Field of Study
                  </Label>

                  <Input
                    id={`fieldOfStudy-${index}`}
                    {...register(`educations.${index}.fieldOfStudy`)}
                    placeholder="Computer Science"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor={`startDate-${index}`}>Start Date</Label>

                    <Input
                      id={`startDate-${index}`}
                      {...register(`educations.${index}.startDate`)}
                      placeholder="09/2018"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`endDate-${index}`}>End Date</Label>

                    <Input
                      id={`endDate-${index}`}
                      {...register(`educations.${index}.endDate`)}
                      placeholder="05/2022 or Present"
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor={`description-${index}`}>Description</Label>

                  <Textarea
                    id={`description-${index}`}
                    {...register(`educations.${index}.description`)}
                    placeholder="Relevant coursework, achievements, or activities..."
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}

      <div className="text-right">
        <Button
          type="button"
          onClick={() =>
            append({
              school: "",
              degree: "",
              fieldOfStudy: "",
              startDate: "",
              endDate: "",
              description: "",
            })
          }
        >
          Add Education
        </Button>
      </div>
    </TabsContent>
  );
};

export default EducationTab;
