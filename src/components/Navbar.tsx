import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";
import { Calendar, LogOut, Shield, User as UserIcon } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminRole(session.user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminRole(session.user.id);
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminRole = async (userId: string) => {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .single();

    setIsAdmin(data?.role === "admin");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Calendar className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Campus Events</span>
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to="/my-events">
                  <Button variant="ghost" size="sm">
                    <UserIcon className="mr-2 h-4 w-4" />
                    My Events
                  </Button>
                </Link>
                <Link to="/submit-event">
                  <Button variant="ghost" size="sm">
                    Submit Event
                  </Button>
                </Link>
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="ghost" size="sm">
                      <Shield className="mr-2 h-4 w-4" />
                      Admin Panel
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="default" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
