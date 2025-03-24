import { useEffect, useState } from "react";
import { fetchTopEpisodes, fetchBottomEpisodes } from "../api";

function EpisodePerformance() {
  const [topEpisodes, setTopEpisodes] = useState([]);
  const [bottomEpisodes, setBottomEpisodes] = useState([]);
  const [metric, setMetric] = useState("views");

  useEffect(() => {
    fetchTopEpisodes(metric).then((data) => {
      if (data) setTopEpisodes(data.top_episodes);
    });

    fetchBottomEpisodes(metric).then((data) => {
      if (data) setBottomEpisodes(data.bottom_episodes);
    });
  }, [metric]);

  return (
    <>
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <h2>Best & Worst Performing Episodes</h2>
        <label
          style={{ fontSize: "16px", fontWeight: "bold", marginRight: "10px" }}
        >
          Filter by:
        </label>
        <select
          onChange={(e) => setMetric(e.target.value)}
          value={metric}
          style={{
            padding: "8px",
            fontSize: "16px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        >
          <option value="views">Views</option>
          <option value="likes">Likes</option>
          <option value="subscribersGained">Subscribers Gained</option>
          <option value="shares">Shares</option>
          <option value="comments">Comments</option>
        </select>
      </div>

      <div style={{ display: "flex", gap: "20px", padding: "16px" }}>
        <div
          style={{
            flex: 1,
            backgroundColor: "white",
            padding: "16px",
            borderRadius: "8px",
          }}
        >
          <h1
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "16px",
              textTransform: "capitalize",
            }}
          >
            Top 5 Episodes by{" "}
            {metric == "subscribersGained" ? "Subscribers Gained" : metric}
          </h1>
          <ul>
            {topEpisodes?.length > 0 ? (
              topEpisodes.map((episode, index) => (
                <li
                  key={index}
                  style={{ borderTop: "1px solid #ddd", padding: "8px 0" }}
                >
                  {episode.episode_name} -{" "}
                  <strong>
                    {episode[metric]?.toLocaleString()}{" "}
                    {metric == "subscribersGained"
                      ? "Subscribers Gained"
                      : metric}
                  </strong>
                </li>
              ))
            ) : (
              <p>Loading top episodes...</p>
            )}
          </ul>
        </div>

        <div
          style={{
            flex: 1,
            backgroundColor: "white",
            padding: "16px",
            borderRadius: "8px",
          }}
        >
          <h1
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "16px",
              textTransform: "capitalize",
            }}
          >
            Bottom 5 Episodes by{" "}
            {metric == "subscribersGained" ? "Subscribers Gained" : metric}
          </h1>
          <ul>
            {bottomEpisodes?.length > 0 ? (
              bottomEpisodes.map((episode, index) => (
                <li
                  key={index}
                  style={{ borderTop: "1px solid #ddd", padding: "8px 0" }}
                >
                  {episode.episode_name} -{" "}
                  <strong>
                    {episode[metric]?.toLocaleString()}{" "}
                    {metric == "subscribersGained"
                      ? "Subscribers Gained"
                      : metric}
                  </strong>
                </li>
              ))
            ) : (
              <p>Loading bottom episodes...</p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default EpisodePerformance;
