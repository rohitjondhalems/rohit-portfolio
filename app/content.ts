/**
 * Site content — single source of truth for the page AND the "Ask about Rohit"
 * chatbot's knowledge base, so the two can never disagree.
 */

export type Project = {
  title: string;
  tag: string;
  category: "genai" | "mldl";
  desc: string;
  metrics: string;
  bullets: string[];
  github?: string;
};

export const contactInfo = {
  name: "Rohit Bhimrao Jondhale",
  title: "AI / ML Engineer",
  email: "rohitjondhalems@gmail.com",
  phone: "+91 7447783780",
  location: "Mumbai, India",
  linkedin: "https://linkedin.com/in/rohit-jondhale-ai-engineer",
  flowcv: "/Rohit_Jondhale_AI_Engineer_latest_CV.pdf", // Aligned with your added file
};

export const skills = {
  cloudMLOps: [
    "Azure (AKS, ADLS Gen2, Data Factory, Key Vault, DevOps)",
    "AWS (SageMaker, EC2, S3, Fargate, CloudFormation)",
    "MLflow, KubeFlow, Airflow, Docker, Kubernetes, DVC, CI/CD/CT"
  ],
  genAI: [
    "LangChain, LangGraph, LangFuse, RAG, AI Agents, LLMs (GPT-5 family, GPT-4o, Claude, Mistral)",
    "LiteLLM, vLLM, Whisper AI, Deep Learning, Computer Vision, Embeddings",
    "Azure AI Search, Document Intelligence, LoRA, QLoRA fine-tuning"
  ],
  languagesTools: [
    "Python, R, SQL, PySpark, Scala, FastAPI, Flask, Power BI, Git, Jira"
  ]
};

export const projects: Project[] = [
  {
    title: "InvoiceLens MCP Server",
    tag: "MCP & Agentic RAG",
    category: "genai",
    desc: "MCP server exposing invoice ingestion, semantic search, validated extraction and vendor research (market data + web search) as tools any LangGraph agent or Claude client can call, with a REST API on the same index.",
    metrics: "One server, reusable from any project: agents discover all five tools at runtime, with no shared code or keys on the client side.",
    bullets: [
      "Hybrid chunking keeps tables, header fields and totals as structural chunks and windows prose with overlap; text-embedding-3-large into persistent FAISS.",
      "LangGraph agent with a deterministic validation gate: arithmetic errors are fed back for re-extraction, and invoices failing twice are flagged for review.",
      "Vendor research via Financial Modeling Prep (price, market cap, growth) and Tavily web search, with caching and actionable errors; 74 offline tests in CI."
    ],
    github: "https://github.com/rohitjondhalems/invoicelens-mcp"
  },
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
    title: "Multi-Series Forecasting System",
    tag: "Time-Series MLOps",
    category: "mldl",
    desc: "Hourly forecasting service pairing a global LightGBM quantile model with a zero-shot Chronos foundation model, served via FastAPI with a Streamlit demo.",
    metrics: "One global model serves unseen series from their history alone, with conformal-calibrated 50%/90% prediction intervals.",
    bullets: [
      "Trained 5 quantile models across 10 series (245K rows), with and without covariates, for an honest exogenous-feature ablation.",
      "A train–serve parity test caught rolling-window leakage and unfrozen category codes; fixed and guarded in GitHub Actions CI.",
      "Dockerised API + UI started with a single docker compose up, with MLflow experiment tracking on Azure ML."
    ],
    github: "https://github.com/rohitjondhalems/multi-series-forecasting-system"
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

export const experience = [
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
