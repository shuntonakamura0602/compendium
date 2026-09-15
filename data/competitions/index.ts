import type { Competition } from "@/types/competition";
import { amexDefaultPrediction } from "./amex-default-prediction";
import { homeCreditDefaultRisk } from "./home-credit-default-risk";
import { housePrices } from "./house-prices";
import { janeStreetMarketPrediction } from "./jane-street-market-prediction";
import { titanic } from "./titanic";

/**
 * Static competition data for the MVP (spec §31).
 * One file per competition; add new competitions to this list.
 */
export const competitions: Competition[] = [
  titanic,
  housePrices,
  homeCreditDefaultRisk,
  amexDefaultPrediction,
  janeStreetMarketPrediction,
];
