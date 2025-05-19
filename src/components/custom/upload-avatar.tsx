import { Camera, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { FC } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UploadAvatarProps {
  photo: string | null;
  setPhoto: (photo: string | null) => void;
  handlePhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadAvatar: FC<UploadAvatarProps> = ({
  photo,
  setPhoto,
  handlePhotoChange,
}) => {
  return (
    <div className="flex flex-col items-center mb-4">
      <div className="relative size-32 rounded-full overflow-hidden border-2 border-gray-200 mb-2">
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
  );
};

export default UploadAvatar;
