import { useState } from "react";
import { Building, Room } from "@/types/housing";
import { Button } from "@/components/ui/button";
import { RoomCard } from "./RoomCard";
import { StudentCard } from "./StudentCard";
import { AddRoomDialog } from "./AddRoomDialog";
import { RoomDetailsSheet } from "./RoomDetailsSheet";
import { useHousingStore } from "@/stores/housingStore";
import { ArrowRight, Plus, Users, DoorOpen, AlertCircle } from "lucide-react";

interface BuildingDetailsViewProps {
  building: Building;
  onBack: () => void;
}

export function BuildingDetailsView({ building, onBack }: BuildingDetailsViewProps) {
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showRoomDetails, setShowRoomDetails] = useState(false);

  const { acceptedStudents, assignStudentToRoom, buildings } = useHousingStore();

  // Get fresh building data from store
  const freshBuilding = buildings.find((b) => b.id === building.id) || building;

  // Filter students by gender matching building
  const eligibleStudents = acceptedStudents.filter(
    (s) => s.gender === freshBuilding.gender && s.status === "accepted"
  );

  const handleRoomClick = (room: Room) => {
    // Get fresh room data
    const freshRoom = freshBuilding.rooms.find((r) => r.id === room.id);
    setSelectedRoom(freshRoom || room);
    setShowRoomDetails(true);
  };

  const handleAssignStudent = (studentId: string) => {
    if (selectedRoom) {
      assignStudentToRoom(studentId, selectedRoom.id);
    }
  };

  // Update selected room when store changes
  const currentSelectedRoom = selectedRoom
    ? freshBuilding.rooms.find((r) => r.id === selectedRoom.id) || selectedRoom
    : null;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowRight className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-foreground">{freshBuilding.name}</h2>
            <p className="text-muted-foreground">
              {freshBuilding.rooms.length} غرفة • {freshBuilding.floors} طوابق
            </p>
          </div>
        </div>
        <Button
          className="gradient-primary text-primary-foreground"
          onClick={() => setShowAddRoom(true)}
        >
          <Plus className="w-4 h-4 ml-2" />
          إضافة غرفة
        </Button>
      </div>

      {/* Rooms Grid */}
      <div className="mb-8">
        <h3 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">
          <DoorOpen className="w-5 h-5 text-accent" />
          الغرف
        </h3>

        {freshBuilding.rooms.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-xl border border-dashed border-border">
            <DoorOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
            <p className="text-muted-foreground">لا توجد غرف في هذا المبنى</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setShowAddRoom(true)}
            >
              إضافة غرفة جديدة
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {freshBuilding.rooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                onClick={handleRoomClick}
                isSelected={currentSelectedRoom?.id === room.id}
              />
            ))}
          </div>
        )}
      </div>

      {/* Accepted Students List */}
      <div>
        <h3 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-accent" />
          الطلاب المقبولين ({eligibleStudents.length})
          {freshBuilding.gender === "male" ? " - بنين" : " - بنات"}
        </h3>

        {eligibleStudents.length === 0 ? (
          <div className="text-center py-8 bg-card rounded-xl border border-dashed border-border">
            <AlertCircle className="w-12 h-12 mx-auto mb-3 text-muted-foreground/30" />
            <p className="text-muted-foreground">لا يوجد طلاب مقبولين متاحين للتسكين</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {eligibleStudents.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                showAssign={!!currentSelectedRoom && currentSelectedRoom.students.length < currentSelectedRoom.capacity}
                onAssign={handleAssignStudent}
              />
            ))}
          </div>
        )}

        {currentSelectedRoom && (
          <p className="mt-4 text-sm text-muted-foreground bg-accent/10 p-3 rounded-lg">
            💡 اختر غرفة ثم اضغط "إضافة" بجانب الطالب لتسكينه في الغرفة المحددة
          </p>
        )}
      </div>

      {/* Dialogs */}
      <AddRoomDialog
        open={showAddRoom}
        onOpenChange={setShowAddRoom}
        building={freshBuilding}
      />

      <RoomDetailsSheet
        room={currentSelectedRoom}
        open={showRoomDetails}
        onOpenChange={setShowRoomDetails}
      />
    </div>
  );
}
