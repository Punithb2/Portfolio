// All site content lives here. Edit this file to update the portfolio.

export const profile = {
  name: "Punith B",
  firstName: "Punith",
  // Rotating phrases in the hero: "I spend my days …"
  roles: ["orchestrating AI agents", "training neural networks", "designing real-time backends", "shipping full-stack apps"],
  location: "Bengaluru, India",
  timezone: "Asia/Kolkata",
  email: "punithb165@gmail.com",
  resume: "/Punith_B_Resume.pdf",
  available: true,
  tagline:
    "I build AI-powered products and the backends that keep them running, from LLM agent workflows and computer vision pipelines to real-time, event-driven systems.",
  about:
    "Computer Science graduate who likes shipping things that actually work in production. I've built multi-agent systems that tailor resumes without inventing a single detail, trained CNNs that diagnose plant disease from a photo, and engineered a proctoring backend that scores cheating risk from live exam events in real time. I care about clean APIs, honest AI, and interfaces people enjoy using.",
  socials: [
    { label: "GitHub", href: "https://github.com/Punithb2" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/punith-b-965100252" },
    { label: "Email", href: "mailto:punithb165@gmail.com" },
  ],
};

export const stats = [
  { value: 5, suffix: "", label: "AI & full-stack projects built and shipped" },
  { value: 4, suffix: "", label: "User roles secured with JWT-based RBAC at PyGenicArc" },
  { value: 8.04, suffix: "", label: "CGPA in B.E. Computer Science", decimals: 2 },
  { value: 4, suffix: "", label: "Certifications from Stanford, DeepLearning.AI, AWS & Microsoft" },
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  points: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    role: "Python Backend Developer Intern",
    company: "PyGenicArc",
    period: "Feb 2026 – May 2026",
    location: "Bengaluru",
    summary:
      "Built the backend for a remote proctoring platform with real-time monitoring and anti-cheating.",
    points: [
      "Built the backend of a remote proctoring platform with Django REST Framework, PostgreSQL, Redis, Kafka, WebSockets, LiveKit and Docker Compose, with JWT-based RBAC for 4 user roles.",
      "Self-hosted LiveKit via Docker and built WebSocket session management with live stream tracking, heartbeats and reconnection handling.",
      "Implemented an anti-cheating engine with automated risk scoring, violation tracking (tab switching, focus loss, multi-person detection), Kafka event streaming and exam termination logic.",
      "Built the full exam lifecycle API suite: question banks, scheduling, batch management with Excel upload, attempt tracking, automated evaluation, results and analytics dashboards.",
    ],
    stack: ["Django REST", "PostgreSQL", "Redis", "Kafka", "WebSockets", "LiveKit", "Docker"],
  },
];

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  category: "AI / ML" | "Full-Stack";
  featured?: boolean;
  description: string;
  highlights: string[];
  stack: string[];
  github?: string;
  live?: string;
  accent: string; // CSS color used for the project's artwork
  glyph: "atlas" | "doc" | "leaf" | "medal" | "pulse";
};

export const projects: Project[] = [
  {
    slug: "careeratlas",
    title: "CareerAtlas",
    subtitle: "Multi-agent AI job search platform",
    year: "2026",
    category: "Full-Stack",
    featured: true,
    description:
      "Upload a PDF resume, pick a target role, and CareerAtlas finds live listings, ranks them against what your resume actually shows, and generates a skill-gap analysis, tailored resume and cover letter.",
    highlights: [
      "LangGraph + Gemini workflow for skill-gap analysis, tailored resumes and cover letters that never invent candidate details",
      "Word-by-word “Review changes” diff that flags any new numbers or tools the original resume never mentioned",
      "ATS-friendly PDF & Word export rebuilt in the style of the uploaded resume",
      "Supabase Auth + Row Level Security, saved jobs, search history and application tracking",
    ],
    stack: ["React", "FastAPI", "LangGraph", "Gemini", "Supabase", "Vercel", "Render"],
    github: "https://github.com/Punithb2/Multi-Agent-Job-Search-Agent",
    live: "https://multi-agent-job-search-agent.vercel.app",
    accent: "#c8ff4d",
    glyph: "atlas",
  },
  {
    slug: "resume-analyzer",
    title: "Resume Analyzer Pro",
    subtitle: "ML + NLP resume screening",
    year: "2025",
    category: "AI / ML",
    description:
      "Reads a resume, predicts the best-fit job category, extracts key skills, scores the resume and gives actionable feedback, for students and hiring managers alike.",
    highlights: [
      "Job-category classifier trained on a labelled resume dataset",
      "NLP-based skill extraction and resume scoring",
      "Interactive Streamlit interface with improvement feedback",
    ],
    stack: ["Python", "Scikit-Learn", "NLP", "Streamlit"],
    github: "https://github.com/Punithb2/resume-analyzer-using-ml",
    accent: "#ffb86b",
    glyph: "doc",
  },
  {
    slug: "potato-leaf",
    title: "Potato Leaf Disease Detection",
    subtitle: "CNN-powered plant diagnosis",
    year: "2025",
    category: "AI / ML",
    description:
      "Upload a photo of a potato leaf and a convolutional neural network identifies the disease, with confidence charts in a dark-themed Streamlit app.",
    highlights: [
      "Image classifier built with TensorFlow / Keras CNNs",
      "Confidence breakdowns visualised with Plotly",
      "Model loaded on demand, so the app deploys lightweight",
    ],
    stack: ["TensorFlow", "Keras", "CNN", "Streamlit", "Plotly"],
    github: "https://github.com/Punithb2/potato-leaf-disease-detection",
    accent: "#6ee7a8",
    glyph: "leaf",
  },
  {
    slug: "olympics",
    title: "Olympics Medal Tracker",
    subtitle: "Paris 2024 medal dashboard",
    year: "2025",
    category: "Full-Stack",
    description:
      "A web app to track Paris 2024 medal counts by country, with charts, search, event highlight videos and full medalist management.",
    highlights: [
      "Medal statistics dashboard with interactive graphs",
      "Add, edit and delete medalist records",
      "Search & filter with embedded YouTube event highlights",
    ],
    stack: ["Flask", "Jinja2", "JavaScript", "SQL", "CSS"],
    github: "https://github.com/Punithb2/olympics",
    accent: "#ffd84d",
    glyph: "medal",
  },
  {
    slug: "diabetes",
    title: "Diabetes Prediction",
    subtitle: "Clinical risk classifier",
    year: "2025",
    category: "AI / ML",
    description:
      "A machine learning model that predicts diabetes risk from diagnostic measurements, served through a clean Streamlit interface.",
    highlights: [
      "Trained & evaluated a classifier on diagnostic health data",
      "Model accuracy surfaced alongside every prediction",
      "Simple form-driven UI for instant predictions",
    ],
    stack: ["Python", "Scikit-Learn", "Pandas", "Streamlit"],
    github: "https://github.com/Punithb2/diabetes-ml",
    accent: "#ff7a9c",
    glyph: "pulse",
  },
];

export const skills = [
  {
    group: "AI / ML",
    items: ["PyTorch", "TensorFlow", "Scikit-Learn", "LangGraph", "Gemini", "CNN", "RNN / LSTM", "Neural Networks"],
  },
  {
    group: "Backend",
    items: ["Python", "FastAPI", "Django REST", "Flask", "PostgreSQL", "Redis", "Kafka", "WebSockets"],
  },
  {
    group: "Frontend",
    items: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    group: "Cloud & Tools",
    items: ["Docker", "AWS", "Supabase", "Vercel", "Git", "GitHub", "LiveKit", "Streamlit"],
  },
];

export const education = [
  {
    school: "K S School of Engineering and Management",
    degree: "B.E. in Computer Science and Engineering",
    score: "8.04 CGPA",
    period: "2022 – 2026",
    location: "Bengaluru",
  },
  {
    school: "Narayana Pre University College",
    degree: "PUC (PCMC)",
    score: "84.5%",
    period: "2020 – 2022",
    location: "Bengaluru",
  },
];

export const certifications = [
  { title: "Deep Learning Specialization", issuer: "DeepLearning.AI & Stanford University", date: "Sep 2026" },
  { title: "Machine Learning Specialization", issuer: "DeepLearning.AI & Stanford University", date: "Jul 2026" },
  { title: "AWS Academy Graduate – Cloud Developing", issuer: "Amazon Web Services", date: "Jun 2025" },
  {
    title: "Applied Artificial Intelligence: Practical Implementations",
    issuer: "TechSaksham by Microsoft & SAP · Edunet Foundation · AICTE",
    date: "2024–25",
  },
];
