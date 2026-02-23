import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Timer, Mic, BookOpen, CheckCircle2, AlertCircle, ChevronRight } from "lucide-react";

const mockQuestions = [
  { q: "What is the difference between a stack and a queue?", options: ["Stack is FIFO, Queue is LIFO", "Stack is LIFO, Queue is FIFO", "Both are LIFO", "Both are FIFO"], correct: 1, topic: "Data Structures" },
  { q: "Which of the following is NOT an OOP principle?", options: ["Encapsulation", "Inheritance", "Compilation", "Polymorphism"], correct: 2, topic: "OOP" },
  { q: "What does SQL stand for?", options: ["Structured Query Language", "Simple Query Language", "Standard Query Language", "Sequential Query Language"], correct: 0, topic: "Databases" },
  { q: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], correct: 1, topic: "DSA" },
  { q: "Which HTTP method is idempotent?", options: ["POST", "GET", "PATCH", "None of the above"], correct: 1, topic: "Web Development" },
];

const learningContent: Record<string, { explanation: string; keyPoints: string[]; examples: string; mistakes: string; tips: string }> = {
  "Data Structures": { explanation: "Stacks follow Last-In-First-Out (LIFO) while Queues follow First-In-First-Out (FIFO). These are fundamental linear data structures.", keyPoints: ["Stack: push/pop from top", "Queue: enqueue at rear, dequeue from front", "Both have O(1) insert/delete"], examples: "Stack: undo/redo, browser history. Queue: task scheduling, BFS.", mistakes: "Confusing LIFO with FIFO ordering.", tips: "Always clarify with a real-world example in interviews." },
  "OOP": { explanation: "The four pillars of OOP are Encapsulation, Abstraction, Inheritance, and Polymorphism. Compilation is a build process, not an OOP concept.", keyPoints: ["Encapsulation: bundling data + methods", "Inheritance: parent-child class relationships", "Polymorphism: many forms of a method"], examples: "Polymorphism: method overloading/overriding in Java.", mistakes: "Listing compilation or interpretation as OOP principles.", tips: "Be ready to explain each pillar with a code example." },
  "Databases": { explanation: "SQL stands for Structured Query Language. It is used to manage and query relational databases.", keyPoints: ["DDL: CREATE, ALTER, DROP", "DML: SELECT, INSERT, UPDATE, DELETE", "Used in MySQL, PostgreSQL, Oracle"], examples: "SELECT * FROM users WHERE age > 25;", mistakes: "Confusing SQL with NoSQL terminology.", tips: "Know the difference between SQL and NoSQL for interviews." },
  "DSA": { explanation: "Binary search works on sorted arrays by repeatedly dividing the search interval in half, achieving O(log n) time complexity.", keyPoints: ["Array must be sorted", "Compare middle element", "Eliminate half each step"], examples: "Searching for 7 in [1,3,5,7,9] → found at index 3.", mistakes: "Applying binary search on unsorted arrays.", tips: "Mention edge cases like empty array or single element." },
  "Web Development": { explanation: "GET and PUT are idempotent HTTP methods — calling them multiple times produces the same result. POST is not idempotent.", keyPoints: ["GET: retrieve data", "POST: create new resource", "PUT: replace resource (idempotent)"], examples: "GET /users/1 always returns the same user.", mistakes: "Saying POST is idempotent.", tips: "Explain idempotency with a practical API example." },
};

type Phase = "config" | "quiz" | "done";

const Interview = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("config");
  const [interviewType, setInterviewType] = useState("Technical");
  const [questionCount, setQuestionCount] = useState("5");
  const [duration, setDuration] = useState("10");
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [customAnswer, setCustomAnswer] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [showLearn, setShowLearn] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => { if (!user) navigate("/login"); }, [user, navigate]);

  useEffect(() => {
    if (phase !== "quiz") return;
    if (timeLeft <= 0) return;
    const t = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearInterval(t);
  }, [phase, timeLeft]);

  const startQuiz = () => {
    setPhase("quiz");
    setCurrentQ(0);
    setScore(0);
    setTimeLeft(parseInt(duration) * 60);
  };

  const submitAnswer = () => {
    const isCorrect = !useCustom && selected === mockQuestions[currentQ].correct;
    if (isCorrect) setScore((s) => s + 1);
    setAnswered(true);
  };

  const nextQuestion = () => {
    if (currentQ + 1 >= mockQuestions.length) {
      setPhase("done");
      navigate("/results");
      return;
    }
    setCurrentQ((c) => c + 1);
    setSelected(null);
    setCustomAnswer("");
    setUseCustom(false);
    setAnswered(false);
    setShowLearn(false);
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const q = mockQuestions[currentQ];

  if (!user) return null;

  if (phase === "config") {
    return (
      <div className="container max-w-xl py-10 space-y-6">
        <h1 className="font-display text-3xl font-bold">AI Interview Practice</h1>
        <p className="text-muted-foreground">Configure your interview session</p>
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label>Interview Type</Label>
              <Select value={interviewType} onValueChange={setInterviewType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technical">Technical</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Duration (minutes)</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 min</SelectItem>
                  <SelectItem value="15">15 min</SelectItem>
                  <SelectItem value="20">20 min (Custom)</SelectItem>
                  <SelectItem value="30">30 min (Custom)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Number of Questions</Label>
              <Input type="number" min={5} max={30} value={questionCount} onChange={(e) => setQuestionCount(e.target.value)} />
            </div>
            <Button className="w-full gap-2" onClick={startQuiz}>
              Start AI Interview <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Quiz phase
  return (
    <div className="container max-w-2xl py-10 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">Question {currentQ + 1} of {mockQuestions.length}</div>
        <div className="flex items-center gap-2 text-sm font-medium">
          <Timer className="h-4 w-4 text-primary" /> {formatTime(timeLeft)}
        </div>
      </div>
      <Progress value={((currentQ + 1) / mockQuestions.length) * 100} className="h-2" />

      {/* Question */}
      <Card>
        <CardContent className="p-6 space-y-5">
          <h2 className="font-display text-lg font-semibold">{q.q}</h2>

          {!useCustom ? (
            <div className="space-y-2">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => !answered && setSelected(i)}
                  className={`w-full text-left rounded-lg border p-3 text-sm transition-colors ${
                    answered
                      ? i === q.correct ? "border-success bg-success/10" : i === selected ? "border-destructive bg-destructive/10" : ""
                      : selected === i ? "border-primary bg-primary/5" : "hover:border-primary/50"
                  }`}
                  disabled={answered}
                >
                  {opt}
                </button>
              ))}
              {!answered && (
                <button onClick={() => setUseCustom(true)} className="w-full text-left rounded-lg border border-dashed p-3 text-sm text-muted-foreground hover:border-primary/50 transition-colors">
                  ✏️ Write Your Own Answer
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <Textarea placeholder="Type your answer here..." value={customAnswer} onChange={(e) => setCustomAnswer(e.target.value)} disabled={answered} />
              {!answered && (
                <button onClick={() => setUseCustom(false)} className="text-xs text-primary hover:underline">← Back to MCQ options</button>
              )}
            </div>
          )}

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" title="Mic (UI only)"><Mic className="h-5 w-5 text-muted-foreground" /></Button>
            {!answered ? (
              <Button className="ml-auto" onClick={submitAnswer} disabled={selected === null && !customAnswer}>Submit Answer</Button>
            ) : (
              <Button className="ml-auto gap-1" onClick={nextQuestion}>
                Next <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Feedback strip */}
      {answered && (
        <Card className={`border-l-4 ${!useCustom && selected === q.correct ? "border-l-success" : "border-l-warning"}`}>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {!useCustom && selected === q.correct ? (
                <><CheckCircle2 className="h-5 w-5 text-success" /><span className="font-medium text-success">Correct!</span></>
              ) : (
                <><AlertCircle className="h-5 w-5 text-warning" /><span className="font-medium text-warning">Needs Improvement</span></>
              )}
              <span className="text-sm text-muted-foreground ml-2">— AI_EVALUATION_PLACEHOLDER</span>
            </div>
            <Button variant="outline" size="sm" className="gap-1" onClick={() => setShowLearn(!showLearn)}>
              <BookOpen className="h-4 w-4" /> Learn This Topic
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Learning panel */}
      {showLearn && learningContent[q.topic] && (
        <Card>
          <CardHeader><CardTitle className="font-display text-lg">📘 {q.topic}</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <h4 className="font-semibold mb-1">Explanation</h4>
              <p className="text-muted-foreground">{learningContent[q.topic].explanation}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Key Points</h4>
              <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                {learningContent[q.topic].keyPoints.map((kp, i) => <li key={i}>{kp}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Examples</h4>
              <p className="text-muted-foreground">{learningContent[q.topic].examples}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Common Mistakes</h4>
              <p className="text-muted-foreground">{learningContent[q.topic].mistakes}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Interview Tips</h4>
              <p className="text-muted-foreground">{learningContent[q.topic].tips}</p>
            </div>
            <p className="text-xs text-muted-foreground italic">AI_LEARNING_CONTENT_PLACEHOLDER</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Interview;
