"use client";

import Footer from "@/components/custom/base/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Download, Eye, Save, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [photo, setPhoto] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    personalInfo: {
      name: "",
      title: "",
      email: "",
      phone: "",
      address: "",
      summary: "",
    },
    education: [
      {
        school: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    experience: [
      {
        company: "",
        position: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    skills: [""],
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPhoto(e.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handlePersonalInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        [name]: value,
      },
    });
  };

  const handleEducationChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const newEducation = [...formData.education];
    newEducation[index] = {
      ...newEducation[index],
      [name]: value,
    };
    setFormData({
      ...formData,
      education: newEducation,
    });
  };

  const handleExperienceChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const newExperience = [...formData.experience];
    newExperience[index] = {
      ...newExperience[index],
      [name]: value,
    };
    setFormData({
      ...formData,
      experience: newExperience,
    });
  };

  const handleSkillChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newSkills = [...formData.skills];
    newSkills[index] = e.target.value;
    setFormData({
      ...formData,
      skills: newSkills,
    });
  };

  return (
    <>
      <main className="flex-1">
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Resume Builder
          </h1>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-3/4">
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid grid-cols-4 mb-3">
                  <TabsTrigger value="personal">Personal</TabsTrigger>

                  <TabsTrigger value="education">Education</TabsTrigger>

                  <TabsTrigger value="experience">Experience</TabsTrigger>

                  <TabsTrigger value="skills">Skills</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex flex-col items-center mb-4">
                          <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 mb-2">
                            {photo ? (
                              <Image
                                src={photo || "/placeholder.svg"}
                                alt="Profile"
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                <Camera className="w-8 h-8 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Label
                              htmlFor="photo-upload"
                              className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-3 rounded text-sm flex items-center gap-1"
                            >
                              <Camera className="w-4 h-4" />
                              Upload
                            </Label>
                            <Input
                              id="photo-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handlePhotoChange}
                            />
                            {photo && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPhoto(null)}
                                className="text-sm flex items-center gap-1"
                              >
                                <Trash2 className="w-4 h-4" />
                                Remove
                              </Button>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              name="name"
                              value={formData.personalInfo.name}
                              onChange={handlePersonalInfoChange}
                              placeholder="John Doe"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="title">Professional Title</Label>
                            <Input
                              id="title"
                              name="title"
                              value={formData.personalInfo.title}
                              onChange={handlePersonalInfoChange}
                              placeholder="Software Engineer"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.personalInfo.email}
                              onChange={handlePersonalInfoChange}
                              placeholder="john.doe@example.com"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              name="phone"
                              value={formData.personalInfo.phone}
                              onChange={handlePersonalInfoChange}
                              placeholder="(123) 456-7890"
                            />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="address">Address</Label>
                            <Input
                              id="address"
                              name="address"
                              value={formData.personalInfo.address}
                              onChange={handlePersonalInfoChange}
                              placeholder="123 Main St, City, State, Zip"
                            />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="summary">
                              Professional Summary
                            </Label>
                            <Textarea
                              id="summary"
                              name="summary"
                              value={formData.personalInfo.summary}
                              onChange={handlePersonalInfoChange}
                              placeholder="Write a brief summary of your professional background and goals..."
                              rows={4}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="w-full lg:w-1/4 space-y-4 mt-14">
              <Card>
                <CardContent className="space-y-4">
                  <h3 className="font-medium text-center">Actions</h3>

                  <Button
                    // onClick={() => setPreviewOpen(true)}
                    className="w-full"
                    variant="outline"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview Resume
                  </Button>

                  <Button
                    // onClick={exportToPDF}
                    className="w-full"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export to PDF
                  </Button>

                  <Button
                    // onClick={saveResume}
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
        </div>
      </main>

      <Footer />
    </>
  );
}
