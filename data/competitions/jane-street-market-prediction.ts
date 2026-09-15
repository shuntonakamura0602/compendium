import type { Competition } from "@/types/competition";

// NOTE: Validation data for the MVP. Vote counts, summaries, team names and
// links are approximate and should be replaced with real Kaggle data before
// release.
const KAGGLE = "https://www.kaggle.com/competitions/jane-street-market-prediction";

export const janeStreetMarketPrediction: Competition = {
  slug: "jane-street-market-prediction",
  title: "Jane Street Market Prediction",
  description:
    "Decide which trading opportunities to take using anonymized real-world market features.",
  kaggleUrl: KAGGLE,

  category: "time_series",
  taskType: "binary_classification",
  tags: ["time series", "finance", "trading", "tabular", "code competition"],

  metric: "Utility score",
  metricDescription:
    "Sum of daily profits p_i = Σ(weight × resp × action), scaled by a Sharpe-like ratio t = Σp_i / √Σp_i² × √(250 / days), clipped to [0, 6]. Higher is better.",

  startDate: "2020-11-23",
  endDate: "2021-02-22",
  prize: "$100,000",
  teamCount: 4245,
  status: "completed",

  taskSummary:
    "Each row is a trading opportunity with 130 anonymized features, a weight and a return (resp). Predict action = 1 (take the trade) or 0 (pass) to maximize the utility score. Predictions are made through a time-series API on unseen future data after the submission deadline.",
  submissionFormat:
    "A notebook using the provided time-series API that returns action (0 or 1) for each test row; the final leaderboard is computed on live market data from the six months after the deadline.",
  rules: [
    "Code competition: submissions must run through the time-series API inside a Kaggle notebook.",
    "External data is not allowed.",
    "Maximum team size of 5; up to 5 submissions per day.",
  ],

  datasets: [
    {
      name: "train.csv",
      size: "5.8 GB",
      rows: 2390491,
      columns: 138,
      description:
        "Trading opportunities with date, weight, resp, resp_1..resp_4 (returns at different horizons) and feature_0..feature_129.",
    },
    {
      name: "features.csv",
      size: "14 KB",
      rows: 130,
      columns: 30,
      description: "Boolean tags describing groups the anonymized features belong to.",
    },
    {
      name: "example_test.csv",
      size: "37 MB",
      rows: 15219,
      columns: 133,
      description: "Sample of the test format served by the API.",
    },
    {
      name: "example_sample_submission.csv",
      size: "200 KB",
      rows: 15219,
      columns: 2,
      description: "Submission format (ts_id, action).",
    },
  ],

  discussions: [
    {
      id: "d1",
      title: "Purged group time-series CV with embargo",
      author: "Kaggle community",
      votes: 680,
      commentCount: 74,
      summary:
        "Split by date in temporal order and drop a gap of days between train and validation folds to avoid leaking overlapping returns. Random KFold badly overestimates performance.",
      url: `${KAGGLE}/discussion`,
      createdAt: "2020-12-05",
    },
    {
      id: "d2",
      title: "Train a classifier on all five resp targets",
      author: "Kaggle community",
      votes: 540,
      commentCount: 60,
      summary:
        "Using resp, resp_1..resp_4 > 0 as five binary targets in a multi-label MLP regularizes the model and beat single-target training for most top teams.",
      url: `${KAGGLE}/discussion`,
      createdAt: "2020-12-18",
    },
    {
      id: "d3",
      title: "Should you drop weight == 0 rows?",
      author: "Kaggle community",
      votes: 430,
      commentCount: 52,
      summary:
        "Rows with zero weight do not affect the metric. Most teams removed them from training; a few kept them as extra data for the NN.",
      url: `${KAGGLE}/discussion`,
      createdAt: "2020-11-30",
    },
    {
      id: "d4",
      title: "The public leaderboard is mostly noise",
      author: "Kaggle community",
      votes: 400,
      commentCount: 45,
      summary:
        "The public LB covered only a short period and the utility score is highly volatile. The final ranking on live data reshuffled dramatically.",
      url: `${KAGGLE}/discussion`,
      createdAt: "2021-01-20",
    },
    {
      id: "d5",
      title: "feature_0 splits the data into two regimes",
      author: "Kaggle community",
      votes: 350,
      commentCount: 33,
      summary:
        "feature_0 is binary (−1 / 1) and many features behave differently in each half; some teams trained separate models or added interaction terms.",
      url: `${KAGGLE}/discussion`,
      createdAt: "2020-12-10",
    },
    {
      id: "d6",
      title: "Inference speed with the time-series API",
      author: "Kaggle community",
      votes: 300,
      commentCount: 28,
      summary:
        "Predictions are requested row by row; NumPy-only inference and small ensembles are needed to stay within the runtime limit.",
      url: `${KAGGLE}/discussion`,
      createdAt: "2021-01-08",
    },
  ],

  insights: [
    {
      id: "i1",
      type: "cv_strategy",
      title: "Purged, embargoed time-series CV by date",
      content:
        "Use GroupTimeSeriesSplit on the date column with a purge gap (e.g. 20 days) between train and validation. Do not shuffle rows.\nMany top teams ultimately trained on all data with a fixed number of epochs found via CV, since the live test period was unseen future data.",
      sources: [
        { type: "discussion", id: "d1" },
        { type: "solution", id: "s1" },
      ],
    },
    {
      id: "i2",
      type: "baseline",
      title: "Multi-target MLP",
      content:
        "A 3–4 layer MLP with batch norm, dropout and SiLU/Swish activations, trained on the five binary targets (resp_* > 0) with BCE loss and averaged over 3+ seeds. Predict action = 1 when the mean probability exceeds 0.5. Fill NaNs with the training mean.",
      sources: [
        { type: "discussion", id: "d2" },
        { type: "notebook", id: "n1" },
        { type: "solution", id: "s1" },
      ],
    },
    {
      id: "i3",
      type: "pitfall",
      title: "Common pitfalls",
      content:
        "- Random KFold on time-series data, leaking future information into validation\n- Optimizing for the public leaderboard, which covered only a short, noisy window\n- Training on weight == 0 rows without adjusting the loss\n- Ensembles too slow for the row-by-row time-series API",
      sources: [
        { type: "discussion", id: "d1" },
        { type: "discussion", id: "d3" },
        { type: "discussion", id: "d4" },
        { type: "discussion", id: "d6" },
      ],
    },
    {
      id: "i4",
      type: "metric",
      title: "Utility score is volatile",
      content:
        "The score is a Sharpe-like ratio multiplied by total profit; a few large-weight rows can swing it. Compare models on utility and on plain AUC of resp > 0 to avoid over-reacting to noise.",
      sources: [{ type: "discussion", id: "d4" }],
    },
    {
      id: "i5",
      type: "dataset",
      title: "Data quirks",
      content:
        "- feature_0 is a binary regime indicator\n- Early dates (before ~day 85) behave differently; some teams dropped them\n- Missing values cluster in specific feature groups described in features.csv",
      sources: [{ type: "discussion", id: "d5" }],
    },
  ],

  solutions: [
    {
      id: "s1",
      rank: 1,
      teamName: "Yirun Zhang",
      title: "1st place solution",
      url: `${KAGGLE}/discussion`,
      summary:
        "Simple MLP trained on all data with the five resp targets as multi-label classification, ensembled over seeds; no heavy feature engineering.",
      models: ["MLP (PyTorch)"],
      cvStrategy:
        "Purged time-series CV for hyperparameters, then retrained on all data",
      featureEngineering: [
        "Mean imputation of NaNs",
        "Dropped weight == 0 rows",
      ],
      ensemble: "Average of several seeds",
    },
    {
      id: "s2",
      rank: 2,
      teamName: "2nd place team",
      title: "2nd place solution",
      url: `${KAGGLE}/discussion`,
      summary:
        "Ensemble of MLPs and LightGBM trained on different date ranges, weighted toward recent data.",
      models: ["MLP", "LightGBM"],
      cvStrategy: "Group time-series split by date with embargo",
      featureEngineering: [
        "Separate models per feature_0 regime",
        "Rolling-window normalization of features",
      ],
      ensemble: "Weighted average, NN-heavy",
    },
    {
      id: "s3",
      rank: 3,
      teamName: "3rd place team",
      title: "3rd place solution",
      url: `${KAGGLE}/discussion`,
      summary:
        "Supervised autoencoder feeding an MLP, trained jointly with a denoising objective and the five targets.",
      models: ["Supervised autoencoder + MLP"],
      cvStrategy: "Purged group time-series CV (5 folds)",
      featureEngineering: [
        "Gaussian noise augmentation on inputs",
        "Autoencoder bottleneck features concatenated with raw features",
      ],
      ensemble: "Average of folds and seeds",
    },
  ],

  notebooks: [
    {
      id: "n1",
      title: "Jane Street: MLP with multiple targets (TensorFlow)",
      author: "Kaggle community",
      votes: 1300,
      score: "7500",
      url: `${KAGGLE}/code`,
      category: "baseline",
      tags: ["mlp", "multi-target", "tensorflow"],
    },
    {
      id: "n2",
      title: "Jane Street EDA of day 0 and feature tags",
      author: "Kaggle community",
      votes: 1100,
      url: `${KAGGLE}/code`,
      category: "eda",
      tags: ["eda", "feature tags", "regimes"],
    },
    {
      id: "n3",
      title: "Supervised autoencoder MLP",
      author: "Kaggle community",
      votes: 900,
      score: "8200",
      url: `${KAGGLE}/code`,
      category: "modeling",
      tags: ["autoencoder", "mlp"],
    },
    {
      id: "n4",
      title: "Purged group time-series CV utility",
      author: "Kaggle community",
      votes: 650,
      url: `${KAGGLE}/code`,
      category: "feature_engineering",
      tags: ["cross-validation", "time series"],
    },
    {
      id: "n5",
      title: "Fast NumPy inference for the time-series API",
      author: "Kaggle community",
      votes: 480,
      url: `${KAGGLE}/code`,
      category: "inference",
      tags: ["inference", "numpy", "api"],
    },
  ],
};
