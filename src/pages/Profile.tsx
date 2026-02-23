import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const allSkills = ["DSA", "OOP", "DBMS", "OS", "CN", "React", "Node.js", "Python", "Java", "C++", "SQL", "HTML/CSS", "JavaScript", "System Design", "HR", "Communication"];

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [college, setCollege] = useState(user?.college || "");
  const [course, setCourse] = useState(user?.course || "");
  const [gradYear, setGradYear] = useState(user?.graduationYear || "");
  const [interviewType, setInterviewType] = useState(user?.interviewType || "");
  const [skills, setSkills] = useState<string[]>(user?.skillDomains || []);
  const [experience, setExperience] = useState(user?.experienceLevel || "");

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const toggleSkill = (s: string) => {
    setSkills((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  };

  const handleSave = () => {
    updateProfile({ name, college, course, graduationYear: gradYear, interviewType, skillDomains: skills, experienceLevel: experience });
  };

  if (!user) return null;

  return (
    <div className="container max-w-2xl py-10">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-display text-2xl">Your Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>College</Label>
              <Input value={college} onChange={(e) => setCollege(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Course</Label>
              <Input value={course} onChange={(e) => setCourse(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Graduation Year</Label>
              <Input value={gradYear} onChange={(e) => setGradYear(e.target.value)} placeholder="e.g. 2026" />
            </div>
            <div className="space-y-2">
              <Label>Preferred Interview Type</Label>
              <Select value={interviewType} onValueChange={setInterviewType}>
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technical">Technical</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                  <SelectItem value="Both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Experience Level</Label>
              <Select value={experience} onValueChange={setExperience}>
                <SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fresher">Fresher</SelectItem>
                  <SelectItem value="1-2 Years">1-2 Years</SelectItem>
                  <SelectItem value="3+ Years">3+ Years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Skill Domains</Label>
            <div className="flex flex-wrap gap-2">
              {allSkills.map((s) => (
                <Badge key={s} variant={skills.includes(s) ? "default" : "outline"} className="cursor-pointer" onClick={() => toggleSkill(s)}>
                  {s} {skills.includes(s) && <X className="ml-1 h-3 w-3" />}
                </Badge>
              ))}
            </div>
          </div>
          <Button onClick={handleSave} className="w-full">Save Profile</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
