import "./App.css";
import EpisodePerformance from "./Components/EpisodePerformance";
import EpisodeSearch from "./Components/EpisodeSearch";

function App() {
  return (
    <>
      <h1>Diary Of A CEO: task</h1>
      <EpisodeSearch />
      <EpisodePerformance />

      <div style={{ marginTop: "20px" }}>
        <p style={{ textAlign: "left" }}>
          This chart shows the total views per month from 2021 til 2025.
        </p>
        <img
          src={`http://127.0.0.1:5000/chart`}
          alt="Top Episodes Chart"
          style={{ width: "100%", borderRadius: "8px" }}
        />
      </div>
    </>
  );
}

export default App;
