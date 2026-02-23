import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Brain, FileText, Building2, BarChart3, CheckCircle2, Sparkles, Target, BookOpen } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="container py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6 animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
              <Target className="h-4 w-4" /> AI Interview Practice, Reimagined
            </span>
            <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Crack Interviews with{" "}
              <span className="text-primary">Smart AI Practice</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Practice interviews, create custom tests, learn weak topics, and prepare company-wise with AI guidance.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" onClick={() => navigate("/signup")} className="gap-2">
                Start Free Interview <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/login")}>
                Log In
              </Button>
            </div>
            <p className="text-sm text-muted-foreground flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              Trusted by students preparing for their first interviews
            </p>
          </div>

          {/* Dashboard Preview */}
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Card className="shadow-xl border-2 border-border/60">
              <CardContent className="p-6 space-y-5">
                <div className="flex items-center gap-2 text-lg font-display font-semibold">
                  <span>👋</span> Welcome to Dimless IntervoAI
                </div>
                <p className="text-sm text-muted-foreground">Get started with your interview prep journey</p>

                <div className="grid gap-3">
                  {[
                    { icon: Brain, label: "Practice Interview", desc: "AI-powered mock interviews", color: "bg-primary/10 text-primary" },
                    { icon: FileText, label: "Create Custom Test", desc: "Build tests from your skills", color: "bg-teal-light text-primary" },
                    { icon: Building2, label: "Company-Wise Preparation", desc: "Prep for specific companies", color: "bg-secondary text-secondary-foreground" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3 rounded-xl border p-3 hover:shadow-md transition-shadow cursor-pointer">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.color}`}>
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{item.label}</div>
                        <div className="text-xs text-muted-foreground">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button className="w-full gap-2" onClick={() => navigate("/signup")}>
                  Start Your First Practice <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-muted/30 py-16 md:py-24">
        <div className="container space-y-12">
          <div className="text-center space-y-3">
            <h2 className="font-display text-3xl font-bold md:text-4xl">Everything You Need to <span className="text-primary">Ace Interviews</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">From AI-powered mock interviews to company-specific preparation, we've got you covered.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Brain, title: "AI Interviews", desc: "Practice with intelligent questions tailored to your level and goals." },
              { icon: FileText, title: "Custom Tests", desc: "Build tests from specific domains, topics, and difficulty levels." },
              { icon: Building2, title: "Company Prep", desc: "Prepare for TCS, Infosys, Amazon, Google & more with targeted questions." },
              { icon: BarChart3, title: "Smart Analytics", desc: "Track progress, identify weak areas, and get actionable insights." },
            ].map((f) => (
              <Card key={f.title} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <f.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display font-semibold text-lg">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="container py-16 md:py-24">
        <div className="text-center space-y-3 mb-12">
          <h2 className="font-display text-3xl font-bold md:text-4xl">How It <span className="text-primary">Works</span></h2>
          <p className="text-muted-foreground">Three simple steps to interview confidence</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { step: "01", icon: Sparkles, title: "Choose Your Mode", desc: "Pick AI Interview, Custom Test, or Company-Wise Prep based on your needs." },
            { step: "02", icon: Brain, title: "Practice & Learn", desc: "Answer questions, get instant feedback, and learn weak topics on the spot." },
            { step: "03", icon: BookOpen, title: "Review & Improve", desc: "Analyze your results, track progress, and level up your interview skills." },
          ].map((s) => (
            <div key={s.step} className="text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-display text-xl font-bold">
                {s.step}
              </div>
              <h3 className="font-display text-lg font-semibold">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container text-center space-y-6">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Ready to Start Practicing?</h2>
          <p className="text-primary-foreground/80 max-w-lg mx-auto">Join students who are building confidence and cracking interviews with smart AI practice.</p>
          <Button size="lg" variant="secondary" onClick={() => navigate("/signup")} className="gap-2">
            Get Started Free <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
