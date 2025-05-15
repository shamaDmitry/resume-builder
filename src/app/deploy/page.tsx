"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, Copy, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function DeployPage() {
  const router = useRouter();
  const [resumeId, setResumeId] = useState("");
  const [customDomain, setCustomDomain] = useState("");
  const [deploymentUrl, setDeploymentUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentComplete, setDeploymentComplete] = useState(false);

  const handleDeploy = async () => {
    if (!resumeId) {
      alert("Please enter a resume ID");
      return;
    }

    setIsDeploying(true);

    // Simulate deployment process
    setTimeout(() => {
      const baseUrl = window.location.origin;
      const url = customDomain
        ? `https://${customDomain}`
        : `${baseUrl}/resume/${resumeId}`;

      setDeploymentUrl(url);
      setDeploymentComplete(true);
      setIsDeploying(false);
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(deploymentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const goToResume = () => {
    router.push(`/?id=${resumeId}`);
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Deploy Your Resume
      </h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Resume Information</CardTitle>
          <CardDescription>
            Enter your resume ID to deploy it to a custom URL
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="resumeId">Resume ID</Label>

            <div className="flex gap-2">
              <Input
                id="resumeId"
                value={resumeId}
                onChange={(e) => setResumeId(e.target.value)}
                placeholder="Enter your resume ID"
              />

              <Button variant="outline" onClick={goToResume}>
                Edit
              </Button>
            </div>

            <p className="text-sm text-gray-500">
              This is the ID from your resume URL (the part after ?id=)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="customDomain">Custom Domain (Optional)</Label>

            <Input
              id="customDomain"
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
              placeholder="yourname.resume.com"
            />

            <p className="text-sm text-gray-500">
              If you have a custom domain, enter it here
            </p>
          </div>

          <Button
            onClick={handleDeploy}
            className="w-full mt-4"
            disabled={isDeploying || !resumeId}
          >
            {isDeploying ? "Deploying..." : "Deploy Resume"}
          </Button>
        </CardContent>
      </Card>

      {deploymentComplete && (
        <Alert className="mb-6">
          <Check className="h-4 w-4" />
          <AlertTitle>Deployment Successful!</AlertTitle>
          <AlertDescription>
            Your resume is now available at the URL below.
          </AlertDescription>
        </Alert>
      )}

      {deploymentUrl && (
        <Card>
          <CardHeader>
            <CardTitle>Your Resume URL</CardTitle>
            <CardDescription>
              Share this link with potential employers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-gray-500" />
              <Input value={deploymentUrl} readOnly />
              <Button variant="outline" size="icon" onClick={copyToClipboard}>
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>

            <Button
              onClick={() => window.open(deploymentUrl, "_blank")}
              className="w-full"
            >
              Visit Resume <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
