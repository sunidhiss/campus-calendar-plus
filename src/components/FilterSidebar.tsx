import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { EventCategory, EventLocation } from "@/types/event";
import { Filter } from "lucide-react";

interface FilterSidebarProps {
  selectedCategories: EventCategory[];
  setSelectedCategories: (categories: EventCategory[]) => void;
  selectedLocations: EventLocation[];
  setSelectedLocations: (locations: EventLocation[]) => void;
}

const categories: EventCategory[] = [
  "Academic",
  "Sports",
  "Career Services",
  "Social",
  "Arts & Culture",
  "Technical"
];

const locations: EventLocation[] = [
  "Library",
  "Field House",
  "Student Center",
  "Main Hall",
  "Remote/Online",
  "Engineering Building",
  "Arts Center"
];

const FilterSidebar = ({
  selectedCategories,
  setSelectedCategories,
  selectedLocations,
  setSelectedLocations
}: FilterSidebarProps) => {
  const toggleCategory = (category: EventCategory) => {
    setSelectedCategories(
      selectedCategories.includes(category)
        ? selectedCategories.filter(c => c !== category)
        : [...selectedCategories, category]
    );
  };

  const toggleLocation = (location: EventLocation) => {
    setSelectedLocations(
      selectedLocations.includes(location)
        ? selectedLocations.filter(l => l !== location)
        : [...selectedLocations, location]
    );
  };

  return (
    <Card className="shadow-md border-border sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Filter className="w-5 h-5 text-primary" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Categories */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm text-foreground">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => toggleCategory(category)}
                />
                <Label
                  htmlFor={`category-${category}`}
                  className="text-sm cursor-pointer text-foreground"
                >
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Locations */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm text-foreground">Locations</h3>
          <div className="space-y-2">
            {locations.map((location) => (
              <div key={location} className="flex items-center space-x-2">
                <Checkbox
                  id={`location-${location}`}
                  checked={selectedLocations.includes(location)}
                  onCheckedChange={() => toggleLocation(location)}
                />
                <Label
                  htmlFor={`location-${location}`}
                  className="text-sm cursor-pointer text-foreground"
                >
                  {location}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;
