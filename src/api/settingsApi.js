import axios from "./axios";

export const getActiveAnnouncement = () => {
  return axios.get("settings/announcement/");
};
