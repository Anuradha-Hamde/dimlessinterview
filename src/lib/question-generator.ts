// Map CustomTest domains and topics to question topics
export const topicMapping: Record<string, string[]> = {
  // Programming domain topics → question topics
  "C": ["DSA", "OOP"],
  "C++": ["DSA", "OOP"],
  "Java": ["DSA", "OOP"],
  "Python": ["DSA", "OOP"],
  
  // Frontend topics
  "HTML": ["Web Development"],
  "CSS": ["Web Development"],
  "JavaScript": ["Web Development"],
  "React": ["Web Development"],
  
  // Backend topics
  "Node.js": ["Web Development"],
  "Spring Boot": ["OOP"],
  "Django": ["Web Development"],
  
  // Database topics
  "MySQL": ["Databases"],
  "MongoDB": ["Databases"],
  
  // Core CS topics
  "DSA": ["DSA"],
  "OOP": ["OOP"],
  "DBMS": ["Databases"],
  "OS": ["Data Structures"],
  "CN": ["Data Structures"],
  
  // Non-technical topics
  "HR": ["Communication"],
  "Communication": ["Communication"],
  "Behavioral": ["Communication"],
};

// Convert selected topics to question filter topics
export const getQuestionTopicsFromSelection = (selectedTopics: string[]): string[] => {
  const questionTopics = new Set<string>();
  
  selectedTopics.forEach((topic) => {
    const mappedTopics = topicMapping[topic];
    if (mappedTopics) {
      mappedTopics.forEach((t) => questionTopics.add(t));
    }
  });
  
  return Array.from(questionTopics);
};

// Filter interview type to question types
export const getQuestionTypesFromInterviewType = (interviewType: string): string[] => {
  const typeMap: Record<string, string[]> = {
    "Technical": ["Data Structures", "DSA", "OOP", "Databases", "Web Development"],
    "HR": ["Communication"],
    "Both": ["Data Structures", "DSA", "OOP", "Databases", "Web Development", "Communication"],
    "Product Manager": ["Data Structures", "DSA", "OOP", "Web Development"],
    "Senior": ["Data Structures", "DSA", "OOP", "Databases", "Web Development"],
  };
  
  return typeMap[interviewType] || typeMap["Technical"];
};
