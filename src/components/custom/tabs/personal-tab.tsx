"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import FormError from "@/components/custom/form-error";
import UploadAvatar from "@/components/custom/upload-avatar";
import { IResumeData } from "@/types";

const PersonalTab = () => {
  const methods = useFormContext<IResumeData>();

  const {
    register,
    formState: { errors },
    control,
  } = methods;

  const [photo, setPhoto] = useState<string | null>(null);

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const file = files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result as string;

      console.log("base64Image", base64Image);

      setPhoto(base64Image);
    };
  };
  return (
    <TabsContent value="personal" className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <Controller
              name="photo"
              control={control}
              render={({ field }) => {
                return (
                  <UploadAvatar
                    {...field}
                    photo={photo}
                    setPhoto={setPhoto}
                    onChange={(e) => {
                      handlePhotoChange(e);
                      field.onChange(e);
                    }}
                  />
                );
              }}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label required htmlFor="name">
                  Full Name
                </Label>

                <Input
                  id="name"
                  {...register("personalInfo.name", {
                    required: { value: true, message: "Name is required" },
                  })}
                  placeholder="John Doe"
                />

                {errors.personalInfo?.name && (
                  <FormError
                    message={errors.personalInfo?.name?.message as string}
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label required htmlFor="title">
                  Professional Title
                </Label>

                <Input
                  id="title"
                  {...register("personalInfo.title", {
                    required: {
                      value: true,
                      message: "Professional title is required",
                    },
                  })}
                  placeholder="Software Engineer"
                />

                {errors.personalInfo?.title && (
                  <p className="text-red-500 text-sm">
                    {errors.personalInfo?.title?.message as string}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label required htmlFor="email">
                  Email
                </Label>

                <Input
                  id="email"
                  type="email"
                  {...register("personalInfo.email", {
                    required: { value: true, message: "Email is required" },
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="john.doe@example.com"
                />

                {errors.personalInfo?.email && (
                  <p className="text-red-500 text-sm">
                    {errors.personalInfo?.email?.message as string}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label required htmlFor="phone">
                  Phone
                </Label>

                <Input
                  id="phone"
                  placeholder="(123) 456-7890"
                  {...register("personalInfo.phone", {
                    required: {
                      value: true,
                      message: "Phone number is required",
                    },
                  })}
                />

                {errors.personalInfo?.phone && (
                  <p className="text-red-500 text-sm">
                    {errors.personalInfo?.phone?.message as string}
                  </p>
                )}
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address</Label>

                <Input
                  id="address"
                  {...register("personalInfo.address")}
                  placeholder="123 Main St, City, State, Zip"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="summary">Professional Summary</Label>

                <Textarea
                  id="summary"
                  {...register("personalInfo.summary")}
                  placeholder="Write a brief summary of your professional background and goals..."
                  rows={4}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};
export default PersonalTab;
