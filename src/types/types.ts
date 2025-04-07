export interface InternBody {
  education: string;
  email: string;
  employmentType: string;
  experience: string;
  hoursPerWeek: number;
  links: string;
  name: string;
  phone: string;
  position: string;
  pathToResume: string;
  skills: string;
}

export interface Intern {
  body: InternBody;
  id: string; 
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