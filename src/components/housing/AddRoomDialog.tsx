import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useHousingStore } from "@/stores/housingStore";
import { DoorOpen } from "lucide-react";
import { Building } from "@/types/housing";

interface AddRoomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  building: Building | null;
}

export function AddRoomDialog({ open, onOpenChange, building }: AddRoomDialogProps) {
  const [number, setNumber] = useState("");
  const [floor, setFloor] = useState("1");
  const [capacity, setCapacity] = useState("2");

  const addRoom = useHousingStore((state) => state.addRoom);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!number.trim() || !building) return;

    addRoom(building.id, {
      number: number.trim(),
      floor: parseInt(floor) || 1,
      capacity: parseInt(capacity) || 2,
    });

    setNumber("");
    setFloor("1");
    setCapacity("2");
    onOpenChange(false);
  };

  if (!building) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <DoorOpen className="w-6 h-6 text-accent" />
            إضافة غرفة جديدة
          </DialogTitle>
        </DialogHeader>

        <p className="text-muted-foreground text-sm">
          إضافة غرفة إلى {building.name}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="number">رقم الغرفة</Label>
            <Input
              id="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="مثال: 301"
              className="text-right"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="floor">الطابق</Label>
            <Select value={floor} onValueChange={setFloor}>
              <SelectTrigger>
                <SelectValue placeholder="اختر الطابق" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: building.floors }, (_, i) => (
                  <SelectItem key={i + 1} value={String(i + 1)}>
                    الطابق {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="capacity">سعة الغرفة</Label>
            <Select value={capacity} onValueChange={setCapacity}>
              <SelectTrigger>
                <SelectValue placeholder="اختر السعة" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <SelectItem key={num} value={String(num)}>
                    {num} {num === 1 ? "طالب" : "طلاب"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              إلغاء
            </Button>
            <Button type="submit" className="gradient-primary text-primary-foreground">
              إضافة الغرفة
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
