export interface TreatmentResponse {
  treatment_id: number;
  description: string;
  cost: number;
  status: string;
  start_date: string;
  end_date?: string;
}
