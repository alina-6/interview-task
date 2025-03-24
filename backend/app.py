from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import matplotlib.pyplot as plt
import io
from flask import send_file

app = Flask(__name__)
cors = CORS(app)  # Enable Cross-Origin Resource Sharing

# Load data
df = pd.read_csv("DiaryOfACEO_episodes.csv")
df.info()  # 304 rows and 16 columns, 1 episode description is empty

print(df.isnull().sum())

df["episode_description"].fillna("no description", inplace=True)
df = df.sort_values(by="release_date")


@app.route("/summary", methods=["GET"])
def get_summary():
    summary = df.describe().to_dict()
    return summary


@app.route("/episode_search", methods=["GET"])
def get_episode_search():
    episode_search = df[["episode_name", "views", "episode_description"]].to_dict(
        orient="records"
    )
    return jsonify({"episode_search": episode_search})


@app.route("/chart", methods=["GET"])
def get_chart():
    # Convert the release_date column to datetime
    df["release_date"] = pd.to_datetime(df["release_date"])

    # Aggregate views by month
    df["month"] = df["release_date"].dt.to_period("M")
    monthly_views = df.groupby("month")["views"].sum().reset_index()
    monthly_views["month"] = monthly_views["month"].dt.to_timestamp()

    # Plot the line chart
    plt.figure(figsize=(14, 7))
    plt.plot(
        monthly_views["month"],
        monthly_views["views"],
        marker="o",
        linestyle="-",
        color="b",
        linewidth=2,
        markersize=6,
        label="Views",
    )
    plt.xlabel("Month")
    plt.ylabel("Views")
    plt.title("Trend of Views per Month for Episodes")
    plt.grid(True, linestyle="--", alpha=0.6)
    plt.xticks(rotation=45)
    plt.legend()
    plt.tight_layout()

    img_buffer = io.BytesIO()
    plt.savefig(img_buffer, format="png")
    img_buffer.seek(0)

    return send_file(img_buffer, mimetype="image/png")


@app.route("/top_episodes", methods=["GET"])
def get_top_episodes():
    metric = request.args.get("metric", "views")
    # Get the top 5 episodes based on the selected metric
    top_episodes = df.nlargest(5, metric)[["episode_name", metric]].to_dict(
        orient="records"
    )
    return jsonify({"top_episodes": top_episodes})


@app.route("/bottom_episodes", methods=["GET"])
def get_bottom_episodes():
    metric = request.args.get("metric", "views")
    bottom_episodes = df.nsmallest(5, metric)[["episode_name", metric]].to_dict(
        orient="records"
    )
    return jsonify({"bottom_episodes": bottom_episodes})


if __name__ == "__main__":
    app.run(debug=True)
