export interface InternBody {
  education: string;
  email: string;
  employmentType: string;
  experience: string;
  hoursPerWeek: number;
  links?: string;
  name: string;
  phone: string;
  position: string;
  pathToResume?: string;
  skills: string;
}

export interface Intern {
  id: string;
  body: InternBody;
}

export interface Internship {
  id: string;
  body: InternshipBody,
}

export interface InternshipBody {
  skills: string;
  education: string;
  hoursPerWeek: number;
  employmentType: string;
  description: string;
  position: string;
  department: string;
  status: string;
}



// export interface FlatCandidate {
//   id: string;
//   education: string;
//   email: string;
//   employmentType: string | null;
//   experience: string;
//   hoursPerWeek: number;
//   links: string;
//   name: string;
//   phone: string;
//   position: string;
//   resume: string | null;
//   skills: string;
// }