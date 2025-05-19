import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import React from "react";

const SkillsTab = () => {
  return (
    <TabsContent value="skills" className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h3 className="font-medium">Skills</h3>

            {/* {formData?.skills?.map((skill, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={skill}
                  onChange={(e) => handleSkillChange(index, e)}
                  placeholder={`Skill ${
                    index + 1
                  } (e.g., JavaScript, Project Management)`}
                />

                {formData?.skills && formData?.skills?.length > 1 && (
                  <Button
                    variant="outline"
                    size="icon"
                    // onClick={() => removeSkill(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))} */}

            <Button
              // onClick={addSkill}
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
