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
