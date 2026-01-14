import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Room } from "@/types/housing";
import { StudentCard } from "./StudentCard";
import { useHousingStore } from "@/stores/housingStore";
import { DoorOpen, Users, AlertCircle } from "lucide-react";

interface RoomDetailsSheetProps {
  room: Room | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RoomDetailsSheet({ room, open, onOpenChange }: RoomDetailsSheetProps) {
  const removeStudentFromRoom = useHousingStore((state) => state.removeStudentFromRoom);

  if (!room) return null;

  const isFull = room.students.length >= room.capacity;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-3 text-xl">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
              <DoorOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <span>غرفة {room.number}</span>
              <p className="text-sm font-normal text-muted-foreground mt-1">
                الطابق {room.floor}
              </p>
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6">
          {/* Capacity indicator */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 mb-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-5 h-5" />
              <span>الإشغال</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`font-bold text-lg ${isFull ? 'text-green-500' : 'text-accent'}`}>
                {room.students.length}/{room.capacity}
              </span>
              {isFull && (
                <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded-full">
                  مكتملة
                </span>
              )}
            </div>
          </div>

          {/* Students list */}
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-accent" />
            الطلاب في الغرفة
          </h3>

          {room.students.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>لا يوجد طلاب في هذه الغرفة</p>
              <p className="text-sm mt-1">قم بإضافة طلاب من قائمة الطلاب المقبولين</p>
            </div>
          ) : (
            <div className="space-y-3">
              {room.students.map((student) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  compact
                  showRemove
                  onRemove={(studentId) => removeStudentFromRoom(studentId, room.id)}
                />
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
