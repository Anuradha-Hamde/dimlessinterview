import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, FileText, Building2, BarChart3, ArrowRight, Trophy } from "lucide-react";
import {
  getPerformanceData,
  calculatePerformanceLevel,
  getPerformanceInsight,
  getPerformanceEmoji,
} from "@/lib/performance";

const actions = [
  { icon: Brain, title: "Start Interview", desc: "Practice AI-powered mock interviews", to: "/interview", color: "bg-primary/10 text-primary" },
  { icon: FileText, title: "Custom Test Builder", desc: "Create tests from specific skills & topics", to: "/custom-test", color: "bg-teal-light text-primary" },
  { icon: Building2, title: "Company-Wise Preparation", desc: "Prep for specific companies like TCS, Google", to: "/company-prep", color: "bg-secondary text-secondary-foreground" },
  { icon: BarChart3, title: "Analytics", desc: "View your progress & performance trends", to: "/analytics", color: "bg-primary/10 text-primary" },
];

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const performanceData = getPerformanceData();
  const performanceLevel = calculatePerformanceLevel(performanceData);
  const insight = getPerformanceInsight(performanceData);
  const emoji = getPerformanceEmoji(performanceLevel);

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

      {/* Performance Level Card */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 hover:shadow-md transition-shadow">
        <CardContent className="p-6 space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-2xl">
              {emoji}
            </div>
            <div className="flex-1">
              <h2 className="font-display text-lg font-semibold">🏅 Your Performance Level</h2>
              <p className="text-sm text-primary font-medium">{performanceLevel}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {insight.split("**").map((text, i) => (
              i % 2 === 1 ? (
                <span key={i} className="font-semibold text-foreground">{text}</span>
              ) : (
                <span key={i}>{text}</span>
              )
            ))}
          </p>
          {performanceData && (
            <div className="flex gap-4 text-xs text-muted-foreground pt-2">
              <div>
                <span className="font-semibold text-foreground">{performanceData.interviewsCompleted}</span> interviews
              </div>
              <div>
                <span className="font-semibold text-foreground">{performanceData.testsCompleted}</span> tests
              </div>
              <div>
                <span className="font-semibold text-foreground">{Math.round(performanceData.averageAccuracy)}%</span> accuracy
              </div>
            </div>
          )}
        </CardContent>
      </Card>

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
