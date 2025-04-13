import { ReactElement } from "react";

export interface Equipment {
  id: number;
  name: string;
  location: string;
  booking: object;
  status: string;
  comment: string;
  type: string;
  quantity: number;

  [key: string]: number | string | object;
}


export interface UserObject {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  dob: string;
  profilePicture: string;
}


export interface Booking {
  id: string;
  userName: string;
  equipment: string;
  bookedTo: string;
  bookedFrom: string;
  status: string;
  returned: boolean;
  approved: boolean;
}


export interface ColumnDef{
  accessor: string;
  header: string;
  cell?: ReactElement;
}