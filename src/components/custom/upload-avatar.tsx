"use client";

import { Camera, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { FC, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ControllerRenderProps } from "react-hook-form";

const UploadAvatar: FC<ControllerRenderProps> = ({ value, onChange, ref }) => {
  const [selectedImg, setSelectedImg] = useState<string | ArrayBuffer | null>(
    null
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (!file) return;

    // Create a new FileReader instance each time
    const reader = new FileReader();

    // Set up the onload handler before calling readAsDataURL
    reader.onload = () => {
      const base64Image = reader.result as string;
      setSelectedImg(base64Image);
      onChange(base64Image);
    };

    // Start reading the file after setting up the handler
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <div className="relative size-32 rounded-full overflow-hidden border-2 border-gray-200 mb-2">
        {value ? (
          <Image
            src={selectedImg || value}
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
          ref={ref}
          id="photo-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {value && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedImg(null);
              onChange(null);
            }}
            className="text-sm flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" />
            Remove
          </Button>
        )}
      </div>
    </div>
  );
};

export default UploadAvatar;
