import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { IResumeData } from "@/types";
import { Trash2 } from "lucide-react";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

const SkillsTab = () => {
  const { register, control } = useFormContext<IResumeData>();

  const { fields, remove, append } = useFieldArray<IResumeData>({
    name: "skills",
    control,
  });

  return (
    <TabsContent value="personal-skills" className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h3 className="font-medium">Skills</h3>

            {fields.map((field, index) => {
              return (
                <div key={field.id} className="flex gap-2">
                  <Input
                    placeholder={`Skill ${
                      index + 1
                    } (e.g., JavaScript, Project Management)`}
                    {...register(`skills.${index}.name`)}
                  />

                  {fields.length > 1 && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              );
            })}

            <Button
              onClick={() =>
                append({
                  name: "",
                })
              }
              type="button"
              variant="outline"
              className="w-full"
            >
              Add Skill
            </Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default SkillsTab;
