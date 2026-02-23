import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ArrowRight, X } from "lucide-react";

const domainTopics: Record<string, string[]> = {
  Programming: ["C", "C++", "Java", "Python"],
  Frontend: ["HTML", "CSS", "JavaScript", "React"],
  Backend: ["Node.js", "Spring Boot", "Django"],
  Databases: ["MySQL", "MongoDB"],
  "Core CS": ["DSA", "OOP", "DBMS", "OS", "CN"],
  "Non-Technical": ["HR", "Communication", "Behavioral"],
};

const CustomTest = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState("Medium");
  const [questionType, setQuestionType] = useState("MCQ");

  useEffect(() => { if (!user) navigate("/login"); }, [user, navigate]);

  const toggleDomain = (d: string) => {
    setSelectedDomains((prev) => prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]);
  };

  const toggleTopic = (t: string) => {
    setSelectedTopics((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);
  };

  const availableTopics = selectedDomains.flatMap((d) => domainTopics[d] || []);

  const handleGenerate = () => {
    // AI_CUSTOM_TEST_GENERATOR_PLACEHOLDER
    navigate("/interview");
  };

  if (!user) return null;

  return (
    <div className="container max-w-xl py-10 space-y-6">
      <h1 className="font-display text-3xl font-bold">Create Your Custom Test</h1>
      <p className="text-muted-foreground">Build a personalized test based on your skills</p>

      {/* Progress */}
      <div className="flex gap-2">
        {[1, 2, 3].map((s) => (
          <div key={s} className={`h-1.5 flex-1 rounded-full ${step >= s ? "bg-primary" : "bg-muted"}`} />
        ))}
      </div>

      {step === 1 && (
        <Card>
          <CardHeader><CardTitle className="text-lg">Step 1: Select Domains / Skills</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {Object.keys(domainTopics).map((d) => (
                <Badge key={d} variant={selectedDomains.includes(d) ? "default" : "outline"} className="cursor-pointer text-sm py-1.5 px-3" onClick={() => toggleDomain(d)}>
                  {d} {selectedDomains.includes(d) && <X className="ml-1 h-3 w-3" />}
                </Badge>
              ))}
            </div>
            <Button className="w-full" disabled={selectedDomains.length === 0} onClick={() => setStep(2)}>
              Next <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader><CardTitle className="text-lg">Step 2: Select Topics</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {availableTopics.map((t) => (
                <Badge key={t} variant={selectedTopics.includes(t) ? "default" : "outline"} className="cursor-pointer text-sm py-1.5 px-3" onClick={() => toggleTopic(t)}>
                  {t} {selectedTopics.includes(t) && <X className="ml-1 h-3 w-3" />}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button className="flex-1" disabled={selectedTopics.length === 0} onClick={() => setStep(3)}>
                Next <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader><CardTitle className="text-lg">Step 3: Test Configuration</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Difficulty</Label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
              <Button className="flex-1 gap-2" onClick={handleGenerate}>
                Generate Test with AI <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CustomTest;
