import axios from "./axios";

// ==========================
// LIST A NAMED TAXONOMY (Occasion / Recipient / Feeling / Price Band)
// Returns each real FilterOption with a live product count.
// ==========================
export const getTaxonomy = (name) => {
  return axios.get(`taxonomy/${encodeURIComponent(name)}/`);
};
