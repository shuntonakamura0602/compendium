import type { Competition } from "@/types/competition";

// Sources: Kaggle competition metadata (Kaggle API / Meta Kaggle), discussion
// titles / votes / authors (Kaggle, fetched 2026-09-16) and the linked
// write-ups. Summaries and insights are written by hand from the threads.
const KAGGLE = "https://www.kaggle.com/competitions/jane-street-market-prediction";
const D = `${KAGGLE}/discussion`;
const W = `${KAGGLE}/writeups`;
const CODE = "https://www.kaggle.com/code";

export const janeStreetMarketPrediction: Competition = {
  slug: "jane-street-market-prediction",
  title: "Jane Street Market Prediction",
  description: "Test your model against future real market data.",
  kaggleUrl: KAGGLE,

  category: "time_series",
  taskType: "binary_classification",
  tags: ["time series", "finance", "trading", "tabular", "code competition", "anonymized features"],

  metric: "Utility score",
  metricDescription:
    "For each date i, p_i = Σ_j weight_ij · resp_ij · action_ij. Then t = Σp_i / √Σp_i² · √(250 / |i|) — an annualized Sharpe-like ratio — and utility u = min(max(t, 0), 6) · Σp_i. Higher is better; low-volatility returns are rewarded.",

  startDate: "2020-11-23",
  endDate: "2021-08-23",
  prize: "$100,000",
  teamCount: 4085,
  status: "completed",

  taskSummary:
    "Each row is a trading opportunity with 130 anonymized features from a major global stock exchange, a weight and a return (resp; resp_1–4 give returns at other horizons). Predict action = 1 (take the trade) or 0 (pass) to maximize the utility score. Models were trained for three months (final submissions February 22, 2021) and then evaluated on live, unseen market data through August 2021 via a time-series API that prevents peeking forward.",
  submissionFormat:
    "A Kaggle notebook that iterates the provided time-series API (env.iter_test) and returns action (0 or 1) for each test row; scored on future market data after the deadline.",
  rules: [
    "Code competition: submissions run through the time-series API inside a Kaggle notebook with a runtime limit.",
    "External data allowed if publicly available to all participants at no cost.",
    "Maximum team size 5; up to 5 submissions per day, 2 final submissions.",
    "Final ranking computed on data from roughly six months after the training-phase deadline.",
  ],

  datasetNote:
    "The dataset was withdrawn from Kaggle on 2021-10-08 and can no longer be downloaded; the description below is for reference.",
  datasets: [
    {
      name: "train.csv",
      rows: 2390491,
      columns: 138,
      description:
        "date, weight, resp, resp_1..resp_4, feature_0..feature_129 and ts_id for every trading opportunity in the training period (~500 days).",
    },
    {
      name: "features.csv",
      rows: 130,
      columns: 30,
      description: "Boolean tags (tag_0..tag_28) describing groups the anonymized features belong to.",
    },
    {
      name: "example_test.csv",
      description: "Sample of the test rows served by the API (no resp columns).",
    },
    {
      name: "example_sample_submission.csv",
      description: "Submission format: ts_id, action.",
    },
  ],

  discussions: [
    {
      id: "199189",
      title: "Winning Solutions of Previous Market Prediction Kaggle Challenges",
      author: "Tensor Girl",
      votes: 289,
      commentCount: 45,
      summary:
        "Links to the winning write-ups of Two Sigma, Optiver and other finance competitions — the starting point for what has and has not worked on noisy market data.",
      url: `${D}/199189`,
      createdAt: "2020-11-24",
    },
    {
      id: "199107",
      title: "Metric 'De-Anonymized'",
      author: "miguel perez",
      votes: 206,
      commentCount: 48,
      summary:
        "The √250 reveals t as an annualized Sharpe ratio, so utility = capped Sharpe × total return: dates are trading days and low volatility of daily returns is rewarded as much as profit.",
      url: `${D}/199107`,
      createdAt: "2020-11-24",
    },
    {
      id: "205112",
      title: "Summary of My Experiments",
      author: "Yirun Zhang",
      votes: 182,
      commentCount: 32,
      summary:
        "The eventual winner's log of public experiments: forward-fill NaNs, purged time-series CV for tuning then retrain on everything, NN starter, RL and Transformer attempts — with a warning that plain GroupKFold leaks time.",
      url: `${D}/205112`,
      createdAt: "2020-12-18",
    },
    {
      id: "199013",
      title: "ALERT! anonymized features? another phishing competition?",
      author: "Ala Gro",
      votes: 165,
      commentCount: 30,
      summary:
        "Early skepticism that anonymized features and a noisy target make the competition a lottery, as in Two Sigma; the ensuing thread is a good primer on what to expect from market data.",
      url: `${D}/199013`,
      createdAt: "2020-11-24",
    },
    {
      id: "201930",
      title: "Did Jane Street modify their trading model around day 85?",
      author: "Carl McBride Ellis",
      votes: 111,
      commentCount: 28,
      summary:
        "Many features change character around day 85 (≈4 months in), suggesting a regime change; most top solutions dropped the first 85 days from training.",
      url: `${D}/201930`,
      createdAt: "2020-12-07",
    },
    {
      id: "201257",
      title: "Super Fast Utility Score Function Implementation",
      author: "Yirun Zhang",
      votes: 109,
      commentCount: 39,
      summary:
        "Vectorized NumPy implementation of the utility score for fast local validation.",
      url: `${D}/201257`,
      createdAt: "2020-12-03",
    },
    {
      id: "202081",
      title: "Neural Network Training Tips Sharing",
      author: "Yirun Zhang",
      votes: 106,
      commentCount: 46,
      summary:
        "Practical MLP recipe from the NN starter: mean-fill NaNs, dropout + batch norm + Swish + label smoothing (MoA ideas), fine-tune per fold, Hyperopt tuning, and only 1–2 models at inference for time.",
      url: `${D}/202081`,
      createdAt: "2020-12-08",
    },
    {
      id: "200459",
      title: "Submissions timing out? Information and updates",
      author: "Will Cukierski",
      votes: 91,
      commentCount: 124,
      summary:
        "Kaggle's official thread on API runtime limits and timeouts — inference has to be fast because predictions are requested row by row.",
      url: `${D}/200459`,
      createdAt: "2020-11-30",
    },
    {
      id: "203433",
      title: "Correlation between CV method and LB score confirmed!",
      author: "J.J.H. Smit",
      votes: 64,
      commentCount: 25,
      summary:
        "Compared four CV schemes against the LB: PurgedGroupTimeSeriesSplit with a 31-day gap ranked hyperparameter configurations correctly; a 7-day gap, plain GroupTimeSeriesSplit and GroupKFold did not.",
      url: `${D}/203433`,
      createdAt: "2020-12-15",
    },
    {
      id: "201302",
      title: "Comparison between different fillna methods",
      author: "Yirun Zhang",
      votes: 70,
      commentCount: 5,
      summary:
        "Benchmarks of NaN-filling speed for the row-by-row API; pandas fillna is far too slow, NumPy-based filling is needed.",
      url: `${D}/201302`,
      createdAt: "2020-12-04",
    },
    {
      id: "206483",
      title: "Boost your prediction time",
      author: "firolino",
      votes: 61,
      commentCount: 21,
      summary:
        "Wrapping model.call in tf.function speeds Keras inference 2–7× versus model.predict in the API loop.",
      url: `${D}/206483`,
      createdAt: "2020-12-24",
    },
    {
      id: "215305",
      title: "Avoid Overfitting by Feature Neutralization",
      author: "katsu1110",
      votes: 52,
      commentCount: 29,
      summary:
        "Borrowing Numerai's feature neutralization to reduce the model's dependence on individual features and overfitting to the public LB before the live-data phase.",
      url: `${D}/215305`,
      createdAt: "2021-01-29",
    },
    {
      id: "203312",
      title: "Well...a single NN scores 7168.992...",
      author: "Yirun Zhang",
      votes: 45,
      commentCount: 23,
      summary:
        "Five fold-models of the same NN scored between 2,287 and 7,169 on the public LB, with the best LB fold having the worst CV — a stark demonstration of seed/fold variance and LB noise.",
      url: `${D}/203312`,
      createdAt: "2020-12-14",
    },
    {
      id: "224029",
      title: "39th Place - Solution Overview & Code",
      author: "Dmitry Yudin",
      votes: 40,
      commentCount: 9,
      summary:
        "A CV-first write-up: mean out-of-fold utility with GroupKFold over 50-day date groups, never using the public LB for decisions, plus a simple MLP with weight-dependent voting.",
      url: `${W}/dmitry-yudin-39th-place-solution-overview-code`,
      createdAt: "2021-03-06",
    },
  ],

  insights: [
    {
      id: "i1",
      type: "cv_strategy",
      title: "Purged group time-series CV by date, then retrain on everything",
      content:
        "The winner used a 5-fold purged group time-series split with a 31-day gap; an independent test showed only the 31-day-gap purged split ranked hyperparameters in line with the LB. GroupKFold on dates leaks time (the winner's own warning). Because the test period is unseen future data, top teams used CV only for hyperparameters and epochs, then retrained on all data with several seeds.",
      sources: [
        { type: "solution", id: "s1" },
        { type: "discussion", id: "203433" },
        { type: "discussion", id: "205112" },
        { type: "discussion", id: "224029" },
      ],
    },
    {
      id: "i2",
      type: "baseline",
      title: "Multi-target MLP on all five resp columns",
      content:
        "A 3–5 layer MLP (batch norm, dropout, Swish/Mish, label smoothing) trained with BCE on five binary targets (resp, resp_1..resp_4 > 0), NaNs filled by mean/median or forward-fill, action = mean predicted probability > 0.5. The public NN starter and bottleneck-encoder notebooks are this recipe; the winning model adds a supervised autoencoder in front of it.",
      sources: [
        { type: "notebook", id: "gogo827jz/jane-street-neural-network-starter" },
        { type: "notebook", id: "aimind/bottleneck-encoder-mlp-keras-tuner-8601c5" },
        { type: "discussion", id: "202081" },
        { type: "solution", id: "s1" },
      ],
    },
    {
      id: "i3",
      type: "metric",
      title: "Utility ≈ capped annualized Sharpe × total return",
      content:
        "t is a Sharpe-like ratio (√250 annualizes daily returns) clipped to [0, 6] and multiplied by the sum of daily profits, so steady daily gains beat a few large wins. The score is extremely noisy on a short public period: five fold-models of one NN ranged from 2,287 to 7,169 on the public LB. Validate on mean out-of-fold utility and on AUC of resp > 0, not on single LB submissions.",
      sources: [
        { type: "discussion", id: "199107" },
        { type: "discussion", id: "203312" },
        { type: "discussion", id: "224029" },
      ],
    },
    {
      id: "i4",
      type: "dataset",
      title: "Data quirks that top solutions handled",
      content:
        "- The first ~85 days behave differently (feature variance / regime change): the 1st and 3rd place solutions dropped them\n- feature_0 is binary (−1 / 1); the 3rd place filled NaNs with medians conditioned on it\n- Rows with weight = 0 do not affect the metric; the winner dropped them, the 3rd place kept them\n- Forward-fill (winner) or per-feature median/mean are all workable NaN strategies — but must be fast for the API\n- Sample-weighting by mean |resp| focuses the model on trades that move the score",
      sources: [
        { type: "discussion", id: "201930" },
        { type: "solution", id: "s1" },
        { type: "solution", id: "s3" },
        { type: "discussion", id: "201302" },
      ],
    },
    {
      id: "i5",
      type: "pitfall",
      title: "Common pitfalls",
      content:
        "- Random or plain GroupKFold splits that leak future information into validation\n- Training an autoencoder on all data before the CV split (label leakage) — train it jointly inside each fold\n- Optimizing for the short, noisy public LB; the live-data phase reshuffled ranks\n- Ensembles too slow for row-by-row inference — use NumPy inference, tf.function or TF-Lite\n- Ignoring seed variance: average many seeds ('fight randomness with randomness')",
      sources: [
        { type: "discussion", id: "205112" },
        { type: "solution", id: "s1" },
        { type: "discussion", id: "203312" },
        { type: "discussion", id: "200459" },
        { type: "solution", id: "s3" },
      ],
    },
    {
      id: "i6",
      type: "faq",
      title: "Did feature engineering or GBDTs matter?",
      content:
        "Very little. The 1st place used no hand-crafted features beyond an autoencoder, the 3rd place 'almost no feature engineering', and the 10th place was the rare regression approach (fitting geometric-Brownian-motion drift as a target). XGBoost appeared mainly as a blending partner (the winner's teammates) rather than the main model.",
      sources: [
        { type: "solution", id: "s1" },
        { type: "solution", id: "s3" },
        { type: "solution", id: "s10" },
      ],
    },
  ],

  solutions: [
    {
      id: "s1",
      rank: 1,
      teamName: "Cats Trading (Yirun Zhang et al.)",
      title: "Yirun's Solution (1st place): Training Supervised Autoencoder with MLP",
      url: `${W}/cats-trading-yirun-s-solution-1st-place-training-s`,
      summary:
        "A supervised autoencoder trained jointly with an MLP inside each CV fold (to avoid the label leakage of pre-training the AE on all data): Gaussian-noise input, the AE's encoded features concatenated with raw features, the target attached to the AE as an auxiliary loss, and five resp targets as multi-label classification with sample weights = mean |resp|. Blended with teammates' XGBoost. The single AE-MLP alone scored 6,022 on the private LB — still 1st place.",
      models: ["Supervised autoencoder + MLP (TensorFlow)", "XGBoost (teammates)"],
      cvStrategy: "5-fold, 31-day-gap purged group time-series split; first 85 days removed",
      featureEngineering: [
        "Forward-fill of missing values",
        "Autoencoder features concatenated with the 130 raw features",
        "All five resp columns converted to binary actions (multi-label)",
      ],
      ensemble: "Simple blend of AE-MLP and XGBoost; mean of predicted actions as final probability",
      notebookUrl: `${CODE}/gogo827jz/jane-street-supervised-autoencoder-mlp`,
    },
    {
      id: "s3",
      rank: 3,
      teamName: "Martin BB",
      title: "3rd place solution: Ensembles of deep (49 layer) MLPs",
      url: `${W}/martin-bb-3rd-place-solution-ensembles-of-deep-49-`,
      summary:
        "Almost no feature engineering and no K-fold CV: 15 seeds of a 49-layer residual MLP (blocks of dense-100 + batch norm + dropout 0.35 + Mish, skip connections from block 0), log-extended inputs, five sigmoid outputs, BCE with label smoothing plus a utility-like loss, 200 epochs at batch size 30k. Models converted to TF-Lite for fast inference; epochs chosen using the 1M-row public LB.",
      models: ["Deep residual MLP × 15 seeds"],
      cvStrategy: "Single train/validation split (days 85–300 / 350–500), each experiment rerun up to 8 times",
      featureEngineering: [
        "Median imputation conditioned on feature_0",
        "Logarithmic feature extension (130 → 260 inputs)",
        "First 85 days removed; weight = 0 rows kept",
      ],
      ensemble: "Mean over 15 models × 5 outputs, threshold 0.5",
    },
    {
      id: "s10",
      rank: 10,
      teamName: "float",
      title: "10th Place Solution: Geometric Brownian Motion and Mixture Density Networks",
      url: `${W}/float-10th-place-solution-geometric-brownian-motio`,
      summary:
        "The rare regression approach: fit a geometric Brownian motion with drift to resp_1..resp_4 by maximum likelihood (in PyTorch) and use the estimated drift as the training target for a mixture density network trained with negative log-likelihood. Still 2nd after the second live-data rerun at the time of writing.",
      models: ["Mixture density network (PyTorch)"],
      cvStrategy: "Time-based validation",
      featureEngineering: [
        "Per-trade drift estimated by MLE on the multi-horizon resp columns",
      ],
      ensemble: "Single MDN approach",
    },
  ],

  notebooks: [
    {
      id: "hamditarek/market-prediction-xgboost-with-gpu-fit-in-1min",
      title: "Market Prediction: XGBoost with GPU (Fit in 1min)",
      author: "Tarek Hamdi",
      votes: 1482,
      url: `${CODE}/hamditarek/market-prediction-xgboost-with-gpu-fit-in-1min`,
      category: "baseline",
      tags: ["xgboost", "gpu"],
    },
    {
      id: "gogo827jz/jane-street-neural-network-starter",
      title: "Jane Street: Neural Network Starter",
      author: "Yirun Zhang",
      votes: 1074,
      url: `${CODE}/gogo827jz/jane-street-neural-network-starter`,
      category: "baseline",
      tags: ["mlp", "multi-target", "tensorflow"],
    },
    {
      id: "carlmcbrideellis/jane-street-eda-of-day-0-and-feature-importance",
      title: "Jane Street: EDA of day 0 and feature importance",
      author: "Carl McBride Ellis",
      votes: 1775,
      url: `${CODE}/carlmcbrideellis/jane-street-eda-of-day-0-and-feature-importance`,
      category: "eda",
      tags: ["eda", "feature importance"],
    },
    {
      id: "muhammadmelsherbini/jane-street-extensive-eda-pca-starter",
      title: "Jane_street_Extensive_EDA & PCA starter",
      author: "Muhammad M. El.Sherbini",
      votes: 559,
      url: `${CODE}/muhammadmelsherbini/jane-street-extensive-eda-pca-starter`,
      category: "eda",
      tags: ["eda", "pca"],
    },
    {
      id: "odins0n/exploring-time-series-plots-beginners-guide",
      title: "📈Exploring Time Series plots: Beginners Guide📈",
      author: "Sanskar Hasija",
      votes: 485,
      url: `${CODE}/odins0n/exploring-time-series-plots-beginners-guide`,
      category: "eda",
      tags: ["eda", "time series"],
    },
    {
      id: "aimind/bottleneck-encoder-mlp-keras-tuner-8601c5",
      title: "Bottleneck encoder + MLP + Keras Tuner 8601c5",
      author: "CreateAMind",
      votes: 1570,
      url: `${CODE}/aimind/bottleneck-encoder-mlp-keras-tuner-8601c5`,
      category: "modeling",
      tags: ["autoencoder", "mlp", "keras tuner"],
    },
    {
      id: "gogo827jz/jane-street-supervised-autoencoder-mlp",
      title: "Jane Street: Supervised Autoencoder MLP",
      author: "Yirun Zhang",
      votes: 1017,
      url: `${CODE}/gogo827jz/jane-street-supervised-autoencoder-mlp`,
      category: "modeling",
      tags: ["autoencoder", "mlp", "1st place"],
    },
    {
      id: "code1110/jane-street-with-keras-nn-overfit",
      title: "Jane Street with Keras NN overfit",
      author: "katsu1110",
      votes: 717,
      url: `${CODE}/code1110/jane-street-with-keras-nn-overfit`,
      category: "modeling",
      tags: ["keras", "mlp"],
    },
    {
      id: "a763337092/blending-tensorflow-and-pytorch",
      title: "Blending tensorflow and pytorch🔥🔥🔥",
      author: "Daniels",
      votes: 973,
      url: `${CODE}/a763337092/blending-tensorflow-and-pytorch`,
      category: "inference",
      tags: ["blend", "inference", "api"],
    },
  ],
};
