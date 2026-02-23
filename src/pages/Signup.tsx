import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useAuth } from "@/lib/auth-context";

const courses = ["BTech", "BCA", "BSc", "MCA", "MBA", "Diploma", "BA", "BCom", "Other"];

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [college, setCollege] = useState("");
  const [course, setCourse] = useState("");
  const [customCourse, setCustomCourse] = useState("");
  const [captcha, setCaptcha] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

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
