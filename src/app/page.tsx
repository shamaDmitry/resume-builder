"use client";

import Footer from "@/components/custom/base/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeIcon, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { IResumeData } from "@/types";
import { toast } from "sonner";
import PreviewDialog from "@/components/custom/preview-dialog";
import TabsWrapper from "@/components/custom/tabs/tabs-wrapper";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import PdfDownloadButton from "@/components/pdf-download-button";
import { clipboardFallback } from "@/lib/clipboard-fallback";

export default function Home() {
  const router = useRouter();

  const methods = useForm<IResumeData>({
    defaultValues: {
      photo: "",
      personalInfo: {
        name: "",
        title: "",
        email: "",
        phone: "",
        address: "",
        summary: "",
      },
      educations: [
        {
          school: "",
          degree: "",
          fieldOfStudy: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
      experiences: [
        {
          company: "",
          position: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
      skills: [
        {
          name: "",
        },
      ],
    },
  });

  const formValues = methods.watch();

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

  const saveResume = (data: IResumeData) => {
    try {
      localStorage.setItem(
        `resume-${resumeId}`,
        JSON.stringify({
          formData: data,
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

      const url = `${window.location.origin}/resume/${resumeId}`;

      const copyToClipboard = (text: string) => {
        if (navigator.clipboard) {
          navigator.clipboard
            .writeText(text)
            .then(() => toast("Resume saved and link copied to clipboard!"))
            .catch((err) => {
              console.error("Clipboard write failed:", err);
              clipboardFallback(text);
            });
        } else {
          clipboardFallback(text);
        }
      };

      copyToClipboard(url);
    } catch (error) {
      console.error("Error saving resume:", error);
      alert("There was an error saving your resume. Please try again.");
    }
  };

  useEffect(() => {
    const loadResume = (id: string) => {
      try {
        const savedResume = localStorage.getItem(`resume-${id}`);

        if (savedResume) {
          const { formData: savedFormData, photo: savedPhoto } =
            JSON.parse(savedResume);

          methods.reset(savedFormData);
          setPhoto(savedPhoto);

          return true;
        }

        return false;
      } catch (error) {
        console.error("Error loading resume:", error);

        return false;
      }
    };

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
  }, [methods]);

  const handlePreFill = () => {
    methods.reset({
      photo: "",
      personalInfo: {
        name: "Name Surname",
        title: "developer",
        email: "test@test.com",
        phone: "123-456-7890",
        address: "123 Main St, City, Country",
        summary:
          "Experienced developer with a passion for building web applications.",
      },
      educations: [
        {
          school: "University of Example",
          degree: "Bachelor of Science",
          fieldOfStudy: "Computer Science",
          startDate: "2015-09-01",
          endDate: "2019-05-15",
          description: "Studied computer science and software engineering.",
        },
      ],
      experiences: [
        {
          company: "Example Inc.",
          position: "Software Engineer",
          location: "City, Country",
          startDate: "2019-06-01",
          endDate: "2022-01-01",
          description:
            "Worked on various web applications and contributed to open-source projects.",
        },
      ],
      skills: [
        { name: "JavaScript" },
        { name: "React" },
        { name: "Node.js" },
        { name: "HTML" },
        { name: "CSS" },
      ],
    });
  };

  console.log("methods", methods.formState.isValid);

  return (
    <>
      <main className="flex-1">
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">
            <span>Resume Builder</span>

            <Button onClick={handlePreFill}>Pre-fill</Button>
          </h1>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(saveResume)}>
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-3/4">
                  <TabsWrapper />
                </div>

                <div className="w-full lg:w-1/4 space-y-4 mt-14">
                  <Card className="sticky top-4">
                    <CardContent className="space-y-4">
                      <h3 className="font-medium text-center">Actions</h3>

                      <Button
                        type="button"
                        onClick={() => setPreviewOpen(true)}
                        className="w-full"
                        variant="outline"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Preview Resume
                      </Button>

                      <Button
                        type="submit"
                        className="w-full"
                        variant="secondary"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save & Get Link
                      </Button>

                      <Button
                        type="button"
                        className="w-full"
                        variant="default"
                        disabled={!methods.formState.isSubmitSuccessful}
                        onClick={() => {
                          router.push(`/resume/${resumeId}`);
                        }}
                      >
                        <EyeIcon className="w-4 h-4 mr-2" />
                        View Resume
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </main>

      <Footer />

      <PreviewDialog
        previewOpen={previewOpen}
        setPreviewOpen={setPreviewOpen}
        formData={methods.getValues()}
      />
    </>
  );
}
