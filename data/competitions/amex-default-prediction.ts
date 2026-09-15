import type { Competition } from "@/types/competition";

// NOTE: Validation data for the MVP. Vote counts, summaries, team names and
// links are approximate and should be replaced with real Kaggle data before
// release.
const KAGGLE = "https://www.kaggle.com/competitions/amex-default-prediction";

export const amexDefaultPrediction: Competition = {
  slug: "amex-default-prediction",
  title: "American Express - Default Prediction",
  description:
    "Predict if a customer will default in the future from monthly credit-card profile data.",
  kaggleUrl: KAGGLE,

  category: "tabular",
  taskType: "binary_classification",
  tags: ["tabular", "binary classification", "finance", "credit risk", "large data"],

  metric: "Amex metric (Gini + default rate @4%)",
  metricDescription:
    "Mean of the normalized Gini coefficient and the default rate captured at 4% (share of positives in the top 4% of predictions, with negatives weighted 20x). Higher is better.",

  startDate: "2022-05-25",
  endDate: "2022-08-24",
  prize: "$100,000",
  teamCount: 4874,
  status: "completed",

  taskSummary:
    "Each customer has up to 13 monthly statements with ~190 anonymized features (delinquency, spend, payment, balance and risk variables). Predict the probability that the customer does not pay their balance within 120 days of the latest statement.",
  submissionFormat:
    "A CSV with columns customer_ID and prediction (probability of default) for every customer in test_data.csv.",
  rules: [
    "External data is not allowed.",
    "Maximum team size of 5.",
    "Up to 5 submissions per day; 2 final submissions selected for scoring.",
  ],

  datasets: [
    {
      name: "train_data.csv",
      size: "16.4 GB",
      rows: 5531451,
      columns: 190,
      description:
        "Monthly statements for training customers. One row per customer per statement date.",
    },
    {
      name: "train_labels.csv",
      size: "30 MB",
      rows: 458913,
      columns: 2,
      description: "Target label per customer_ID.",
    },
    {
      name: "test_data.csv",
      size: "33.8 GB",
      rows: 11363762,
      columns: 189,
      description: "Monthly statements for test customers.",
    },
    {
      name: "sample_submission.csv",
      size: "60 MB",
      rows: 924621,
      columns: 2,
      description: "Submission format.",
    },
  ],

  discussions: [
    {
      id: "d1",
      title: "Denoised integer-dtype parquet version of the data",
      author: "Kaggle community",
      votes: 1100,
      commentCount: 130,
      summary:
        "The raw floats contain artificially added noise. A community-shared parquet version rounds them back to their original integer-like values and cuts memory ~10x. Almost every top team used it.",
      url: `${KAGGLE}/discussion`,
      createdAt: "2022-06-02",
    },
    {
      id: "d2",
      title: "Understanding the Amex metric",
      author: "Kaggle community",
      votes: 640,
      commentCount: 55,
      summary:
        "Reference implementation of the metric in NumPy, plus discussion of how the 4% capture term rewards ranking the riskiest customers correctly.",
      url: `${KAGGLE}/discussion`,
      createdAt: "2022-05-26",
    },
    {
      id: "d3",
      title: "LightGBM DART is surprisingly strong",
      author: "Kaggle community",
      votes: 590,
      commentCount: 72,
      summary:
        "LightGBM with the DART booster consistently outscores GBDT on this data by ~0.002–0.004 metric, at the cost of much longer training.",
      url: `${KAGGLE}/discussion`,
      createdAt: "2022-06-20",
    },
    {
      id: "d4",
      title: "Aggregation features per customer: last, mean, min, max, std",
      author: "Kaggle community",
      votes: 520,
      commentCount: 48,
      summary:
        "Collapsing the 13 statements into per-customer aggregates, especially the last value and last − mean differences, is the backbone of nearly every strong model.",
      url: `${KAGGLE}/discussion`,
      createdAt: "2022-06-08",
    },
    {
      id: "d5",
      title: "CV vs public LB correlation",
      author: "Kaggle community",
      votes: 410,
      commentCount: 36,
      summary:
        "5-fold CV on train_labels tracks the public LB closely (within ~0.001). Trust CV; the private LB reshuffled very little.",
      url: `${KAGGLE}/discussion`,
      createdAt: "2022-07-11",
    },
    {
      id: "d6",
      title: "Handling memory: cudf / polars / chunked reading",
      author: "Kaggle community",
      votes: 380,
      commentCount: 41,
      summary:
        "The CSVs do not fit in Kaggle's RAM. Use the parquet data, downcast dtypes, and build features per chunk or on GPU with RAPIDS.",
      url: `${KAGGLE}/discussion`,
      createdAt: "2022-06-05",
    },
    {
      id: "d7",
      title: "Sequence models on the raw statement history",
      author: "Kaggle community",
      votes: 300,
      commentCount: 29,
      summary:
        "GRU / transformer models over the 13-step sequences reach ~0.79 alone and add real diversity when blended with GBDT aggregates.",
      url: `${KAGGLE}/discussion`,
      createdAt: "2022-07-25",
    },
  ],

  insights: [
    {
      id: "i1",
      type: "cv_strategy",
      title: "5-fold StratifiedKFold on customers",
      content:
        "Split by customer_ID (one label per customer) with 5-fold StratifiedKFold. CV correlated with the public LB within ~0.001 and the private LB shake-up was small, so CV-driven decisions were safe.",
      sources: [
        { type: "discussion", id: "d5" },
        { type: "solution", id: "s1" },
      ],
    },
    {
      id: "i2",
      type: "baseline",
      title: "LightGBM DART on per-customer aggregates",
      content:
        "Aggregate each feature per customer (last, mean, min, max, std, first, last − mean) from the denoised parquet data and train LightGBM with the DART booster. This reaches ~0.797 CV / ~0.799 public LB with minimal tuning.",
      sources: [
        { type: "discussion", id: "d3" },
        { type: "discussion", id: "d4" },
        { type: "notebook", id: "n1" },
      ],
    },
    {
      id: "i3",
      type: "dataset",
      title: "Use the denoised data",
      content:
        "The raw floats have random noise added; rounding to the underlying integer scale (available as community parquet files) both shrinks memory ~10x and slightly improves scores. P_2 is by far the most important single feature.",
      sources: [
        { type: "discussion", id: "d1" },
        { type: "discussion", id: "d6" },
      ],
    },
    {
      id: "i4",
      type: "pitfall",
      title: "Common pitfalls",
      content:
        "- Loading the raw CSVs into pandas and running out of memory\n- Implementing the metric incorrectly — use the reference implementation\n- Aggregating without keeping the most recent statement (the 'last' values carry most of the signal)\n- Not aligning train and test statement counts (some customers have fewer than 13 months)",
      sources: [
        { type: "discussion", id: "d2" },
        { type: "discussion", id: "d4" },
        { type: "discussion", id: "d6" },
      ],
    },
    {
      id: "i5",
      type: "metric",
      title: "The metric rewards the top 4%",
      content:
        "Half of the score is the default rate captured in the top 4% of predictions, so ranking the highest-risk customers correctly matters more than overall calibration. Rank-average when blending.",
      sources: [{ type: "discussion", id: "d2" }],
    },
    {
      id: "i6",
      type: "faq",
      title: "Is a GPU required?",
      content:
        "Not for a strong GBDT baseline, though DART training is slow on CPU (hours). Sequence models and RAPIDS-based feature engineering benefit from a GPU.",
      sources: [
        { type: "discussion", id: "d3" },
        { type: "discussion", id: "d7" },
      ],
    },
  ],

  solutions: [
    {
      id: "s1",
      rank: 1,
      teamName: "1st place team",
      title: "1st place solution",
      url: `${KAGGLE}/discussion`,
      summary:
        "Ensemble of LightGBM DART models on extensive per-customer aggregates plus neural networks on the raw sequences, with meta-features derived from statement counts and dates.",
      models: ["LightGBM (DART)", "GRU", "Transformer"],
      cvStrategy: "5-fold StratifiedKFold by customer",
      featureEngineering: [
        "Last / mean / min / max / std aggregates and last − mean differences",
        "Statement-date gaps and number of statements per customer",
        "Target encoding of categorical columns with out-of-fold statistics",
      ],
      ensemble: "Rank-averaged blend of ~20 GBDT and NN models",
    },
    {
      id: "s2",
      rank: 2,
      teamName: "2nd place team",
      title: "2nd place solution",
      url: `${KAGGLE}/discussion`,
      summary:
        "Large diverse pool of LightGBM, XGBoost and CatBoost models on different feature subsets, stacked with a ridge meta-model.",
      models: ["LightGBM", "XGBoost", "CatBoost", "Ridge stacker"],
      cvStrategy: "5-fold StratifiedKFold, repeated with 3 seeds",
      featureEngineering: [
        "Aggregates over the last 3, 6 and 13 statements",
        "Feature selection by adversarial validation and permutation importance",
      ],
      ensemble: "Two-level stacking",
    },
    {
      id: "s3",
      rank: 3,
      teamName: "3rd place team",
      title: "3rd place solution",
      url: `${KAGGLE}/discussion`,
      summary:
        "Transformer over the monthly statements with heavy augmentation, blended with a LightGBM DART model.",
      models: ["Transformer", "LightGBM (DART)"],
      cvStrategy: "5-fold StratifiedKFold by customer",
      featureEngineering: [
        "Raw 13 x 190 statement tensors with NaN indicator channels",
        "Random statement dropout as augmentation",
      ],
      ensemble: "Weighted average of NN and GBDT",
    },
  ],

  notebooks: [
    {
      id: "n1",
      title: "Amex LightGBM DART baseline with aggregations",
      author: "Kaggle community",
      votes: 950,
      score: "0.797",
      url: `${KAGGLE}/code`,
      category: "baseline",
      tags: ["lightgbm", "dart", "aggregation"],
    },
    {
      id: "n2",
      title: "Amex EDA: what do the feature groups mean?",
      author: "Kaggle community",
      votes: 1200,
      url: `${KAGGLE}/code`,
      category: "eda",
      tags: ["eda", "feature groups"],
    },
    {
      id: "n3",
      title: "Feature engineering with RAPIDS cudf",
      author: "Kaggle community",
      votes: 700,
      url: `${KAGGLE}/code`,
      category: "feature_engineering",
      tags: ["rapids", "gpu", "aggregation"],
    },
    {
      id: "n4",
      title: "Amex GRU sequence model in PyTorch",
      author: "Kaggle community",
      votes: 520,
      score: "0.790",
      url: `${KAGGLE}/code`,
      category: "modeling",
      tags: ["gru", "pytorch", "sequence"],
    },
    {
      id: "n5",
      title: "Fast inference on the 11M-row test set",
      author: "Kaggle community",
      votes: 300,
      url: `${KAGGLE}/code`,
      category: "inference",
      tags: ["inference", "memory"],
    },
  ],
};
