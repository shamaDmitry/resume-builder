"use client";

import Footer from "@/components/custom/base/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import html2canvas from "html2canvas";
import { Camera, Download, Eye, Save, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import jsPDF from "jspdf";

export default function Home() {
  const router = useRouter();
  const resumeRef = useRef<HTMLDivElement>(null);
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

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        {
          school: "",
          degree: "",
          fieldOfStudy: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    });
  };

  const removeEducation = (index: number) => {
    if (formData.education.length > 1) {
      const newEducation = [...formData.education];
      newEducation.splice(index, 1);
      setFormData({
        ...formData,
        education: newEducation,
      });
    }
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        {
          company: "",
          position: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    });
  };

  const removeExperience = (index: number) => {
    if (formData.experience.length > 1) {
      const newExperience = [...formData.experience];
      newExperience.splice(index, 1);
      setFormData({
        ...formData,
        experience: newExperience,
      });
    }
  };

  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, ""],
    });
  };

  const removeSkill = (index: number) => {
    if (formData.skills.length > 1) {
      const newSkills = [...formData.skills];
      newSkills.splice(index, 1);
      setFormData({
        ...formData,
        skills: newSkills,
      });
    }
  };

  const exportToPDF = async () => {
    try {
      // First open the preview dialog
      setPreviewOpen(true);

      // Wait for the dialog to be fully rendered
      await new Promise((resolve) => setTimeout(resolve, 100));

      const resumeElement = document.getElementById("resume-preview");

      console.log("resumeElement", resumeElement);

      if (!resumeElement) {
        console.error("Resume preview element not found");
        setPreviewOpen(false);
        return;
      }

      // Create a clone of the element to avoid modifying the original
      const clone = resumeElement.cloneNode(true) as HTMLElement;
      clone.style.width = "794px"; // A4 width in pixels at 96 DPI
      clone.style.height = "1123px"; // A4 height
      clone.style.position = "absolute";
      clone.style.top = "-9999px";
      clone.style.left = "-9999px";
      document.body.appendChild(clone);

      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
      });

      document.body.removeChild(clone);

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`resume-${formData.personalInfo.name || "untitled"}.pdf`);

      // Close the preview dialog after export
      setPreviewOpen(false);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an error generating the PDF. Please try again.");
      setPreviewOpen(false);
    }
  };

  const saveResume = () => {
    try {
      // Save to localStorage
      localStorage.setItem(
        `resume-${resumeId}`,
        JSON.stringify({
          formData,
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

      alert(
        "Resume saved successfully! You can bookmark this URL to access your resume later."
      );
    } catch (error) {
      console.error("Error saving resume:", error);
      alert("There was an error saving your resume. Please try again.");
    }
  };

  const loadResume = (id: string) => {
    try {
      const savedResume = localStorage.getItem(`resume-${id}`);
      if (savedResume) {
        const { formData: savedFormData, photo: savedPhoto } =
          JSON.parse(savedResume);
        setFormData(savedFormData);
        setPhoto(savedPhoto);

        return true;
      }
      return false;
    } catch (error) {
      console.error("Error loading resume:", error);
      return false;
    }
  };

  useEffect(() => {
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
  }, []);

  console.log("resumeId", resumeId);

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

                <TabsContent value="education" className="space-y-6">
                  {formData.education.map((edu, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-medium">
                            Education #{index + 1}
                          </h3>
                          {formData.education.length > 1 && (
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
                            <Label htmlFor={`school-${index}`}>
                              School/University
                            </Label>
                            <Input
                              id={`school-${index}`}
                              name="school"
                              value={edu.school}
                              onChange={(e) => handleEducationChange(index, e)}
                              placeholder="Harvard University"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`degree-${index}`}>Degree</Label>
                            <Input
                              id={`degree-${index}`}
                              name="degree"
                              value={edu.degree}
                              onChange={(e) => handleEducationChange(index, e)}
                              placeholder="Bachelor of Science"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`fieldOfStudy-${index}`}>
                              Field of Study
                            </Label>
                            <Input
                              id={`fieldOfStudy-${index}`}
                              name="fieldOfStudy"
                              value={edu.fieldOfStudy}
                              onChange={(e) => handleEducationChange(index, e)}
                              placeholder="Computer Science"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-2">
                              <Label htmlFor={`startDate-${index}`}>
                                Start Date
                              </Label>
                              <Input
                                id={`startDate-${index}`}
                                name="startDate"
                                value={edu.startDate}
                                onChange={(e) =>
                                  handleEducationChange(index, e)
                                }
                                placeholder="09/2018"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`endDate-${index}`}>
                                End Date
                              </Label>
                              <Input
                                id={`endDate-${index}`}
                                name="endDate"
                                value={edu.endDate}
                                onChange={(e) =>
                                  handleEducationChange(index, e)
                                }
                                placeholder="05/2022 or Present"
                              />
                            </div>
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor={`description-${index}`}>
                              Description
                            </Label>
                            <Textarea
                              id={`description-${index}`}
                              name="description"
                              value={edu.description}
                              onChange={(e) => handleEducationChange(index, e)}
                              placeholder="Relevant coursework, achievements, or activities..."
                              rows={3}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <Button onClick={addEducation} className="w-full">
                    Add Education
                  </Button>
                </TabsContent>

                <TabsContent value="experience" className="space-y-6">
                  {formData.experience.map((exp, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-medium">
                            Experience #{index + 1}
                          </h3>
                          {formData.experience.length > 1 && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeExperience(index)}
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Remove
                            </Button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`company-${index}`}>Company</Label>
                            <Input
                              id={`company-${index}`}
                              name="company"
                              value={exp.company}
                              onChange={(e) => handleExperienceChange(index, e)}
                              placeholder="Google"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`position-${index}`}>
                              Position
                            </Label>
                            <Input
                              id={`position-${index}`}
                              name="position"
                              value={exp.position}
                              onChange={(e) => handleExperienceChange(index, e)}
                              placeholder="Software Engineer"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`location-${index}`}>
                              Location
                            </Label>
                            <Input
                              id={`location-${index}`}
                              name="location"
                              value={exp.location}
                              onChange={(e) => handleExperienceChange(index, e)}
                              placeholder="Mountain View, CA"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-2">
                              <Label htmlFor={`expStartDate-${index}`}>
                                Start Date
                              </Label>
                              <Input
                                id={`expStartDate-${index}`}
                                name="startDate"
                                value={exp.startDate}
                                onChange={(e) =>
                                  handleExperienceChange(index, e)
                                }
                                placeholder="06/2022"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`expEndDate-${index}`}>
                                End Date
                              </Label>
                              <Input
                                id={`expEndDate-${index}`}
                                name="endDate"
                                value={exp.endDate}
                                onChange={(e) =>
                                  handleExperienceChange(index, e)
                                }
                                placeholder="Present"
                              />
                            </div>
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor={`expDescription-${index}`}>
                              Description
                            </Label>
                            <Textarea
                              id={`expDescription-${index}`}
                              name="description"
                              value={exp.description}
                              onChange={(e) => handleExperienceChange(index, e)}
                              placeholder="Describe your responsibilities, achievements, and the technologies you worked with..."
                              rows={4}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <Button onClick={addExperience} className="w-full">
                    Add Experience
                  </Button>
                </TabsContent>

                <TabsContent value="skills" className="space-y-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <h3 className="font-medium">Skills</h3>

                        {formData.skills.map((skill, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={skill}
                              onChange={(e) => handleSkillChange(index, e)}
                              placeholder={`Skill ${
                                index + 1
                              } (e.g., JavaScript, Project Management)`}
                            />
                            {formData.skills.length > 1 && (
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => removeSkill(index)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        ))}

                        <Button
                          onClick={addSkill}
                          variant="outline"
                          className="w-full"
                        >
                          Add Skill
                        </Button>
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
                    onClick={() => setPreviewOpen(true)}
                    className="w-full"
                    variant="outline"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview Resume
                  </Button>

                  <Button onClick={exportToPDF} className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Export to PDF
                  </Button>

                  <Button
                    onClick={saveResume}
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

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Resume Preview</DialogTitle>
          </DialogHeader>

          <ScrollArea className="h-[70vh]">
            <div ref={resumeRef} id="resume-preview" className="bg-white p-8">
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

              {formData.experience.some(
                (exp) => exp.company || exp.position
              ) && (
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
    </>
  );
}
