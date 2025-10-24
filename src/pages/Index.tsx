import { useState } from "react";
import { Calendar, Search, Filter, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Hero from "@/components/Hero";
import EventsCalendar from "@/components/EventsCalendar";
import EventsList from "@/components/EventsList";
import FilterSidebar from "@/components/FilterSidebar";
import { EventCategory, EventLocation } from "@/types/event";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<EventCategory[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<EventLocation[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Hero 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        onFilterClick={() => setShowFilters(!showFilters)}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
            <FilterSidebar
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedLocations={selectedLocations}
              setSelectedLocations={setSelectedLocations}
            />
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-8">
            <EventsCalendar
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            
            <EventsList
              searchQuery={searchQuery}
              selectedCategories={selectedCategories}
              selectedLocations={selectedLocations}
              selectedDate={selectedDate}
            />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
