

# Dimless IntervoAI — Implementation Plan

## Overview
AI Interview Practice, Custom Tests & Company-Wise Preparation platform for students. Frontend-only with mock data and placeholders. Modern SaaS UI with white/blue-teal theme.

---

## Phase 1: Foundation & Design System
- Set up color theme: white background, blue/teal accents, soft shadows, rounded components
- Create shared layout components (Navbar, Footer)
- Configure routing for all pages

## Phase 2: Public Landing Page
- **Navbar** with logo "Dimless IntervoAI", menu links (Features, How It Works, Custom Tests, Company Prep), Login & Sign Up buttons
- **Hero Section** with badge, heading "Crack Interviews with Smart AI Practice", subtext, and CTAs
- **New User Dashboard Preview** on the right side showing onboarding cards (Practice Interview, Create Custom Test, Company-Wise Preparation)
- Social proof line: "Trusted by students preparing for their first interviews"

## Phase 3: Authentication Pages
- **Sign Up** form: Full Name, Email, Password, College Name, Course dropdown (BTech, BCA, BSc, MCA, MBA, Diploma, BA, BCom, Other with custom input), CAPTCHA checkbox placeholder
- **Login** page with email/password
- All auth uses placeholders — no real backend

## Phase 4: Student Profile Page
- Editable profile with Name, College, Course, Graduation Year, Preferred Interview Type, Skill Domains, Experience Level

## Phase 5: Dashboard (Post-Login)
- Welcome message, no fake stats for new users
- Action cards: Start Interview, Custom Test Builder, Company-Wise Preparation, Analytics

## Phase 6: AI Interview Practice
- **Configuration**: Interview type (Technical/HR), duration (10/15/custom), question count (10/15/custom), difficulty (Easy/Medium/Hard)
- **Simulation**: One question at a time, timer, progress bar, MCQ with 4 options + "Write Your Own Answer", mic icon (UI only)
- **Post-question feedback strip**: Correct/Needs Improvement + "Learn This Topic" button opening a learning panel with explanation, key points, examples, common mistakes, interview tips (placeholder content)

## Phase 7: Custom Test Builder
- Step 1: Select domains/skills (Programming, Frontend, Backend, Databases, Core CS, Non-Technical) with multi-select
- Step 2: Dynamic topic selection based on chosen domains
- Step 3: Configuration (difficulty, question count 5–30, duration 5–60 min, question type MCQ/Written/Mixed)
- Generate test with mock AI placeholder

## Phase 8: Company-Wise Interview Preparation
- Step 1: Select company from top companies list (TCS, Infosys, Wipro, Accenture, Cognizant, Capgemini, Amazon, Google, Microsoft) + custom input
- Step 2: Select level (Basic/Moderate/Advanced)
- Step 3: Test configuration (question type, count, duration)
- Start company-wise interview with mock questions

## Phase 9: Results & Analysis Page
- Performance summary: overall score, topic-wise breakdown, weak topics, strengths
- Frequently Asked Questions cards with company tags
- Company-wise analysis table
- Recommendations: topics to revise, suggested next test, company readiness level

## Phase 10: Analytics Page
- Performance trends chart
- Skills improvement tracking
- Learned topics list
- Interview readiness indicator
- All using mock/placeholder data

