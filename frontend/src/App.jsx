import { useEffect, useState } from "react";
import { fetchSummary, fetchTopEpisodes, fetchBottomEpisodes } from "./api";
import "./App.css";

function App() {
  const [summary, setSummary] = useState();
  const [topEpisodes, setTopEpisodes] = useState([]);
  const [bottomEpisodes, setBottomEpisodes] = useState([]);
  const [metric, setMetric] = useState("views");

  useEffect(() => {
    fetchSummary().then((data) => {
      if (data) setSummary(data);
    });

    fetchTopEpisodes(metric).then((data) => {
      if (data) setTopEpisodes(data.top_episodes);
    });

    fetchBottomEpisodes(metric).then((data) => {
      if (data) setBottomEpisodes(data.bottom_episodes);
    });

    console.log("SUMMARY", summary);
  }, [metric]);

  //Filter or search for episodes (maybe by release date range or number of views).
  //See top/bottom performing episodes at a glance.
  //display chart
  //interactive element

  return (
    <>
      {/* Metric Selector */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <label style={{ fontSize: "16px", fontWeight: "bold", marginRight: "10px" }}>
          Select Metric:
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
        </select>
      </div>

      {/* Episodes Sections */}
      <div style={{ display: "flex", gap: "20px", padding: "16px" }}>
        {/* Top 5 Episodes Section */}
        <div
          style={{
            flex: 1,
            backgroundColor: "white",
            padding: "16px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h1 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px", textTransform: "capitalize"}}>
            Top 5 Episodes by {metric == "subscribersGained"? "Subscribers Gained": metric}
          </h1>
          <ul>
            {topEpisodes?.length > 0 ? (
              topEpisodes.map((episode, index) => (
                <li
                  key={index}
                  style={{ borderTop: "1px solid #ddd", padding: "8px 0" }}
                >
                  <strong>{episode.episode_name}</strong> -{" "}
                  {episode[metric]?.toLocaleString()} {metric == "subscribersGained"? "Subscribers Gained": metric}
                </li>
              ))
            ) : (
              <p>Loading top episodes...</p>
            )}
          </ul>
        </div>

        {/* Bottom 5 Episodes Section */}
        <div
          style={{
            flex: 1,
            backgroundColor: "white",
            padding: "16px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h1 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px", textTransform: "capitalize"}}>
            Bottom 5 Episodes by {metric == "subscribersGained"? "Subscribers Gained": metric}
          </h1>
          <ul>
            {bottomEpisodes?.length > 0 ? (
              bottomEpisodes.map((episode, index) => (
                <li
                  key={index}
                  style={{ borderTop: "1px solid #ddd", padding: "8px 0" }}
                >
                  <strong>{episode.episode_name}</strong> -{" "}
                  {episode[metric]?.toLocaleString()} {metric == "subscribersGained"? "Subscribers Gained": metric}
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

export default App;
