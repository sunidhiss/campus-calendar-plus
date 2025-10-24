import { Search, Filter, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onFilterClick: () => void;
}

const Hero = ({ searchQuery, setSearchQuery, onFilterClick }: HeroProps) => {
  return (
    <section className="relative bg-[image:var(--gradient-hero)] text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02ek0yNCA0NGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">University Events Hub</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Discover Campus Events
            <span className="block mt-2 bg-gradient-to-r from-white via-accent to-white bg-clip-text text-transparent animate-[pulse_3s_ease-in-out_infinite]">Never Miss a Moment</span>
          </h1>
          
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Stay connected with everything happening on campus. Find events, RSVP instantly, and sync with your calendar.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mt-8">
            <div className="flex gap-2 bg-white rounded-lg shadow-lg p-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search events, clubs, or organizers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-0 focus-visible:ring-0 bg-transparent text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={onFilterClick}
                className="text-foreground hover:bg-muted lg:hidden"
              >
                <Filter className="w-5 h-5" />
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Search
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-3 justify-center pt-4">
            <Link to="/my-events">
              <Button variant="secondary" size="sm" className="bg-secondary hover:bg-secondary/90">
                My Events
              </Button>
            </Link>
            <Link to="/submit-event">
              <Button variant="outline" size="sm" className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white">
                Submit Event
              </Button>
            </Link>
            <Link to="/leaderboard">
              <Button variant="outline" size="sm" className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white">
                Club Rankings
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
