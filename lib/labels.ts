import type {
  CompetitionCategory,
  CompetitionStatus,
  InsightType,
  NotebookCategory,
  TaskType,
} from "@/types/competition";

/** Display labels for enum-like fields, shared by cards, filters and headers. */

export const categoryLabels: Record<CompetitionCategory, string> = {
  tabular: "Tabular",
  cv: "CV",
  nlp: "NLP",
  time_series: "Time Series",
  recommendation: "Recommendation",
  playground: "Playground",
};

export const taskTypeLabels: Record<TaskType, string> = {
  binary_classification: "Binary Classification",
  multiclass_classification: "Multiclass Classification",
  regression: "Regression",
  ranking: "Ranking",
  forecasting: "Forecasting",
  other: "Other",
};

export const statusLabels: Record<CompetitionStatus, string> = {
  active: "Active",
  completed: "Completed",
};

export const categoryValues = Object.keys(
  categoryLabels,
) as CompetitionCategory[];

export const statusValues = Object.keys(statusLabels) as CompetitionStatus[];

export function isCategory(value: unknown): value is CompetitionCategory {
  return typeof value === "string" && value in categoryLabels;
}

export function isStatus(value: unknown): value is CompetitionStatus {
  return typeof value === "string" && value in statusLabels;
}

/** Insight groups in display order (spec §8). */
export const insightTypeLabels: Record<InsightType, string> = {
  cv_strategy: "CV Strategy",
  baseline: "Strong Baseline",
  pitfall: "Common Pitfalls",
  leakage: "Data Leakage",
  metric: "Metric Notes",
  dataset: "Dataset Notes",
  faq: "FAQ",
};

export const insightTypeValues = Object.keys(insightTypeLabels) as InsightType[];

/** Notebook groups in display order (spec §10). */
export const notebookCategoryLabels: Record<NotebookCategory, string> = {
  baseline: "Baseline",
  eda: "EDA",
  feature_engineering: "Feature Engineering",
  modeling: "Modeling",
  inference: "Inference",
};

export const notebookCategoryValues = Object.keys(
  notebookCategoryLabels,
) as NotebookCategory[];
