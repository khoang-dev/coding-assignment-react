export type Ticket = {
  id: number;
  description: string;
  assigneeId: null | number;
  completed: boolean;
};

export interface Option {
  id: number;
  name: string;
}
export interface User extends Option {};