import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Send, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { z } from "zod";

const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  date: z.string().min(1, "Date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  location: z.string().min(1, "Location is required"),
  organizer: z.string().min(2, "Organizer name is required"),
  contact: z.string().email("Invalid email address"),
  capacity: z.string().optional(),
});

const SubmitEvent = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    organizer: "",
    contact: "",
    capacity: "",
  });

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Please log in to submit an event");
        navigate("/auth");
      }
    };
    checkAuth();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validated = eventSchema.parse(formData);
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("You must be logged in to submit events");
      }

      const { error } = await supabase.from("events").insert({
        title: validated.title,
        category: validated.category,
        description: validated.description,
        event_date: validated.date,
        start_time: validated.startTime,
        end_time: validated.endTime,
        location: validated.location,
        organizer_name: validated.organizer,
        organizer_email: validated.contact,
        capacity: validated.capacity ? parseInt(validated.capacity) : null,
        status: "pending",
        submitted_by: session.user.id,
      });

      if (error) throw error;

      toast.success("Event submitted successfully! It will be reviewed by our admin team.");
      navigate("/");
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error(error.message || "Failed to submit event");
      }
    } finally {
      setIsSubmitting(false);
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
          <h1 className="text-4xl font-bold">Submit an Event</h1>
          <p className="text-white/90 mt-2">Share your event with the campus community</p>
        </div>
      </div>

      {/* Form */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Event Information</CardTitle>
              <CardDescription>
                Please provide detailed information about your event. All submissions will be reviewed by our admin team.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Event Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title *</Label>
                  <Input 
                    id="title" 
                    placeholder="e.g., AI & Machine Learning Workshop" 
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required 
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select 
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                    required
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="career">Career Services</SelectItem>
                      <SelectItem value="social">Social</SelectItem>
                      <SelectItem value="arts">Arts & Culture</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Event Description *</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Provide a detailed description of your event..."
                    rows={5}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required 
                  />
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <Input 
                      id="date" 
                      type="date" 
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="start-time">Start Time *</Label>
                    <Input 
                      id="start-time" 
                      type="time" 
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-time">End Time *</Label>
                    <Input 
                      id="end-time" 
                      type="time" 
                      value={formData.endTime}
                      onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                      required 
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Select 
                    value={formData.location}
                    onValueChange={(value) => setFormData({ ...formData, location: value })}
                    required
                  >
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Select a location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="library">Library</SelectItem>
                      <SelectItem value="field-house">Field House</SelectItem>
                      <SelectItem value="student-center">Student Center</SelectItem>
                      <SelectItem value="main-hall">Main Hall</SelectItem>
                      <SelectItem value="remote">Remote/Online</SelectItem>
                      <SelectItem value="engineering">Engineering Building</SelectItem>
                      <SelectItem value="arts-center">Arts Center</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Organizer Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="organizer">Organizer Name *</Label>
                    <Input 
                      id="organizer" 
                      placeholder="Club or Department name" 
                      value={formData.organizer}
                      onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact">Contact Email *</Label>
                    <Input 
                      id="contact" 
                      type="email" 
                      placeholder="contact@university.edu" 
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      required 
                    />
                  </div>
                </div>

                {/* Capacity */}
                <div className="space-y-2">
                  <Label htmlFor="capacity">Event Capacity</Label>
                  <Input 
                    id="capacity" 
                    type="number" 
                    placeholder="e.g., 50" 
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                  <Button 
                    type="submit" 
                    className="flex-1 bg-primary hover:bg-primary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Submitting...</>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit for Review
                      </>
                    )}
                  </Button>
                  <Link to="/" className="flex-1">
                    <Button type="button" variant="outline" className="w-full">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="mt-6 bg-muted/50">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="space-y-2">
                  <p className="font-medium">Submission Guidelines</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• All event submissions require admin approval</li>
                    <li>• Review process typically takes 1-2 business days</li>
                    <li>• The system will automatically check for scheduling conflicts</li>
                    <li>• You'll receive an email notification once your event is approved</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SubmitEvent;
