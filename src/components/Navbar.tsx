import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { Menu, X, LogOut } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Dmless IntervoAI" className="h-9 w-9 rounded-full object-cover" />
          <span className="font-display text-xl font-bold text-foreground">Dmless <span className="text-primary">IntervoAI</span></span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          {!user ? (
            <>
              <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
              <Link to="/custom-test" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Custom Tests</Link>
              <Link to="/company-prep" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Company Prep</Link>
              <Button variant="ghost" onClick={() => navigate("/login")}>Log In</Button>
              <Button onClick={() => navigate("/signup")}>Sign Up Free →</Button>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
              <Link to="/interview" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Interview</Link>
              <Link to="/custom-test" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Custom Test</Link>
              <Link to="/company-prep" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Company Prep</Link>
              <Link to="/analytics" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Analytics</Link>
              <Link to="/profile" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Profile</Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}><LogOut className="h-4 w-4 mr-1" /> Logout</Button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t bg-background p-4 md:hidden flex flex-col gap-3">
          {!user ? (
            <>
              <a href="#features" className="text-sm font-medium" onClick={() => setMenuOpen(false)}>Features</a>
              <a href="#how-it-works" className="text-sm font-medium" onClick={() => setMenuOpen(false)}>How It Works</a>
              <Button variant="ghost" onClick={() => { navigate("/login"); setMenuOpen(false); }}>Log In</Button>
              <Button onClick={() => { navigate("/signup"); setMenuOpen(false); }}>Sign Up Free →</Button>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="text-sm font-medium" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <Link to="/interview" className="text-sm font-medium" onClick={() => setMenuOpen(false)}>Interview</Link>
              <Link to="/custom-test" className="text-sm font-medium" onClick={() => setMenuOpen(false)}>Custom Test</Link>
              <Link to="/company-prep" className="text-sm font-medium" onClick={() => setMenuOpen(false)}>Company Prep</Link>
              <Link to="/analytics" className="text-sm font-medium" onClick={() => setMenuOpen(false)}>Analytics</Link>
              <Link to="/profile" className="text-sm font-medium" onClick={() => setMenuOpen(false)}>Profile</Link>
              <Button variant="ghost" size="sm" onClick={() => { handleLogout(); setMenuOpen(false); }}><LogOut className="h-4 w-4 mr-1" /> Logout</Button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
