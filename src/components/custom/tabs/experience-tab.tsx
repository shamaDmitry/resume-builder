import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";
import React from "react";

const ExperienceTab = () => {
  return (
    <TabsContent value="experience" className="space-y-6">
      {/* {formData?.experience?.map((exp, index) => ( */}
      {[].map((exp, index) => (
        <Card key={index}>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Experience #{index + 1}</h3>

              {/* {formData.experience && formData?.experience?.length > 1 && ( */}
              <Button
                variant="outline"
                size="sm"
                // onClick={() => removeExperience(index)}
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Remove
              </Button>
              {/* )} */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`company-${index}`}>Company</Label>

                <Input
                  id={`company-${index}`}
                  name="company"
                  // value={exp.company}
                  // onChange={(e) => handleExperienceChange(index, e)}
                  placeholder="Google"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`position-${index}`}>Position</Label>

                <Input
                  id={`position-${index}`}
                  name="position"
                  // value={exp.position}
                  // onChange={(e) => handleExperienceChange(index, e)}
                  placeholder="Software Engineer"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`location-${index}`}>Location</Label>

                <Input
                  id={`location-${index}`}
                  name="location"
                  // value={exp.location}
                  // onChange={(e) => handleExperienceChange(index, e)}
                  placeholder="Mountain View, CA"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor={`expStartDate-${index}`}>Start Date</Label>

                  <Input
                    id={`expStartDate-${index}`}
                    name="startDate"
                    // value={exp.startDate}
                    // onChange={(e) => handleExperienceChange(index, e)}
                    placeholder="06/2022"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`expEndDate-${index}`}>End Date</Label>

                  <Input
                    id={`expEndDate-${index}`}
                    name="endDate"
                    // value={exp.endDate}
                    // onChange={(e) => handleExperienceChange(index, e)}
                    placeholder="Present"
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor={`expDescription-${index}`}>Description</Label>

                <Textarea
                  id={`expDescription-${index}`}
                  name="description"
                  // value={exp.description}
                  // onChange={(e) => handleExperienceChange(index, e)}
                  placeholder="Describe your responsibilities, achievements, and the technologies you worked with..."
                  rows={4}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button
        // onClick={addExperience}
        className="w-full"
      >
        Add Experience
      </Button>
    </TabsContent>
  );
};

export default ExperienceTab;
