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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useHousingStore } from "@/stores/housingStore";
import { Building2 } from "lucide-react";

interface AddBuildingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddBuildingDialog({ open, onOpenChange }: AddBuildingDialogProps) {
  const [name, setName] = useState("");
  const [floors, setFloors] = useState("3");
  const [gender, setGender] = useState<"male" | "female">("male");

  const addBuilding = useHousingStore((state) => state.addBuilding);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addBuilding({
      name: name.trim(),
      floors: parseInt(floors) || 3,
      gender,
    });

    setName("");
    setFloors("3");
    setGender("male");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Building2 className="w-6 h-6 text-accent" />
            إضافة مبنى جديد
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">اسم المبنى</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: مبنى (ج)"
              className="text-right"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="floors">عدد الطوابق</Label>
            <Input
              id="floors"
              type="number"
              min="1"
              max="20"
              value={floors}
              onChange={(e) => setFloors(e.target.value)}
              className="text-right"
            />
          </div>

          <div className="space-y-3">
            <Label>نوع السكن</Label>
            <RadioGroup
              value={gender}
              onValueChange={(v) => setGender(v as "male" | "female")}
              className="flex gap-4"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male" className="cursor-pointer">بنين</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female" className="cursor-pointer">بنات</Label>
              </div>
            </RadioGroup>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              إلغاء
            </Button>
            <Button type="submit" className="gradient-primary text-primary-foreground">
              إضافة المبنى
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
