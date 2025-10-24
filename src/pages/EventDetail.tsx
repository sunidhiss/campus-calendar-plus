import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, MapPin, Clock, Users, Mail, Phone, Accessibility, FileText } from "lucide-react";

const EventDetail = () => {
  const { id } = useParams();

  // Mock data - in real app, fetch based on id
  const event = {
    id: "1",
    title: "AI & Machine Learning Workshop",
    description: "Join us for an intensive hands-on workshop covering the fundamentals of AI and machine learning. This comprehensive session will take you through the latest developments in artificial intelligence, from basic concepts to advanced neural networks. You'll have the opportunity to work on real-world projects and learn from industry experts who are at the forefront of AI innovation.",
    category: "Technical",
    location: "Engineering Building - Room 301",
    date: new Date(),
    startTime: "14:00",
    endTime: "17:00",
    organizer: "Tech Club",
    organizerContact: "tech@university.edu",
    organizerPhone: "+1 (555) 123-4567",
    capacity: 50,
    registered: 32,
    accessibility: ["Wheelchair accessible", "Live captions available", "ASL interpreter on request"],
    prerequisites: ["Laptop required", "Basic Python knowledge recommended", "GitHub account"],
    imageUrl: null
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-[image:var(--gradient-hero)] text-primary-foreground py-6">
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
                  <Badge className="bg-[hsl(var(--category-technical))] text-white w-fit">
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

                {event.prerequisites && event.prerequisites.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      Prerequisites
                    </h3>
                    <ul className="space-y-2">
                      {event.prerequisites.map((prereq, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-muted-foreground">{prereq}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Accessibility className="w-5 h-5 text-primary" />
                    Accessibility
                  </h3>
                  <ul className="space-y-2">
                    {event.accessibility.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
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
                      {event.date.toLocaleDateString('en-US', { 
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
                      {event.startTime} - {event.endTime}
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

                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Capacity</p>
                    <p className="text-sm text-muted-foreground">
                      {event.registered} / {event.capacity} registered
                    </p>
                    <div className="mt-2 w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary rounded-full h-2 transition-all"
                        style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 mt-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  RSVP for This Event
                </Button>

                <Button variant="outline" className="w-full">
                  Add to Calendar
                </Button>
              </CardContent>
            </Card>

            {/* Organizer Card */}
            <Card>
              <CardHeader>
                <CardTitle>Organizer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-medium text-lg">{event.organizer}</p>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 text-primary" />
                  <a href={`mailto:${event.organizerContact}`} className="hover:text-primary">
                    {event.organizerContact}
                  </a>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4 text-primary" />
                  <a href={`tel:${event.organizerPhone}`} className="hover:text-primary">
                    {event.organizerPhone}
                  </a>
                </div>

                <Button variant="outline" className="w-full mt-4">
                  Contact Organizer
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
