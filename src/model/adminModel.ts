export interface UserModel {
  id?: number;
  name: string;
  password: string;
  roll: string;
}

export interface CategoryModel {
  id?: number;
  name: string;
}

export interface BusinessModel {
  id?: number;
  name: string;
}

export interface ClientModel {
  id?: number;
  enquiry_raised_date: Date;
  enquiry_answerd_date: Date;
  name: string;
  phone_number: number;
  alternative_phonenumber?: number;
  email: string;
  location: string;
  business_type: string;
  service_required: string;
  lead: string;
  remark: string;
  not_interested: number;
  committed: string;
  company_name: string;
  completed_id: number;
  added_by: string;
  type?: number;
}

export interface CandidateModel {
  id?: number;
  enquiry_raised_date: Date;
  enquiry_answered_date: Date;
  name: string;
  phone_number: number;
  alternative_phonenumber?: number | 0;
  email: string;
  location: string;
  role: string;
  experience: string;
  months: string;
  degree: string;
  added_by: string;
  type?: number;
}

export interface SpamModel {
  id?: number;
  enquiry_raised_date: Date;
  enquiry_answered_date: Date;
  name: string;
  location: string;
  leads: string;
  remarks: string;
  type?: number;
}
