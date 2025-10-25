import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, MapPin, Clock, Users, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

interface EventData {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  event_date: string;
  start_time: string;
  end_time: string;
  organizer_name: string;
  organizer_email: string;
  capacity: number | null;
}

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasRsvped, setHasRsvped] = useState(false);
  const [rsvpCount, setRsvpCount] = useState(0);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkUser();
    loadEvent();
  }, [id]);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user || null);
  };

  const loadEvent = async () => {
    if (!id) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .eq("status", "approved")
        .single();

      if (error) throw error;
      setEvent(data);

      // Load RSVP count
      const { count } = await supabase
        .from("event_rsvps")
        .select("*", { count: "exact", head: true })
        .eq("event_id", id);

      setRsvpCount(count || 0);

      // Check if current user has RSVP'd
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: rsvp } = await supabase
          .from("event_rsvps")
          .select("id")
          .eq("event_id", id)
          .eq("user_id", session.user.id)
          .maybeSingle();

        setHasRsvped(!!rsvp);
      }
    } catch (error: any) {
      toast.error("Event not found");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleRsvp = async () => {
    if (!user) {
      toast.error("Please log in to RSVP");
      navigate("/auth");
      return;
    }

    if (!event) return;

    try {
      if (hasRsvped) {
        const { error } = await supabase
          .from("event_rsvps")
          .delete()
          .eq("event_id", event.id)
          .eq("user_id", user.id);

        if (error) throw error;
        setHasRsvped(false);
        setRsvpCount(prev => prev - 1);
        toast.success("RSVP cancelled");
      } else {
        const { error } = await supabase
          .from("event_rsvps")
          .insert({
            event_id: event.id,
            user_id: user.id,
          });

        if (error) throw error;
        setHasRsvped(true);
        setRsvpCount(prev => prev + 1);
        toast.success("Successfully RSVP'd!");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to RSVP");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground">Loading event...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <Link to="/">
            <Button variant="ghost" className="mb-4 text-white hover:bg-white/10 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="space-y-4">
                  <Badge className="w-fit">
                    {event.category}
                  </Badge>
                  <CardTitle className="text-3xl">{event.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">About This Event</h3>
                  <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info Card */}
            <Card>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Date</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(event.event_date).toLocaleDateString('en-US', { 
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Time</p>
                    <p className="text-sm text-muted-foreground">
                      {event.start_time} - {event.end_time}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">{event.location}</p>
                  </div>
                </div>

                {event.capacity && (
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-primary mt-0.5" />
                    <div className="w-full">
                      <p className="font-medium">Capacity</p>
                      <p className="text-sm text-muted-foreground">
                        {rsvpCount} / {event.capacity} registered
                      </p>
                      <div className="mt-2 w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary rounded-full h-2 transition-all"
                          style={{ width: `${(rsvpCount / event.capacity) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <Button 
                  className="w-full mt-4"
                  onClick={handleRsvp}
                  variant={hasRsvped ? "outline" : "default"}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {hasRsvped ? "Cancel RSVP" : "RSVP for This Event"}
                </Button>
              </CardContent>
            </Card>

            {/* Organizer Card */}
            <Card>
              <CardHeader>
                <CardTitle>Organizer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-medium text-lg">{event.organizer_name}</p>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 text-primary" />
                  <a href={`mailto:${event.organizer_email}`} className="hover:text-primary">
                    {event.organizer_email}
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
