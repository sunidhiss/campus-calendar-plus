import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Send, Calendar } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const SubmitEvent = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Event submitted successfully! It will be reviewed by our admin team.");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-[image:var(--gradient-hero)] text-primary-foreground py-8">
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
                  <Input id="title" placeholder="e.g., AI & Machine Learning Workshop" required />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select required>
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
                    required 
                  />
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <Input id="date" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="start-time">Start Time *</Label>
                    <Input id="start-time" type="time" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-time">End Time *</Label>
                    <Input id="end-time" type="time" required />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Select required>
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
                    <Input id="organizer" placeholder="Club or Department name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact">Contact Email *</Label>
                    <Input id="contact" type="email" placeholder="contact@university.edu" required />
                  </div>
                </div>

                {/* Capacity */}
                <div className="space-y-2">
                  <Label htmlFor="capacity">Event Capacity</Label>
                  <Input id="capacity" type="number" placeholder="e.g., 50" />
                </div>

                {/* Prerequisites */}
                <div className="space-y-2">
                  <Label htmlFor="prerequisites">Prerequisites</Label>
                  <Textarea 
                    id="prerequisites" 
                    placeholder="List any requirements (e.g., laptop required, registration fee, etc.)"
                    rows={3}
                  />
                </div>

                {/* Accessibility */}
                <div className="space-y-2">
                  <Label htmlFor="accessibility">Accessibility Information</Label>
                  <Textarea 
                    id="accessibility" 
                    placeholder="Describe accessibility features (e.g., wheelchair accessible, ASL interpreter available)"
                    rows={3}
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
