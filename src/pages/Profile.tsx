import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Edit2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const allSkills = ["DSA", "OOP", "DBMS", "OS", "CN", "React", "Node.js", "Python", "Java", "C++", "SQL", "HTML/CSS", "JavaScript", "System Design", "HR", "Communication"];

const PROFILE_STORAGE_KEY = "dmless_user_profile";

interface ProfileData {
  name: string;
  college: string;
  course: string;
  graduationYear: string;
  preferredInterviewType: string;
  skills: string[];
  experienceLevel: string;
}

const getProfileData = (): ProfileData | null => {
  try {
    const data = localStorage.getItem(PROFILE_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
};

const saveProfileData = (data: ProfileData) => {
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    return false;
  }
};

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditMode, setIsEditMode] = useState(false);

  const savedProfile = getProfileData();

  const [name, setName] = useState(savedProfile?.name || user?.name || "");
  const [college, setCollege] = useState(savedProfile?.college || user?.college || "");
  const [course, setCourse] = useState(savedProfile?.course || user?.course || "");
  const [gradYear, setGradYear] = useState(savedProfile?.graduationYear || user?.graduationYear || "");
  const [interviewType, setInterviewType] = useState(savedProfile?.preferredInterviewType || user?.interviewType || "");
  const [skills, setSkills] = useState<string[]>(savedProfile?.skills || user?.skillDomains || []);
  const [experience, setExperience] = useState(savedProfile?.experienceLevel || user?.experienceLevel || "");

  // Store initial values for cancel functionality
  const [initialName, setInitialName] = useState(name);
  const [initialCollege, setInitialCollege] = useState(college);
  const [initialCourse, setInitialCourse] = useState(course);
  const [initialGradYear, setInitialGradYear] = useState(gradYear);
  const [initialInterviewType, setInitialInterviewType] = useState(interviewType);
  const [initialSkills, setInitialSkills] = useState(skills);
  const [initialExperience, setInitialExperience] = useState(experience);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const toggleSkill = (s: string) => {
    setSkills((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  };

  const handleEditClick = () => {
    if (!isEditMode) {
      // Entering edit mode - store current values
      setInitialName(name);
      setInitialCollege(college);
      setInitialCourse(course);
      setInitialGradYear(gradYear);
      setInitialInterviewType(interviewType);
      setInitialSkills(skills);
      setInitialExperience(experience);
    }
    setIsEditMode(true);
  };

  const handleCancel = () => {
    // Revert to initial values
    setName(initialName);
    setCollege(initialCollege);
    setCourse(initialCourse);
    setGradYear(initialGradYear);
    setInterviewType(initialInterviewType);
    setSkills(initialSkills);
    setExperience(initialExperience);
    setIsEditMode(false);
  };

  const handleSave = () => {
    const profileData: ProfileData = {
      name,
      college,
      course,
      graduationYear: gradYear,
      preferredInterviewType: interviewType,
      skills,
      experienceLevel: experience,
    };

    // Save to localStorage
    if (saveProfileData(profileData)) {
      // Update auth context
      updateProfile({
        name,
        college,
        course,
        graduationYear: gradYear,
        interviewType,
        skillDomains: skills,
        experienceLevel: experience,
      });
      setIsEditMode(false);
      toast({
        title: "Success",
        description: "Profile updated successfully",
        duration: 3000,
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to save profile",
        duration: 3000,
      });
    }
  };

  if (!user) return null;

  return (
    <div className="container max-w-2xl py-10">
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-display text-2xl">Your Profile</CardTitle>
          {!isEditMode && (
            <Button variant="outline" size="sm" onClick={handleEditClick} className="gap-2">
              <Edit2 className="h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} disabled={!isEditMode} />
            </div>
            <div className="space-y-2">
              <Label>College</Label>
              <Input value={college} onChange={(e) => setCollege(e.target.value)} disabled={!isEditMode} />
            </div>
            <div className="space-y-2">
              <Label>Course</Label>
              <Input value={course} onChange={(e) => setCourse(e.target.value)} disabled={!isEditMode} />
            </div>
            <div className="space-y-2">
              <Label>Graduation Year</Label>
              <Input value={gradYear} onChange={(e) => setGradYear(e.target.value)} placeholder="e.g. 2026" disabled={!isEditMode} />
            </div>
            <div className="space-y-2">
              <Label>Preferred Interview Type</Label>
              <Select value={interviewType} onValueChange={setInterviewType} disabled={!isEditMode}>
                <SelectTrigger disabled={!isEditMode}>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technical">Technical</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                  <SelectItem value="Both">Both (Technical + HR)</SelectItem>
                  <SelectItem value="Product Manager">Product Manager</SelectItem>
                  <SelectItem value="Senior">Senior Level</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Experience Level</Label>
              <Select value={experience} onValueChange={setExperience} disabled={!isEditMode}>
                <SelectTrigger disabled={!isEditMode}>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
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
                <Badge
                  key={s}
                  variant={skills.includes(s) ? "default" : "outline"}
                  className={isEditMode ? "cursor-pointer" : ""}
                  onClick={() => isEditMode && toggleSkill(s)}
                >
                  {s} {skills.includes(s) && <X className="ml-1 h-3 w-3" />}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            {isEditMode ? (
              <>
                <Button onClick={handleSave} className="flex-1">
                  💾 Save Changes
                </Button>
                <Button onClick={handleCancel} variant="outline" className="flex-1">
                  ❌ Cancel
                </Button>
              </>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
