import { Event } from "@/types/event";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Users, Calendar, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

interface EventCardProps {
  event: Event;
}

const categoryColors = {
  "Academic": "bg-[hsl(var(--category-academic))] text-white",
  "Sports": "bg-[hsl(var(--category-sports))] text-white",
  "Career Services": "bg-[hsl(var(--category-career))] text-white",
  "Social": "bg-[hsl(var(--category-social))] text-white",
  "Arts & Culture": "bg-[hsl(var(--category-arts))] text-white",
  "Technical": "bg-[hsl(var(--category-technical))] text-white"
};

const EventCard = ({ event }: EventCardProps) => {
  const [isRsvped, setIsRsvped] = useState(event.isRsvped || false);

  const handleRsvp = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsRsvped(!isRsvped);
  };

  return (
    <Link to={`/event/${event.id}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/30 overflow-hidden h-full flex flex-col">
        <div className="h-2 bg-gradient-to-r from-primary via-primary-glow to-secondary" />
        
        <CardHeader className="space-y-3 flex-1">
          <div className="flex items-start justify-between gap-2">
            <Badge className={`${categoryColors[event.category]} hover:opacity-90`}>
              {event.category}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleRsvp}
            >
              <Heart 
                className={`w-4 h-4 transition-colors ${
                  isRsvped ? 'fill-secondary text-secondary' : 'text-muted-foreground'
                }`} 
              />
            </Button>
          </div>

          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {event.title}
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {event.description}
          </p>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{event.location}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4 text-primary" />
            <span>{event.startTime} - {event.endTime}</span>
          </div>

          {event.capacity && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4 text-primary" />
              <span>{event.registered || 0} / {event.capacity} registered</span>
            </div>
          )}

          <div className="pt-2">
            <p className="text-xs text-muted-foreground">
              Organized by <span className="font-medium text-foreground">{event.organizer}</span>
            </p>
          </div>
        </CardContent>

        <CardFooter>
          <Button 
            className={`w-full ${
              isRsvped 
                ? 'bg-secondary hover:bg-secondary/90' 
                : 'bg-primary hover:bg-primary/90'
            }`}
            onClick={handleRsvp}
          >
            <Calendar className="w-4 h-4 mr-2" />
            {isRsvped ? 'RSVP Confirmed' : 'RSVP Now'}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default EventCard;
