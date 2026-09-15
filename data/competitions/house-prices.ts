import type { Competition } from "@/types/competition";

// NOTE: Validation data for the MVP. Vote counts, summaries and links are
// approximate and should be replaced with real Kaggle data before release.
const KAGGLE =
  "https://www.kaggle.com/competitions/house-prices-advanced-regression-techniques";

export const housePrices: Competition = {
  slug: "house-prices-advanced-regression-techniques",
  title: "House Prices - Advanced Regression Techniques",
  description:
    "Predict sales prices of homes in Ames, Iowa from 79 explanatory variables.",
  kaggleUrl: KAGGLE,

  category: "playground",
  taskType: "regression",
  tags: ["getting started", "regression", "tabular", "feature engineering"],

  metric: "RMSLE",
  metricDescription:
    "Root mean squared error between the log of the predicted price and the log of the observed price. Lower is better.",

  startDate: "2016-08-30",
  prize: "Knowledge",
  teamCount: 4500,
  status: "active",

  taskSummary:
    "Given 79 features describing residential homes in Ames, Iowa (lot size, quality ratings, year built, neighborhood, etc.), predict the final sale price of each house in the test set.",
  submissionFormat:
    "A CSV with columns Id and SalePrice (predicted price in dollars) for each of the 1,459 houses in test.csv.",
  rules: [
    "Getting Started competition: no prizes and no points or medals.",
    "Rolling leaderboard — submissions expire after two months.",
    "The underlying Ames Housing dataset is public, so leaderboard scores near zero come from lookups rather than models.",
  ],

  datasets: [
    {
      name: "train.csv",
      size: "460 KB",
      rows: 1460,
      columns: 81,
      description: "Training set including SalePrice.",
    },
    {
      name: "test.csv",
      size: "451 KB",
      rows: 1459,
      columns: 80,
      description: "Test set without SalePrice.",
    },
    {
      name: "data_description.txt",
      size: "13 KB",
      description:
        "Full description of every column, including the meaning of ordinal quality codes.",
    },
    {
      name: "sample_submission.csv",
      size: "31 KB",
      rows: 1459,
      columns: 2,
      description: "Benchmark submission from a linear regression on year and area.",
    },
  ],

  discussions: [
    {
      id: "d1",
      title: "Log-transform the target before training",
      author: "Kaggle community",
      votes: 380,
      commentCount: 45,
      summary:
        "Because the metric is RMSLE, fit models on log1p(SalePrice) and exponentiate predictions. This alone moves a linear model from ~0.20 to ~0.13.",
      url: `${KAGGLE}/discussion`,
      createdAt: "2016-10-04",
    },
    {
      id: "d2",
      title: "The two GrLivArea outliers",
      author: "Kaggle community",
      votes: 290,
      commentCount: 38,
      summary:
        "Two houses with GrLivArea > 4000 sq ft sold for very little (partial sales). Removing them improves linear models noticeably; the dataset author recommends it.",
      url: `${KAGGLE}/discussion`,
      createdAt: "2016-11-15",
    },
    {
      id: "d3",
      title: "Regularized linear models beat trees here",
      author: "Kaggle community",
      votes: 255,
      commentCount: 30,
      summary:
        "With ~1,460 rows, Lasso / Ridge / ElasticNet on well-encoded features often score better than a single GBM. Blending both is the standard recipe.",
      url: `${KAGGLE}/discussion`,
      createdAt: "2017-01-22",
    },
    {
      id: "d4",
      title: "How to treat 'NA' values that mean 'none'",
      author: "Kaggle community",
      votes: 210,
      commentCount: 27,
      summary:
        "For columns like PoolQC, Alley, Fence and GarageType, NA means the feature does not exist, not missing data. Fill with 'None' or 0 instead of imputing.",
      url: `${KAGGLE}/discussion`,
      createdAt: "2016-12-08",
    },
    {
      id: "d5",
      title: "Ordinal encoding of quality columns",
      author: "Kaggle community",
      votes: 175,
      commentCount: 19,
      summary:
        "Map Ex/Gd/TA/Fa/Po to 5..1 for the *Qual and *Cond columns so linear models can use them directly.",
      url: `${KAGGLE}/discussion`,
      createdAt: "2017-02-14",
    },
    {
      id: "d6",
      title: "Public LB scores below 0.10 are not real",
      author: "Kaggle community",
      votes: 160,
      commentCount: 22,
      summary:
        "The Ames dataset is public, so scores far below ~0.11 come from label lookups. A strong honest blend lands around 0.11–0.12.",
      url: `${KAGGLE}/discussion`,
      createdAt: "2018-05-30",
    },
  ],

  insights: [
    {
      id: "i1",
      type: "cv_strategy",
      title: "5-fold KFold on log target",
      content:
        "Plain 5-fold KFold (shuffled) with RMSE on log1p(SalePrice) matches the leaderboard metric. Repeat with several seeds — with 1,460 rows fold assignment matters.",
      sources: [
        { type: "discussion", id: "d1" },
        { type: "notebook", id: "n1" },
      ],
    },
    {
      id: "i2",
      type: "baseline",
      title: "Lasso + GBM blend",
      content:
        "Lasso (alpha ≈ 0.0005) on one-hot + ordinal-encoded features with skewed numerics Box-Cox transformed scores ~0.12 CV. Averaging it with a gradient boosting model (XGBoost/LightGBM) gives ~0.115.",
      sources: [
        { type: "discussion", id: "d3" },
        { type: "notebook", id: "n1" },
      ],
    },
    {
      id: "i3",
      type: "pitfall",
      title: "Common pitfalls",
      content:
        "- Training on the raw SalePrice instead of its log\n- Imputing 'NA' for features that simply do not exist (no pool, no garage)\n- Leaving the two GrLivArea > 4000 outliers in when fitting linear models\n- Fitting scalers or imputers on train + test together\n- Comparing against leaderboard scores that come from public label lookups",
      sources: [
        { type: "discussion", id: "d1" },
        { type: "discussion", id: "d2" },
        { type: "discussion", id: "d4" },
        { type: "discussion", id: "d6" },
      ],
    },
    {
      id: "i4",
      type: "dataset",
      title: "Feature engineering that consistently helps",
      content:
        "- TotalSF = TotalBsmtSF + 1stFlrSF + 2ndFlrSF\n- Ordinal encoding for quality/condition columns\n- Age features: YrSold − YearBuilt, YrSold − YearRemodAdd\n- Treat MSSubClass as categorical, not numeric",
      sources: [
        { type: "discussion", id: "d5" },
        { type: "notebook", id: "n2" },
      ],
    },
    {
      id: "i5",
      type: "metric",
      title: "RMSLE penalizes relative error",
      content:
        "Because errors are measured on the log scale, a $20k miss on a $100k house costs as much as a $100k miss on a $500k house. Models should be evaluated and blended on the log scale.",
      sources: [{ type: "discussion", id: "d1" }],
    },
  ],

  // Getting Started competition: there are no winning solutions to curate.
  solutions: [],

  notebooks: [
    {
      id: "n1",
      title: "Stacked Regressions: Top 4% on LeaderBoard",
      author: "Kaggle community",
      votes: 8400,
      score: "0.115",
      url: `${KAGGLE}/code`,
      category: "modeling",
      tags: ["stacking", "lasso", "xgboost"],
    },
    {
      id: "n2",
      title: "Comprehensive data exploration with Python",
      author: "Kaggle community",
      votes: 9100,
      url: `${KAGGLE}/code`,
      category: "eda",
      tags: ["eda", "correlation", "outliers"],
    },
    {
      id: "n3",
      title: "Regularized Linear Models",
      author: "Kaggle community",
      votes: 4300,
      score: "0.121",
      url: `${KAGGLE}/code`,
      category: "baseline",
      tags: ["lasso", "ridge", "log target"],
    },
    {
      id: "n4",
      title: "A study on Regression applied to the Ames dataset",
      author: "Kaggle community",
      votes: 2900,
      score: "0.118",
      url: `${KAGGLE}/code`,
      category: "feature_engineering",
      tags: ["feature engineering", "polynomial features"],
    },
  ],
};
