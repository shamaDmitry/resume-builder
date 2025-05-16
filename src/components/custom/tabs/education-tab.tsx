"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";
import React from "react";

const EducationTab = () => {
  return (
    <TabsContent value="education" className="space-y-6">
      {/* {formData?.education?.map((edu, index) => ( */}
      {[].map((edu, index) => (
        <Card key={index}>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Education #{index + 1}</h3>

              {/* {formData.education && formData?.education?.length > 1 && ( */}
              <Button
                variant="outline"
                size="sm"
                // onClick={() => removeEducation(index)}
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Remove
              </Button>
              {/* )} */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`school-${index}`}>School/University</Label>

                <Input
                  id={`school-${index}`}
                  name="school"
                  // value={edu.school}
                  // onChange={(e) => handleEducationChange(index, e)}
                  placeholder="Harvard University"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`degree-${index}`}>Degree</Label>

                <Input
                  id={`degree-${index}`}
                  name="degree"
                  // value={edu.degree}
                  // onChange={(e) => handleEducationChange(index, e)}
                  placeholder="Bachelor of Science"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`fieldOfStudy-${index}`}>Field of Study</Label>
                <Input
                  id={`fieldOfStudy-${index}`}
                  name="fieldOfStudy"
                  // value={edu.fieldOfStudy}
                  // onChange={(e) => handleEducationChange(index, e)}
                  placeholder="Computer Science"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                  <Input
                    id={`startDate-${index}`}
                    name="startDate"
                    // value={edu.startDate}
                    // onChange={(e) => handleEducationChange(index, e)}
                    placeholder="09/2018"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`endDate-${index}`}>End Date</Label>
                  <Input
                    id={`endDate-${index}`}
                    name="endDate"
                    // value={edu.endDate}
                    // onChange={(e) => handleEducationChange(index, e)}
                    placeholder="05/2022 or Present"
                  />
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor={`description-${index}`}>Description</Label>

                <Textarea
                  id={`description-${index}`}
                  name="description"
                  // value={edu.description}
                  // onChange={(e) => handleEducationChange(index, e)}
                  placeholder="Relevant coursework, achievements, or activities..."
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button
        //  onClick={addEducation}
        className="w-full"
      >
        Add Education
      </Button>
    </TabsContent>
  );
};

export default EducationTab;
