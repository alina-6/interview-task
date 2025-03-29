import React from "react";

const Analysis = () => {
return (
    <div style={{ marginTop: "20px", textAlign: "left" }}>
        <h2 style={{ marginTop: "20px", textAlign: "center" }}>
            Insightful Analysis
        </h2>
        <div style={{ marginTop: "10px" }}>
            <p>
                Question: Is there a certain time of the year with a high subscriber
                growth?
            </p>
            <p>
                Answering this question could indicate trying extra hard during
                specific months to boost subscriber growth. It could also help
                identify common factors in those months that contribute to gaining
                subscribers.
            </p>
            <img
                src={`http://127.0.0.1:5000/analysis_chart`}
                alt="Top Episodes Chart"
                style={{ width: "80%", borderRadius: "8px" }}
            />
            <p style={{ marginTop: "10px" }}>
                The chart above shows subscriber growth trends from 2021 to 2025,
                showing noticeable spikes in November and December.
            </p>

            <p>
                There are clear seasonal patterns, with peaks in March, May-June, and
                October-December. June 2023 saw the biggest surge, this could be
                linked to a viral episode, a high-profile guest, or an external factor
                boosting engagement. October to December consistently shows strong
                growth. This could possibly be due to year-end reflections, self-improvement topics,
                or holiday-related content. Recognising these trends could help refine
                content strategy and marketing efforts.
            </p>
        </div>
    </div>
);
};

export default Analysis;
