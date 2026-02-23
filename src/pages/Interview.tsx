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
import { ArrowRight, Timer, BookOpen, CheckCircle2, AlertCircle, ChevronRight, Play } from "lucide-react";

interface MCQQuestion {
  type: "mcq";
  q: string;
  options: string[];
  correct: number;
  topic: string;
}

interface CodingQuestion {
  type: "coding";
  q: string;
  problem: string;
  inputFormat: string;
  outputFormat: string;
  example: { input: string; output: string };
  topic: string;
}

type Question = MCQQuestion | CodingQuestion;

const mockQuestions: Question[] = [
  { type: "mcq", q: "What is the difference between a stack and a queue?", options: ["Stack is FIFO, Queue is LIFO", "Stack is LIFO, Queue is FIFO", "Both are LIFO", "Both are FIFO"], correct: 1, topic: "Data Structures" },
  { type: "coding", q: "Two Sum Problem", problem: "Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target. You may assume that each input has exactly one solution, and you may not use the same element twice.", inputFormat: "nums: array of integers, target: integer", outputFormat: "array of two integers (indices)", example: { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" }, topic: "DSA" },
  { type: "mcq", q: "Which of the following is NOT an OOP principle?", options: ["Encapsulation", "Inheritance", "Compilation", "Polymorphism"], correct: 2, topic: "OOP" },
  { type: "coding", q: "Reverse a String", problem: "Write a function that reverses a string. The input string is given as an array of characters s. You must do this by modifying the input array in-place with O(1) extra memory.", inputFormat: "s: array of characters", outputFormat: "reversed array (modified in place)", example: { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' }, topic: "DSA" },
  { type: "mcq", q: "What does SQL stand for?", options: ["Structured Query Language", "Simple Query Language", "Standard Query Language", "Sequential Query Language"], correct: 0, topic: "Databases" },
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
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [codeOutput, setCodeOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

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
    const currentQuestion = mockQuestions[currentQ];
    if (currentQuestion.type === "mcq") {
      const isCorrect = !useCustom && selected === currentQuestion.correct;
      if (isCorrect) setScore((s) => s + 1);
    } else if (currentQuestion.type === "coding") {
      // Save coding attempt to localStorage
      saveCodingAttempt(code, language);
      setScore((s) => s + 1); // Award point for attempt
    }
    setAnswered(true);
  };

  const saveCodingAttempt = (userCode: string, lang: string) => {
    try {
      const attempts = JSON.parse(localStorage.getItem("coding_attempts") || "[]");
      attempts.push({
        language: lang,
        code: userCode,
        status: "submitted",
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem("coding_attempts", JSON.stringify(attempts));
    } catch (e) {
      console.error("Error saving coding attempt:", e);
    }
  };

  const handleRunCode = () => {
    setIsRunning(true);
    // CODE_COMPILER_PLACEHOLDER
    setTimeout(() => {
      setCodeOutput("Output generated successfully\n\n[Program executed on sample test case]");
      setIsRunning(false);
    }, 1000);
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
    setCode("");
    setLanguage("python");
    setCodeOutput("");
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
          {q.type === "mcq" ? (
            <>
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
            </>
          ) : q.type === "coding" ? (
            <>
              <div>
                <h2 className="font-display text-lg font-semibold mb-2">💻 Coding Question</h2>
                <h3 className="font-semibold text-base">{q.q}</h3>
              </div>

              <div className="space-y-3 bg-muted/50 p-4 rounded-lg">
                <div>
                  <p className="text-sm font-medium mb-1">Problem:</p>
                  <p className="text-sm text-muted-foreground">{q.problem}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Input Format:</p>
                  <p className="text-sm text-muted-foreground font-mono">{q.inputFormat}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Output Format:</p>
                  <p className="text-sm text-muted-foreground font-mono">{q.outputFormat}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Example:</p>
                  <p className="text-sm text-muted-foreground font-mono">Input: {q.example.input}</p>
                  <p className="text-sm text-muted-foreground font-mono">Output: {q.example.output}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Language</Label>
                <Select value={language} onValueChange={setLanguage} disabled={answered}>
                  <SelectTrigger disabled={answered}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="c">C</SelectItem>
                    <SelectItem value="cpp">C++</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Code Editor</Label>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  disabled={answered}
                  placeholder={`Write your ${language} code here...`}
                  className="w-full h-48 p-3 bg-slate-900 text-white font-mono text-sm rounded-lg border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                />
              </div>

              {codeOutput && (
                <div className="bg-slate-900 text-white p-3 rounded-lg text-sm font-mono max-h-24 overflow-auto border border-primary/20">
                  <p className="text-xs text-gray-400 mb-2">Output:</p>
                  {codeOutput}
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" onClick={handleRunCode} disabled={answered || !code || isRunning} className="gap-2">
                  <Play className="h-4 w-4" />
                  {isRunning ? "Running..." : "Run Code"}
                </Button>
              </div>
            </>
          ) : null}

          <div className="flex items-center gap-2">
            {!answered ? (
              <Button 
                className="ml-auto" 
                onClick={submitAnswer} 
                disabled={q.type === "mcq" ? (selected === null && !customAnswer) : !code}
              >
                Submit Answer
              </Button>
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
        <Card className={`border-l-4 ${q.type === "mcq" && !useCustom && selected === q.correct ? "border-l-success" : "border-l-success"}`}>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {q.type === "mcq" ? (
                !useCustom && selected === q.correct ? (
                  <><CheckCircle2 className="h-5 w-5 text-success" /><span className="font-medium text-success">Correct!</span></>
                ) : (
                  <><AlertCircle className="h-5 w-5 text-warning" /><span className="font-medium text-warning">Needs Improvement</span></>
                )
              ) : (
                <><CheckCircle2 className="h-5 w-5 text-success" /><span className="font-medium text-success">✔ Logic Submitted</span></>
              )}
              <span className="text-sm text-muted-foreground ml-2">
                {q.type === "mcq" ? "— AI_EVALUATION_PLACEHOLDER" : "— AI_CODING_EVALUATION_PLACEHOLDER"}
              </span>
            </div>
            <Button variant="outline" size="sm" className="gap-1" onClick={() => setShowLearn(!showLearn)}>
              <BookOpen className="h-4 w-4" /> {q.type === "coding" ? "Optimal Solution" : "Learn This Topic"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Learning panel */}
      {showLearn && (
        <Card>
          <CardHeader><CardTitle className="font-display text-lg">📘 {q.topic} {q.type === "coding" ? "- Optimal Solution" : ""}</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-sm">
            {q.type === "mcq" && learningContent[q.topic] ? (
              <>
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
              </>
            ) : q.type === "coding" ? (
              <>
                <div>
                  <h4 className="font-semibold mb-1">Optimal Solution (Python)</h4>
                  <pre className="bg-slate-900 text-white p-3 rounded text-xs overflow-auto max-h-48 font-mono">
{`def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# Time: O(n), Space: O(n)`}
                  </pre>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Time & Space Complexity</h4>
                  <p className="text-muted-foreground">Time: O(n), Space: O(n) - Using hash map for single pass</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Common Mistakes</h4>
                  <p className="text-muted-foreground">Not using hash map, using nested loops (O(n²)). Forgetting to track indices.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Interview Tips</h4>
                  <p className="text-muted-foreground">Explain the hash map approach. Discuss trade-offs. Ask about edge cases.</p>
                </div>
              </>
            ) : null}
            <p className="text-xs text-muted-foreground italic">AI_CODING_LEARNING_PLACEHOLDER</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Interview;
