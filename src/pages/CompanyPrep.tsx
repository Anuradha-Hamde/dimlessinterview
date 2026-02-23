import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ArrowRight } from "lucide-react";

const topCompanies = ["TCS", "Infosys", "Wipro", "Accenture", "Cognizant", "Capgemini", "Amazon", "Google", "Microsoft"];

const CompanyPrep = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [company, setCompany] = useState("");
  const [customCompany, setCustomCompany] = useState("");
  const [level, setLevel] = useState("");
  const [questionType, setQuestionType] = useState("MCQ");
  const [questionCount, setQuestionCount] = useState("10");
  const [duration, setDuration] = useState("15");

  useEffect(() => { if (!user) navigate("/login"); }, [user, navigate]);

  const selectedCompany = company === "Other" ? customCompany : company;

  const handleStart = () => {
    // AI_COMPANY_WISE_QUESTION_GENERATOR_PLACEHOLDER
    navigate("/interview");
  };

  if (!user) return null;

  return (
    <div className="container max-w-xl py-10 space-y-6">
      <h1 className="font-display text-3xl font-bold">Company-Wise Interview Preparation</h1>
      <p className="text-muted-foreground">Prepare for interviews at specific companies</p>

      <div className="flex gap-2">
        {[1, 2, 3].map((s) => (
          <div key={s} className={`h-1.5 flex-1 rounded-full ${step >= s ? "bg-primary" : "bg-muted"}`} />
        ))}
      </div>

      {step === 1 && (
        <Card>
          <CardHeader><CardTitle className="text-lg">Step 1: Select Company</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {topCompanies.map((c) => (
                <Badge key={c} variant={company === c ? "default" : "outline"} className="cursor-pointer text-sm py-1.5 px-3" onClick={() => setCompany(c)}>
                  {c}
                </Badge>
              ))}
              <Badge variant={company === "Other" ? "default" : "outline"} className="cursor-pointer text-sm py-1.5 px-3" onClick={() => setCompany("Other")}>
                Other
              </Badge>
            </div>
            {company === "Other" && (
              <Input placeholder="Enter company name" value={customCompany} onChange={(e) => setCustomCompany(e.target.value)} />
            )}
            <Button className="w-full" disabled={!selectedCompany} onClick={() => setStep(2)}>
              Next <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader><CardTitle className="text-lg">Step 2: Select Interview Level</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {["Basic", "Moderate", "Advanced"].map((l) => (
              <button key={l} onClick={() => setLevel(l)} className={`w-full text-left rounded-lg border p-4 transition-colors ${level === l ? "border-primary bg-primary/5" : "hover:border-primary/50"}`}>
                <div className="font-medium">{l === "Basic" ? "🟢" : l === "Moderate" ? "🟡" : "🔴"} {l} Level</div>
                <div className="text-sm text-muted-foreground">{l === "Basic" ? "Fundamentals & basics" : l === "Moderate" ? "Intermediate concepts" : "Advanced & system design"}</div>
              </button>
            ))}
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button className="flex-1" disabled={!level} onClick={() => setStep(3)}>Next <ArrowRight className="ml-1 h-4 w-4" /></Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader><CardTitle className="text-lg">Step 3: Test Configuration</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Question Type</Label>
              <Select value={questionType} onValueChange={setQuestionType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="MCQ">MCQ</SelectItem>
                  <SelectItem value="Written">Written</SelectItem>
                  <SelectItem value="Mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Number of Questions (5–30)</Label>
              <Input type="number" min={5} max={30} value={questionCount} onChange={(e) => setQuestionCount(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Duration (5–60 min)</Label>
              <Input type="number" min={5} max={60} value={duration} onChange={(e) => setDuration(e.target.value)} />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
              <Button className="flex-1 gap-2" onClick={handleStart}>
                Start {selectedCompany} Interview <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CompanyPrep;
