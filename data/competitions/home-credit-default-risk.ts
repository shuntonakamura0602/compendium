import type { Competition } from "@/types/competition";

// NOTE: Validation data for the MVP. Vote counts, summaries and links are
// approximate and should be replaced with real Kaggle data before release.
const KAGGLE = "https://www.kaggle.com/competitions/home-credit-default-risk";

export const homeCreditDefaultRisk: Competition = {
  slug: "home-credit-default-risk",
  title: "Home Credit Default Risk",
  description: "Predict how capable each applicant is of repaying a loan.",
  kaggleUrl: KAGGLE,

  category: "tabular",
  taskType: "binary_classification",
  tags: ["tabular", "binary classification", "finance", "credit risk"],

  metric: "ROC AUC",
  metricDescription:
    "Area under the ROC curve between predicted probabilities and the observed target. Higher is better.",

  startDate: "2018-05-17",
  endDate: "2018-08-29",
  prize: "$70,000",
  teamCount: 7198,
  status: "completed",

  taskSummary:
    "Home Credit serves people with little or no credit history. Using application data plus historical records from the credit bureau and previous Home Credit loans, predict the probability that each applicant will have payment difficulties (TARGET = 1).",
  submissionFormat:
    "A CSV with columns SK_ID_CURR and TARGET, where TARGET is the predicted probability of default for each row in application_test.csv.",
  rules: [
    "External data is allowed as long as it is publicly available and shared in the forums.",
    "Maximum team size of 8.",
    "Up to 5 submissions per day; 2 final submissions selected for scoring.",
  ],

  datasets: [
    {
      name: "application_train.csv",
      size: "158 MB",
      rows: 307511,
      columns: 122,
      description:
        "Main table. One row per loan application with the TARGET label.",
    },
    {
      name: "application_test.csv",
      size: "25 MB",
      rows: 48744,
      columns: 121,
      description: "Same as application_train.csv without the TARGET column.",
    },
    {
      name: "bureau.csv",
      size: "163 MB",
      rows: 1716428,
      columns: 17,
      description:
        "Previous credits from other financial institutions reported to the credit bureau. Many rows per SK_ID_CURR.",
    },
    {
      name: "bureau_balance.csv",
      size: "358 MB",
      rows: 27299925,
      columns: 3,
      description: "Monthly balances of the credits in bureau.csv.",
    },
    {
      name: "previous_application.csv",
      size: "386 MB",
      rows: 1670214,
      columns: 37,
      description: "All previous Home Credit applications of the client.",
    },
    {
      name: "POS_CASH_balance.csv",
      size: "375 MB",
      rows: 10001358,
      columns: 8,
      description:
        "Monthly balance snapshots of previous POS and cash loans with Home Credit.",
    },
    {
      name: "credit_card_balance.csv",
      size: "405 MB",
      rows: 3840312,
      columns: 23,
      description:
        "Monthly balance snapshots of previous credit cards with Home Credit.",
    },
    {
      name: "installments_payments.csv",
      size: "690 MB",
      rows: 13605401,
      columns: 8,
      description:
        "Repayment history for previously disbursed Home Credit loans.",
    },
  ],

  discussions: [
    {
      id: "d1",
      title: "How to build a reliable CV",
      author: "Kaggle community",
      votes: 342,
      commentCount: 58,
      summary:
        "Stratified 5-fold CV on application_train tracks the public LB well. Random splits without stratification give noisy fold scores.",
      url: `${KAGGLE}/discussion`,
      createdAt: "2018-06-04",
    },
    {
      id: "d2",
      title: "Leakage found in dataset",
      author: "Kaggle community",
      votes: 217,
      commentCount: 41,
      summary:
        "Discussion of whether SK_ID_CURR and row ordering carry signal. Consensus: do not use raw IDs as features.",
      url: `${KAGGLE}/discussion`,
      createdAt: "2018-06-12",
    },
    {
      id: "d3",
      title: "Strong LightGBM baseline",
      author: "Kaggle community",
      votes: 198,
      commentCount: 35,
      summary:
        "A single LightGBM model on application data plus simple bureau aggregates reaches ~0.77 CV AUC.",
      url: `${KAGGLE}/discussion`,
      createdAt: "2018-05-25",
    },
    {
      id: "d4",
      title: "Memory tips for joining the secondary tables",
      author: "Kaggle community",
      votes: 154,
      commentCount: 27,
      summary:
        "Downcast dtypes and aggregate each secondary table before merging into the application table to stay within 16 GB of RAM.",
      url: `${KAGGLE}/discussion`,
      createdAt: "2018-06-20",
    },
    {
      id: "d5",
      title: "Handling anomalous DAYS_EMPLOYED values",
      author: "Kaggle community",
      votes: 131,
      commentCount: 19,
      summary:
        "DAYS_EMPLOYED contains a placeholder value of 365243 for ~18% of rows. Replace it with NaN and add an indicator feature.",
      url: `${KAGGLE}/discussion`,
      createdAt: "2018-06-01",
    },
    {
      id: "d6",
      title: "Public vs private LB: how much to trust the public score",
      author: "Kaggle community",
      votes: 112,
      commentCount: 22,
      summary:
        "The public LB is ~20% of the test set. Many teams observed that CV improvements translated to the private LB better than public LB gains.",
      url: `${KAGGLE}/discussion`,
      createdAt: "2018-08-10",
    },
  ],

  insights: [
    {
      id: "i1",
      type: "cv_strategy",
      title: "5-fold StratifiedKFold",
      content:
        "StratifiedKFold (5 folds) on application_train is the most commonly reported strategy and correlates well with the private leaderboard.\nRandom splits without stratification produce unstable validation scores because the positive rate is only ~8%.",
      sources: [
        { type: "discussion", id: "d1" },
        { type: "solution", id: "s1" },
      ],
    },
    {
      id: "i2",
      type: "baseline",
      title: "LightGBM with aggregated secondary tables",
      content:
        "A LightGBM model trained on application features plus mean/min/max/count aggregates of bureau, previous_application and installments_payments reaches ~0.78–0.79 CV AUC with modest tuning.",
      sources: [
        { type: "discussion", id: "d3" },
        { type: "notebook", id: "n1" },
      ],
    },
    {
      id: "i3",
      type: "leakage",
      title: "Do not use raw IDs as features",
      content:
        "SK_ID_CURR and SK_ID_PREV are identifiers and should not be used as model features. Aggregations keyed on them are fine.",
      sources: [{ type: "discussion", id: "d2" }],
    },
    {
      id: "i4",
      type: "pitfall",
      title: "Common pitfalls",
      content:
        "- Overfitting to the public LB, which is only ~20% of the test set\n- Leakage from aggregation features computed with target information\n- Treating DAYS_EMPLOYED = 365243 as a real value\n- Running out of memory when joining the monthly balance tables",
      sources: [
        { type: "discussion", id: "d4" },
        { type: "discussion", id: "d5" },
        { type: "discussion", id: "d6" },
      ],
    },
    {
      id: "i5",
      type: "metric",
      title: "ROC AUC is rank-based",
      content:
        "Only the ordering of predictions matters, so calibration is unnecessary and rank-averaging is a safe way to blend models.",
      sources: [{ type: "solution", id: "s2" }],
    },
    {
      id: "i6",
      type: "faq",
      title: "Is a GPU required?",
      content:
        "No. Strong LightGBM baselines run comfortably on CPU. Neural network components in top solutions were used for ensembling rather than as the main model.",
      sources: [{ type: "discussion", id: "d3" }],
    },
  ],

  solutions: [
    {
      id: "s1",
      rank: 1,
      teamName: "Home Aloha",
      title: "1st place solution",
      url: `${KAGGLE}/discussion`,
      summary:
        "Large ensemble of gradient boosting models and neural networks built on extensive feature engineering across all tables, blended with rank averaging.",
      models: ["LightGBM", "XGBoost", "CatBoost", "Neural network"],
      cvStrategy: "5-fold StratifiedKFold",
      featureEngineering: [
        "Hundreds of aggregation features over bureau and previous applications",
        "Ratios between income, credit amount and annuity",
        "Time-windowed aggregates of installments and balances",
      ],
      ensemble: "Rank-averaged blend of ~10 models",
    },
    {
      id: "s2",
      rank: 2,
      teamName: "ikiri_DS",
      title: "2nd place solution",
      url: `${KAGGLE}/discussion`,
      summary:
        "Stacking of many LightGBM models trained on different feature subsets with a linear meta-model.",
      models: ["LightGBM", "Linear stacker"],
      cvStrategy: "5-fold StratifiedKFold",
      featureEngineering: [
        "Feature selection by permutation importance",
        "Target encoding with out-of-fold statistics",
      ],
      ensemble: "Two-level stacking",
    },
    {
      id: "s3",
      rank: 3,
      teamName: "alijs & Evgeny",
      title: "3rd place solution",
      url: `${KAGGLE}/discussion`,
      summary:
        "Diverse feature sets per model with an emphasis on interest rate and annuity-derived features.",
      models: ["LightGBM", "XGBoost"],
      cvStrategy: "5-fold StratifiedKFold",
      featureEngineering: [
        "Estimated interest rate from annuity and credit amount",
        "Aggregates of previous applications by status",
      ],
      ensemble: "Weighted average",
    },
  ],

  notebooks: [
    {
      id: "n1",
      title: "LightGBM with simple features",
      author: "Kaggle community",
      votes: 1400,
      score: "0.792",
      url: `${KAGGLE}/code`,
      category: "baseline",
      tags: ["lightgbm", "aggregation"],
    },
    {
      id: "n2",
      title: "Start Here: A Gentle Introduction",
      author: "Kaggle community",
      votes: 5200,
      url: `${KAGGLE}/code`,
      category: "eda",
      tags: ["eda", "beginner"],
    },
    {
      id: "n3",
      title: "Introduction to Manual Feature Engineering",
      author: "Kaggle community",
      votes: 1900,
      url: `${KAGGLE}/code`,
      category: "feature_engineering",
      tags: ["feature engineering", "aggregation"],
    },
    {
      id: "n4",
      title: "Tuned LightGBM with Bayesian optimization",
      author: "Kaggle community",
      votes: 600,
      score: "0.798",
      url: `${KAGGLE}/code`,
      category: "modeling",
      tags: ["lightgbm", "hyperparameter tuning"],
    },
  ],
};
