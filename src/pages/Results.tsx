import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, TrendingUp, AlertTriangle, CheckCircle2, BookOpen } from "lucide-react";

const mockResults = {
  overall: 72,
  topics: [
    { name: "Data Structures", score: 80, status: "strong" },
    { name: "OOP", score: 60, status: "weak" },
    { name: "Databases", score: 90, status: "strong" },
    { name: "DSA", score: 55, status: "weak" },
    { name: "Web Development", score: 75, status: "average" },
  ],
  faqs: [
    { question: "Explain OOP concepts", companies: ["TCS", "Infosys", "Wipro"] },
    { question: "Difference between SQL and NoSQL", companies: ["Amazon", "Cognizant"] },
    { question: "What is polymorphism?", companies: ["TCS", "Accenture"] },
    { question: "Explain binary search", companies: ["Google", "Amazon", "Microsoft"] },
  ],
  companyAnalysis: [
    { company: "TCS", topics: "OOP, DBMS, Arrays" },
    { company: "Amazon", topics: "DSA, System Design, Trees" },
    { company: "Infosys", topics: "OOP, SQL, Aptitude" },
    { company: "Google", topics: "DSA, Graphs, Dynamic Programming" },
  ],
};

const Results = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { if (!user) navigate("/login"); }, [user, navigate]);
  if (!user) return null;

  return (
    <div className="container max-w-4xl py-10 space-y-8">
      <h1 className="font-display text-3xl font-bold">Results & Analysis</h1>

      {/* Overall Score */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold">Performance Summary</h2>
            <div className="text-3xl font-display font-bold text-primary">{mockResults.overall}%</div>
          </div>
          <Progress value={mockResults.overall} className="h-3" />
        </CardContent>
      </Card>

      {/* Topic-wise */}
      <Card>
        <CardHeader><CardTitle>Topic-Wise Performance</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {mockResults.topics.map((t) => (
            <div key={t.name} className="flex items-center gap-3">
              {t.status === "strong" ? <CheckCircle2 className="h-5 w-5 text-success" /> : t.status === "weak" ? <AlertTriangle className="h-5 w-5 text-warning" /> : <TrendingUp className="h-5 w-5 text-primary" />}
              <span className="w-40 text-sm font-medium">{t.name}</span>
              <Progress value={t.score} className="h-2 flex-1" />
              <span className="text-sm text-muted-foreground w-10 text-right">{t.score}%</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* FAQs */}
      <Card>
        <CardHeader><CardTitle>Frequently Asked Questions (Company-Wise)</CardTitle></CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          {mockResults.faqs.map((f, i) => (
            <div key={i} className="rounded-lg border p-3 space-y-2">
              <p className="text-sm font-medium">"{f.question}"</p>
              <div className="flex flex-wrap gap-1">
                {f.companies.map((c) => <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>)}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Company Analysis Table */}
      <Card>
        <CardHeader><CardTitle>Company-Wise Analysis</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-semibold">Company</th>
                  <th className="text-left p-2 font-semibold">Frequently Asked Topics</th>
                </tr>
              </thead>
              <tbody>
                {mockResults.companyAnalysis.map((ca) => (
                  <tr key={ca.company} className="border-b">
                    <td className="p-2 font-medium">{ca.company}</td>
                    <td className="p-2 text-muted-foreground">{ca.topics}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-3 italic">COMPANY_QUESTION_ANALYTICS_PLACEHOLDER</p>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader><CardTitle>Recommendations</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-2">
            <BookOpen className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium">Topics to Revise</p>
              <p className="text-sm text-muted-foreground">OOP, DSA — focus on weak areas</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <ArrowRight className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium">Suggested Next Test</p>
              <p className="text-sm text-muted-foreground">Medium difficulty DSA test with 15 questions</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium">Company Readiness</p>
              <p className="text-sm text-muted-foreground">TCS: 70% ready • Amazon: 50% ready • Google: 45% ready</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button className="gap-2" onClick={() => navigate("/dashboard")}>Back to Dashboard <ArrowRight className="h-4 w-4" /></Button>
    </div>
  );
};

export default Results;
