import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, FileText, Building2, BarChart3, ArrowRight } from "lucide-react";

const actions = [
  { icon: Brain, title: "Start Interview", desc: "Practice AI-powered mock interviews", to: "/interview", color: "bg-primary/10 text-primary" },
  { icon: FileText, title: "Custom Test Builder", desc: "Create tests from specific skills & topics", to: "/custom-test", color: "bg-teal-light text-primary" },
  { icon: Building2, title: "Company-Wise Preparation", desc: "Prep for specific companies like TCS, Google", to: "/company-prep", color: "bg-secondary text-secondary-foreground" },
  { icon: BarChart3, title: "Analytics", desc: "View your progress & performance trends", to: "/analytics", color: "bg-primary/10 text-primary" },
];

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="container py-10 space-y-8">
      <div className="space-y-1">
        <h1 className="font-display text-3xl font-bold">Welcome, {user.name || "Student"} 👋</h1>
        <p className="text-muted-foreground">Ready to practice? Choose where you'd like to start.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((a) => (
          <Card key={a.title} className="group hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(a.to)}>
            <CardContent className="p-6 space-y-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${a.color}`}>
                <a.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display font-semibold">{a.title}</h3>
              <p className="text-sm text-muted-foreground">{a.desc}</p>
              <Button variant="ghost" size="sm" className="gap-1 p-0 text-primary group-hover:underline">
                Get Started <ArrowRight className="h-3 w-3" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
