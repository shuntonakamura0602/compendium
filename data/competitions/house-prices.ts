import type { Competition } from "@/types/competition";

// Sources: Kaggle competition metadata and file list (Kaggle API), discussion
// titles / votes / authors and notebook votes (Kaggle, fetched 2026-09-16).
// Summaries and insights are written by hand from the linked threads.
const KAGGLE =
  "https://www.kaggle.com/competitions/house-prices-advanced-regression-techniques";
const D = `${KAGGLE}/discussion`;
const CODE = "https://www.kaggle.com/code";

export const housePrices: Competition = {
  slug: "house-prices-advanced-regression-techniques",
  title: "House Prices - Advanced Regression Techniques",
  description:
    "Predict sales prices and practice feature engineering, RFs, and gradient boosting.",
  kaggleUrl: KAGGLE,

  category: "playground",
  taskType: "regression",
  tags: ["getting started", "tabular", "regression", "feature engineering"],

  metric: "RMSLE",
  metricDescription:
    "Root mean squared error between the logarithm of the predicted price and the logarithm of the observed sale price, so errors on cheap and expensive houses count equally. Lower is better.",

  startDate: "2016-08-30",
  prize: "Knowledge",
  teamCount: 3186,
  status: "active",

  taskSummary:
    "With 79 explanatory variables describing almost every aspect of residential homes in Ames, Iowa (lot size, quality ratings, year built, neighborhood, basement and garage details, …), predict the final sale price of each house in the test set. The Ames Housing dataset was compiled by Dean De Cock as a modern replacement for the Boston Housing data.",
  submissionFormat:
    "A CSV with a header and columns Id and SalePrice (predicted price in dollars) for each of the 1,459 houses in test.csv.",
  rules: [
    "Getting Started competition: no prizes, points or medals.",
    "External data is allowed if it is publicly available to all participants at no cost — the original Ames dataset is public, which is how near-zero leaderboard scores are produced.",
    "Rolling leaderboard: submissions expire after two months.",
    "Up to 10 submissions per day; maximum team size 10.",
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
        "Full description of each column, originally prepared by Dean De Cock and lightly edited to match the column names.",
    },
    {
      name: "sample_submission.csv",
      size: "31 KB",
      rows: 1459,
      columns: 2,
      description:
        "Benchmark submission from a linear regression on year and month of sale, lot square footage and number of bedrooms.",
    },
  ],

  discussions: [
    {
      id: "163335",
      title: "Getting Started Competitions - 100% Public Leaderboard",
      author: "Will Cukierski",
      votes: 626,
      commentCount: 23,
      summary:
        "Official note that the test labels are public, so perfect (0.00000) scores are lookups. Judge your model against honest scores, not the top of the board.",
      url: `${D}/163335`,
      createdAt: "2020-07-01",
    },
    {
      id: "83751",
      title: "House Prices Solution [top 1%]",
      author: "Nanashi",
      votes: 111,
      commentCount: 74,
      summary:
        "Companion thread to the #1 House Prices Solution notebook: log1p target, outlier removal, Box-Cox on skewed features and a blend of regularized linear models with gradient boosting.",
      url: `${D}/83751`,
      createdAt: "2019-03-12",
    },
    {
      id: "23409",
      title: "Sharing my approach to motivate more discussions",
      author: "MeiChengShih",
      votes: 96,
      commentCount: 60,
      summary:
        "One of the earliest shared write-ups on this data, opening the discussion of which feature transformations and regularized models work.",
      url: `${D}/23409`,
      createdAt: "2016-09-06",
    },
    {
      id: "117853",
      title: "Top 1% score with data leakage",
      author: "Vidar",
      votes: 53,
      commentCount: 24,
      summary:
        "Demonstrates that the public Ames dataset can be joined to the test set to reach the top 1% — a warning that leaderboard rank near the top says nothing about modelling skill.",
      url: `${D}/117853`,
      createdAt: "2019-11-18",
    },
    {
      id: "444859",
      title: "🏡 16 Tips for Kaggle Beginners 🏘️",
      author: "Joakim Arvidsson",
      votes: 43,
      commentCount: 21,
      summary:
        "Practical checklist for this competition: read data_description.txt, treat NA as 'none' where appropriate, log the target, and validate with K-fold before submitting.",
      url: `${D}/444859`,
      createdAt: "2023-10-04",
    },
    {
      id: "170472",
      title:
        "Top 3% housing: 8 Insights, 4 Learnings and 2 Questions (after 50+ hours)",
      author: "Jesse van Elteren",
      votes: 39,
      commentCount: 11,
      summary:
        "Retrospective on what actually moved the score after 50+ hours: target log-transform, outlier removal and model blending mattered; heavy hyperparameter tuning did not.",
      url: `${D}/170472`,
      createdAt: "2020-07-27",
    },
    {
      id: "105648",
      title: "[1299, 524] considered harmful",
      author: "Robert Stockton",
      votes: 17,
      commentCount: 0,
      summary:
        "About the two well-known outliers (Id 524 and 1299: huge GrLivArea, low price). Argues for thinking about why they exist rather than blindly copying the 'drop them' step.",
      url: `${D}/105648`,
      createdAt: "2019-08-25",
    },
    {
      id: "60861",
      title:
        "Why do so many Kagglers perform log transformation on independent variables?",
      author: "Michael H",
      votes: 17,
      commentCount: 13,
      summary:
        "Discussion of when log / Box-Cox transforms of skewed features help (linear models) and when they are unnecessary (tree models).",
      url: `${D}/60861`,
      createdAt: "2018-07-11",
    },
    {
      id: "35968",
      title: "Dealing with Missing Data in the Test Dataset",
      author: "Femi Ogunbode",
      votes: 26,
      commentCount: 11,
      summary:
        "The test set has missing values in columns that are complete in train; how to impute them consistently without fitting on test.",
      url: `${D}/35968`,
      createdAt: "2017-07-08",
    },
  ],

  insights: [
    {
      id: "i1",
      type: "cv_strategy",
      title: "K-fold RMSE on the log target",
      content:
        "Evaluate with 5-fold (or repeated) KFold using RMSE on log1p(SalePrice) — exactly the leaderboard metric. With 1,460 rows fold assignment matters, so repeat with several seeds before trusting a 0.001 improvement.",
      sources: [
        { type: "discussion", id: "444859" },
        { type: "notebook", id: "serigne/stacked-regressions-top-4-on-leaderboard" },
      ],
    },
    {
      id: "i2",
      type: "baseline",
      title: "Regularized linear models + gradient boosting blend",
      content:
        "Lasso / Ridge / ElasticNet on one-hot and ordinal-encoded features with Box-Cox-transformed skewed numerics score ~0.11–0.12 CV. Averaging with XGBoost / LightGBM gives a small further gain; this recipe is the basis of nearly every top public notebook.",
      sources: [
        { type: "notebook", id: "serigne/stacked-regressions-top-4-on-leaderboard" },
        { type: "notebook", id: "apapiu/regularized-linear-models" },
        { type: "discussion", id: "83751" },
      ],
    },
    {
      id: "i3",
      type: "dataset",
      title: "Preprocessing that consistently helps",
      content:
        "- Train on log1p(SalePrice) and exponentiate predictions\n- NA in PoolQC, Alley, Fence, Garage*, Bsmt* usually means 'none' — fill with 'None' / 0, do not impute\n- Ordinal-encode quality columns (Ex/Gd/TA/Fa/Po → 5..1)\n- TotalSF = TotalBsmtSF + 1stFlrSF + 2ndFlrSF; age features from YrSold − YearBuilt\n- Treat MSSubClass as categorical",
      sources: [
        { type: "discussion", id: "444859" },
        { type: "discussion", id: "60861" },
        { type: "notebook", id: "ryanholbrook/feature-engineering-for-house-prices" },
      ],
    },
    {
      id: "i4",
      type: "pitfall",
      title: "Common pitfalls",
      content:
        "- Training on raw SalePrice instead of its log\n- Imputing 'NA' values that simply mean the feature is absent\n- Leaving the two GrLivArea > 4000 outliers (Id 524, 1299) in when fitting linear models — or removing them without understanding why\n- Fitting scalers or imputers on train + test together\n- Comparing against sub-0.10 leaderboard scores that come from the public Ames data",
      sources: [
        { type: "discussion", id: "105648" },
        { type: "discussion", id: "117853" },
        { type: "discussion", id: "35968" },
        { type: "discussion", id: "170472" },
      ],
    },
    {
      id: "i5",
      type: "metric",
      title: "RMSLE penalizes relative error",
      content:
        "Because the metric is computed on log prices, a $20k miss on a $100k house costs as much as a $100k miss on a $500k house. Evaluate, tune and blend on the log scale.",
      sources: [{ type: "discussion", id: "60861" }],
    },
  ],

  // Getting Started competition: there are no prize-winning solutions to curate.
  solutions: [],

  notebooks: [
    {
      id: "pmarcelino/comprehensive-data-exploration-with-python",
      title: "Comprehensive data exploration with Python",
      author: "Pedro Marcelino, PhD",
      votes: 33681,
      url: `${CODE}/pmarcelino/comprehensive-data-exploration-with-python`,
      category: "eda",
      tags: ["eda", "correlation", "outliers"],
    },
    {
      id: "ekami66/detailed-exploratory-data-analysis-with-python",
      title: "Detailed exploratory data analysis with python",
      author: "Tuatini GODARD",
      votes: 2429,
      url: `${CODE}/ekami66/detailed-exploratory-data-analysis-with-python`,
      category: "eda",
      tags: ["eda"],
    },
    {
      id: "apapiu/regularized-linear-models",
      title: "Regularized Linear Models",
      author: "Alexandru Papiu",
      votes: 5514,
      url: `${CODE}/apapiu/regularized-linear-models`,
      category: "baseline",
      tags: ["lasso", "ridge", "log target"],
    },
    {
      id: "gusthema/house-prices-prediction-using-tfdf",
      title: "House Prices Prediction using TFDF",
      author: "Gusthema",
      votes: 15536,
      url: `${CODE}/gusthema/house-prices-prediction-using-tfdf`,
      category: "baseline",
      tags: ["tensorflow", "decision forests"],
    },
    {
      id: "ryanholbrook/feature-engineering-for-house-prices",
      title: "Feature Engineering for House Prices",
      author: "Ryan Holbrook",
      votes: 6649,
      url: `${CODE}/ryanholbrook/feature-engineering-for-house-prices`,
      category: "feature_engineering",
      tags: ["feature engineering", "mutual information"],
    },
    {
      id: "juliencs/a-study-on-regression-applied-to-the-ames-dataset",
      title: "A study on Regression applied to the Ames dataset",
      author: "juliencs",
      votes: 2693,
      url: `${CODE}/juliencs/a-study-on-regression-applied-to-the-ames-dataset`,
      category: "feature_engineering",
      tags: ["feature engineering", "polynomial features", "regression"],
    },
    {
      id: "serigne/stacked-regressions-top-4-on-leaderboard",
      title: "Stacked Regressions : Top 4% on LeaderBoard",
      author: "Serigne",
      votes: 14380,
      url: `${CODE}/serigne/stacked-regressions-top-4-on-leaderboard`,
      category: "modeling",
      tags: ["stacking", "lasso", "xgboost", "lightgbm"],
    },
    {
      id: "jesucristo/1-house-prices-solution-top-1",
      title: "#1 House Prices Solution [top 1%]",
      author: "Nanashi",
      votes: 2583,
      url: `${CODE}/jesucristo/1-house-prices-solution-top-1`,
      category: "modeling",
      tags: ["blend", "top 1%"],
    },
    {
      id: "erikbruin/house-prices-lasso-xgboost-and-a-detailed-eda",
      title: "House prices: Lasso, XGBoost, and a detailed EDA",
      author: "Erik Bruin",
      votes: 3624,
      url: `${CODE}/erikbruin/house-prices-lasso-xgboost-and-a-detailed-eda`,
      category: "modeling",
      tags: ["R", "lasso", "xgboost", "eda"],
    },
  ],
};
