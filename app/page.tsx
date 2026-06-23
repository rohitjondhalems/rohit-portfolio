"use client";

import React, { useState } from 'react';

export default function Home() {
  const [filter, setFilter] = useState<'all' | 'genai' | 'mldl'>('all');
  const [theme, setTheme] = useState<'slate' | 'black' | 'white' | 'indigo'>('slate');

  const contactInfo = {
    name: "Rohit Bhimrao Jondhale",
    title: "AI / ML Engineer",
    email: "rohitjondhalems@gmail.com",
    phone: "+91 7447783780",
    location: "Mumbai, India",
    linkedin: "https://linkedin.com/in/rohit-jondhale-datascientist28081990",
    flowcv: "/Rohit_Jondhale_AI_Engineer_latest_CV.pdf", // Aligned with your added file
  };

  const skills = {
    cloudMLOps: [
      "Azure (AKS, ADLS Gen2, Data Factory, Key Vault, DevOps)",
      "AWS (SageMaker, EC2, S3, Fargate, CloudFormation)",
      "MLflow, KubeFlow, Airflow, Docker, Kubernetes, DVC, CI/CD/CT"
    ],
    genAI: [
      "LangChain, LangGraph, LangFuse, RAG, AI Agents, LLMs (GPT-4, Claude, Mistral)",
      "LiteLLM, Whisper AI, Deep Learning, Computer Vision, Embeddings",
      "Azure AI Search, Document Intelligence, LoRA, QLoRA fine-tuning"
    ],
    languagesTools: [
      "Python, R, SQL, PySpark, Scala, FastAPI, Flask, Power BI, Git, Jira"
    ]
  };

  const projects = [
    {
      title: "Supervisor Agent-Based Intent Routing",
      tag: "AskLANXESS",
      category: "genai",
      desc: "Built a supervisor orchestrator routing incoming queries across multiple domain specialist bots (Investment, Market Mind, Knowledge Portal, AskHR).",
      metrics: "Unified multiple domain bots under a single entry point with accurate intent-based routing.",
      bullets: [
        "Authored per-bot agent cards describing each agent's scope and capabilities.",
        "Embedded complex routing logic into the supervisor prompt to accurately classify and dispatch queries."
      ]
    },
    {
      title: "Correspondence Management System",
      tag: "EMEA & India GenAI",
      category: "genai",
      desc: "Automated processing framework for incoming enterprise emails with classification and automatic database write-back.",
      metrics: "Reduced manual email handling effort by 96% and accelerated response times by 80%.",
      bullets: [
        "Processes 1,000+ daily emails with multi-class classification by vendor, legal entity, and country.",
        "Integrated smoothly with Microsoft SharePoint and DIAP write-back systems for workflow orchestration."
      ]
    },
    {
      title: "Investment Relationship Engine",
      tag: "Agentic RAG",
      category: "genai",
      desc: "Advanced semantic search and retrieval engine for financial communications and investor relations documents.",
      metrics: "Reduced document search and analysis timelines by 90%.",
      bullets: [
        "Processed and indexed 2,000+ financial documents using DIAP pipelines and Azure AI Search.",
        "Orchestrated autonomous AI Agents with persistent memory architectures using LangGraph and Langfuse."
      ]
    },
    {
      title: "Invoice Status Tool Bot",
      tag: "Financial Automation",
      category: "genai",
      desc: "FastAPI-based query bot enabling internal teams and external vendors to retrieve live invoice workflows.",
      metrics: "Instant, self-service visibility into invoice lifecycle, accelerating query resolution.",
      bullets: [
        "Engineered robust invoice-number matching with leading-zero normalization and multi-format identifier handling.",
        "Integrated legal-entity extraction and backend lookups across multiple LANXESS entities."
      ]
    },
    {
      title: "Invoice Status Integration (Mahnung Category)",
      tag: "CMACC Integration",
      category: "genai",
      desc: "Extended CMACC systems to automatically manage 'Mahnung' (dunning/payment reminders) email categories.",
      metrics: "Automated triage of high-volume dunning emails, cutting manual handling of reminder cycles.",
      bullets: [
        "Extracted invoice numbers and legal-entity context from incoming correspondence to query live statuses.",
        "Threaded real-time status details directly into automatically generated email drafts."
      ]
    },
    {
      title: "Marconi Delivery Agent",
      tag: "Logistics GenAI",
      category: "genai",
      desc: "Automated customer delivery status enquiry agent scanning incoming mailboxes.",
      metrics: "Automated tracking response draft generation, speeding up customer turnaround.",
      bullets: [
        "Retrieves real-time delivered-product metadata and generates highly contextual customer responses.",
        "Integrated Langfuse observability for precise prompt tracing, latency monitoring, and cost tracking."
      ]
    },
    {
      title: "BOLT (Buying Optimization Legibility Transparency)",
      tag: "Procurement Analytics",
      category: "genai",
      desc: "Data-merging pipeline and FastAPI streaming application evaluating cross-country vendor data.",
      metrics: "Streamlined procurement analysis across 12+ countries, cutting executive report prep from days to minutes.",
      bullets: [
        "Integrated 6 distinct data sources (including SAP L4P and AAD group files) using PySpark and Blob Storage.",
        "Applied advanced chaining and hybrid prompting strategies using Azure OpenAI-4o on AKS."
      ]
    },
    {
      title: "Levi — AI-Driven Recruitment",
      tag: "MLOps & SageMaker",
      category: "genai",
      desc: "RAG-based recruitment parsing and candidate audio evaluation engine.",
      metrics: "65% efficiency gain and approximately 30% lower HR operational costs.",
      bullets: [
        "Leveraged Whisper AI audio transcription and dynamic LLM scoring models.",
        "Fine-tuned Microsoft Phi-3 models with MLflow tracking and deployed endpoints on AWS SageMaker."
      ]
    },
    {
      title: "EEG Gesture Prediction for Paralysis",
      tag: "Healthcare Deep Learning",
      category: "mldl",
      desc: "Research-driven assistive software decoding neural EEG signals for non-verbal communication.",
      metrics: "Successfully classified physical motor intentions using raw neural EEG signals.",
      bullets: [
        "Built 1D CNNs in PyTorch and Random Forest ensembles for temporal signal classification.",
        "Deployed MLflow on AWS Fargate using CloudFormation and integrated DVC + S3 for strict versioning."
      ]
    },
    {
      title: "Type-2 Diabetes Monitoring & Prediction",
      tag: "Medical Time-Series",
      category: "mldl",
      desc: "RNN-based forecasting and lifestyle advisory recommendations derived from continuous glucose monitoring data.",
      metrics: "Enabled early detection of abnormal glucose trends, lowering clinical risk factor exposures.",
      bullets: [
        "Constructed predictive ARIMA and Recurrent Neural Network models to forecast glucose curves.",
        "Pre-processed glucose sequences, writing directly to Azure ADLS Gen2 and Power BI for real-time visualization."
      ]
    },
    {
      title: "Predictive Analytics for Financial Services",
      tag: "Fraud & Default Detection",
      category: "mldl",
      desc: "Real-time loan-default prediction and financial risk assessment engine.",
      metrics: "Reduced false claims by 80%, lowering financial risk exposure for institutional clients.",
      bullets: [
        "Designed and deployed classification models for real-time transaction processing.",
        "Ensured rigorous HIPAA-compliant processing while mentoring junior data scientists on production best practices."
      ]
    }
  ];

  const experience = [
    {
      role: "AI/ML Engineer",
      company: "Mobinext Technologies (Client: Lanxess India)",
      period: "2024/12 – Present",
      desc: "Building production-grade LLM workflows, AKS scaling, and MLOps on Azure DevOps."
    },
    {
      role: "AI/ML Engineer",
      company: "Cocolevio LLP India",
      period: "2024/03 – 2024/12",
      desc: "Developed fine-tuned model architectures, pipelines, and deployment structures on AWS."
    },
    {
      role: "R&D EEG Machine Learning Engineer",
      company: "Smart Rotamach Pvt Ltd",
      period: "2023/08 – 2024/01",
      desc: "Engineered deep learning 1D CNN models in PyTorch for predictive assistive healthcare."
    },
    {
      role: "Data Scientist",
      company: "Sandat Web Solution",
      period: "2020/05 – 2023/08",
      desc: "Constructed predictive fraud detection, risk algorithms, and medical time-series models."
    }
  ];

  // Map theme states to tailwind configuration tokens
  const themeStyles = {
    slate: {
      bg: "bg-slate-950",
      text: "text-slate-100",
      heading: "text-white",
      subtext: "text-slate-400",
      border: "border-slate-800/80",
      grid: "bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]",
      card: "from-slate-900/60 to-slate-950/80 border-slate-800/80 shadow-[0_30px_100px_rgba(0,0,0,0.8)]",
      navBtn: "bg-slate-900/80 border-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-teal-400",
      footer: "border-slate-900 text-slate-700",
      synapseBg: "#1e293b",
      glow: "hover:shadow-[0_20px_45px_rgba(20,184,166,0.15)] hover:border-teal-500/50",
      projectGlow: "hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]",
      pillContainer: "bg-slate-950/80 border-slate-800",
      innerBg: "bg-slate-950/60"
    },
    black: {
      bg: "bg-black",
      text: "text-zinc-200",
      heading: "text-white",
      subtext: "text-zinc-400",
      border: "border-zinc-900",
      grid: "bg-[linear-gradient(to_right,#09090b_1px,transparent_1px),linear-gradient(to_bottom,#09090b_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]",
      card: "from-zinc-950/60 to-black border-zinc-900 shadow-[0_30px_100px_rgba(0,0,0,0.9)]",
      navBtn: "bg-zinc-950/80 border-zinc-900 hover:bg-zinc-900 text-zinc-300 hover:text-teal-400",
      footer: "border-zinc-900 text-zinc-700",
      synapseBg: "#18181b",
      glow: "hover:shadow-[0_20px_45px_rgba(20,184,166,0.12)] hover:border-teal-500/50",
      projectGlow: "hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)]",
      pillContainer: "bg-zinc-950/80 border-zinc-900",
      innerBg: "bg-black/60"
    },
    white: {
      bg: "bg-slate-50",
      text: "text-slate-700",
      heading: "text-slate-950",
      subtext: "text-slate-500",
      border: "border-slate-200",
      grid: "bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40",
      card: "from-white to-slate-100/90 border-slate-200 shadow-xl shadow-slate-100",
      navBtn: "bg-white border-slate-200 hover:bg-slate-100 text-slate-700 hover:text-teal-600 shadow-sm",
      footer: "border-slate-200 text-slate-400",
      synapseBg: "#e2e8f0",
      glow: "hover:border-teal-500/50 hover:shadow-[0_15px_30px_rgba(20,184,166,0.12)]",
      projectGlow: "hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:border-slate-300",
      pillContainer: "bg-white border-slate-200 shadow-inner",
      innerBg: "bg-slate-100/40"
    },
    indigo: {
      bg: "bg-indigo-950",
      text: "text-indigo-100",
      heading: "text-white",
      subtext: "text-indigo-300",
      border: "border-indigo-900",
      grid: "bg-[linear-gradient(to_right,#1e1b4b_1px,transparent_1px),linear-gradient(to_bottom,#1e1b4b_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]",
      card: "from-indigo-900/40 to-indigo-950/80 border-indigo-900/80 shadow-[0_30px_100px_rgba(0,0,0,0.8)]",
      navBtn: "bg-indigo-950/80 border-indigo-900 hover:bg-indigo-900 text-indigo-200 hover:text-teal-400",
      footer: "border-indigo-900 text-indigo-700",
      synapseBg: "#312e81",
      glow: "hover:shadow-[0_20px_45px_rgba(20,184,166,0.15)] hover:border-teal-500/50",
      projectGlow: "hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]",
      pillContainer: "bg-indigo-950/80 border-indigo-900",
      innerBg: "bg-indigo-950/60"
    }
  };

  const s = themeStyles[theme];

  const filteredProjects = projects.filter(p => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  return (
    <div className={`min-h-screen ${s.bg} ${s.text} overflow-x-hidden relative transition-colors duration-500 selection:bg-teal-500 selection:text-slate-950`}>
      
      {/* Dynamic CSS Keyframes for Neural Net Signal Propagation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes propagate {
          to {
            stroke-dashoffset: -20;
          }
        }
        .synapse-flow {
          stroke-dasharray: 4, 10;
          animation: propagate 1.2s linear infinite;
        }
      `}} />

      {/* 3D Space Background Grid & Radial Glow Orbs */}
      <div className={`absolute inset-0 ${s.grid} pointer-events-none transition-all duration-500`} />
      
      {/* Glowing Ambient Light Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[20%] w-[500px] h-[500px] rounded-full bg-teal-500/5 blur-[120px] pointer-events-none" />

      {/* PERSPECTIVE WRAPPER */}
      <div className="relative z-10 [perspective:1000px] max-w-5xl mx-auto px-6 py-16">
        
        {/* Navigation Bar */}
        <nav className="flex flex-col lg:flex-row gap-6 justify-between items-center mb-16">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full lg:w-auto">
            <div className={`flex items-center gap-2 px-3 py-1 bg-opacity-85 rounded-full border ${s.border} ${theme === 'white' ? 'bg-white' : 'bg-slate-900'} text-xs shrink-0`}>
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
              <span className={`${theme === 'white' ? 'text-slate-600' : 'text-slate-300'} font-mono`}>Ready for production deployments</span>
            </div>
            
            {/* Interactive Theme Switcher Pills */}
            <div className={`flex items-center gap-1.5 p-1 rounded-full border ${s.pillContainer} text-[10px] font-mono shrink-0`}>
              <button onClick={() => setTheme('slate')} className={`px-2 py-0.5 rounded-full transition-all ${theme === 'slate' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400'}`}>Slate</button>
              <button onClick={() => setTheme('black')} className={`px-2 py-0.5 rounded-full transition-all ${theme === 'black' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400'}`}>Black</button>
              <button onClick={() => setTheme('white')} className={`px-2 py-0.5 rounded-full transition-all ${theme === 'white' ? 'bg-teal-600 text-white font-bold' : 'text-slate-400'}`}>White</button>
              <button onClick={() => setTheme('indigo')} className={`px-2 py-0.5 rounded-full transition-all ${theme === 'indigo' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400'}`}>Indigo</button>
            </div>
          </div>
          
          {/* Top-Right Navigation Buttons (Box Styled & Bigger) */}
          <div className="flex flex-wrap gap-3 text-sm font-mono w-full lg:w-auto justify-start lg:justify-end">
            <a href="#skills" className={`px-4 py-2 border rounded-lg transition-all shadow-md ${s.navBtn}`}>
              01. Skills
            </a>
            <a href="#projects" className={`px-4 py-2 border rounded-lg transition-all shadow-md ${s.navBtn}`}>
              02. Core Deployments
            </a>
            <a href="#experience" className={`px-4 py-2 border rounded-lg transition-all shadow-md ${s.navBtn}`}>
              03. Timeline
            </a>
          </div>
        </nav>

        {/* Hero Section */}
        <header className={`mb-24 p-8 md:p-12 rounded-2xl bg-gradient-to-br ${s.card} backdrop-blur-md relative overflow-hidden group transition-all duration-500`}>
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-transparent to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 items-center">
            
            {/* Left Column: Bio / Info (Spans 6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight ${s.heading} leading-tight`}>
                {contactInfo.name}
              </h1>
              <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-teal-400 to-indigo-400 bg-clip-text text-transparent">
                {contactInfo.title}
              </p>
              <p className={`${s.subtext} text-sm leading-relaxed max-w-xl`}>
                AI/ML Engineer with 6+ years of specialized AI/ML experience (8 years total). 
                Architecting and deploying production GenAI/LLM applications, 
                scalable RAG pipelines, and LLMOps frameworks on AWS and Azure cloud ecosystems.
              </p>
            </div>

            {/* Middle Column: Neural Network Visualization (Spans 3 cols) */}
            <div className="lg:col-span-3 flex items-center justify-center min-h-[220px]">
              <svg viewBox="0 0 200 200" className="w-full max-w-[240px] h-auto select-none opacity-90 group-hover:opacity-100 transition-opacity duration-500">
                <defs>
                  <filter id="node-glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Layer Connection Synapses (Static background links mapped to s.synapseBg) */}
                <g stroke={s.synapseBg} strokeWidth="1" className="transition-colors duration-500">
                  {/* Input Layer to Hidden Layer */}
                  <line x1="30" y1="40" x2="100" y2="30" />
                  <line x1="30" y1="40" x2="100" y2="75" />
                  <line x1="30" y1="100" x2="100" y2="75" />
                  <line x1="30" y1="100" x2="100" y2="125" />
                  <line x1="30" y1="160" x2="100" y2="125" />
                  <line x1="30" y1="160" x2="100" y2="170" />

                  {/* Hidden Layer to Output Layer */}
                  <line x1="100" y1="30" x2="170" y2="65" />
                  <line x1="100" y1="75" x2="170" y2="65" />
                  <line x1="100" y1="125" x2="170" y2="135" />
                  <line x1="100" y1="170" x2="170" y2="135" />
                </g>

                {/* Animated Flowing Synapses (Active feedforward pathways) */}
                <g strokeWidth="1.5" fill="none">
                  <path d="M 30 40 L 100 75" stroke="#14b8a6" className="synapse-flow" />
                  <path d="M 30 100 L 100 125" stroke="#6366f1" className="synapse-flow" />
                  <path d="M 30 160 L 100 125" stroke="#14b8a6" className="synapse-flow" />
                  <path d="M 100 75 L 170 65" stroke="#6366f1" className="synapse-flow" />
                  <path d="M 100 125 L 170 135" stroke="#14b8a6" className="synapse-flow" />
                </g>

                {/* Layer Neurons (Nodes) */}
                {/* Input Layer (Left) */}
                <g fill="#475569">
                  <circle cx="30" cy="40" r="5" />
                  <circle cx="30" cy="100" r="5" />
                  <circle cx="30" cy="160" r="5" />
                </g>

                {/* Hidden Layer (Middle) */}
                <g fill="#4f46e5" filter="url(#node-glow)">
                  <circle cx="100" cy="30" r="5.5" />
                  <circle cx="100" cy="75" r="5.5" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <circle cx="100" cy="125" r="5.5" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <circle cx="100" cy="170" r="5.5" />
                </g>

                {/* Output Layer (Right) */}
                <g fill="#0d9488" filter="url(#node-glow)">
                  <circle cx="170" cy="65" r="6" className="animate-pulse" />
                  <circle cx="170" cy="135" r="6" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
                </g>
              </svg>
            </div>
            
            {/* Right Column: Quick Connect Floating Glass Panel (Spans 3 cols with SVG Vector Icons) */}
            <div className={`lg:col-span-3 p-6 rounded-xl ${s.innerBg} border ${s.border} shadow-inner flex flex-col justify-between gap-5 text-xs font-mono transition-all duration-500`}>
              <div className={`space-y-3 ${theme === 'white' ? 'text-slate-700' : 'text-slate-300'}`}>
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-teal-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{contactInfo.location}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-teal-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href={`mailto:${contactInfo.email}`} className="hover:text-teal-400 transition-colors break-all">{contactInfo.email}</a>
                </div>
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-teal-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href={`tel:${contactInfo.phone}`} className="hover:text-teal-400 transition-colors">{contactInfo.phone}</a>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="w-full text-center py-2 rounded bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold transition-all transform hover:-translate-y-0.5">
                  LinkedIn
                </a>
                <a 
                  href={contactInfo.flowcv} 
                  download="Rohit_Jondhale_AI_Engineer_latest_CV.pdf" 
                  className={`w-full text-center py-2 rounded border ${s.border} ${theme === 'white' ? 'bg-white hover:bg-slate-50 text-slate-800' : 'bg-slate-900 text-slate-200'} transition-all`}
                >
                  Download CV
                </a>
              </div>
            </div>

          </div>
        </header>

        {/* 01. Tech Stack */}
        <section id="skills" className="mb-24">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <span className="text-teal-400 font-mono text-sm">01.</span> Core Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className={`p-6 rounded-xl bg-gradient-to-b ${s.card} backdrop-blur-sm shadow-lg transform-gpu transition-all duration-500 hover:[transform:rotateX(4deg)_rotateY(-4deg)_translateY(-8px)] ${s.glow}`}>
              <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center border border-teal-500/30 text-teal-400 font-mono mb-4 font-bold">A</div>
              <h3 className={`font-bold ${theme === 'white' ? 'text-slate-950' : 'text-white'} mb-3 text-lg`}>GenAI & AI Agents</h3>
              <ul className="space-y-2 text-xs text-slate-400 font-mono">
                {skills.genAI.map((sk, i) => <li key={i} className={theme === 'white' ? 'text-slate-600' : 'text-slate-400'}>• {sk}</li>)}
              </ul>
            </div>

            <div className={`p-6 rounded-xl bg-gradient-to-b ${s.card} backdrop-blur-sm shadow-lg transform-gpu transition-all duration-500 hover:[transform:rotateX(4deg)_rotateY(-4deg)_translateY(-8px)] ${s.glow}`}>
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/30 text-indigo-400 font-mono mb-4 font-bold">M</div>
              <h3 className={`font-bold ${theme === 'white' ? 'text-slate-950' : 'text-white'} mb-3 text-lg`}>Cloud & MLOps</h3>
              <ul className="space-y-2 text-xs text-slate-400 font-mono font-mono">
                {skills.cloudMLOps.map((sk, i) => <li key={i} className={theme === 'white' ? 'text-slate-600' : 'text-slate-400'}>• {sk}</li>)}
              </ul>
            </div>

            <div className={`p-6 rounded-xl bg-gradient-to-b ${s.card} backdrop-blur-sm shadow-lg transform-gpu transition-all duration-500 hover:[transform:rotateX(4deg)_rotateY(-4deg)_translateY(-8px)] ${s.glow}`}>
              <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700 text-slate-300 font-mono mb-4 font-bold">D</div>
              <h3 className={`font-bold ${theme === 'white' ? 'text-slate-950' : 'text-white'} mb-3 text-lg`}>Languages & Tools</h3>
              <ul className="space-y-2 text-xs text-slate-400 font-mono">
                {skills.languagesTools.map((sk, i) => <li key={i} className={theme === 'white' ? 'text-slate-600' : 'text-slate-400'}>• {sk}</li>)}
              </ul>
            </div>

          </div>
        </section>

        {/* 02. Projects Grid with Category Filters */}
        <section id="projects" className="mb-24">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-teal-400 font-mono text-sm">02.</span> Core Deployments
            </h2>
            
            {/* Category Filter Buttons */}
            <div className={`flex ${theme === 'white' ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'} border p-1 rounded-lg gap-1 self-start font-mono text-xs transition-colors duration-500 shadow-sm`}>
              <button 
                onClick={() => setFilter('all')} 
                className={`px-3 py-1.5 rounded transition-all ${filter === 'all' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                All Projects ({projects.length})
              </button>
              <button 
                onClick={() => setFilter('genai')} 
                className={`px-3 py-1.5 rounded transition-all ${filter === 'genai' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                Gen AI ({projects.filter(p => p.category === 'genai').length})
              </button>
              <button 
                onClick={() => setFilter('mldl')} 
                className={`px-3 py-1.5 rounded transition-all ${filter === 'mldl' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                ML & DL ({projects.filter(p => p.category === 'mldl').length})
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((proj, idx) => (
              <div 
                key={idx} 
                className={`group relative rounded-xl bg-gradient-to-b ${s.card} p-6 md:p-8 hover:border-slate-700 transition-all duration-500 shadow-xl flex flex-col justify-between overflow-hidden transform-gpu hover:[transform:rotateX(3deg)_rotateY(-3deg)_translateY(-6px)] ${s.projectGlow}`}
              >
                {/* Visual Glow overlay inside cards */}
                <div className="absolute inset-0 bg-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-teal-400 px-2.5 py-1 rounded bg-teal-500/5 border border-teal-500/10">
                      {proj.tag}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">
                      {proj.category === 'genai' ? 'Generative AI' : 'Classical ML/DL'}
                    </span>
                  </div>
                  <h3 className={`text-xl font-bold ${theme === 'white' ? 'text-slate-950' : 'text-white'} mb-2 group-hover:text-teal-400 transition-colors`}>
                    {proj.title}
                  </h3>
                  <p className={`text-sm ${theme === 'white' ? 'text-slate-600' : 'text-slate-400'} mb-4 leading-relaxed`}>{proj.desc}</p>
                  
                  {/* Dynamic Metrics display */}
                  <div className={`p-3 mb-6 rounded border ${theme === 'white' ? 'bg-slate-50 border-slate-200 text-teal-700' : 'bg-slate-950 border-slate-900/80 text-teal-300'} text-xs font-mono flex items-center gap-2 shadow-inner`}>
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                    <span><strong>Impact:</strong> {proj.metrics}</span>
                  </div>

                  <ul className={`space-y-2 text-xs ${theme === 'white' ? 'text-slate-600' : 'text-slate-400'} mb-6`}>
                    {proj.bullets.map((b, i) => (
                      <li key={i} className="list-disc list-inside leading-relaxed pl-1 marker:text-teal-500">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 03. Experience */}
        <section id="experience" className="mb-24">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <span className="text-teal-400 font-mono text-sm">03.</span> Career History
          </h2>
          <div className={`relative border-l ${theme === 'white' ? 'border-slate-200' : 'border-slate-800'} pl-6 ml-2 space-y-12 transition-colors duration-500`}>
            {experience.map((exp, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-teal-500 group-hover:bg-teal-400 transition-colors duration-300" />
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1">
                  <div>
                    <h3 className={`text-lg font-bold ${theme === 'white' ? 'text-slate-950' : 'text-white'} group-hover:text-teal-400 transition-colors`}>
                      {exp.role}
                    </h3>
                    <p className={`text-sm ${theme === 'white' ? 'text-slate-500' : 'text-slate-400'} font-mono font-medium mb-2`}>{exp.company}</p>
                  </div>
                  <span className={`text-xs font-mono py-1 px-2 rounded border ${theme === 'white' ? 'bg-white border-slate-200 text-slate-700' : 'bg-slate-900 border-slate-800 text-slate-400'} shrink-0 transition-colors duration-500`}>
                    {exp.period}
                  </span>
                </div>
                <p className={`text-sm ${theme === 'white' ? 'text-slate-500' : 'text-slate-400'} max-w-2xl leading-relaxed mt-2`}>{exp.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications Block */}
        <footer className={`border-t ${s.footer} pt-10 text-center md:text-left transition-colors duration-500`}>
          <div className="flex flex-col md:flex-row gap-8 justify-between items-center">
            <div className="space-y-2">
              <h4 className="text-xs font-mono text-teal-400 uppercase tracking-widest">Industry Accreditations</h4>
              <p className={`text-xs ${theme === 'white' ? 'text-slate-500' : 'text-slate-400'} max-w-2xl leading-relaxed`}>
                Microsoft Certified: Azure Fundamentals (AZ-900) • Data Fundamentals (DP-900) • AI Fundamentals (AI-900) • Databricks Lakehouse Platform • Simplilearn Certified Data Scientist Master
              </p>
            </div>
            <a 
              href={`mailto:${contactInfo.email}`}
              className="px-6 py-3 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold transition-transform transform hover:-translate-y-0.5 active:translate-y-0 text-xs tracking-wider uppercase font-mono"
            >
              Start Collaboration
            </a>
          </div>
          <p className="text-[10px] text-slate-700 font-mono mt-16 text-center">
            © {new Date().getFullYear()} {contactInfo.name}. Spatial 3D Interface.
          </p>
        </footer>

      </div>
    </div>
  );
}