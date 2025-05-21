"use client";

import { Button } from "@/components/ui/button";
import { Download, Loader } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfDocument from "@/components/custom/base/pdf-document";
import { IResumeData } from "@/types";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const PdfDownloadButton = ({
  formData,
  isValid,
}: {
  formData: IResumeData;
  isValid: boolean;
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <Button type="button" className="w-full mb-4" disabled>
        <Loader className="w-4 h-4 mr-2" />
        Preparing PDF...
      </Button>
    );
  }

  return (
    <PDFDownloadLink
      document={<PdfDocument formData={formData} />}
      fileName={`resume-${formData?.personalInfo?.name || "untitled"}.pdf`}
      className={cn("", !isValid && "pointer-events-none")}
    >
      {({ loading }) => {
        return (
          <Button
            type="button"
            className="w-full mb-4"
            disabled={!isValid || loading}
          >
            {loading ? (
              <Loader className="w-4 h-4 mr-2" />
            ) : (
              <Download className="w-4 h-4 mr-2" />
            )}
            {loading ? "Generating PDF..." : "Download PDF"}
          </Button>
        );
      }}
    </PDFDownloadLink>
  );
};

export default PdfDownloadButton;
