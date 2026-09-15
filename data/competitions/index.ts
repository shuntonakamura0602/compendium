import type { Competition } from "@/types/competition";
import { homeCreditDefaultRisk } from "./home-credit-default-risk";

/**
 * Static competition data for the MVP (spec §31).
 * One file per competition; add new competitions to this list.
 */
export const competitions: Competition[] = [homeCreditDefaultRisk];
