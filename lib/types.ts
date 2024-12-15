export interface ProposalParams {
  email?: string;
  message?: string;
}

export interface EmailData {
  email: string;
  noClicks: number;
  result: 'yes' | 'no';
  message: string;
  noCount?: number;
}