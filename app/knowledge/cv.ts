/**
 * Knowledge base for the "Ask about Rohit" chatbot, curated from the CV.
 *
 * Rules for what goes in here:
 *  - only information that is already public (CV / this site)
 *  - no home address or phone number; contact is via email / LinkedIn
 *  - nothing confidential about client projects beyond the published descriptions
 *
 * Each entry is one retrievable chunk. Site projects that have public repos and the
 * site's skills list are added from content.ts in lib/knowledge.ts.
 */

export type KnowledgeEntry = { id: string; title: string; section: string; text: string };

export const cvKnowledge: KnowledgeEntry[] = [
  {
    id: "profile",
    title: "Profile summary",
    section: "Profile",
    text:
      "Rohit Bhimrao Jondhale is an AI/ML Engineer with 6+ years of AI/ML experience and 8 years of total professional " +
      "experience, architecting and deploying AI solutions across enterprise and healthcare domains. He specialises in " +
      "Generative AI, LLMOps, RAG, AI agents and end-to-end ML pipelines on Azure and AWS, with GDPR/HIPAA-compliant " +
      "delivery, and works with Finance, IT and business stakeholders to turn models into reliable production outcomes. " +
      "He is based in Mumbai, India. His career goal is to grow into an AI Solution Architect role.",
  },

  // ── Work experience ────────────────────────────────────────────────
  {
    id: "exp-mobinext",
    title: "AI/ML Engineer — Mobinext Technologies (client: LANXESS India), 2024/12 – present",
    section: "Experience",
    text:
      "AI/ML Engineer at Mobinext Technologies Pvt Ltd, working for the client LANXESS India (Navi Mumbai), from " +
      "December 2024 to present. Builds and deploys enterprise GenAI/LLM applications integrated into core business " +
      "workflows, with CI/CD on Azure DevOps and horizontally scalable deployments on Azure Kubernetes Service (AKS), using " +
      "Apache Spark for large-scale data processing. Engineers RAG and autonomous AI agent systems with LangChain and " +
      "LangGraph. Designed the Correspondence Management System (CMACC) with vendor, legal-entity and region classification " +
      "and SharePoint/DIAP write-back, cutting manual effort by 96%. Developed Accounts Payable automation, including the " +
      "Invoice Status Tool bot and its integration into the CMACC 'Mahnung' (dunning) workflow. Established continuous " +
      "model-monitoring for reliability and GDPR/data-governance compliance.",
  },
  {
    id: "exp-cocolevio",
    title: "AI/ML Engineer — Cocolevio LLP India, 2024/03 – 2024/12",
    section: "Experience",
    text:
      "AI/ML Engineer at Cocolevio LLP India (Noida) from March to December 2024. Built the Levi AI recruitment platform: " +
      "resume parsing, dynamic interview-question generation and candidate evaluation, with Whisper AI transcription and " +
      "AI-driven scoring. Fine-tuned Microsoft Phi-3.5 with MLflow and DVC, orchestrated pipelines with Airflow and deployed " +
      "on AWS SageMaker, reducing screening time by 65%.",
  },
  {
    id: "exp-rotamach",
    title: "R&D EEG Machine Learning Engineer — Smart Rotamach, 2023/08 – 2024/01",
    section: "Experience",
    text:
      "R&D EEG Machine Learning Engineer at Smart Rotamach Pvt Ltd (Hyderabad) from August 2023 to January 2024. " +
      "Developed EEG-based gesture-prediction models (Random Forest and 1D CNN in PyTorch) for an assistive healthcare " +
      "application that restores communication for paralysed individuals.",
  },
  {
    id: "exp-sandat",
    title: "Data Scientist — Sandat Web Solution, 2020/05 – 2023/08",
    section: "Experience",
    text:
      "Data Scientist at Sandat Web Solution (Pune) from May 2020 to August 2023. Built predictive models for financial " +
      "services (loan default and real-time fraud detection) and a Type-2 Diabetes monitoring system (RNN on CGM data) " +
      "integrated with Azure ADLS Gen2, SQL Server and Power BI. Ensured HIPAA-compliant processing, mentored junior data " +
      "scientists, and reduced false claims by 80%, lowering financial risk exposure for institutional clients.",
  },
  {
    id: "exp-early",
    title: "Earlier roles — Biomedical Engineer (OSR Group) and Instrumentation trainee (KOSO Kent Introl)",
    section: "Experience",
    text:
      "Before moving into data science, Rohit worked as a Biomedical Engineer at OSR Group, Aurangabad (September 2015 – " +
      "October 2017), and was an in-plant trainee Instrumentation & Control Engineer at KOSO Kent Introl Ltd, Nashik " +
      "(January – June 2013). His biomedical background informs his healthcare ML work (EEG, CGM glucose forecasting).",
  },

  // ── Education & certifications ─────────────────────────────────────
  {
    id: "education",
    title: "Education",
    section: "Education",
    text:
      "MS in Biomedical Engineering, University of Southampton, UK (September 2018 – September 2019). B.Tech in " +
      "Instrumentation & Control Engineering, Maharashtra Institute of Technology, Aurangabad, India (2009 – 2013).",
  },
  {
    id: "certifications",
    title: "Certifications",
    section: "Certifications",
    text:
      "Microsoft Certified: Azure AI Fundamentals (AI-900), Azure Fundamentals (AZ-900) and Azure Data Fundamentals " +
      "(DP-900). Simplilearn Certified Data Scientist Master's. Databricks Lakehouse Platform Accreditation. Google Cloud: " +
      "Transformer & BERT Models, Big Data & ML Fundamentals. Coursera: MLOps Fundamentals.",
  },

  // ── Projects (from the CV) ─────────────────────────────────────────
  {
    id: "proj-cms",
    title: "Correspondence Management System (CMACC) for EMEA and India",
    section: "Projects",
    text:
      "Gen AI project at LANXESS. Automated AI processing of 1,000+ daily emails with multi-class classification by " +
      "vendor, legal entity and country, integrated with Microsoft SharePoint and DIAP write-back for workflow orchestration " +
      "and data synchronisation. Impact: 96% less manual email handling, 80% faster responses, and vendor/legal-entity " +
      "assignment accuracy improved to 98%.",
  },
  {
    id: "proj-invoice-status",
    title: "Invoice Status Tool Bot",
    section: "Projects",
    text:
      "Gen AI project at LANXESS. A Python/FastAPI bot letting business, finance and vendor teams retrieve real-time invoice " +
      "status, payment and approval details in natural language. Robust invoice-number matching with leading-zero " +
      "normalisation and multi-format identifiers to avoid cross-vendor false matches; legal-entity extraction and SAP/DIAP " +
      "lookups across multiple entities and regions; deployed on AKS with structured logging. Impact: self-service " +
      "visibility into the invoice lifecycle, accelerating Accounts Payable query resolution.",
  },
  {
    id: "proj-mahnung",
    title: "Invoice Status Integration for the Mahnung (dunning) category in CMACC",
    section: "Projects",
    text:
      "Gen AI project at LANXESS. Extended CMACC to handle 'Mahnung' (dunning / payment-reminder) emails automatically by " +
      "integrating the Invoice Status Tool into classification and response: extracting invoice numbers and legal-entity " +
      "context, querying live invoice status, and threading the results into approver email drafts. Impact: automated " +
      "triage of a high-volume category and less manual handling of payment reminders.",
  },
  {
    id: "proj-ir-engine",
    title: "Investment Relationship Engine (Agentic RAG)",
    section: "Projects",
    text:
      "Gen AI project at LANXESS. Indexed 2,000+ financial documents and investor communications with DIAP pipelines and " +
      "Azure AI Search for semantic retrieval; RAG with LangGraph orchestration and autonomous agents with persistent memory; " +
      "deployed on AKS with horizontal pod autoscaling and Langfuse observability (prompt tracing, latency, cost). " +
      "Impact: 90% less document search and analysis time for investor-relations teams.",
  },
  {
    id: "proj-supervisor",
    title: "Supervisor Agent-Based Intent Routing (AskLANXESS)",
    section: "Projects",
    text:
      "Gen AI project at LANXESS. A supervisor orchestrator that routes queries by intent across the AskLANXESS umbrella to " +
      "the right specialist bot: Investment Relationship Engine, Market Mind, Knowledge Portal and AskHR. Rohit authored " +
      "per-bot agent cards describing each agent's scope and embedded the routing logic in the supervisor prompt. Impact: one " +
      "entry point for multiple domain bots with accurate intent-based routing.",
  },
  {
    id: "proj-marconi",
    title: "Marconi Delivery Agent",
    section: "Projects",
    text:
      "Gen AI project at LANXESS. An agent that retrieves delivered-product details and drafts customer responses to delivery " +
      "enquiries arriving in a customer-service mailbox, with Langfuse observability for prompt tracing, latency and cost. " +
      "Impact: automated delivery-status enquiry handling and faster customer turnaround.",
  },
  {
    id: "proj-bolt",
    title: "BOLT (Buying Optimization Legibility Transparency)",
    section: "Projects",
    text:
      "Gen AI project at LANXESS. A DIAP analysis pipeline integrating 6 data sources (5 from SAP L4P plus an AAD group file), " +
      "organising material-group data by country, and a FastAPI app with LangChain and Azure OpenAI GPT-4o, SQL queries and " +
      "streaming responses. Built with Azure DevOps, Spark and Blob Storage, deployed on AKS with autoscaling. Impact: " +
      "procurement analysis across 12+ countries, cutting executive report preparation from days to minutes.",
  },
  {
    id: "proj-levi",
    title: "Levi — AI-Driven Recruitment",
    section: "Projects",
    text:
      "Gen AI project at Cocolevio. RAG-based resume parsing and AI-generated interview questions using OpenAI, real-time " +
      "Whisper AI transcription and AI-powered candidate evaluation. Fine-tuned Phi-3 on custom data with MLflow for model " +
      "versioning and DVC for data versioning; Airflow for data collection; deployed to AWS SageMaker endpoints. Impact: 65% " +
      "efficiency gain and about 30% lower HR operational cost.",
  },
  {
    id: "proj-eeg",
    title: "Gesture Prediction with EEG Signals for Paralysed Individuals",
    section: "Projects",
    text:
      "ML/DL project. Decoded neural signals with Random Forest ensembles and 1D CNNs (PyTorch) to interpret gestures from EEG " +
      "data, working with neuroscience and assistive-technology experts on a communication application for people with " +
      "paralysis. MLflow on AWS Fargate (CloudFormation) for model versioning and DVC + S3 for data versioning.",
  },
  {
    id: "proj-diabetes",
    title: "Type-2 Diabetes Monitoring & Prediction (RNN)",
    section: "Projects",
    text:
      "ML/DL project. Collected and pre-processed CGM glucose data into ADLS Gen2 and Azure SQL Server; built ARIMA and RNN " +
      "models on glucose and meal history to forecast glucose levels and recommend lifestyle adjustments; real-time Power BI " +
      "visualisation. Impact: early detection of abnormal glucose trends.",
  },
  {
    id: "proj-fraud",
    title: "Predictive Analytics for Financial Services (fraud and default detection)",
    section: "Projects",
    text:
      "ML project at Sandat Web Solution. Real-time loan-default prediction, insurance fraud detection and financial risk " +
      "assessment models, with HIPAA-compliant processing. Impact: false claims reduced by 80%.",
  },
];
