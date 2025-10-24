import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trophy, Star, TrendingUp, Calendar } from "lucide-react";

const Leaderboard = () => {
  const clubs = [
    {
      id: "1",
      name: "Tech Club",
      rating: 4.8,
      totalReviews: 156,
      eventsHosted: 24,
      category: "Technical",
      trend: "+0.3"
    },
    {
      id: "2",
      name: "Fine Arts Society",
      rating: 4.7,
      totalReviews: 132,
      eventsHosted: 31,
      category: "Arts & Culture",
      trend: "+0.2"
    },
    {
      id: "3",
      name: "Athletics Department",
      rating: 4.6,
      totalReviews: 198,
      eventsHosted: 42,
      category: "Sports",
      trend: "+0.1"
    },
    {
      id: "4",
      name: "Career Services",
      rating: 4.5,
      totalReviews: 210,
      eventsHosted: 18,
      category: "Career Services",
      trend: "0.0"
    },
    {
      id: "5",
      name: "International Students Association",
      rating: 4.4,
      totalReviews: 89,
      eventsHosted: 15,
      category: "Social",
      trend: "+0.4"
    }
  ];

  const getRankBadge = (index: number) => {
    if (index === 0) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (index === 1) return <Trophy className="w-5 h-5 text-gray-400" />;
    if (index === 2) return <Trophy className="w-5 h-5 text-amber-600" />;
    return <span className="text-muted-foreground font-semibold">{index + 1}</span>;
  };

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
          <div className="flex items-center gap-3">
            <Trophy className="w-10 h-10" />
            <div>
              <h1 className="text-4xl font-bold">Club Leaderboard</h1>
              <p className="text-white/90 mt-1">Top performing clubs based on student reviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Info Card */}
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">
                Rankings are based on average student ratings, total reviews, and event quality. 
                Clubs earn points for hosting successful events and receiving positive feedback.
              </p>
            </CardContent>
          </Card>

          {/* Leaderboard */}
          <div className="space-y-4">
            {clubs.map((club, index) => (
              <Card 
                key={club.id} 
                className={`transition-all hover:shadow-lg ${
                  index === 0 ? 'border-yellow-500/30 bg-gradient-to-r from-yellow-500/5 to-transparent' : ''
                } ${
                  index === 1 ? 'border-gray-400/30 bg-gradient-to-r from-gray-400/5 to-transparent' : ''
                } ${
                  index === 2 ? 'border-amber-600/30 bg-gradient-to-r from-amber-600/5 to-transparent' : ''
                }`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted">
                      {getRankBadge(index)}
                    </div>

                    {/* Club Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-foreground">{club.name}</h3>
                          <Badge variant="outline" className="mt-1">
                            {club.category}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 bg-secondary/10 px-3 py-1 rounded-full">
                          <TrendingUp className="w-4 h-4 text-secondary" />
                          <span className="text-sm font-semibold text-secondary">{club.trend}</span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <div>
                            <p className="text-lg font-bold text-foreground">{club.rating}</p>
                            <p className="text-xs text-muted-foreground">{club.totalReviews} reviews</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          <div>
                            <p className="text-lg font-bold text-foreground">{club.eventsHosted}</p>
                            <p className="text-xs text-muted-foreground">Events hosted</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-end">
                          <Button variant="outline" size="sm">
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How Rankings Work</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <Star className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Student Reviews</p>
                  <p className="text-xs text-muted-foreground">
                    Average rating based on post-event feedback from attendees
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Event Quality</p>
                  <p className="text-xs text-muted-foreground">
                    Consistency in hosting well-organized, engaging events
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Trend Indicator</p>
                  <p className="text-xs text-muted-foreground">
                    Recent performance change compared to previous month
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
