import type { Competition } from "@/types/competition";

// Sources: Kaggle competition metadata and file list (Kaggle API / Meta Kaggle),
// discussion titles / votes / authors (Kaggle, fetched 2026-09-16) and the
// linked write-ups. Summaries and insights are written by hand from the threads.
const KAGGLE = "https://www.kaggle.com/competitions/home-credit-default-risk";
const D = `${KAGGLE}/discussion`;
const W = `${KAGGLE}/writeups`;
const CODE = "https://www.kaggle.com/code";

export const homeCreditDefaultRisk: Competition = {
  slug: "home-credit-default-risk",
  title: "Home Credit Default Risk",
  description: "Can you predict how capable each applicant is of repaying a loan?",
  kaggleUrl: KAGGLE,

  category: "tabular",
  taskType: "binary_classification",
  tags: ["tabular", "binary classification", "finance", "credit risk"],

  metric: "ROC AUC",
  metricDescription:
    "Area under the ROC curve between the predicted probability and the observed TARGET. Higher is better.",

  startDate: "2018-05-17",
  endDate: "2018-08-29",
  prize: "$70,000",
  teamCount: 7176,
  status: "completed",

  taskSummary:
    "Home Credit lends to people with little or no credit history. Using the application table plus raw historical data — credit bureau records, previous Home Credit applications, and monthly balance / installment histories — predict the probability that each applicant will have payment difficulties (TARGET = 1). The data was deliberately provided un-aggregated so that competitors would design the aggregations themselves.",
  submissionFormat:
    "A CSV with a header and columns SK_ID_CURR and TARGET (predicted probability) for every row in application_test.csv.",
  rules: [
    "External data allowed as permitted on the competition website (must be publicly available and shareable with the sponsor).",
    "Maximum team size 20; team merger deadline August 22, 2018.",
    "Up to 5 submissions per day; 2 final submissions selected for scoring.",
    "Prizes: $35,000 / $25,000 / $10,000 for 1st / 2nd / 3rd.",
  ],

  datasets: [
    {
      name: "application_train.csv",
      size: "166 MB",
      rows: 307511,
      columns: 122,
      description: "Main table, one row per loan application, with TARGET.",
    },
    {
      name: "application_test.csv",
      size: "27 MB",
      rows: 48744,
      columns: 121,
      description: "Main table for the test set, without TARGET.",
    },
    {
      name: "bureau.csv",
      size: "170 MB",
      rows: 1716428,
      columns: 17,
      description:
        "All previous credits from other institutions reported to the Credit Bureau; many rows per SK_ID_CURR.",
    },
    {
      name: "bureau_balance.csv",
      size: "376 MB",
      rows: 27299925,
      columns: 3,
      description: "Monthly balances of the previous Credit Bureau credits.",
    },
    {
      name: "previous_application.csv",
      size: "405 MB",
      rows: 1670214,
      columns: 37,
      description: "All previous Home Credit applications of the client.",
    },
    {
      name: "POS_CASH_balance.csv",
      size: "393 MB",
      rows: 10001358,
      columns: 8,
      description:
        "Monthly balance snapshots of previous POS and cash loans with Home Credit.",
    },
    {
      name: "credit_card_balance.csv",
      size: "425 MB",
      rows: 3840312,
      columns: 23,
      description: "Monthly balance snapshots of previous Home Credit credit cards.",
    },
    {
      name: "installments_payments.csv",
      size: "723 MB",
      rows: 13605401,
      columns: 8,
      description: "Repayment history of previously disbursed Home Credit loans.",
    },
    {
      name: "HomeCredit_columns_description.csv",
      size: "37 KB",
      description: "Description of every column in every table.",
    },
  ],

  discussions: [
    {
      id: "58332",
      title: "A few notes...",
      author: "Silogram",
      votes: 458,
      commentCount: 194,
      summary:
        "Veteran advice that shaped the competition: it is partly a time-series problem (recent data matters more), fold variance is high so trust local CV over the LB, regularize away noisy features (feature_fraction, reg_lambda), and build features that make business sense.",
      url: `${D}/58332`,
      createdAt: "2018-06-06",
    },
    {
      id: "63032",
      title: "More domain knowledge from former Home Credit analyst",
      author: "Tuananhkk",
      votes: 216,
      commentCount: 38,
      summary:
        "A former Home Credit analyst explains the business: three product types (revolving, POS installment, cash), how AMT_ANNUITY / AMT_CREDIT / AMT_GOODS_PRICE relate, and why bureau data is less informative than Home Credit's own loan history in these markets.",
      url: `${D}/63032`,
      createdAt: "2018-08-10",
    },
    {
      id: "57175",
      title: "Open Solution Journal [LB 0.806]",
      author: "kamil",
      votes: 149,
      commentCount: 280,
      summary:
        "neptune.ml's fully open-sourced pipeline (code, experiments, ideas) that reached 0.806 public LB and became the starting point for many top teams.",
      url: `${D}/57175`,
      createdAt: "2018-05-20",
    },
    {
      id: "60521",
      title: "Collect all discussion in Home Credit Default Risk",
      author: "choco",
      votes: 117,
      commentCount: 8,
      summary:
        "Curated index of the forum by topic: KFold vs StratifiedKFold, LightGBM goss/gbdt/dart, encoding, LB vs CV, feature engineering, feature selection, missing values.",
      url: `${D}/60521`,
      createdAt: "2018-07-06",
    },
    {
      id: "57750",
      title: "Feature Engineering with BUREAU DATA - 10 FEATURES",
      author: "Shanth",
      votes: 94,
      commentCount: 29,
      summary:
        "How to read bureau.csv and ten intuitive per-customer features from it: loan counts and types, share of active loans, days between applications, debt-to-credit and overdue ratios.",
      url: `${D}/57750`,
      createdAt: "2018-05-28",
    },
    {
      id: "60921",
      title: "Comparison between LGB boosting methods (goss, gbdt and dart)",
      author: "Xuan Cao",
      votes: 93,
      commentCount: 13,
      summary:
        "Controlled experiment on application data: dart scores best but is very slow, gbdt is the safe default, goss is fast but had convergence problems in some folds.",
      url: `${D}/60921`,
      createdAt: "2018-07-12",
    },
    {
      id: "64510",
      title: "**COMPETITION WRITEUP INDEX** (UPDATING!!!)",
      author: "AL",
      votes: 87,
      commentCount: 16,
      summary:
        "Index of every post-competition write-up from 1st to 48th place plus other post-mortems.",
      url: `${D}/64510`,
      createdAt: "2018-08-30",
    },
    {
      id: "64485",
      title: "Congratulations, Thanks and Finding!!!",
      author: "Giba",
      votes: 86,
      commentCount: 37,
      summary:
        "2nd-place team member on the small shake-up (trust CV, bag stable models) and the 'data property': ~8,500 customers appear twice across train + test, and a previous TARGET = 1 predicts the next application at ~90%.",
      url: `${D}/64485`,
      createdAt: "2018-08-30",
    },
    {
      id: "64474",
      title: "8th Solution Overview",
      author: "Xuan Cao",
      votes: 78,
      commentCount: 60,
      summary:
        "Stratified 10-fold CV tracked the private LB within ±0.0005; grouping transactional tables by month gave the biggest feature gains, single-table OOF predictions worked as meta-features, and rank-transform predictions before blending.",
      url: `${W}/8th-solution-overview`,
      createdAt: "2018-08-30",
    },
    {
      id: "58445",
      title: "Interpreting the BUREAU_BALANCE table",
      author: "Russ Beuker",
      votes: 52,
      commentCount: 29,
      summary:
        "Worked examples of reading monthly STATUS codes (C, X, 0–5) in bureau_balance and turning a loan's payment history into a risk score.",
      url: `${D}/58445`,
      createdAt: "2018-06-08",
    },
    {
      id: "58174",
      title: "Are data points separable?",
      author: "Tilii",
      votes: 52,
      commentCount: 27,
      summary:
        "t-SNE of neural-network activations shows no clean class clusters, so up/down-sampling is unlikely to help — 'forget about data sampling in this competition'.",
      url: `${D}/58174`,
      createdAt: "2018-06-03",
    },
  ],

  insights: [
    {
      id: "i1",
      type: "cv_strategy",
      title: "5-fold StratifiedKFold — and trust it over the public LB",
      content:
        "Top teams used 5-fold (some 10-fold) StratifiedKFold; the 1st place team notes the stratified-vs-plain choice made little difference. The public LB is only 20% of the test set and fold variance is high, so treat the LB as one more fold: the 8th place team saw a CV–private gap of only ±0.0005 with stratified 10-fold.",
      sources: [
        { type: "discussion", id: "58332" },
        { type: "solution", id: "s1" },
        { type: "discussion", id: "64474" },
      ],
    },
    {
      id: "i2",
      type: "baseline",
      title: "LightGBM on application features + per-customer aggregates",
      content:
        "A single LightGBM on the application table plus mean/min/max/sum/count aggregates of bureau, previous_application, POS, credit card and installments (as in the 'LightGBM with Simple Features' kernel) scores ~0.79 public LB; the open-sourced neptune.ml pipeline reached 0.806. Almost every top solution started from this feature set.",
      sources: [
        { type: "notebook", id: "jsaguiar/lightgbm-with-simple-features" },
        { type: "discussion", id: "57175" },
        { type: "solution", id: "s1" },
      ],
    },
    {
      id: "i3",
      type: "dataset",
      title: "Domain knowledge that produced the best features",
      content:
        "- EXT_SOURCE_1/2/3 are the strongest raw features; ratios and neighbours defined on them (e.g. mean TARGET of 500 nearest neighbours) were top features for the winners\n- An estimated yearly interest rate derived from AMT_ANNUITY, AMT_CREDIT and loan duration was one of the highest-gain features for the 1st and 2nd place teams\n- Recent history matters more: aggregates over the last 3/5/10 installments, applications or months beat all-time aggregates\n- Home Credit's own loan history is more reliable than bureau data in its markets; products differ (revolving vs POS vs cash)\n- DAYS_EMPLOYED contains the placeholder 365243 for ~18% of rows — replace with NaN and add a flag",
      sources: [
        { type: "solution", id: "s1" },
        { type: "solution", id: "s2" },
        { type: "discussion", id: "63032" },
        { type: "discussion", id: "58332" },
        { type: "notebook", id: "willkoehrsen/start-here-a-gentle-introduction" },
      ],
    },
    {
      id: "i4",
      type: "leakage",
      title: "Repeat customers can be reconstructed across train and test",
      content:
        "The data is leak-free by design, but ~8,549 customers appear twice and 132 three times across train + test. Rebuilding this 'user id' and using the lag of TARGET (a previous TARGET = 1 implies ~90% for the next application) was a post-processing trick in the 2nd place solution. The 3rd place team explicitly used no such tricks.",
      sources: [
        { type: "discussion", id: "64485" },
        { type: "solution", id: "s2" },
        { type: "solution", id: "s3" },
      ],
    },
    {
      id: "i5",
      type: "pitfall",
      title: "Common pitfalls",
      content:
        "- Overfitting to the 20% public LB — there was a small shake-up; bag stable models instead\n- Thousands of aggregate features are mostly noise: use feature selection (null importances, forward selection) and LightGBM regularization\n- Up/down-sampling the 8% positive class does not help — the classes are not separable\n- LightGBM goss can fail to converge; dart is best but very slow\n- Joining the monthly balance tables naively exhausts memory — aggregate per SK_ID_PREV / SK_ID_CURR first and fill merge-generated NaNs with 0",
      sources: [
        { type: "discussion", id: "64485" },
        { type: "discussion", id: "58332" },
        { type: "discussion", id: "58174" },
        { type: "discussion", id: "60921" },
        { type: "discussion", id: "64474" },
      ],
    },
    {
      id: "i6",
      type: "metric",
      title: "AUC is rank-based: rank-transform before blending",
      content:
        "Only the ordering of predictions matters. Top teams converted every model's predictions to rank percentiles before averaging or stacking; calibration is irrelevant.",
      sources: [
        { type: "discussion", id: "64474" },
        { type: "solution", id: "s1" },
      ],
    },
    {
      id: "i7",
      type: "faq",
      title: "Do neural networks help? Is a GPU needed?",
      content:
        "Gradient boosting (LightGBM / XGBoost / CatBoost) dominates; the 1st place team's NNs stayed below 0.785 CV vs 0.79+ for LightGBM and were used only as stackers and for diversity. A CPU is enough for LightGBM; the winners trained XGBoost with gpu_hist for speed.",
      sources: [{ type: "solution", id: "s1" }],
    },
  ],

  solutions: [
    {
      id: "s1",
      rank: 1,
      teamName: "Home Aloan",
      title: "1st Place Solution",
      url: `${W}/home-aloan-1st-place-solution`,
      summary:
        "Seven-person team (Bojan Tunguz, Olivier, Michael Jahrer, Silogram, Ryan, Yang, Phil). Four diverse feature sets — ~700 kernel-style aggregates, aggregates over the last k applications / payments, kNN target-mean and ratio features, time-weighted KPIs — reduced by Ridge forward selection, fed to XGBoost / LightGBM / CatBoost / Ridge / NN base models and a three-level stack. In hindsight a simple average of their three best base models would still have won: feature engineering and selection mattered most.",
      models: ["LightGBM", "XGBoost", "CatBoost", "Ridge", "FastRGF", "Neural network"],
      cvStrategy: "5-fold StratifiedKFold for all base models",
      featureEngineering: [
        "Aggregates over last 3/5 and first 2/4 previous applications, last 2/3/5 payments, 60–365-day windows",
        "Mean TARGET of the 500 nearest neighbours on EXT_SOURCE_1/2/3 + credit/annuity ratio",
        "Estimated yearly interest rate; credit/annuity, credit/goods-price and debt/credit ratios",
        "Ridge-based forward feature selection: 1,600+ → 287 features (later 700–2,000 in supersets)",
      ],
      ensemble:
        "L2 models (LightGBM, NN stacker) on base-model OOFs, then an L3 ExtraTrees (max_depth 4) on 7 L2 models + AMT_INCOME_TOTAL: CV 0.8067 / public 0.8084 / private 0.8057",
    },
    {
      id: "s2",
      rank: 2,
      teamName: "ikiri_DS",
      title: "2nd place solution (team ikiri_DS)",
      url: `${W}/ikiri-ds-2nd-place-solution-team-ikiri-ds`,
      summary:
        "Twelve-member team built around diversity: brute-force feature search over a ~1 TB feature pool, dimensionality-reduction and genetic-programming features, an interest-rate feature, neural networks (DAE, CNN/RNN) with residual correction for the train/test shift, and Giba's user-id post-processing.",
      models: ["LightGBM (gbdt, dart)", "CatBoost", "ExtraTrees", "Neural network", "DAE", "CNN / RNN"],
      cvStrategy: "5-fold CV; blending weights chosen with adversarial validation",
      featureEngineering: [
        "Brute-force feature search from a ~1 TB pool; PCA / UMAP / t-SNE / LDA features",
        "Interest-rate feature and train/test difference analysis",
        "Meta-features on application and bureau tables (+0.003 private)",
        "User-id reconstruction and TARGET lag post-processing",
      ],
      ensemble: "Two-level blend; 2nd-level weights by direct AUC maximization (modified Powell)",
    },
    {
      id: "s3",
      rank: 3,
      teamName: "alijs & Evgeny",
      title: "3rd place solution",
      url: `${W}/alijs-evgeny-3rd-place-solution`,
      summary:
        "Two-person team that merged a week before the deadline. Evgeny built a compact, credit-scoring-style model: separate sub-models per data block whose predictions become meta-features, features selected one at a time by CV (124 in the main model out of 1,000+ created). No leaks, duplicates or post-processing.",
      models: ["LightGBM"],
      cvStrategy: "Local CV with one-by-one feature selection; CV matched LB closely (~0.800 → 0.804 CV / 0.805 LB)",
      featureEngineering: [
        "Sub-models for application, last application, bureau, credit card and installments; predictions used as features",
        "Bureau / previous-application models trained row-wise with the main TARGET, then averaged per customer",
        "Models predicting EXT_SOURCE values; predictions and residuals as features",
      ],
      ensemble: "Blend of the two members' models after exchanging top features",
    },
    {
      id: "s4",
      rank: 4,
      teamName: "Quad Machine",
      title: "4th place sharing and tips about having a good teamwork experience",
      url: `${W}/quad-machine-4th-place-sharing-and-tips-about-havi`,
      summary:
        "Trend features over the last 1/3/5/10 records, 200+ models trained on feature subsets, feature selection over 100+ OOFs before stacking, and a manual correction for revolving loans. Best single model CV 0.8022 / private 0.801; stack CV 0.8055 / private 0.804.",
      models: ["LightGBM", "Stacked LightGBM"],
      cvStrategy: "K-fold CV; Bayesian-optimization run predictions kept as extra OOFs",
      featureEngineering: [
        "Trend features: last 1, 3, 5, 10 rows in installments, POS and bureau",
        "Post-processing: revolving-loan predictions above 0.4 scaled by 0.8",
      ],
      ensemble: "Stacking on selected OOFs from 200+ models",
    },
    {
      id: "s5",
      rank: 5,
      teamName: "Kraków, Lublin i Zhabinka",
      title: "Overview of the 5th solution",
      url: `${W}/krak-w-lublin-i-zhabinka-overview-of-the-5th-solut`,
      summary:
        "~8,000 hand-crafted features cut to ~3,000 with null-importance selection, plus ~60 novel features: a neural network over 96-month per-customer 'images' capturing interactions across tables, nested models, and a model predicting interest rate / duration. Their best single model (0.8055 private) would have placed 3rd; stacking did not help.",
      models: ["LightGBM", "Neural network on monthly user matrices"],
      cvStrategy: "K-fold CV; final was a 0.25 / 0.25 / 0.5 weighted average of three models",
      featureEngineering: [
        "96-month user matrices across data sources fed to a neural network",
        "Nested models per table; interest rate / duration prediction model",
        "Null-importance feature selection (Olivier's method)",
      ],
      ensemble: "Weighted average of 3 models; stacking underperformed the best single model",
    },
  ],

  notebooks: [
    {
      id: "jsaguiar/lightgbm-with-simple-features",
      title: "LightGBM with Simple Features",
      author: "Aguiar",
      votes: 2209,
      url: `${CODE}/jsaguiar/lightgbm-with-simple-features`,
      category: "baseline",
      tags: ["lightgbm", "aggregation", "all tables"],
    },
    {
      id: "willkoehrsen/start-here-a-gentle-introduction",
      title: "Start Here: A Gentle Introduction",
      author: "Will Koehrsen",
      votes: 9290,
      url: `${CODE}/willkoehrsen/start-here-a-gentle-introduction`,
      category: "eda",
      tags: ["eda", "beginner", "anomalies"],
    },
    {
      id: "codename007/home-credit-complete-eda-feature-importance",
      title: "Home Credit : Complete EDA + Feature Importance",
      author: "Lathwal",
      votes: 2977,
      url: `${CODE}/codename007/home-credit-complete-eda-feature-importance`,
      category: "eda",
      tags: ["eda", "feature importance"],
    },
    {
      id: "gpreda/home-credit-default-risk-extensive-eda",
      title: "Home Credit Default Risk Extensive EDA",
      author: "Gabriel Preda",
      votes: 895,
      url: `${CODE}/gpreda/home-credit-default-risk-extensive-eda`,
      category: "eda",
      tags: ["eda", "all tables"],
    },
    {
      id: "willkoehrsen/introduction-to-manual-feature-engineering",
      title: "Introduction to Manual Feature Engineering",
      author: "Will Koehrsen",
      votes: 1979,
      url: `${CODE}/willkoehrsen/introduction-to-manual-feature-engineering`,
      category: "feature_engineering",
      tags: ["feature engineering", "aggregation"],
    },
    {
      id: "ogrellier/feature-selection-with-null-importances",
      title: "Feature Selection with Null Importances",
      author: "olivier",
      votes: 1356,
      url: `${CODE}/ogrellier/feature-selection-with-null-importances`,
      category: "feature_engineering",
      tags: ["feature selection", "null importances"],
    },
    {
      id: "willkoehrsen/automated-feature-engineering-basics",
      title: "Automated Feature Engineering Basics",
      author: "Will Koehrsen",
      votes: 1014,
      url: `${CODE}/willkoehrsen/automated-feature-engineering-basics`,
      category: "feature_engineering",
      tags: ["featuretools", "automated feature engineering"],
    },
    {
      id: "willkoehrsen/intro-to-model-tuning-grid-and-random-search",
      title: "Intro to Model Tuning: Grid and Random Search",
      author: "Will Koehrsen",
      votes: 1033,
      url: `${CODE}/willkoehrsen/intro-to-model-tuning-grid-and-random-search`,
      category: "modeling",
      tags: ["hyperparameter tuning"],
    },
    {
      id: "ogrellier/good-fun-with-ligthgbm",
      title: "Good_fun_with_LigthGBM",
      author: "olivier",
      votes: 754,
      url: `${CODE}/ogrellier/good-fun-with-ligthgbm`,
      category: "modeling",
      tags: ["lightgbm", "kfold"],
    },
  ],
};
