import { create } from "zustand";
import { Building, Room, Student } from "@/types/housing";

// Sample data
const sampleStudents: Student[] = [
  { id: "s1", name: "أحمد محمد علي", studentId: "2024001", faculty: "الهندسة", gender: "male", year: 2, status: "accepted" },
  { id: "s2", name: "محمود حسن إبراهيم", studentId: "2024002", faculty: "الطب", gender: "male", year: 3, status: "accepted" },
  { id: "s3", name: "خالد عبدالله سعيد", studentId: "2024003", faculty: "العلوم", gender: "male", year: 1, status: "accepted" },
  { id: "s4", name: "فاطمة أحمد محمد", studentId: "2024004", faculty: "الصيدلة", gender: "female", year: 2, status: "accepted" },
  { id: "s5", name: "مريم حسين كمال", studentId: "2024005", faculty: "التجارة", gender: "female", year: 4, status: "accepted" },
  { id: "s6", name: "نورا علي عبدالرحمن", studentId: "2024006", faculty: "الآداب", gender: "female", year: 1, status: "accepted" },
];

const initialBuildings: Building[] = [
  {
    id: "b1",
    name: "مبنى (أ) - بنين",
    gender: "male",
    floors: 5,
    rooms: [
      { id: "r1", number: "101", buildingId: "b1", floor: 1, capacity: 3, students: [] },
      { id: "r2", number: "102", buildingId: "b1", floor: 1, capacity: 3, students: [] },
      { id: "r3", number: "103", buildingId: "b1", floor: 1, capacity: 2, students: [] },
      { id: "r4", number: "201", buildingId: "b1", floor: 2, capacity: 3, students: [] },
      { id: "r5", number: "202", buildingId: "b1", floor: 2, capacity: 3, students: [] },
    ],
  },
  {
    id: "b2",
    name: "مبنى (ب) - بنات",
    gender: "female",
    floors: 4,
    rooms: [
      { id: "r6", number: "101", buildingId: "b2", floor: 1, capacity: 2, students: [] },
      { id: "r7", number: "102", buildingId: "b2", floor: 1, capacity: 2, students: [] },
      { id: "r8", number: "201", buildingId: "b2", floor: 2, capacity: 3, students: [] },
    ],
  },
];

interface HousingState {
  buildings: Building[];
  acceptedStudents: Student[];
  selectedRoom: Room | null;
  selectedBuilding: Building | null;

  // Actions
  addBuilding: (building: Omit<Building, "id" | "rooms">) => void;
  addRoom: (buildingId: string, room: Omit<Room, "id" | "buildingId" | "students">) => void;
  setSelectedRoom: (room: Room | null) => void;
  setSelectedBuilding: (building: Building | null) => void;
  assignStudentToRoom: (studentId: string, roomId: string) => void;
  removeStudentFromRoom: (studentId: string, roomId: string) => void;
}

export const useHousingStore = create<HousingState>((set, get) => ({
  buildings: initialBuildings,
  acceptedStudents: sampleStudents,
  selectedRoom: null,
  selectedBuilding: null,

  addBuilding: (building) => {
    const newBuilding: Building = {
      ...building,
      id: `b${Date.now()}`,
      rooms: [],
    };
    set((state) => ({
      buildings: [...state.buildings, newBuilding],
    }));
  },

  addRoom: (buildingId, room) => {
    const newRoom: Room = {
      ...room,
      id: `r${Date.now()}`,
      buildingId,
      students: [],
    };
    set((state) => ({
      buildings: state.buildings.map((b) =>
        b.id === buildingId
          ? { ...b, rooms: [...b.rooms, newRoom] }
          : b
      ),
    }));
  },

  setSelectedRoom: (room) => set({ selectedRoom: room }),
  setSelectedBuilding: (building) => set({ selectedBuilding: building }),

  assignStudentToRoom: (studentId, roomId) => {
    const { acceptedStudents, buildings } = get();
    const student = acceptedStudents.find((s) => s.id === studentId);
    if (!student) return;

    // Find room and check capacity
    const building = buildings.find((b) => b.rooms.some((r) => r.id === roomId));
    const room = building?.rooms.find((r) => r.id === roomId);
    if (!room || room.students.length >= room.capacity) return;

    // Check gender match
    if (building && building.gender !== student.gender) return;

    const housedStudent: Student = { ...student, status: "housed", roomId };

    set((state) => ({
      acceptedStudents: state.acceptedStudents.filter((s) => s.id !== studentId),
      buildings: state.buildings.map((b) =>
        b.rooms.some((r) => r.id === roomId)
          ? {
              ...b,
              rooms: b.rooms.map((r) =>
                r.id === roomId
                  ? { ...r, students: [...r.students, housedStudent] }
                  : r
              ),
            }
          : b
      ),
      selectedRoom: state.selectedRoom?.id === roomId
        ? { ...state.selectedRoom, students: [...state.selectedRoom.students, housedStudent] }
        : state.selectedRoom,
    }));
  },

  removeStudentFromRoom: (studentId, roomId) => {
    set((state) => {
      let removedStudent: Student | null = null;

      const updatedBuildings = state.buildings.map((b) => ({
        ...b,
        rooms: b.rooms.map((r) => {
          if (r.id === roomId) {
            const student = r.students.find((s) => s.id === studentId);
            if (student) {
              removedStudent = { ...student, status: "accepted", roomId: undefined };
            }
            return { ...r, students: r.students.filter((s) => s.id !== studentId) };
          }
          return r;
        }),
      }));

      return {
        buildings: updatedBuildings,
        acceptedStudents: removedStudent
          ? [...state.acceptedStudents, removedStudent]
          : state.acceptedStudents,
        selectedRoom: state.selectedRoom?.id === roomId
          ? {
              ...state.selectedRoom,
              students: state.selectedRoom.students.filter((s) => s.id !== studentId)
            }
          : state.selectedRoom,
      };
    });
  },
}));
