export interface IPerson {
  id: number;
  firstName: string;
  secondName?: string;
  lastName: string;
  secondLastName?: string;
  document: string;
  phone: string;
  address: string;
  email: string;
  password: string;
  dateOfBirth: string | Date;
}
