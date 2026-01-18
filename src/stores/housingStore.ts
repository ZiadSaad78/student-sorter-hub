import { create } from "zustand";
import { BuildingDto, RoomDto, StudentDto } from "@/types/api";
import { buildingService, roomService, studentService, applicationService } from "@/services/api";

// Extended types for frontend use
export interface RoomWithStudents extends RoomDto {
  students: StudentDto[];
}

export interface BuildingWithRooms extends BuildingDto {
  rooms: RoomWithStudents[];
}

interface HousingState {
  buildings: BuildingWithRooms[];
  allRooms: RoomDto[];
  acceptedStudents: StudentDto[];
  selectedRoom: RoomWithStudents | null;
  selectedBuilding: BuildingWithRooms | null;
  loading: boolean;
  error: string | null;

  // Actions
  fetchBuildings: () => Promise<void>;
  fetchRooms: () => Promise<void>;
  fetchAcceptedStudents: () => Promise<void>;
  addBuilding: (building: { name: string; type: string; numberOfFloors: number }) => Promise<void>;
  addRoom: (buildingId: number, room: { roomNumber: string; capacity: number; floor?: number }) => Promise<void>;
  setSelectedRoom: (room: RoomWithStudents | null) => void;
  setSelectedBuilding: (building: BuildingWithRooms | null) => void;
  assignStudentToRoom: (studentId: number, roomId: number) => Promise<void>;
  removeStudentFromRoom: (assignmentId: number) => Promise<void>;
  deleteBuilding: (buildingId: number) => Promise<void>;
  deleteRoom: (roomId: number) => Promise<void>;
  refreshData: () => Promise<void>;
}

export const useHousingStore = create<HousingState>((set, get) => ({
  buildings: [],
  allRooms: [],
  acceptedStudents: [],
  selectedRoom: null,
  selectedBuilding: null,
  loading: false,
  error: null,

  fetchBuildings: async () => {
    set({ loading: true, error: null });
    try {
      const [buildingsRes, roomsRes] = await Promise.all([
        buildingService.getAll(),
        roomService.getAll(),
      ]);

      if (buildingsRes.error) {
        set({ error: buildingsRes.error, loading: false });
        return;
      }

      const buildings = buildingsRes.data || [];
      const rooms = roomsRes.data || [];

      // Group rooms by building and add empty students array
      const buildingsWithRooms: BuildingWithRooms[] = buildings.map((building) => ({
        ...building,
        rooms: rooms
          .filter((room) => room.buildingId === building.buildingId)
          .map((room) => ({ ...room, students: [] })),
      }));

      set({ buildings: buildingsWithRooms, allRooms: rooms, loading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch buildings', loading: false });
    }
  },

  fetchRooms: async () => {
    try {
      const response = await roomService.getAll();
      if (response.data) {
        set({ allRooms: response.data });
      }
    } catch (error) {
      console.error('Failed to fetch rooms:', error);
    }
  },

  fetchAcceptedStudents: async () => {
    try {
      // Get applications with accepted status
      const response = await applicationService.getAllApplications();
      if (response.data) {
        // Filter for accepted applications and convert to student format
        const acceptedApps = response.data.filter(app => 
          app.status?.toLowerCase() === 'accepted' || 
          app.status?.toLowerCase() === 'مقبول'
        );
        
        // Convert to StudentDto format
        const students: StudentDto[] = acceptedApps.map(app => ({
          studentId: app.studentId,
          nationalId: app.nationalId,
          fullName: app.studentName,
          studentType: 0,
          birthDate: '',
          birthPlace: null,
          gender: app.gender,
          religion: null,
          governorate: app.governorate,
          city: null,
          address: null,
          email: app.email || null,
          phone: app.phone || null,
          faculty: app.faculty,
          department: null,
          level: app.level,
          fatherContactId: 0,
          guardianContactId: 0,
          userId: 0,
        }));
        
        set({ acceptedStudents: students });
      }
    } catch (error) {
      console.error('Failed to fetch accepted students:', error);
    }
  },

  addBuilding: async (building) => {
    set({ loading: true, error: null });
    try {
      const response = await buildingService.create({
        name: building.name,
        type: building.type,
        numberOfFloors: building.numberOfFloors,
        status: 'active',
      });

      if (response.error) {
        set({ error: response.error, loading: false });
        return;
      }

      // Refresh buildings list
      await get().fetchBuildings();
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to add building', loading: false });
    }
  },

  addRoom: async (buildingId, room) => {
    set({ loading: true, error: null });
    try {
      const response = await roomService.create({
        roomNumber: room.roomNumber,
        capacity: room.capacity,
        buildingId: buildingId,
        status: 0,
      });

      if (response.error) {
        set({ error: response.error, loading: false });
        return;
      }

      // Refresh buildings list
      await get().fetchBuildings();
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to add room', loading: false });
    }
  },

  setSelectedRoom: (room) => set({ selectedRoom: room }),
  setSelectedBuilding: (building) => set({ selectedBuilding: building }),

  assignStudentToRoom: async (studentId, roomId) => {
    set({ loading: true, error: null });
    try {
      const response = await roomService.assignStudent(studentId, roomId);

      if (response.error) {
        set({ error: response.error, loading: false });
        return;
      }

      // Refresh data
      await get().refreshData();
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to assign student', loading: false });
    }
  },

  removeStudentFromRoom: async (assignmentId) => {
    set({ loading: true, error: null });
    try {
      const response = await roomService.removeAssignment(assignmentId);

      if (response.error) {
        set({ error: response.error, loading: false });
        return;
      }

      // Refresh data
      await get().refreshData();
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to remove student', loading: false });
    }
  },

  deleteBuilding: async (buildingId) => {
    set({ loading: true, error: null });
    try {
      const response = await buildingService.delete(buildingId);

      if (response.error) {
        set({ error: response.error, loading: false });
        return;
      }

      // Refresh buildings list
      await get().fetchBuildings();
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to delete building', loading: false });
    }
  },

  deleteRoom: async (roomId) => {
    set({ loading: true, error: null });
    try {
      const response = await roomService.delete(roomId);

      if (response.error) {
        set({ error: response.error, loading: false });
        return;
      }

      // Refresh buildings list
      await get().fetchBuildings();
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to delete room', loading: false });
    }
  },

  refreshData: async () => {
    const { fetchBuildings, fetchAcceptedStudents } = get();
    await Promise.all([fetchBuildings(), fetchAcceptedStudents()]);
    set({ loading: false });
  },
}));
