export interface IPersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
}

export interface IEducation {
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface IExperience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export type ISkills = {
  name: string;
};
export interface IResumeData {
  photo: string;
  personalInfo: IPersonalInfo;
  educations: IEducation[];
  experiences: IExperience[];
  skills: ISkills[];
}
