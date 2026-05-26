export interface PatientData {
  identification: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  phone: string;
  email: string;
  address: string;
  gender: string;
  status: string;
}

export type PatientListItem = {
  id: number;
  name: string;
  identification: string;
  phone: string;
};

export type PatientDetails = {
  id: number;
  identification: string;
  first_name: string;
  last_name: string;
  birth_date: Date;
  phone: string;
  email:string;
  address: string;
  gender: string;
  created_at: Date;
  status: string;
};