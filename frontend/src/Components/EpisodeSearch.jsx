import { useEffect, useState } from "react";
import { fetchEpisodeSearch } from "../api";

function EpisodeSearch() {
  const [episodes, setEpisodes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minViews, setMinViews] = useState(0);
  const [maxViews, setMaxViews] = useState(20000000);
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    fetchEpisodeSearch().then((data) => {
      if (data) setEpisodes(data.episode_search);
    });
  }, []);

  const filteredEpisodes = episodes.filter(
    (episode) =>
      episode.episode_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      episode.views >= minViews &&
      episode.views <= maxViews
  );

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          gap: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Search episodes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "8px",
            fontSize: "16px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="number"
          placeholder="Min Views"
          value={minViews}
          onChange={(e) => setMinViews(Number(e.target.value))}
          style={{
            padding: "8px",
            fontSize: "16px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            width: "120px",
          }}
        />

        <input
          type="number"
          placeholder="Max Views"
          value={maxViews}
          onChange={(e) => setMaxViews(Number(e.target.value))}
          style={{
            padding: "8px",
            fontSize: "16px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            width: "120px",
          }}
        />
      </div>

      <div
        style={{
          gap: "20px",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          marginBottom: "40px",
        }}
      >
        <div>
          <ul style={{ listStyleType: "none", textAlign: "start", padding: 0 }}>
            <h3>Episodes ({filteredEpisodes.length})</h3>
            {filteredEpisodes.slice(0, visibleCount).map((episode, index) => (
              <li key={index}>{episode.episode_name}</li>
            ))}
          </ul>
        </div>

        <div style={{ textAlign: "right" }}>
          <h3>Views</h3>
          <ul style={{ listStyleType: "none", textAlign: "start", padding: 0 }}>
            {filteredEpisodes.slice(0, visibleCount).map((episode, index) => (
              <li key={index}>{episode.views.toLocaleString()}</li>
            ))}
          </ul>
        </div>

        {visibleCount < filteredEpisodes.length && (
          <button
            onClick={() => setVisibleCount(visibleCount + 10)}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              borderRadius: "5px",
              backgroundColor: "lightgrey",
              width: "15%",
            }}
          >
            Load More
          </button>
        )}
      </div>
    </>
  );
}

export default EpisodeSearch;
