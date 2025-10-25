import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ArrowLeft, Check, X } from "lucide-react";

interface Event {
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
  capacity: number;
  status: string;
  submitted_by: string;
  created_at: string;
}

const AdminPanel = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      toast.error("Please log in first");
      navigate("/auth");
      return;
    }

    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .single();

    if (roles?.role !== "admin") {
      toast.error("Access denied. Admin only.");
      navigate("/");
      return;
    }

    setIsAdmin(true);
    loadPendingEvents();
  };

  const loadPendingEvents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load events");
    } else {
      setEvents(data || []);
    }
    setLoading(false);
  };

  const handleApprove = async (eventId: string) => {
    const { error } = await supabase
      .from("events")
      .update({ status: "approved" })
      .eq("id", eventId);

    if (error) {
      toast.error("Failed to approve event");
    } else {
      toast.success("Event approved!");
      loadPendingEvents();
    }
  };

  const handleReject = async (eventId: string) => {
    const { error } = await supabase
      .from("events")
      .update({ status: "rejected" })
      .eq("id", eventId);

    if (error) {
      toast.error("Failed to reject event");
    } else {
      toast.success("Event rejected");
      loadPendingEvents();
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <p className="text-muted-foreground mt-2">
            Review and approve submitted events
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : events.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No pending events to review</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {events.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{event.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {event.description}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">{event.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-semibold">Date</p>
                      <p className="text-muted-foreground">
                        {new Date(event.event_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold">Time</p>
                      <p className="text-muted-foreground">
                        {event.start_time} - {event.end_time}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold">Location</p>
                      <p className="text-muted-foreground">{event.location}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Capacity</p>
                      <p className="text-muted-foreground">{event.capacity}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Organizer</p>
                      <p className="text-muted-foreground">{event.organizer_name}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Contact</p>
                      <p className="text-muted-foreground">{event.organizer_email}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={() => handleApprove(event.id)}
                      className="flex-1"
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleReject(event.id)}
                      variant="destructive"
                      className="flex-1"
                    >
                      <X className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
