import { Room } from "@/types/housing";
import { DoorOpen, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoomCardProps {
  room: Room;
  onClick: (room: Room) => void;
  isSelected: boolean;
}

export function RoomCard({ room, onClick, isSelected }: RoomCardProps) {
  const isFull = room.students.length >= room.capacity;
  const isEmpty = room.students.length === 0;

  return (
    <button
      onClick={() => onClick(room)}
      className={cn(
        "p-4 rounded-xl border-2 transition-all duration-200 text-right w-full",
        "hover:shadow-lg hover:-translate-y-0.5",
        isSelected && "ring-2 ring-accent ring-offset-2",
        isFull
          ? "bg-green-500/10 border-green-500/30"
          : isEmpty
            ? "bg-muted border-border"
            : "bg-accent/10 border-accent/30"
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center",
          isFull ? "bg-green-500/20 text-green-500" : "bg-accent/20 text-accent"
        )}>
          <DoorOpen className="w-5 h-5" />
        </div>
        <span className="font-bold text-lg text-foreground">غرفة {room.number}</span>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-1">
          {Array.from({ length: room.capacity }).map((_, i) => (
            <User
              key={i}
              className={cn(
                "w-4 h-4",
                i < room.students.length ? "text-accent fill-accent" : "text-muted-foreground/30"
              )}
            />
          ))}
        </div>
        <span className="text-muted-foreground">
          {room.students.length}/{room.capacity}
        </span>
      </div>

      <div className="mt-2 text-xs text-muted-foreground">
        الطابق {room.floor}
      </div>
    </button>
  );
}
