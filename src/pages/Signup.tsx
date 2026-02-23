import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/hooks/use-toast";

const courses = ["BTech", "BCA", "BSc", "MCA", "MBA", "Diploma", "BA", "BCom", "Other"];

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [college, setCollege] = useState("");
  const [course, setCourse] = useState("");
  const [customCourse, setCustomCourse] = useState("");
  const [captcha, setCaptcha] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [linkedinLoading, setLinkedinLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGoogleAuth = () => {
    setGoogleLoading(true);
    setTimeout(() => {
      setGoogleLoading(false);
      toast({
        title: "Google Sign-In",
        description: "Google Sign-In (Coming Soon)",
        duration: 3000,
      });
    }, 500);
    // GOOGLE_AUTH_PLACEHOLDER
  };

  const handleLinkedinAuth = () => {
    setLinkedinLoading(true);
    setTimeout(() => {
      setLinkedinLoading(false);
      toast({
        title: "LinkedIn Sign-In",
        description: "LinkedIn Sign-In (Coming Soon)",
        duration: 3000,
      });
    }, 500);
    // LINKEDIN_AUTH_PLACEHOLDER
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captcha) return;
    // CAPTCHA_VERIFICATION_PLACEHOLDER
    signup({
      name,
      email,
      password,
      college,
      course: course === "Other" ? customCourse : course,
    });
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="font-display text-2xl">Create Your Account</CardTitle>
          <CardDescription>Start your AI interview practice journey</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Social Auth Section */}
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleAuth}
                disabled={googleLoading}
                className="w-full"
                aria-label="Continue with Google"
              >
                {googleLoading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-primary mr-2" />
                ) : (
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                )}
                Continue with Google
              </Button>
              <Button
                type="button"
                onClick={handleLinkedinAuth}
                disabled={linkedinLoading}
                className="w-full bg-[#0A66C2] hover:bg-[#004182]"
                aria-label="Continue with LinkedIn"
              >
                {linkedinLoading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-white mr-2" />
                ) : (
                  <svg className="h-5 w-5 mr-2 fill-white" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                  </svg>
                )}
                Continue with LinkedIn
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <Separator className="flex-1" />
              <span className="text-xs text-muted-foreground">or sign up with email</span>
              <Separator className="flex-1" />
            </div>
          </div>

          {/* Email Sign-Up Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="s-email">Email</Label>
              <Input id="s-email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="s-password">Password</Label>
              <Input id="s-password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="college">College Name</Label>
              <Input id="college" placeholder="Your college" value={college} onChange={(e) => setCollege(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>Course</Label>
              <Select value={course} onValueChange={setCourse}>
                <SelectTrigger><SelectValue placeholder="Select your course" /></SelectTrigger>
                <SelectContent>
                  {courses.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {course === "Other" && (
              <div className="space-y-2">
                <Label htmlFor="custom-course">Please specify your course / field</Label>
                <Input id="custom-course" placeholder="e.g. B.Des, Journalism" value={customCourse} onChange={(e) => setCustomCourse(e.target.value)} required />
              </div>
            )}
            <div className="flex items-center gap-2 rounded-lg border p-3">
              <Checkbox id="captcha" checked={captcha} onCheckedChange={(v) => setCaptcha(v === true)} />
              <Label htmlFor="captcha" className="text-sm cursor-pointer">I am not a robot</Label>
              <span className="ml-auto text-xs text-muted-foreground">CAPTCHA</span>
            </div>
            <Button type="submit" className="w-full" disabled={!captcha}>Sign Up</Button>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Log In</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
