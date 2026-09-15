import type { Competition } from "@/types/competition";

// NOTE: Validation data for the MVP. Vote counts, summaries and links are
// approximate and should be replaced with real Kaggle data before release.
const KAGGLE = "https://www.kaggle.com/competitions/titanic";

export const titanic: Competition = {
  slug: "titanic",
  title: "Titanic - Machine Learning from Disaster",
  description:
    "Predict which passengers survived the Titanic shipwreck. The classic Kaggle starter competition.",
  kaggleUrl: KAGGLE,

  category: "playground",
  taskType: "binary_classification",
  tags: ["getting started", "binary classification", "tabular", "beginner"],

  metric: "Accuracy",
  metricDescription:
    "Percentage of passengers whose survival you predict correctly. Higher is better.",

  startDate: "2012-09-28",
  prize: "Knowledge",
  teamCount: 14000,
  status: "active",

  taskSummary:
    "Using passenger data (name, age, gender, socio-economic class, ticket, cabin, etc.), build a model that predicts whether each passenger in the test set survived the sinking of the Titanic.",
  submissionFormat:
    "A CSV with columns PassengerId and Survived (0 or 1) for each of the 418 passengers in test.csv.",
  rules: [
    "Getting Started competition: no prizes and no points or medals.",
    "Rolling leaderboard — submissions expire after two months.",
    "The full passenger list is public, so leaderboard scores near 100% come from looking up labels rather than modelling.",
  ],

  datasets: [
    {
      name: "train.csv",
      size: "60 KB",
      rows: 891,
      columns: 12,
      description: "Training set with the Survived label.",
    },
    {
      name: "test.csv",
      size: "28 KB",
      rows: 418,
      columns: 11,
      description: "Test set without the Survived label.",
    },
    {
      name: "gender_submission.csv",
      size: "3 KB",
      rows: 418,
      columns: 2,
      description:
        "Example submission that predicts all female passengers survived (scores ~0.766).",
    },
  ],

  discussions: [
    {
      id: "d1",
      title: "How to get to 0.80+ honestly",
      author: "Kaggle community",
      votes: 520,
      commentCount: 88,
      summary:
        "Above ~0.80 accuracy the gains are mostly noise on a 418-row test set. Focus on solid features (Title, family size) rather than chasing the leaderboard.",
      url: `${KAGGLE}/discussion`,
      createdAt: "2018-03-12",
    },
    {
      id: "d2",
      title: "Why the top of the leaderboard is 100%",
      author: "Kaggle community",
      votes: 410,
      commentCount: 64,
      summary:
        "The real passenger manifest is public. Perfect scores come from copying labels and tell you nothing about the model.",
      url: `${KAGGLE}/discussion`,
      createdAt: "2017-09-05",
    },
    {
      id: "d3",
      title: "Extracting titles from names",
      author: "Kaggle community",
      votes: 305,
      commentCount: 40,
      summary:
        "Mr / Mrs / Miss / Master derived from Name is one of the strongest features and also helps impute Age.",
      url: `${KAGGLE}/discussion`,
      createdAt: "2016-11-20",
    },
    {
      id: "d4",
      title: "Cross-validation vs public LB on such a small test set",
      author: "Kaggle community",
      votes: 240,
      commentCount: 31,
      summary:
        "One passenger is ~0.24% accuracy. Trust repeated stratified CV over single public LB submissions.",
      url: `${KAGGLE}/discussion`,
      createdAt: "2019-01-15",
    },
    {
      id: "d5",
      title: "Family / group survival features",
      author: "Kaggle community",
      votes: 198,
      commentCount: 25,
      summary:
        "Passengers sharing a ticket or surname tended to survive or perish together; group-level survival rates add a few points of accuracy.",
      url: `${KAGGLE}/discussion`,
      createdAt: "2018-07-02",
    },
  ],

  insights: [
    {
      id: "i1",
      type: "cv_strategy",
      title: "Repeated StratifiedKFold",
      content:
        "With only 891 training rows, use 5- or 10-fold StratifiedKFold repeated several times and compare mean accuracy. Single public LB scores move by ±1% from a handful of passengers.",
      sources: [
        { type: "discussion", id: "d4" },
        { type: "discussion", id: "d1" },
      ],
    },
    {
      id: "i2",
      type: "baseline",
      title: "Gradient boosting or random forest on a few engineered features",
      content:
        "Sex, Pclass, Title (from Name), FamilySize, Fare and imputed Age with a RandomForest or LightGBM scores ~0.78–0.80 on the public LB. Logistic regression on the same features is close behind.",
      sources: [
        { type: "discussion", id: "d3" },
        { type: "notebook", id: "n2" },
      ],
    },
    {
      id: "i3",
      type: "pitfall",
      title: "Common pitfalls",
      content:
        "- Chasing leaderboard scores above ~0.82 — the test set is too small to distinguish real gains from noise\n- Believing 100% leaderboard entries are legitimate models\n- Leaking test information by fitting imputers on train + test together\n- Dropping Age rows instead of imputing them",
      sources: [
        { type: "discussion", id: "d1" },
        { type: "discussion", id: "d2" },
      ],
    },
    {
      id: "i4",
      type: "dataset",
      title: "Useful derived features",
      content:
        "- Title extracted from Name (Mr, Mrs, Miss, Master, rare)\n- FamilySize = SibSp + Parch + 1 and an IsAlone flag\n- Deck letter from Cabin, with a separate 'unknown' category\n- Ticket group size and group survival rate",
      sources: [
        { type: "discussion", id: "d3" },
        { type: "discussion", id: "d5" },
      ],
    },
    {
      id: "i5",
      type: "faq",
      title: "What score is 'good'?",
      content:
        "Around 0.78–0.80 is a solid, honestly-built model. 0.82+ is achievable with group-survival features but the difference is within noise on 418 test rows.",
      sources: [{ type: "discussion", id: "d1" }],
    },
  ],

  // Getting Started competition: there are no winning solutions to curate.
  solutions: [],

  notebooks: [
    {
      id: "n1",
      title: "Titanic Data Science Solutions",
      author: "Kaggle community",
      votes: 12000,
      score: "0.775",
      url: `${KAGGLE}/code`,
      category: "eda",
      tags: ["eda", "beginner", "workflow"],
    },
    {
      id: "n2",
      title: "A Data Science Framework: To Achieve 99% Accuracy",
      author: "Kaggle community",
      votes: 9800,
      score: "0.790",
      url: `${KAGGLE}/code`,
      category: "modeling",
      tags: ["feature engineering", "model comparison"],
    },
    {
      id: "n3",
      title: "Introduction to Ensembling/Stacking in Python",
      author: "Kaggle community",
      votes: 7500,
      score: "0.780",
      url: `${KAGGLE}/code`,
      category: "modeling",
      tags: ["stacking", "ensemble"],
    },
    {
      id: "n4",
      title: "Titanic Tutorial",
      author: "Kaggle community",
      votes: 6400,
      score: "0.775",
      url: `${KAGGLE}/code`,
      category: "baseline",
      tags: ["random forest", "beginner"],
    },
  ],
};
