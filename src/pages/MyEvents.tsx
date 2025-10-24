import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, Bell, Download } from "lucide-react";
import EventCard from "@/components/EventCard";

const MyEvents = () => {
  // Mock upcoming events
  const upcomingEvents = [
    {
      id: "1",
      title: "AI & Machine Learning Workshop",
      description: "Join us for an intensive hands-on workshop covering the fundamentals of AI and machine learning.",
      category: "Technical" as const,
      location: "Engineering Building" as const,
      date: new Date(),
      startTime: "14:00",
      endTime: "17:00",
      organizer: "Tech Club",
      organizerContact: "tech@university.edu",
      capacity: 50,
      registered: 32,
      accessibility: ["Wheelchair accessible", "Live captions available"],
      prerequisites: ["Laptop required"],
      isRsvped: true
    }
  ];

  const pastEvents = [];

  return (
    <div className="min-h-screen bg-background">
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
          <p className="text-white/90 mt-2">Manage your event registrations and calendar</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="upcoming" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upcoming">
                  Upcoming Events ({upcomingEvents.length})
                </TabsTrigger>
                <TabsTrigger value="past">
                  Past Events ({pastEvents.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="space-y-4">
                {upcomingEvents.length === 0 ? (
                  <Card className="p-12 text-center">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      You haven't RSVP'd to any upcoming events yet.
                    </p>
                    <Link to="/">
                      <Button className="mt-4 bg-primary hover:bg-primary/90">
                        Browse Events
                      </Button>
                    </Link>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {upcomingEvents.map(event => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="past" className="space-y-4">
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground">No past events to display.</p>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  <Download className="w-4 h-4 mr-2" />
                  Export to Calendar
                </Button>
                <Button variant="outline" className="w-full">
                  <Bell className="w-4 h-4 mr-2" />
                  Notification Settings
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming This Week */}
            <Card>
              <CardHeader>
                <CardTitle>This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 pb-3 border-b border-border last:border-0">
                    <div className="bg-primary/10 rounded-lg p-2 text-center min-w-[50px]">
                      <p className="text-lg font-bold text-primary">24</p>
                      <p className="text-xs text-muted-foreground">OCT</p>
                    </div>
                    <div>
                      <p className="font-medium text-sm">AI Workshop</p>
                      <p className="text-xs text-muted-foreground">14:00 - Engineering Building</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Your Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Events Attended</span>
                  <span className="text-2xl font-bold text-primary">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Upcoming</span>
                  <span className="text-2xl font-bold text-secondary">{upcomingEvents.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyEvents;
