import type { Competition } from "@/types/competition";

// Sources: Kaggle competition metadata and file list (Kaggle API), discussion
// titles / votes / authors and notebook votes (Kaggle, fetched 2026-09-16).
// Summaries and insights are written by hand from the linked threads.
const KAGGLE = "https://www.kaggle.com/competitions/titanic";
const D = `${KAGGLE}/discussion`;
const CODE = "https://www.kaggle.com/code";

export const titanic: Competition = {
  slug: "titanic",
  title: "Titanic - Machine Learning from Disaster",
  description:
    "Start here! Predict survival on the Titanic and get familiar with ML basics.",
  kaggleUrl: KAGGLE,

  category: "playground",
  taskType: "binary_classification",
  tags: ["getting started", "beginner", "tabular", "binary classification"],

  metric: "Accuracy",
  metricDescription:
    "Categorization accuracy: the percentage of test passengers whose survival you predict correctly. Higher is better.",

  startDate: "2012-09-28",
  prize: "Knowledge",
  teamCount: 9819,
  status: "active",

  taskSummary:
    "On April 15, 1912 the RMS Titanic sank after hitting an iceberg, killing 1,502 of 2,224 passengers and crew. Using passenger data (name, age, gender, socio-economic class, ticket, cabin, port of embarkation), build a model that predicts which passengers in the test set survived. This is Kaggle's introductory competition.",
  submissionFormat:
    "A CSV with a header and columns PassengerId and Survived (0 or 1) for each of the 418 passengers in test.csv.",
  rules: [
    "Getting Started competition: no prizes, points or medals.",
    "External data is allowed if it is publicly available to all participants at no cost — but the full passenger manifest is public, so 100% leaderboard scores come from looking up labels, not from modelling.",
    "Rolling leaderboard: submissions expire after two months.",
    "Up to 10 submissions per day; maximum team size 10.",
  ],

  datasets: [
    {
      name: "train.csv",
      size: "61 KB",
      rows: 891,
      columns: 12,
      description: "Training set with the Survived label.",
    },
    {
      name: "test.csv",
      size: "29 KB",
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
        "Example submission assuming all and only female passengers survive.",
    },
  ],

  discussions: [
    {
      id: "163366",
      title: "Getting Started Competitions - 100% Public Leaderboard",
      author: "Will Cukierski",
      votes: 3969,
      commentCount: 1056,
      summary:
        "Official Kaggle explanation of why the leaderboard tops out at 100%: the test labels are public, so perfect scores are label lookups. Getting Started competitions are for learning, not ranking.",
      url: `${D}/163366`,
      createdAt: "2020-07-01",
    },
    {
      id: "6240",
      title: "Rolling Leaderboards",
      author: "Will Cukierski",
      votes: 681,
      commentCount: 43,
      summary:
        "Kaggle's announcement that Getting Started leaderboards roll: submissions older than two months are dropped so the board reflects active participants.",
      url: `${D}/6240`,
      createdAt: "2013-11-05",
    },
    {
      id: "93564",
      title: "A kernel for complete beginners (Top 2%)",
      author: "Gunes Evitan",
      votes: 277,
      commentCount: 120,
      summary:
        "Companion thread to the Advanced Feature Engineering Tutorial notebook: title extraction, family and ticket group survival rates, deck from cabin and a tuned RandomForest reach ~0.83.",
      url: `${D}/93564`,
      createdAt: "2019-05-28",
    },
    {
      id: "57447",
      title: "How to score over 82% Titanic",
      author: "Chris Deotte",
      votes: 165,
      commentCount: 113,
      summary:
        "The 'woman-child-group' model: predict females survive and males die, then flip boys whose family group all survived and women whose group all died. Explains why ~0.83 is the honest ceiling.",
      url: `${D}/57447`,
      createdAt: "2018-05-23",
    },
    {
      id: "22829",
      title: "How to score 0.8134 in the Titanic Kaggle challenge",
      author: "Ahmed Besbes",
      votes: 100,
      commentCount: 70,
      summary:
        "Walk-through of a full feature engineering pipeline (titles, family size, ticket prefixes, cabin deck, fare bins) with a RandomForest that scores 0.8134.",
      url: `${D}/22829`,
      createdAt: "2016-08-12",
    },
    {
      id: "87184",
      title: "Top 6% with simple model!!!",
      author: "Raquel Dourado",
      votes: 107,
      commentCount: 64,
      summary:
        "Shows that a handful of well-chosen features and a simple classifier land in the top 6% — complexity is not what moves the score here.",
      url: `${D}/87184`,
      createdAt: "2019-03-29",
    },
    {
      id: "437227",
      title: "🚢 15 Tips for Titanic Beginners! 🛳️",
      author: "Joakim Arvidsson",
      votes: 86,
      commentCount: 47,
      summary:
        "Checklist of practical tips for a first competition: read the data dictionary, impute Age sensibly, encode Sex and Embarked, use cross-validation instead of chasing the leaderboard.",
      url: `${D}/437227`,
      createdAt: "2023-09-06",
    },
    {
      id: "189483",
      title: "100% Accuracy??Is That Fair!!????",
      author: "Amrut Kulkarni",
      votes: 77,
      commentCount: 85,
      summary:
        "Community discussion of the 100% entries; the answer is that they use the public passenger list and should be ignored when judging your own model.",
      url: `${D}/189483`,
      createdAt: "2020-10-07",
    },
    {
      id: "6821",
      title: "Titanic: Getting Started With R - Full Guide to 0.81340",
      author: "Trevor Stephens",
      votes: 67,
      commentCount: 59,
      summary:
        "Classic R tutorial series: from the gender model through decision trees, feature engineering and random forests to 0.8134.",
      url: `${D}/6821`,
      createdAt: "2014-01-13",
    },
    {
      id: "213141",
      title: "Titanic : Best Notebooks of All Time",
      author: "Saurabh Shahane",
      votes: 60,
      commentCount: 45,
      summary:
        "Curated index of the most useful Titanic notebooks, grouped by EDA, feature engineering and modelling.",
      url: `${D}/213141`,
      createdAt: "2021-01-21",
    },
  ],

  insights: [
    {
      id: "i1",
      type: "cv_strategy",
      title: "Repeated StratifiedKFold beats the public leaderboard",
      content:
        "With 891 training rows and 418 test rows, one passenger is ~0.24% accuracy. Use 5- or 10-fold StratifiedKFold repeated over several seeds and compare mean accuracy; treat a single public LB score as noise.",
      sources: [
        { type: "discussion", id: "437227" },
        { type: "discussion", id: "57447" },
      ],
    },
    {
      id: "i2",
      type: "baseline",
      title: "Gender model → engineered features + RandomForest",
      content:
        "Predicting 'all females survive' scores ~0.766. Adding Title (from Name), Pclass, family size, Fare and imputed Age with a RandomForest or gradient boosting reaches ~0.78–0.81. The woman-child-group rule pushes to ~0.82–0.83.",
      sources: [
        { type: "discussion", id: "22829" },
        { type: "discussion", id: "57447" },
        { type: "notebook", id: "alexisbcook/titanic-tutorial" },
      ],
    },
    {
      id: "i3",
      type: "dataset",
      title: "Features that carry the signal",
      content:
        "- Title extracted from Name (Mr, Mrs, Miss, Master, rare titles)\n- Family / ticket group survival rate — passengers travelling together tended to live or die together\n- FamilySize = SibSp + Parch + 1 and an IsAlone flag\n- Deck letter from Cabin, with 'unknown' as its own category\n- Fare and Age binned or log-transformed",
      sources: [
        { type: "discussion", id: "93564" },
        { type: "discussion", id: "22829" },
        { type: "notebook", id: "gunesevitan/titanic-advanced-feature-engineering-tutorial" },
      ],
    },
    {
      id: "i4",
      type: "pitfall",
      title: "Common pitfalls",
      content:
        "- Benchmarking against 100% leaderboard entries — they are label lookups, not models\n- Chasing accuracy above ~0.83 — the honest ceiling on 418 test rows\n- Fitting imputers or encoders on train + test together\n- Dropping rows with missing Age instead of imputing by Title or Pclass\n- Letting a submission expire: the leaderboard rolls every two months",
      sources: [
        { type: "discussion", id: "163366" },
        { type: "discussion", id: "57447" },
        { type: "discussion", id: "6240" },
      ],
    },
    {
      id: "i5",
      type: "faq",
      title: "What score is 'good'?",
      content:
        "0.78–0.80 is a solid honest model; 0.82–0.83 is achievable with group-survival features. Anything above ~0.85 on the public leaderboard is using the public passenger list.",
      sources: [
        { type: "discussion", id: "57447" },
        { type: "discussion", id: "189483" },
      ],
    },
  ],

  // Getting Started competition: there are no prize-winning solutions to curate.
  solutions: [],

  notebooks: [
    {
      id: "alexisbcook/titanic-tutorial",
      title: "Titanic Tutorial",
      author: "Alexis Cook",
      votes: 60967,
      url: `${CODE}/alexisbcook/titanic-tutorial`,
      category: "baseline",
      tags: ["beginner", "random forest", "first submission"],
    },
    {
      id: "startupsci/titanic-data-science-solutions",
      title: "Titanic Data Science Solutions",
      author: "Manav Sehgal",
      votes: 40092,
      url: `${CODE}/startupsci/titanic-data-science-solutions`,
      category: "eda",
      tags: ["eda", "workflow", "beginner"],
    },
    {
      id: "mrisdal/exploring-survival-on-the-titanic",
      title: "Exploring Survival on the Titanic",
      author: "Meg Risdal",
      votes: 11033,
      url: `${CODE}/mrisdal/exploring-survival-on-the-titanic`,
      category: "eda",
      tags: ["eda", "R", "feature engineering"],
    },
    {
      id: "gunesevitan/titanic-advanced-feature-engineering-tutorial",
      title: "Titanic - Advanced Feature Engineering Tutorial",
      author: "Gunes Evitan",
      votes: 5530,
      url: `${CODE}/gunesevitan/titanic-advanced-feature-engineering-tutorial`,
      category: "feature_engineering",
      tags: ["feature engineering", "group survival", "top 2%"],
    },
    {
      id: "yassineghouzam/titanic-top-4-with-ensemble-modeling",
      title: "Titanic Top 4% with ensemble modeling",
      author: "Yassine Ghouzam",
      votes: 5817,
      url: `${CODE}/yassineghouzam/titanic-top-4-with-ensemble-modeling`,
      category: "feature_engineering",
      tags: ["feature engineering", "ensemble"],
    },
    {
      id: "arthurtok/introduction-to-ensembling-stacking-in-python",
      title: "Introduction to Ensembling/Stacking in Python",
      author: "Anisotropic",
      votes: 15484,
      url: `${CODE}/arthurtok/introduction-to-ensembling-stacking-in-python`,
      category: "modeling",
      tags: ["stacking", "ensemble"],
    },
    {
      id: "ldfreeman3/a-data-science-framework-to-achieve-99-accuracy",
      title: "A Data Science Framework: To Achieve 99% Accuracy",
      author: "LD Freeman",
      votes: 13996,
      url: `${CODE}/ldfreeman3/a-data-science-framework-to-achieve-99-accuracy`,
      category: "modeling",
      tags: ["workflow", "model comparison"],
    },
    {
      id: "gusthema/titanic-competition-w-tensorflow-decision-forests",
      title: "Titanic competition w/ TensorFlow Decision Forests",
      author: "Gusthema",
      votes: 8969,
      url: `${CODE}/gusthema/titanic-competition-w-tensorflow-decision-forests`,
      category: "modeling",
      tags: ["tensorflow", "decision forests"],
    },
    {
      id: "jhoward/linear-model-and-neural-net-from-scratch",
      title: "Linear model and neural net from scratch",
      author: "Jeremy Howard",
      votes: 5929,
      url: `${CODE}/jhoward/linear-model-and-neural-net-from-scratch`,
      category: "modeling",
      tags: ["neural network", "from scratch", "fast.ai"],
    },
  ],
};
