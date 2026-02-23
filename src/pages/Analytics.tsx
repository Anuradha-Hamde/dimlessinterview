import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, BookOpen, Target, BarChart3 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const trendData = [
  { test: "Test 1", score: 45 },
  { test: "Test 2", score: 55 },
  { test: "Test 3", score: 52 },
  { test: "Test 4", score: 68 },
  { test: "Test 5", score: 72 },
  { test: "Test 6", score: 78 },
];

const skillsData = [
  { skill: "DSA", before: 30, after: 55 },
  { skill: "OOP", before: 40, after: 60 },
  { skill: "DB", before: 50, after: 85 },
  { skill: "Web", before: 35, after: 70 },
  { skill: "CS", before: 45, after: 65 },
];

const learnedTopics = ["Binary Search", "Linked Lists", "SQL Joins", "REST APIs", "OOP Principles", "Normalization", "Stack & Queue", "HTTP Methods"];

const Analytics = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { if (!user) navigate("/login"); }, [user, navigate]);
  if (!user) return null;

  return (
    <div className="container max-w-4xl py-10 space-y-8">
      <h1 className="font-display text-3xl font-bold">Analytics</h1>
      <p className="text-muted-foreground">Track your interview preparation journey</p>

      {/* Performance Trends */}
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" /> Performance Trends</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="test" fontSize={12} stroke="hsl(var(--muted-foreground))" />
              <YAxis fontSize={12} stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))" }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Skills Improvement */}
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5 text-primary" /> Skills Improvement</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={skillsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="skill" fontSize={12} stroke="hsl(var(--muted-foreground))" />
              <YAxis fontSize={12} stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Bar dataKey="before" fill="hsl(var(--muted))" name="Before" radius={[4, 4, 0, 0]} />
              <Bar dataKey="after" fill="hsl(var(--primary))" name="After" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Learned Topics */}
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5 text-primary" /> Learned Topics</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {learnedTopics.map((t) => <Badge key={t} variant="secondary">{t}</Badge>)}
          </div>
        </CardContent>
      </Card>

      {/* Interview Readiness */}
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Target className="h-5 w-5 text-primary" /> Interview Readiness</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "Technical Readiness", value: 68 },
            { label: "HR Readiness", value: 75 },
            { label: "Overall Confidence", value: 65 },
          ].map((r) => (
            <div key={r.label} className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{r.label}</span>
                <span className="text-muted-foreground">{r.value}%</span>
              </div>
              <Progress value={r.value} className="h-2" />
            </div>
          ))}
          <p className="text-xs text-muted-foreground italic">ANALYTICS_PLACEHOLDER</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
