export type EventCategory = 
  | "Academic" 
  | "Sports" 
  | "Career Services" 
  | "Social" 
  | "Arts & Culture" 
  | "Technical";

export type EventLocation = 
  | "Library" 
  | "Field House" 
  | "Student Center" 
  | "Main Hall" 
  | "Remote/Online" 
  | "Engineering Building"
  | "Arts Center";

export interface Event {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  location: EventLocation;
  date: Date;
  startTime: string;
  endTime: string;
  organizer: string;
  organizerContact: string;
  capacity?: number;
  registered?: number;
  accessibility: string[];
  prerequisites?: string[];
  imageUrl?: string;
  clubId?: string;
  isRsvped?: boolean;
}

export interface Club {
  id: string;
  name: string;
  rating: number;
  totalReviews: number;
  eventsHosted: number;
  category: EventCategory;
}
