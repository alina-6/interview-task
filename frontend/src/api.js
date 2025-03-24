const API_URL = "http://127.0.0.1:5000";

export const fetchEpisodeSearch = async () => {
  try {
    const response = await fetch(`${API_URL}/episode_search`);
    if (!response.ok) {
      throw new Error("Failed to fetch summary data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching summary:", error);
    return null;
  }
};

export const fetchTopEpisodes = async (metric = "views") => {
  try {
    const response = await fetch(`${API_URL}/top_episodes?metric=${metric}`);
    if (!response.ok) {
      throw new Error("Failed to fetch top episodes data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching top episodes:", error);
    return null;
  }
};

export const fetchBottomEpisodes = async (metric = "views") => {
  try {
    const response = await fetch(`${API_URL}/bottom_episodes?metric=${metric}`);
    if (!response.ok) {
      throw new Error("Failed to fetch bottom episodes data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching bottom episodes:", error);
    return null;
  }
};
