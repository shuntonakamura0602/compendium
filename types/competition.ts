/**
 * Core data model for a Kaggle competition as shown in Compendium.
 *
 * The MVP reads these from static TypeScript files under `data/`. The shapes
 * mirror the planned DB tables (spec §19) so they can be backed by a database
 * or the Kaggle API later without changing the UI.
 */

export type CompetitionStatus = "active" | "completed";

export type CompetitionCategory =
  | "tabular"
  | "cv"
  | "nlp"
  | "time_series"
  | "recommendation"
  | "playground";

export type TaskType =
  | "binary_classification"
  | "multiclass_classification"
  | "regression"
  | "ranking"
  | "forecasting"
  | "other";

export type InsightType =
  | "cv_strategy"
  | "baseline"
  | "pitfall"
  | "leakage"
  | "metric"
  | "dataset"
  | "faq";

export type NotebookCategory =
  | "baseline"
  | "eda"
  | "feature_engineering"
  | "modeling"
  | "inference";

export interface DatasetFile {
  name: string;
  /** Human-readable size, e.g. "158 MB". */
  size?: string;
  rows?: number;
  columns?: number;
  description?: string;
}

export interface Discussion {
  id: string;
  title: string;
  author: string;
  votes: number;
  commentCount?: number;
  /** Short summary of why this discussion matters. */
  summary: string;
  url: string;
  /** ISO date (YYYY-MM-DD). */
  createdAt?: string;
}

/** A reference from an AI/human-written insight back to its source (spec §22). */
export interface InsightSource {
  type: "discussion" | "solution" | "notebook";
  /** Id of a Discussion / Solution / Notebook within the same competition. */
  id: string;
}

export interface Insight {
  id: string;
  type: InsightType;
  title: string;
  /** Markdown-ish plain text. Line breaks are preserved. */
  content: string;
  sources: InsightSource[];
}

export interface Solution {
  id: string;
  rank: number;
  teamName: string;
  title: string;
  url: string;
  summary: string;
  models?: string[];
  cvStrategy?: string;
  featureEngineering?: string[];
  ensemble?: string;
  githubUrl?: string;
  notebookUrl?: string;
}

export interface Notebook {
  id: string;
  title: string;
  author: string;
  votes: number;
  /** Public leaderboard score of the notebook, if any. */
  score?: string;
  url: string;
  category: NotebookCategory;
  tags?: string[];
}

export interface Competition {
  slug: string;
  title: string;
  /** One-line description shown in the header and on cards. */
  description: string;
  kaggleUrl: string;

  category: CompetitionCategory;
  taskType: TaskType;
  tags: string[];

  metric: string;
  /** e.g. "Higher is better." */
  metricDescription?: string;

  /** ISO dates (YYYY-MM-DD). endDate is omitted for rolling "Getting Started" competitions. */
  startDate: string;
  endDate?: string;
  prize?: string;
  teamCount?: number;
  status: CompetitionStatus;

  /** Longer explanation of the task (Overview > Goal). */
  taskSummary: string;
  submissionFormat?: string;
  /** Key rule points, e.g. external data policy. */
  rules: string[];

  datasets: DatasetFile[];
  /** Free-text note shown above the file list, e.g. when data is no longer available. */
  datasetNote?: string;
  discussions: Discussion[];
  insights: Insight[];
  solutions: Solution[];
  notebooks: Notebook[];
}
