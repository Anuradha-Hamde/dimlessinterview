// Performance tracking and ranking system using localStorage
// All data is real — based on actual user activity only

export interface PerformanceData {
  interviewsCompleted: number;
  testsCompleted: number;
  averageAccuracy: number;
  difficultyLevel: "easy" | "medium" | "hard";b
  lastUpdated: string;
}

const STORAGE_KEY = "dmless_performance_data";

export const getPerformanceData = (): PerformanceData | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error("Error reading performance data:", e);
    return null;
  }
};

export const updatePerformanceData = (updates: Partial<PerformanceData>) => {
  try {
    const current = getPerformanceData() || {
      interviewsCompleted: 0,
      testsCompleted: 0,
      averageAccuracy: 0,
      difficultyLevel: "easy" as const,
      lastUpdated: new Date().toISOString(),
    };

    const updated = {
      ...current,
      ...updates,
      lastUpdated: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error("Error updating performance data:", e);
    return null;
  }
};

export const recordInterview = (accuracy: number) => {
  const data = getPerformanceData() || {
    interviewsCompleted: 0,
    testsCompleted: 0,
    averageAccuracy: 0,
    difficultyLevel: "easy" as const,
    lastUpdated: new Date().toISOString(),
  };

  const newCompleted = data.interviewsCompleted + 1;
  const newAverageAccuracy =
    (data.averageAccuracy * data.interviewsCompleted + accuracy) / newCompleted;

  return updatePerformanceData({
    interviewsCompleted: newCompleted,
    averageAccuracy: Math.round(newAverageAccuracy * 100) / 100,
  });
};

export const recordTest = (accuracy: number, difficulty: "easy" | "medium" | "hard") => {
  const data = getPerformanceData() || {
    interviewsCompleted: 0,
    testsCompleted: 0,
    averageAccuracy: 0,
    difficultyLevel: "easy" as const,
    lastUpdated: new Date().toISOString(),
  };

  const newCompleted = data.testsCompleted + 1;
  const newAverageAccuracy =
    (data.averageAccuracy * data.testsCompleted + accuracy) / newCompleted;

  return updatePerformanceData({
    testsCompleted: newCompleted,
    averageAccuracy: Math.round(newAverageAccuracy * 100) / 100,
    difficultyLevel: difficulty,
  });
};

export type PerformanceLevel = "Beginner" | "Intermediate" | "Advanced" | "Interview-Ready";

export const calculatePerformanceLevel = (data: PerformanceData | null): PerformanceLevel => {
  if (!data || (data.interviewsCompleted === 0 && data.testsCompleted === 0)) {
    return "Beginner";
  }

  const totalActivities = data.interviewsCompleted + data.testsCompleted;
  const accuracyScore = data.averageAccuracy;

  // Interview-Ready: 10+ activities, 85%+ accuracy, hard difficulty
  if (
    totalActivities >= 10 &&
    accuracyScore >= 85 &&
    data.difficultyLevel === "hard"
  ) {
    return "Interview-Ready";
  }

  // Advanced: 7+ activities, 80%+ accuracy, medium/hard difficulty
  if (
    totalActivities >= 7 &&
    accuracyScore >= 80 &&
    (data.difficultyLevel === "medium" || data.difficultyLevel === "hard")
  ) {
    return "Advanced";
  }

  // Intermediate: 3+ activities, 70%+ accuracy
  if (totalActivities >= 3 && accuracyScore >= 70) {
    return "Intermediate";
  }

  // Beginner: 1-2 activities or < 70% accuracy
  return "Beginner";
};

export const getPerformanceInsight = (data: PerformanceData | null): string => {
  if (!data || (data.interviewsCompleted === 0 && data.testsCompleted === 0)) {
    return "Complete your first interview to see your performance level.";
  }

  const level = calculatePerformanceLevel(data);
  const totalActivities = data.interviewsCompleted + data.testsCompleted;

  const levelDescriptions: Record<PerformanceLevel, string> = {
    Beginner: "Keep practicing! Aim for more interviews and tests to improve your accuracy.",
    Intermediate: "Great progress! Try medium or hard difficulty questions to level up.",
    Advanced: "Excellent! You're approaching interview readiness. Focus on hard questions.",
    "Interview-Ready":
      "Congratulations! You're well-prepared for interviews. Keep maintaining this performance.",
  };

  return `You are currently at **${level}** level based on ${totalActivities} completed activities with ${Math.round(data.averageAccuracy)}% accuracy. ${levelDescriptions[level]}`;
};

export const getPerformanceEmoji = (level: PerformanceLevel): string => {
  const emojis: Record<PerformanceLevel, string> = {
    Beginner: "🌱",
    Intermediate: "📈",
    Advanced: "⭐",
    "Interview-Ready": "🏆",
  };
  return emojis[level];
};
