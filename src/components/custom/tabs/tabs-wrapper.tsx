import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import PersonalTab from "@/components/custom/tabs/personal-tab";
import EducationTab from "@/components/custom/tabs/education-tab";
import ExperienceTab from "@/components/custom/tabs/experience-tab";
import SkillsTab from "@/components/custom/tabs/skills-tab";
import { useForm, FormProvider, useFormContext } from "react-hook-form";

const TabsWrapper = () => {
  return (
    <Tabs defaultValue="personal" className="w-full">
      <TabsList className="grid grid-cols-4 mb-3">
        <TabsTrigger value="personal">Personal</TabsTrigger>

        <TabsTrigger value="education">Education</TabsTrigger>

        <TabsTrigger value="experience">Experience</TabsTrigger>

        <TabsTrigger value="skills">Skills</TabsTrigger>
      </TabsList>

      <PersonalTab />

      <EducationTab />

      <ExperienceTab />

      <SkillsTab />
    </Tabs>
  );
};

export default TabsWrapper;
