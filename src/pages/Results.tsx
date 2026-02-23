import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";

interface AttemptData {
  interviewType: string;
  totalQuestions: number;
  score: number;
  accuracy: number;
  topicScores: Record<string, { correct: number; total: number }>;
  questions: Array<{ q: string; topic: string; type: string }>;
  timestamp: string;
}

const Results = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [lastAttempt, setLastAttempt] = useState<AttemptData | null>(null);
  const [topicPerformance, setTopicPerformance] = useState<Array<{ name: string; score: number; status: string; count: number }>>([]);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  useEffect(() => {
    // Fetch the latest attempt from localStorage
    try {
      const attempts = JSON.parse(localStorage.getItem("interview_attempts") || "[]");
      if (attempts.length > 0) {
        const latest = attempts[attempts.length - 1];
        setLastAttempt(latest);

        // Calculate topic-wise performance
        const topicMap: Record<string, { correct: number; total: number }> = {};
        
        // Count questions by topic
        latest.questions.forEach((q: any) => {
          if (!topicMap[q.topic]) {
            topicMap[q.topic] = { correct: 0, total: 0 };
          }
          topicMap[q.topic].total += 1;
        });

        // Estimate correct answers based on overall accuracy
        const totalQuestions = latest.totalQuestions;
        const correctAnswers = latest.score;
        
        // Distribute correct answers proportionally across topics
        Object.keys(topicMap).forEach((topic) => {
          const topicPercentage = topicMap[topic].total / totalQuestions;
          topicMap[topic].correct = Math.round(correctAnswers * topicPercentage);
        });

        // Convert to display format
        const topicData = Object.entries(topicMap).map(([name, data]) => ({
          name,
          score: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
          status: Math.round((data.correct / data.total) * 100) >= 70 ? "strong" : Math.round((data.correct / data.total) * 100) >= 50 ? "average" : "weak",
          count: data.total,
        }));

        setTopicPerformance(topicData);
      }
    } catch (e) {
      console.error("Error fetching attempt data:", e);
    }
  }, []);

  if (!user || !lastAttempt) return (
    <div className="container max-w-4xl py-10">
      <p className="text-muted-foreground">Loading results...</p>
    </div>
  );

  return (
    <div className="container max-w-4xl py-10 space-y-8">
      <h1 className="font-display text-3xl font-bold">Results & Analysis</h1>

      {/* Overall Score */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold">Performance Summary</h2>
            <div className="text-3xl font-display font-bold text-primary">{lastAttempt.accuracy}%</div>
          </div>
          <Progress value={lastAttempt.accuracy} className="h-3" />
          <div className="text-sm text-muted-foreground pt-2">
            Score: {lastAttempt.score} out of {lastAttempt.totalQuestions} questions correct
          </div>
        </CardContent>
      </Card>

      {/* Topic-wise */}
      <Card>
        <CardHeader><CardTitle>Topic-Wise Performance</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {topicPerformance.length > 0 ? (
            topicPerformance.map((t) => (
              <div key={t.name} className="flex items-center gap-3">
                {t.status === "strong" ? <CheckCircle2 className="h-5 w-5 text-success" /> : t.status === "weak" ? <AlertTriangle className="h-5 w-5 text-warning" /> : <TrendingUp className="h-5 w-5 text-primary" />}
                <span className="w-40 text-sm font-medium">{t.name}</span>
                <Progress value={t.score} className="h-2 flex-1" />
                <span className="text-sm text-muted-foreground w-32 text-right">{t.score}% ({t.count} questions)</span>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">No topic data available</p>
          )}
        </CardContent>
      </Card>

      {/* Stats */}
      <Card>
        <CardHeader><CardTitle>Interview Details</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Interview Type</p>
            <p className="font-semibold">{lastAttempt.interviewType}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Questions</p>
            <p className="font-semibold">{lastAttempt.totalQuestions}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Correct Answers</p>
            <p className="font-semibold">{lastAttempt.score}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Attempted On</p>
            <p className="font-semibold text-sm">{new Date(lastAttempt.timestamp).toLocaleDateString()}</p>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1" onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </Button>
        <Button className="flex-1 gap-2" onClick={() => navigate("/interview")}>
          Practice Again <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Results;
