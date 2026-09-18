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
    "Computer Science graduate who likes shipping things that actually work in production. I've built multi-agent systems that tailor resumes without inventing a single detail, reconstructed 3D point clouds from a single silhouette, trained CNNs that explain their own plant-disease diagnoses, and engineered a proctoring backend that scores cheating risk from live exam events in real time. I care about clean APIs, honest AI, and interfaces people enjoy using.",
  socials: [
    { label: "GitHub", href: "https://github.com/Punithb2" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/punith-b-965100252" },
    { label: "Email", href: "mailto:punithb165@gmail.com" },
  ],
};

export const stats = [
  { value: 8, suffix: "", label: "AI & full-stack projects built and shipped" },
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
  glyph: "atlas" | "points" | "mesh" | "doc" | "leaf" | "house" | "medal" | "pulse";
  /** Optional screenshot or demo GIF, shown in the detail view in place of the artwork. */
  media?: string;
  mediaAlt?: string;
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
    slug: "recon3d",
    title: "recon3d",
    subtitle: "One silhouette in, a 3D point cloud out",
    year: "2026",
    category: "AI / ML",
    description:
      "A ResNet-18 encoder and MLP decoder predict 2,048 3D points from a single silhouette image, trained end to end with Chamfer distance on six ShapeNet categories and served as a FastAPI + Gradio app that warns you when an upload looks unlike anything it was trained on.",
    highlights: [
      "Fine-tuning the encoder (LP-FT) cut Chamfer distance 29% against a frozen-encoder linear probe — 1.227 vs 1.734 (×1000)",
      "Benchmarked against a nearest-neighbour retrieval baseline and a transformer decoder, and reported the negative result honestly",
      "Out-of-distribution detection warns the user when an upload falls outside the training categories",
      "Evaluated on 14,400 predictions (600 held-out meshes × 24 views) with Chamfer distance and F-score",
      "Trained on a free Kaggle T4 and deployed on a free Hugging Face ZeroGPU Space, with resumable runs and CI",
    ],
    stack: ["PyTorch", "ResNet-18", "FastAPI", "Gradio", "Hugging Face", "Kaggle"],
    github: "https://github.com/Punithb2/recon3d",
    live: "https://huggingface.co/spaces/Punith25/recon3d",
    accent: "#7cc4ff",
    glyph: "points",
    media: "/recon3d-demo.gif",
    mediaAlt: "The recon3d demo: a silhouette is uploaded and reconstructed into a rotating 3D point cloud.",
  },
  {
    slug: "omnimesh",
    title: "OMNIMESH AI",
    subtitle: "Sketch-to-3D mesh generation",
    year: "2026",
    category: "AI / ML",
    description:
      "Draw or upload a 2D sketch, describe it in a prompt, and get back textured 3D variations you can orbit, colorize, edit, view in AR/VR and export as .obj or .stl.",
    highlights: [
      "Two-stage pipeline: ControlNet lineart conditioning over Stable Diffusion 1.5 (Realistic Vision V5.1) turns the sketch into photoreal renders, then TripoSR lifts each one into a coloured mesh at 448 marching-cubes resolution",
      "Meshes come back as raw vertex/face/colour arrays, so Three.js builds the geometry in the browser without parsing a model file",
      "A silhouette-match score measures intersection-over-union between the sketch mask and the rasterised mesh outline — correct pairs score 84–93% against 27–73% for mismatches, in 15–70 ms — and reports nothing rather than a fabricated number when the outline has gaps",
      "In-app drawing canvas, shaded/wireframe viewer with lighting presets, transform gizmo, WebXR AR/VR with hit-test placement, and client-side .obj / .stl export",
      "FastAPI + PyTorch backend running float16 on a GPU EC2 instance behind an ngrok tunnel; React 19 + Vite frontend gated by Firebase Auth",
    ],
    stack: ["PyTorch", "ControlNet", "TripoSR", "Three.js", "React", "FastAPI", "WebXR", "AWS EC2", "Firebase"],
    github: "https://github.com/Punithb2/OMNIMESH-AI",
    accent: "#e9a6ff",
    glyph: "mesh",
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
    subtitle: "CNN diagnosis with Grad-CAM explanations",
    year: "2026",
    category: "AI / ML",
    description:
      "A convolutional neural network that tells early blight, late blight and healthy potato leaves apart — and shows a Grad-CAM heatmap of the lesions it actually looked at, so a diagnosis can be trusted.",
    highlights: [
      "95.7% test accuracy with 0.951 macro F1 on a custom Keras CNN, trained on a stratified 70/15/15 split of 2,152 PlantVillage images",
      "Grad-CAM heatmaps explain every prediction, for any class, with an opacity slider and a high-activation-area metric",
      "Reports macro F1 and an interactive confusion matrix rather than one accuracy number, because the healthy class is 6.6× smaller",
      "Streamlit app with Diagnose, Model Performance and How It Works tabs, plus symptoms and recommended actions",
    ],
    stack: ["TensorFlow", "Keras", "CNN", "Grad-CAM", "Streamlit", "Plotly"],
    github: "https://github.com/Punithb2/potato-leaf-disease-detection",
    accent: "#6ee7a8",
    glyph: "leaf",
  },
  {
    slug: "housing",
    title: "Housing Price Prediction",
    subtitle: "Linear regression written from scratch",
    year: "2026",
    category: "AI / ML",
    description:
      "Multiple linear regression built from scratch with NumPy — no scikit-learn — to estimate house prices, with the trained parameters served through a Streamlit app.",
    highlights: [
      "Hand-written z-score normalisation, mean-squared-error cost and batch gradient descent (α = 0.01, 5,000 iterations)",
      "Cost falls from 1283.87 to 68.66 and flattens by ~1,000 iterations, plotted as a learning curve",
      "Features chosen by correlation with price — area, bathrooms, air conditioning, stories, parking, bedrooms",
      "Weights, bias, mean and sigma exported to a pickle the Streamlit app loads for instant estimates",
    ],
    stack: ["Python", "NumPy", "Pandas", "Matplotlib", "Streamlit"],
    github: "https://github.com/Punithb2/Housing-price-prediction",
    accent: "#b39dff",
    glyph: "house",
  },
  {
    slug: "diabetes",
    title: "Diabetes Prediction",
    subtitle: "SVM clinical risk classifier",
    year: "2026",
    category: "AI / ML",
    description:
      "A support vector machine that predicts diabetes risk from eight diagnostic measurements, served through a Streamlit app that shows its own accuracy alongside every prediction.",
    highlights: [
      "Linear-kernel SVM trained on the 768-record Pima Indians dataset with a stratified 80/20 split",
      "~78% training and ~77% test accuracy, with confusion matrices for both splits",
      "Input validation warns on non-numeric values, and accuracy can be toggled in the UI",
      "Ships with a disclaimer: an educational project, not a medical tool",
    ],
    stack: ["Python", "Scikit-Learn", "SVM", "Pandas", "Streamlit"],
    github: "https://github.com/Punithb2/diabetes-classifier",
    accent: "#ff7a9c",
    glyph: "pulse",
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
];

export const skills = [
  {
    group: "AI / ML",
    items: ["PyTorch", "TensorFlow", "Scikit-Learn", "NumPy", "LangGraph", "Gemini", "CNN", "Grad-CAM", "RNN / LSTM"],
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
    items: ["Docker", "AWS", "Hugging Face", "Supabase", "Vercel", "Git", "GitHub", "LiveKit", "Streamlit", "Gradio"],
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
