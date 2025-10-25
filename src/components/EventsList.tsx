import { Event, EventCategory, EventLocation } from "@/types/event";
import EventCard from "./EventCard";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface EventsListProps {
  searchQuery: string;
  selectedCategories: EventCategory[];
  selectedLocations: EventLocation[];
  selectedDate: Date | undefined;
}


const EventsList = ({
  searchQuery,
  selectedCategories,
  selectedLocations,
  selectedDate
}: EventsListProps) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, [selectedDate]);

  const loadEvents = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("events")
        .select("*")
        .eq("status", "approved");

      // Filter by date if selected
      if (selectedDate) {
        const dateStr = selectedDate.toISOString().split('T')[0];
        query = query.eq("event_date", dateStr);
      }

      const { data, error } = await query.order("event_date", { ascending: true });

      if (error) throw error;

      const formattedEvents: Event[] = (data || []).map((event) => ({
        id: event.id,
        title: event.title,
        description: event.description || "",
        category: event.category as EventCategory,
        location: event.location as EventLocation,
        date: new Date(event.event_date),
        startTime: event.start_time,
        endTime: event.end_time,
        organizer: event.organizer_name,
        organizerContact: event.organizer_email,
        capacity: event.capacity,
        registered: 0,
        accessibility: [],
        prerequisites: [],
        clubId: event.id,
      }));

      setEvents(formattedEvents);
    } catch (error: any) {
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter(event => {
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

    return true;
  });

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

      {loading ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">Loading events...</p>
        </Card>
      ) : filteredEvents.length === 0 ? (
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
