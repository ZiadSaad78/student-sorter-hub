import { useState, useEffect } from "react";
import Header from '@/components/student/Header';
import { StatCard } from "@/components/housing/StatCard";
import { BuildingCard } from "@/components/housing/BuildingCard";
import { AddBuildingDialog } from "@/components/housing/AddBuildingDialog";
import { BuildingDetailsView } from "@/components/housing/BuildingDetailsView";
import { useHousingStore, BuildingWithRooms } from "@/stores/housingStore";
import { Building2, DoorOpen, Bed, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Housing = () => {
  const [showAddBuilding, setShowAddBuilding] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingWithRooms | null>(null);

  const { 
    buildings, 
    acceptedStudents, 
    loading, 
    error,
    fetchBuildings, 
    fetchAcceptedStudents 
  } = useHousingStore();

  // Fetch data on mount
  useEffect(() => {
    fetchBuildings();
    fetchAcceptedStudents();
  }, [fetchBuildings, fetchAcceptedStudents]);

  // Calculate stats
  const totalRooms = buildings.reduce((sum, b) => sum + b.rooms.length, 0);
  const totalCapacity = buildings.reduce(
    (sum, b) => sum + b.rooms.reduce((rs, r) => rs + r.capacity, 0),
    0
  );
  const totalOccupied = buildings.reduce(
    (sum, b) => sum + b.rooms.reduce((rs, r) => rs + r.currentOccupancy, 0),
    0
  );
  const availableBeds = totalCapacity - totalOccupied;

  const handleViewBuildingDetails = (building: BuildingWithRooms) => {
    setSelectedBuilding(building);
  };

  if (loading && buildings.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-primary" />
            <p className="text-muted-foreground">جاري تحميل البيانات...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
            {error}
          </div>
        )}

        {selectedBuilding ? (
          <BuildingDetailsView
            building={selectedBuilding}
            onBack={() => setSelectedBuilding(null)}
          />
        ) : (
          <>
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-foreground">إدارة السكن</h1>
              <Button
                className="gradient-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow"
                onClick={() => setShowAddBuilding(true)}
              >
                <Plus className="w-4 h-4 ml-2" />
                إضافة مبنى جديد
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              <StatCard
                icon={<Building2 className="w-6 h-6" />}
                label="إجمالي المباني"
                value={buildings.length}
                variant="blue"
              />
              <StatCard
                icon={<DoorOpen className="w-6 h-6" />}
                label="إجمالي الغرف"
                value={totalRooms}
                variant="purple"
              />
              <StatCard
                icon={<Bed className="w-6 h-6" />}
                label="الأسرة المتاحة"
                value={availableBeds}
                variant="green"
              />
              <StatCard
                icon={<Building2 className="w-6 h-6" />}
                label="طلاب بانتظار التسكين"
                value={acceptedStudents.length}
                variant="blue"
              />
            </div>

            {/* Buildings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {buildings.map((building, index) => (
                <div
                  key={building.buildingId}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <BuildingCard
                    building={building}
                    onViewDetails={handleViewBuildingDetails}
                  />
                </div>
              ))}

              {buildings.length === 0 && (
                <div className="col-span-full text-center py-16 bg-card rounded-2xl border border-dashed border-border">
                  <Building2 className="w-20 h-20 mx-auto mb-4 text-muted-foreground/30" />
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    لا توجد مباني
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    ابدأ بإضافة مبنى جديد لنظام السكن
                  </p>
                  <Button
                    className="gradient-primary text-primary-foreground"
                    onClick={() => setShowAddBuilding(true)}
                  >
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة مبنى
                  </Button>
                </div>
              )}
            </div>
          </>
        )}

        {/* Add Building Dialog */}
        <AddBuildingDialog
          open={showAddBuilding}
          onOpenChange={setShowAddBuilding}
        />
      </main>
    </div>
  );
};

export default Housing;
