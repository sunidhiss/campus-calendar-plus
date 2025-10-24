import { Event, EventCategory, EventLocation } from "@/types/event";
import EventCard from "./EventCard";
import { Card } from "@/components/ui/card";
import { useMemo } from "react";

interface EventsListProps {
  searchQuery: string;
  selectedCategories: EventCategory[];
  selectedLocations: EventLocation[];
  selectedDate: Date | undefined;
}

// Mock data for demonstration
const mockEvents: Event[] = [
  {
    id: "1",
    title: "AI & Machine Learning Workshop",
    description: "Join us for an intensive hands-on workshop covering the fundamentals of AI and machine learning. Learn from industry experts and work on real-world projects.",
    category: "Technical",
    location: "Engineering Building",
    date: new Date(),
    startTime: "14:00",
    endTime: "17:00",
    organizer: "Tech Club",
    organizerContact: "tech@university.edu",
    capacity: 50,
    registered: 32,
    accessibility: ["Wheelchair accessible", "Live captions available"],
    prerequisites: ["Laptop required", "Basic Python knowledge recommended"],
    clubId: "tech-club"
  },
  {
    id: "2",
    title: "Annual Sports Day",
    description: "Participate in various sports competitions including basketball, soccer, and track events. Open to all students!",
    category: "Sports",
    location: "Field House",
    date: new Date(),
    startTime: "09:00",
    endTime: "18:00",
    organizer: "Athletics Department",
    organizerContact: "athletics@university.edu",
    capacity: 200,
    registered: 145,
    accessibility: ["Wheelchair accessible", "ASL interpreters available"],
    clubId: "athletics"
  },
  {
    id: "3",
    title: "Career Fair 2024",
    description: "Meet recruiters from top companies. Bring your resume and be ready for on-spot interviews!",
    category: "Career Services",
    location: "Main Hall",
    date: new Date(),
    startTime: "10:00",
    endTime: "16:00",
    organizer: "Career Services",
    organizerContact: "careers@university.edu",
    capacity: 500,
    registered: 387,
    accessibility: ["Wheelchair accessible", "Accessible parking available"],
    prerequisites: ["Resume required", "Professional attire"],
    clubId: "career-services"
  },
  {
    id: "4",
    title: "Art Exhibition: Student Showcase",
    description: "Experience the creativity of our talented student artists. Exhibition features paintings, sculptures, and digital art.",
    category: "Arts & Culture",
    location: "Arts Center",
    date: new Date(),
    startTime: "11:00",
    endTime: "20:00",
    organizer: "Fine Arts Society",
    organizerContact: "arts@university.edu",
    accessibility: ["Wheelchair accessible", "Audio descriptions available"],
    clubId: "fine-arts"
  },
  {
    id: "5",
    title: "Study Group: Advanced Calculus",
    description: "Collaborative study session for students taking Advanced Calculus. Bring your questions and work through problem sets together.",
    category: "Academic",
    location: "Library",
    date: new Date(),
    startTime: "18:00",
    endTime: "20:00",
    organizer: "Math Department",
    organizerContact: "math@university.edu",
    capacity: 25,
    registered: 18,
    accessibility: ["Wheelchair accessible", "Quiet study space"],
    prerequisites: ["Enrolled in Calculus II or higher"],
    clubId: "math-dept"
  },
  {
    id: "6",
    title: "International Food Festival",
    description: "Taste dishes from around the world prepared by international students. Learn about different cultures through food!",
    category: "Social",
    location: "Student Center",
    date: new Date(),
    startTime: "12:00",
    endTime: "15:00",
    organizer: "International Students Association",
    organizerContact: "isa@university.edu",
    capacity: 300,
    registered: 256,
    accessibility: ["Wheelchair accessible", "Dietary accommodations available"],
    clubId: "isa"
  }
];

const EventsList = ({
  searchQuery,
  selectedCategories,
  selectedLocations,
  selectedDate
}: EventsListProps) => {
  const filteredEvents = useMemo(() => {
    return mockEvents.filter(event => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.organizer.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(event.category)) {
        return false;
      }

      // Location filter
      if (selectedLocations.length > 0 && !selectedLocations.includes(event.location)) {
        return false;
      }

      // Date filter (simplified for demo)
      // In a real app, you'd compare dates properly
      return true;
    });
  }, [searchQuery, selectedCategories, selectedLocations, selectedDate]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">
          {selectedDate ? selectedDate.toLocaleDateString('en-US', { 
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) : 'All Events'}
        </h2>
        <p className="text-sm text-muted-foreground">
          {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {filteredEvents.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">No events found matching your criteria.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsList;
