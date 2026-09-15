import type {
  CompetitionCategory,
  CompetitionStatus,
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

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}
