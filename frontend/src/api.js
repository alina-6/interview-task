const API_URL = "http://127.0.0.1:5000";

// Utility function to handle fetch requests
const fetchWithErrorHandling = async (url, errorMessage) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`${errorMessage}: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error(error.message);
    }
    return null; // Return null to indicate failure
  }
};

export const fetchEpisodeSearch = async () => {
  return await fetchWithErrorHandling(
    `${API_URL}/episode_search`,
    "Error fetching episode search data"
  );
};

export const fetchTopEpisodes = async (metric = "views") => {
  return await fetchWithErrorHandling(
    `${API_URL}/top_episodes?metric=${metric}`,
    "Error fetching top episodes data"
  );
};

export const fetchBottomEpisodes = async (metric = "views") => {
  return await fetchWithErrorHandling(
    `${API_URL}/bottom_episodes?metric=${metric}`,
    "Error fetching bottom episodes data"
  );
};