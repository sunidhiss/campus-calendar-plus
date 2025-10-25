import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar } from "lucide-react";
import EventCard from "@/components/EventCard";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Event, EventCategory, EventLocation } from "@/types/event";
import Navbar from "@/components/Navbar";

const MyEvents = () => {
  const navigate = useNavigate();
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Please log in to view your events");
        navigate("/auth");
        return;
      }
      loadMyEvents(session.user.id);
    };
    checkAuth();
  }, [navigate]);

  const loadMyEvents = async (userId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("event_rsvps")
        .select(`
          event_id,
          events (
            id,
            title,
            description,
            category,
            location,
            event_date,
            start_time,
            end_time,
            organizer_name,
            organizer_email,
            capacity
          )
        `)
        .eq("user_id", userId);

      if (error) throw error;

      const now = new Date();
      now.setHours(0, 0, 0, 0);

      const upcoming: Event[] = [];
      const past: Event[] = [];

      data?.forEach((rsvp: any) => {
        const event = rsvp.events;
        if (!event) return;

        const eventDate = new Date(event.event_date);
        const formattedEvent: Event = {
          id: event.id,
          title: event.title,
          description: event.description || "",
          category: event.category as EventCategory,
          location: event.location as EventLocation,
          date: eventDate,
          startTime: event.start_time,
          endTime: event.end_time,
          organizer: event.organizer_name,
          organizerContact: event.organizer_email,
          capacity: event.capacity,
          registered: 0,
          accessibility: [],
          prerequisites: [],
          clubId: event.id,
        };

        if (eventDate >= now) {
          upcoming.push(formattedEvent);
        } else {
          past.push(formattedEvent);
        }
      });

      setUpcomingEvents(upcoming);
      setPastEvents(past);
    } catch (error: any) {
      toast.error("Failed to load your events");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <Link to="/">
            <Button variant="ghost" className="mb-4 text-white hover:bg-white/10 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Button>
          </Link>
          <h1 className="text-4xl font-bold">My Events</h1>
          <p className="text-white/90 mt-2">Manage your event registrations</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="upcoming">
              Upcoming ({upcomingEvents.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Past ({pastEvents.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {loading ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">Loading...</p>
              </Card>
            ) : upcomingEvents.length === 0 ? (
              <Card className="p-12 text-center">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  You haven't RSVP'd to any upcoming events yet.
                </p>
                <Link to="/">
                  <Button className="mt-4">
                    Browse Events
                  </Button>
                </Link>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {loading ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">Loading...</p>
              </Card>
            ) : pastEvents.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">No past events to display.</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyEvents;
