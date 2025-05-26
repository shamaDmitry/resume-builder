import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { IResumeData } from "@/types";
import { Trash2 } from "lucide-react";
import React from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import FormDatePicker from "../form-date-picker";

const ExperienceTab = () => {
  const { register, control } = useFormContext<IResumeData>();

  const { fields, remove, append } = useFieldArray({
    name: "experiences",
    control,
  });

  return (
    <TabsContent value="experience" className="space-y-6">
      {fields.map((exp, index) => (
        <Card key={index}>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Experience #{index + 1}</h3>

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
                <Label htmlFor={`company-${index}`}>Company</Label>

                <Input
                  id={`company-${index}`}
                  placeholder="Google"
                  {...register(`experiences.${index}.company`)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`position-${index}`}>Position</Label>

                <Input
                  id={`position-${index}`}
                  placeholder="Software Engineer"
                  {...register(`experiences.${index}.position`)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`location-${index}`}>Location</Label>

                <Input
                  id={`location-${index}`}
                  placeholder="Mountain View, CA"
                  {...register(`experiences.${index}.location`)}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor={`expStartDate-${index}`} className="mb-2">
                    Start Date
                  </Label>

                  <Controller
                    name={`experiences.${index}.startDate`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <FormDatePicker
                          id={`startDate-${index}`}
                          {...field}
                          value={field.value ? new Date(field.value) : null}
                        />
                      );
                    }}
                  />
                </div>

                <div>
                  <Label htmlFor={`expEndDate-${index}`} className="mb-2">
                    End Date
                  </Label>

                  <Controller
                    name={`experiences.${index}.endDate`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <FormDatePicker
                          id={`endDate-${index}`}
                          {...field}
                          value={field.value ? new Date(field.value) : null}
                        />
                      );
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor={`expDescription-${index}`}>Description</Label>

                <Textarea
                  id={`expDescription-${index}`}
                  placeholder="Describe your responsibilities, achievements, and the technologies you worked with..."
                  rows={4}
                  {...register(`experiences.${index}.description`)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="text-right">
        <Button
          type="button"
          onClick={() => {
            append({
              company: "",
              position: "",
              location: "",
              description: "",
              startDate: "",
              endDate: "",
            });
          }}
        >
          Add Experience
        </Button>
      </div>
    </TabsContent>
  );
};

export default ExperienceTab;
