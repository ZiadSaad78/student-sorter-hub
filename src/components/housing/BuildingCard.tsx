import { BuildingWithRooms, RoomWithStudents } from "@/stores/housingStore";
import { Button } from "@/components/ui/button";
import { Building2, DoorOpen, Users, Layers, CircleDot } from "lucide-react";

interface BuildingCardProps {
  building: BuildingWithRooms;
  onViewDetails: (building: BuildingWithRooms) => void;
}

export function BuildingCard({ building, onViewDetails }: BuildingCardProps) {
  const totalCapacity = building.rooms.reduce((sum, r) => sum + r.capacity, 0);
  const totalOccupied = building.rooms.reduce((sum, r) => sum + r.currentOccupancy, 0);
  const occupancyRate = totalCapacity > 0 ? Math.round((totalOccupied / totalCapacity) * 100) : 0;

  const isMale = building.gender?.toLowerCase() === "male" || building.gender === "بنين";

  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-lg hover:-translate-y-1 transition-transform duration-300 animate-fade-in">
      {/* Header */}
      <div className="gradient-header p-5 text-primary-foreground flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Building2 className="w-6 h-6" />
          <h3 className="text-lg font-bold">{building.buildingName}</h3>
        </div>
        <CircleDot className={`w-5 h-5 ${isMale ? "text-blue-300" : "text-pink-300"}`} />
      </div>

      {/* Body */}
      <div className="p-5 space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-border">
          <span className="text-muted-foreground text-sm flex items-center gap-2">
            <Layers className="w-4 h-4" />
            عدد الطوابق
          </span>
          <span className="font-bold text-foreground">{building.numberOfFloors} طوابق</span>
        </div>

        <div className="flex justify-between items-center pb-3 border-b border-border">
          <span className="text-muted-foreground text-sm flex items-center gap-2">
            <DoorOpen className="w-4 h-4" />
            إجمالي الغرف
          </span>
          <span className="font-bold text-foreground">{building.rooms.length} غرفة</span>
        </div>

        <div className="flex justify-between items-center pb-3 border-b border-border">
          <span className="text-muted-foreground text-sm flex items-center gap-2">
            <Users className="w-4 h-4" />
            السعة الاستيعابية
          </span>
          <span className="font-bold text-foreground">{totalCapacity} طالب</span>
        </div>

        {/* Progress */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-foreground font-medium">نسبة الإشغال</span>
            <span className="text-accent font-bold">{occupancyRate}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${occupancyRate}%` }}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 bg-muted/50 border-t border-border flex justify-end">
        <Button
          variant="outline"
          className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
          onClick={() => onViewDetails(building)}
        >
          عرض التفاصيل
        </Button>
      </div>
    </div>
  );
}
