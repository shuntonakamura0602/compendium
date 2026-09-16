import type { Competition } from "@/types/competition";

// Sources: Kaggle competition metadata and file list (Kaggle API / Meta Kaggle),
// discussion titles / votes / authors (Kaggle, fetched 2026-09-16) and the
// linked write-ups. Summaries and insights are written by hand from the threads.
const KAGGLE = "https://www.kaggle.com/competitions/amex-default-prediction";
const D = `${KAGGLE}/discussion`;
const W = `${KAGGLE}/writeups`;
const CODE = "https://www.kaggle.com/code";

export const amexDefaultPrediction: Competition = {
  slug: "amex-default-prediction",
  title: "American Express - Default Prediction",
  description: "Predict if a customer will default in the future.",
  kaggleUrl: KAGGLE,

  category: "tabular",
  taskType: "binary_classification",
  tags: ["tabular", "binary classification", "finance", "credit risk", "large data", "time series"],

  metric: "Amex metric (Gini + default rate captured at 4%)",
  metricDescription:
    "M = 0.5 · (G + D): the mean of the normalized Gini coefficient (2·AUC − 1) and the default rate captured in the top 4% of weighted predictions. Negatives were subsampled at 5% and receive a 20× weight. Higher is better.",

  startDate: "2022-05-25",
  endDate: "2022-08-24",
  prize: "$100,000",
  teamCount: 4874,
  status: "completed",

  taskSummary:
    "Each customer has up to 13 monthly credit-card statements with ~190 anonymized, normalized features in five groups — Delinquency (D_*), Spend (S_*), Payment (P_*), Balance (B_*) and Risk (R_*). Predict the probability that the customer does not pay their due amount within 120 days of their latest statement. Top solutions could challenge the production model of the world's largest card issuer.",
  submissionFormat:
    "A CSV with a header and columns customer_ID and prediction (probability of default) for every customer in test_data.csv.",
  rules: [
    "External data allowed if publicly available and equally accessible to all participants at no cost.",
    "Maximum team size 5.",
    "Up to 5 submissions per day; 2 final submissions selected for scoring.",
    "The negative class is subsampled at 5% and weighted 20× in the metric.",
  ],

  datasets: [
    {
      name: "train_data.csv",
      size: "16.4 GB",
      rows: 5531451,
      columns: 190,
      description:
        "Monthly statements for 458,913 training customers; one row per customer per statement date (S_2).",
    },
    {
      name: "train_labels.csv",
      size: "31 MB",
      rows: 458913,
      columns: 2,
      description: "target per customer_ID.",
    },
    {
      name: "test_data.csv",
      size: "33.8 GB",
      rows: 11363762,
      columns: 189,
      description: "Monthly statements for 924,621 test customers.",
    },
    {
      name: "sample_submission.csv",
      size: "62 MB",
      rows: 924621,
      columns: 2,
      description: "Submission format.",
    },
  ],

  discussions: [
    {
      id: "328514",
      title: "Integer columns in the data - here you go!",
      author: "raddar",
      votes: 834,
      commentCount: 116,
      summary:
        "All float columns have uniform noise in [0, 0.01] added. raddar reverse-engineered 95 columns back to their integer scale and shared a parquet dataset (1.7 GB train) that nearly every top team built on.",
      url: `${D}/328514`,
      createdAt: "2022-06-01",
    },
    {
      id: "328054",
      title: "How To Reduce Data Size",
      author: "Chris Deotte",
      votes: 521,
      commentCount: 137,
      summary:
        "Step-by-step recipe for fitting 50 GB of CSV into memory: hash customer_ID to int64, split S_2 into int8 date parts, int8 for the 11 categoricals, float32/float16 numerics, then parquet.",
      url: `${D}/328054`,
      createdAt: "2022-05-30",
    },
    {
      id: "335892",
      title: "Tabular Classification - Tips and Tricks",
      author: "The Devastator",
      votes: 358,
      commentCount: 41,
      summary:
        "Long curated list of techniques from past tabular competitions: memory reduction, EDA, encoding, target encoding, feature engineering, GBDT tuning and ensembling, with links.",
      url: `${D}/335892`,
      createdAt: "2022-07-08",
    },
    {
      id: "327464",
      title: "Graphical explanation of the competition metric",
      author: "AmbrosM",
      votes: 254,
      commentCount: 31,
      summary:
        "The metric on a ROC plot: G is the stretched AUC (2·AUC − 1) and D is the recall at the point where 4% of weighted samples are flagged. A worked example scores (0.919 + 0.647) / 2 = 0.783.",
      url: `${D}/327464`,
      createdAt: "2022-05-27",
    },
    {
      id: "328606",
      title: "Speed Up XGB, CatBoost, and LGBM by 20x",
      author: "Chris Deotte",
      votes: 211,
      commentCount: 43,
      summary:
        "CatBoost with task_type='GPU' trains 5 folds in 25 minutes instead of 8 hours; XGBoost gpu_hist trains in 9 minutes (CV 0.792 / LB 0.794); LightGBM gains less from GPU.",
      url: `${D}/328606`,
      createdAt: "2022-06-02",
    },
    {
      id: "331131",
      title: "Which is the right feature importance?",
      author: "AmbrosM",
      votes: 210,
      commentCount: 48,
      summary:
        "Split and gain importance are computed on training data and cannot measure generalization; permutation importance on validation data is the one to use for feature selection.",
      url: `${D}/331131`,
      createdAt: "2022-06-15",
    },
    {
      id: "327138",
      title: "Parquet Format Dataset for Low Memory Use",
      author: "Sanskar Hasija",
      votes: 168,
      commentCount: 70,
      summary:
        "Early shared parquet conversion of the raw CSVs so the data can be loaded on Kaggle without running out of RAM.",
      url: `${D}/327138`,
      createdAt: "2022-05-25",
    },
    {
      id: "327828",
      title: "Kaggle Dataset for Transformers and RNNs",
      author: "Chris Deotte",
      votes: 159,
      commentCount: 28,
      summary:
        "Data reshaped into fixed 13 × 188 per-customer tensors (padded for short histories) for sequence models, with GRU and Transformer starter notebooks scoring ~0.790.",
      url: `${D}/327828`,
      createdAt: "2022-05-29",
    },
    {
      id: "333338",
      title: "Understanding competition metric step by step",
      author: "hanaori",
      votes: 144,
      commentCount: 26,
      summary:
        "Derives G and D from first principles with a toy example of 4 defaulters and 8 non-defaulters, including how the 20× negative weight enters the 4% cutoff.",
      url: `${D}/333338`,
      createdAt: "2022-06-26",
    },
    {
      id: "334670",
      title: "DART algorithm explained",
      author: "The Devastator",
      votes: 132,
      commentCount: 17,
      summary:
        "What LightGBM's DART booster (dropout for trees) does and why it regularizes better than gbdt on this data at the cost of much longer training and no early stopping.",
      url: `${D}/334670`,
      createdAt: "2022-07-02",
    },
    {
      id: "329787",
      title: "Can you find the best seed?",
      author: "AmbrosM",
      votes: 127,
      commentCount: 37,
      summary:
        "Shows how much CV moves with the random seed alone, i.e. the noise floor below which 'improvements' are meaningless — average several seeds before comparing models.",
      url: `${D}/329787`,
      createdAt: "2022-06-08",
    },
    {
      id: "347668",
      title: "10th Place Solution: XGB with Autoregressive RNN features",
      author: "Jiwei Liu",
      votes: 93,
      commentCount: 29,
      summary:
        "Customers with fewer than 13 statements default far more often and score much worse (0.67 vs 0.82); RAPIDS cudf features plus an autoregressive RNN that forecasts the next statement, fed to XGBoost.",
      url: `${W}/a-10th-place-solution-xgb-with-autoregressive-rnn-`,
      createdAt: "2022-08-25",
    },
    {
      id: "328756",
      title: "The distribution of missing values over time",
      author: "AmbrosM",
      votes: 100,
      commentCount: 9,
      summary:
        "Missing-value patterns drift between the train, public and private periods, so NaN counts and indicators must be handled consistently across time.",
      url: `${D}/328756`,
      createdAt: "2022-06-02",
    },
  ],

  insights: [
    {
      id: "i1",
      type: "cv_strategy",
      title: "5- or 10-fold StratifiedKFold by customer; CV and public LB agreed",
      content:
        "Split by customer_ID (one label each) with 5-fold or 10-fold StratifiedKFold. CV, public and private LB moved together for most teams — but the private period is later in time, and the 5th place team found blend weights chosen on the public LB generalized better than weights fitted on CV. Average several seeds: seed noise alone is ~0.001.",
      sources: [
        { type: "solution", id: "s2" },
        { type: "solution", id: "s5" },
        { type: "discussion", id: "329787" },
      ],
    },
    {
      id: "i2",
      type: "baseline",
      title: "LightGBM DART on per-customer aggregates of the denoised data",
      content:
        "Aggregate each feature per customer (last, first, mean, min, max, std, last − mean, last − first) from raddar's integer parquet data and train LightGBM with boosting_type='dart', learning_rate 0.01, num_leaves 64, feature_fraction 0.2. The public 'Amex LGBM Dart' notebook scores CV 0.7977 and was the base of the 2nd, 3rd, 5th and 14th place solutions.",
      sources: [
        { type: "notebook", id: "ragnar123/amex-lgbm-dart-cv-0-7977" },
        { type: "discussion", id: "328514" },
        { type: "solution", id: "s2" },
        { type: "solution", id: "s3" },
      ],
    },
    {
      id: "i3",
      type: "dataset",
      title: "Denoise, downcast, and use the last statements",
      content:
        "- Floats carry uniform [0, 0.01] noise; rounding back to integer scale (raddar's dataset, or your own 'isle' detection) improves GBDT CV by ~0.0005–0.001 and cuts memory ~10×\n- Downcast: customer_ID → int64 hash, categoricals → int8, numerics → float32/16, store as parquet\n- The last 1–3 statements carry most of the signal; aggregates over the last 3 / 6 months and last − mean deltas were common winning features\n- P_2 (an internal Amex score) is the strongest single feature\n- Customers with fewer than 13 statements have a much higher default rate and are much harder to predict (metric 0.67 vs 0.82 on full histories)",
      sources: [
        { type: "discussion", id: "328514" },
        { type: "discussion", id: "328054" },
        { type: "solution", id: "s2" },
        { type: "discussion", id: "347668" },
      ],
    },
    {
      id: "i4",
      type: "metric",
      title: "Half the score is the top-4% capture: rank matters, calibration does not",
      content:
        "G is 2·AUC − 1 and D is recall at the top 4% of weighted predictions, so ranking the riskiest customers correctly is rewarded twice. Use the reference implementation (with the 20× negative weight), and rank-transform (or power-rank) predictions before blending.",
      sources: [
        { type: "discussion", id: "327464" },
        { type: "discussion", id: "333338" },
        { type: "solution", id: "s2" },
      ],
    },
    {
      id: "i5",
      type: "pitfall",
      title: "Common pitfalls",
      content:
        "- Loading the raw 50 GB of CSV into pandas — downcast and convert to parquet first\n- Choosing features by split/gain importance — use permutation importance on validation data\n- Reading seed noise (~0.001) as an improvement\n- Training on padded 13-step sequences without handling short histories\n- Building meta / pseudo-label features without nested K-fold, which leaks the target",
      sources: [
        { type: "discussion", id: "328054" },
        { type: "discussion", id: "331131" },
        { type: "discussion", id: "329787" },
        { type: "solution", id: "s14" },
        { type: "solution", id: "s5" },
      ],
    },
    {
      id: "i6",
      type: "faq",
      title: "Do neural networks help? Is a GPU required?",
      content:
        "GBDTs on engineered aggregates beat NNs on raw sequences (~0.798 vs ~0.790), but Transformers / GRUs add real diversity — the 1st, 5th and 14th place solutions blended them, using knowledge distillation from LightGBM or pretraining on tabular features to make NNs competitive. A CPU is enough for a DART baseline (hours), a GPU makes XGBoost / CatBoost 20× faster and is needed for sequence models.",
      sources: [
        { type: "solution", id: "s1" },
        { type: "solution", id: "s14" },
        { type: "solution", id: "s5" },
        { type: "discussion", id: "328606" },
      ],
    },
  ],

  solutions: [
    {
      id: "s1",
      rank: 1,
      teamName: "Correlation (solo)",
      title: "1st solution (update github code)",
      url: `${W}/lucky-shake-1st-solution-update-github-code`,
      summary:
        "Solo winner with a heavy ensemble of LightGBM models and neural networks over the raw statement sequences (NaNs filled with 0, variable-length histories packed with pack_padded_sequence). Clean code released on GitHub; the author notes the exact result is hard to reproduce because of random fluctuations.",
      models: ["LightGBM", "Neural network (sequence model)"],
      cvStrategy: "K-fold CV; ensemble of many LGB and NN runs",
      featureEngineering: [
        "Per-customer aggregates for GBDT; raw padded sequences for NN",
      ],
      ensemble: "Weighted blend of LightGBM and NN predictions",
      githubUrl:
        "https://github.com/jxzly/Kaggle-American-Express-Default-Prediction-1st-solution",
    },
    {
      id: "s2",
      rank: 2,
      teamName: "JuneHomes",
      title: "2nd place solution - team JuneHomes (writeup)",
      url: `${W}/bydefault-junehomes-2nd-place-solution-team-juneho`,
      summary:
        "Four-person team with an industrial pipeline: own noise removal (99% matching raddar's), unified folds plus a 20% holdout for blending, features stored by column group, then feature engineering column-by-column until ~2,900 features. Best single model was a DART LightGBM trained on the last 2 statements per client; final was a power-rank blend of DART, GBDT and CatBoost.",
      models: ["LightGBM (DART)", "LightGBM (GBDT)", "CatBoost"],
      cvStrategy: "5-fold CV by client without stratification + 20% holdout for blending",
      featureEngineering: [
        "Noise removal by detecting integer 'isles' in each float column",
        "Aggregates per column group (P/B/D/S/R), last 2–3 statements as training rows",
        "Permutation importance with recursive elimination; correlated-feature pruning",
      ],
      ensemble: "Power-2 rank blend of DART LGBM (0.801 public), GBDT LGBM (0.799) and CatBoost (0.799)",
    },
    {
      id: "s3",
      rank: 3,
      teamName: "aibank",
      title: "3rd solution -- simple is the best",
      url: `${W}/aibank-3rd-solution-simple-is-the-best`,
      summary:
        "'Feature engineering is all you need': built on raddar's denoised data and the public LightGBM DART notebook, finished in the last few days of the competition. Code promised after the winners' call.",
      models: ["LightGBM (DART)"],
      cvStrategy: "K-fold CV following the public DART notebook",
      featureEngineering: ["Extended per-customer aggregates on the denoised data"],
    },
    {
      id: "s5",
      rank: 5,
      teamName: "💳VISA💳",
      title: "5th Place Solution - Team VISA",
      url: `${W}/visa-5th-place-solution-team-visa-summary-zakopuro`,
      summary:
        "Ensemble of 21 models — LightGBM (10-fold), CatBoost (GPU), Transformers, a 2D-CNN and a GRU — with meta-features (out-of-fold predictions per statement, aggregated per customer) and pivoted 13-month features. Patrick Yam's Transformer was pretrained to reconstruct the tabular features (Huber loss, train + test), then fine-tuned for under 5 epochs: 0.794 CV / 0.804 private alone, 0.808 private with pseudo-labels. Blend weights chosen on the public LB.",
      models: ["LightGBM", "CatBoost", "Transformer", "2D-CNN", "GRU"],
      cvStrategy: "10-fold StratifiedKFold; ensemble weights set on the public LB (CV-fitted weights overfit)",
      featureEngineering: [
        "Meta-features: per-statement OOF predictions aggregated per customer (+0.003 on the Transformer)",
        "Pivot features: all 13 statements concatenated horizontally",
        "Transformer pretraining on standardized tabular features, including test data",
      ],
      ensemble: "Weighted average of 21 models; public 0.8020 / private 0.8088",
    },
    {
      id: "s14",
      rank: 14,
      teamName: "Chris Deotte (solo)",
      title: "14th Place Gold – NN Transformer using LGBM Knowledge Distillation",
      url: `${W}/chris-deotte-14th-place-gold-nn-transformer-using-`,
      summary:
        "50/50 blend of the public LightGBM DART and a 4-layer Transformer + GRU trained with knowledge distillation: first fit to LightGBM's OOF and test predictions (soft labels, train + test), then fine-tuned on hard labels over four cosine cycles. Leak-free scores via nested 10 × 10 K-fold.",
      models: ["LightGBM (DART)", "Transformer + GRU"],
      cvStrategy: "Nested K-fold (10 outer × 10 inner) for leak-free CV; 5 seeds per model",
      featureEngineering: [
        "Knowledge distillation from LightGBM predictions on train + test",
        "13 × 188 padded sequence tensors",
      ],
      ensemble: "50% LightGBM + 50% Transformer, 5 seeds each",
    },
  ],

  notebooks: [
    {
      id: "cdeotte/xgboost-starter-0-793",
      title: "XGBoost Starter - [0.793]",
      author: "Chris Deotte",
      votes: 2118,
      score: "0.793 LB",
      url: `${CODE}/cdeotte/xgboost-starter-0-793`,
      category: "baseline",
      tags: ["xgboost", "gpu", "rapids"],
    },
    {
      id: "ragnar123/amex-lgbm-dart-cv-0-7977",
      title: "Amex LGBM Dart CV 0.7977",
      author: "Martin Kovacevic Buvinic",
      votes: 1508,
      score: "0.7977 CV",
      url: `${CODE}/ragnar123/amex-lgbm-dart-cv-0-7977`,
      category: "baseline",
      tags: ["lightgbm", "dart", "aggregation"],
    },
    {
      id: "ambrosm/amex-lightgbm-quickstart",
      title: "AMEX LightGBM Quickstart",
      author: "AmbrosM",
      votes: 864,
      url: `${CODE}/ambrosm/amex-lightgbm-quickstart`,
      category: "baseline",
      tags: ["lightgbm", "quickstart"],
    },
    {
      id: "ambrosm/amex-eda-which-makes-sense",
      title: "AMEX EDA which makes sense ⭐️⭐️⭐️⭐️⭐️",
      author: "AmbrosM",
      votes: 970,
      url: `${CODE}/ambrosm/amex-eda-which-makes-sense`,
      category: "eda",
      tags: ["eda", "feature groups"],
    },
    {
      id: "kellibelcher/amex-default-prediction-eda-lgbm-baseline",
      title: "AMEX Default Prediction EDA & LGBM Baseline",
      author: "Kelli",
      votes: 777,
      url: `${CODE}/kellibelcher/amex-default-prediction-eda-lgbm-baseline`,
      category: "eda",
      tags: ["eda", "lightgbm"],
    },
    {
      id: "jiweiliu/rapids-cudf-feature-engineering-xgb",
      title: "RAPIDS cudf Feature Engineering + XGB",
      author: "Jiwei Liu",
      votes: 641,
      url: `${CODE}/jiweiliu/rapids-cudf-feature-engineering-xgb`,
      category: "feature_engineering",
      tags: ["rapids", "cudf", "gpu"],
    },
    {
      id: "thedevastator/amex-features-the-best-of-both-worlds",
      title: "Amex Features: The best of both worlds",
      author: "The Devastator",
      votes: 529,
      url: `${CODE}/thedevastator/amex-features-the-best-of-both-worlds`,
      category: "feature_engineering",
      tags: ["feature engineering", "aggregation"],
    },
    {
      id: "thedevastator/lag-features-are-all-you-need",
      title: "Lag Features Are All You Need",
      author: "The Devastator",
      votes: 492,
      url: `${CODE}/thedevastator/lag-features-are-all-you-need`,
      category: "feature_engineering",
      tags: ["lag features", "time series"],
    },
    {
      id: "cdeotte/tensorflow-gru-starter-0-790",
      title: "TensorFlow GRU Starter - [0.790]",
      author: "Chris Deotte",
      votes: 659,
      score: "0.790 LB",
      url: `${CODE}/cdeotte/tensorflow-gru-starter-0-790`,
      category: "modeling",
      tags: ["gru", "tensorflow", "sequence"],
    },
    {
      id: "cdeotte/tensorflow-transformer-0-790",
      title: "TensorFlow Transformer - [0.790]",
      author: "Chris Deotte",
      votes: 571,
      score: "0.790 LB",
      url: `${CODE}/cdeotte/tensorflow-transformer-0-790`,
      category: "modeling",
      tags: ["transformer", "tensorflow", "sequence"],
    },
    {
      id: "inversion/amex-competition-metric-python",
      title: "Amex Competition Metric (Python)",
      author: "inversion",
      votes: 569,
      url: `${CODE}/inversion/amex-competition-metric-python`,
      category: "modeling",
      tags: ["metric", "reference implementation"],
    },
    {
      id: "finlay/amex-rank-ensemble",
      title: "AMEX Rank Ensemble",
      author: "Finlay",
      votes: 501,
      url: `${CODE}/finlay/amex-rank-ensemble`,
      category: "inference",
      tags: ["ensemble", "rank average"],
    },
  ],
};
