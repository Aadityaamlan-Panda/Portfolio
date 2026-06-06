// ─── Portfolio Data Types ───

export interface EmailInfo {
  academic: string;
  personal: string;
}

export interface Links {
  portfolio: string;
  github: string;
  linkedin: string;
  leetcode: string;
}

export interface Language {
  language: string;
  proficiency: string;
}

export interface Personal {
  name: string;
  also_known_as: string;
  date_of_birth: string;
  hometown: string;
  current_location: string;
  phone: string;
  email: EmailInfo;
  links: Links;
  headline: string;
  tagline: string;
  typewriter_options: string[];
  bio_short: string;
  bio_long: string;
  languages: Language[];
  interests: string[];
  availability: string;
  notable_quote: string;
}

export interface RelevantCourses {
  mathematics: string[];
  computing: string[];
  chemical_engineering: string[];
  economics: string[];
}

export interface Education {
  institution: string;
  degree?: string;
  field?: string;
  minor?: string;
  period?: string;
  gpa?: string;
  location: string;
  activities?: string[];
  relevant_courses?: RelevantCourses;
  board_12th?: string;
  score_12th?: string;
  year_12th?: string;
  board_10th?: string;
  score_10th?: string;
  year_10th?: string;
  activities_12th?: string[];
  activities_10th?: string[];
}

export interface ImpactMetrics {
  prototypes_built: number;
  problem_statements: string;
  hackathon_teams_enabled: string;
  school_innovation_initiatives?: string;
  frontend_complexity_reduction: string;
}

export interface ExperienceResponsibilities {
  ai_api_integration: string[];
  prototyping_frontend: string[];
  vision_automation: string[];
  mentorship_delivery: string[];
}

export interface Experience {
  title: string;
  company: string;
  linkedin_title?: string;
  period: string;
  location: string;
  responsibilities?: ExperienceResponsibilities;
  highlights?: string[];
  impact_metrics: ImpactMetrics;
}

export interface Skills {
  programming_languages: string[];
  ai_ml_data_science: string[];
  backend_apis: string[];
  frontend_web: string[];
  xr_game_3d: string[];
  chemical_engineering_tools: string[];
  audio_video: string[];
  devops_tools: string[];
  domain_tags?: string[];
}

// ─── Projects ───

export interface ProjectLinks {
  github?: string;
  github_desktop_web?: string;
  live_backend?: string;
  vr_repo?: string;
  demo?: string;
  live_app?: string;
}

export interface RAGResults {
  ragas_context_precision: number;
  ragas_context_recall: number;
  ragas_faithfulness: number;
  ragas_answer_relevancy: number;
  unit_integration_tests_passing: number;
  e2e_tests_passing: number;
  e2e_runtime_seconds: number;
  knowledge_base_size: string;
  repos_ingested: number;
  languages_indexed: string[];
}

export interface PilotStudy {
  participants: number;
  quiz_accuracy_round1: string;
  quiz_accuracy_round2: string;
  accuracy_gain_pp: string;
  response_time_r1_sec: number;
  response_time_r2_sec: number;
  response_time_reduction_pct: string;
  zero_hint_usage_in_r2: string;
  learning_efficacy_rating: string;
  vr_aided_quiz_rating: string;
}

export interface VRResults {
  pilot_study: PilotStudy;
  concepts_encoded: number;
  api_endpoints: number;
  scene_gameobjects: number;
  research_paper: string;
}

// Union of possible result shapes
export type ProjectResults =
  | RAGResults
  | VRResults
  | Record<string, string | number | string[] | boolean>;

export interface VRTechStack {
  vr_client: string[];
  backend: string[];
  database: string;
  orm: string;
  web_dashboard: string;
  quiz_analysis: string[];
  deployment: string[];
  build_targets: string[];
}

export type TechStack = string[] | VRTechStack;

export type ProjectPeriod = string | { vr_build: string; desktop_web_build: string };

export type ProjectTier = 'flagship' | 'strong_sde' | 'domain_engineering';

export interface Project {
  id: string;
  tier: ProjectTier;
  name: string;
  tagline: string;
  one_liner?: string;
  category: string[];
  period: ProjectPeriod;
  team_size: number;
  team_members?: string[];
  type?: string;
  role?: string;
  supervisor?: string;
  problem?: string;
  tech_stack: TechStack;
  key_features: string[];
  results?: ProjectResults;
  links?: ProjectLinks;
  languages_supported?: string[];
  products?: string[];
  course?: string;
}

// ─── Achievements ───

export interface AcademicAward {
  award: string;
  description: string;
  year?: string;
  years?: string[];
  institution?: string;
  rank?: number;
}

export interface AnthologyPublication {
  title: string;
  publisher: string;
  link?: string;
}

export interface CreativeLiteraryAward {
  award: string;
  description: string;
  year?: string;
  institution?: string;
  publications?: AnthologyPublication[];
  publication?: string;
  translated_work?: string;
}

export interface SportsAward {
  award: string;
  competition: string;
  details: string;
  year: string;
}

export interface Achievements {
  academic: AcademicAward[];
  creative_literary: CreativeLiteraryAward[];
  sports: SportsAward[];
}

// ─── Creative Writing ───

export interface Translation {
  title: string;
  direction: string;
  published_in: string;
  note: string;
}

export interface CreativeWriting {
  summary: string;
  github_repo: string;
  poetry_count: number;
  articles_count: number;
  stories_count: number;
  selected_poems: string[];
  stories: string[];
  translations: Translation[];
}

// ─── Key Metrics ───

export interface KeyMetrics {
  cpi_iit_kanpur: string;
  jee_advanced_air: number;
  academic_excellence_awards: number;
  internship_prototypes_built: number;
  hackathon_teams_enabled: string;
  rag_context_precision: number;
  rag_context_recall: number;
  vr_quiz_accuracy_gain_pp: number;
  vr_response_time_reduction_pct: number;
  eb_tac_reduction_pct: number;
  pid_improvement_over_classical_pi: string;
  puf_model_train_time_seconds: number;
  puf_speedup: string;
  financial_ml_accuracy: string;
  published_anthologies: number;
  poems_written: string;
  matlab_scripts_keller_segel: string;
  vr_concepts_encoded: number;
  methyl_benzoate_annual_profit: string;
  spring_boot_api_endpoints: number;
}

// ─── Root Portfolio ───

export interface Portfolio {
  personal: Personal;
  education: Education[];
  experience: Experience[];
  skills: Skills;
  projects: Project[];
  achievements: Achievements;
  creative_writing: CreativeWriting;
  key_metrics: KeyMetrics;
}
