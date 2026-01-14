export interface Student {
  id: string;
  name: string;
  studentId: string;
  faculty: string;
  gender: "male" | "female";
  year: number;
  phone?: string;
  status: "accepted" | "pending" | "housed";
  roomId?: string;
}

export interface Room {
  id: string;
  number: string;
  buildingId: string;
  floor: number;
  capacity: number;
  students: Student[];
}

export interface Building {
  id: string;
  name: string;
  gender: "male" | "female";
  floors: number;
  rooms: Room[];
}
