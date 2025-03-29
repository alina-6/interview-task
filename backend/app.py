import io
from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
import pandas as pd
import matplotlib.pyplot as plt

app = Flask(__name__)
cors = CORS(app)

# Load data
df = pd.read_csv("DiaryOfACEO_episodes.csv")

# basic data exploration and clean up
print(df.head())  # the first few rows of the DataFrame
print(df.columns)  # the column names
print(df.describe())  # summary of numerical columns
df.info()  # 304 rows and 16 columns, 1 episode description is empty
print(df.isnull().sum())  # check for null values
print("Duplicates:", df.duplicated().sum())  # check for duplicates

# Fill missing values in episode_description with "no description"
df["episode_description"].fillna("no description", inplace=True)


@app.route("/episode_search", methods=["GET"])
def get_episode_search():
    """Function to search episodes by name."""
    episode_search = df[["episode_name", "views", "episode_description"]].to_dict(
        orient="records"
    )
    return jsonify({"episode_search": episode_search})


@app.route("/chart", methods=["GET"])
def get_chart():
    """Function to generate a line chart of views per month."""
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


@app.route("/analysis_chart", methods=["GET"])
def get_analysis_chart():
    """Function to generate a chart of subscribers gained over time."""
    df["release_date"] = pd.to_datetime(df["release_date"])

    # Extract year and month from release_date
    df["year"] = df["release_date"].dt.year
    df["month"] = df["release_date"].dt.month

    # Aggregate subscribers gained by year and month
    monthly_yearly_data = (
        df.groupby(["year", "month"])
        .agg(
            {
                "subscribersGained": "sum",
            }
        )
        .reset_index()
    )

    # Create a pivot table for easier visualization (year vs. month)
    pivot_data = monthly_yearly_data.pivot(
        index="month", columns="year", values="subscribersGained"
    )

    # Plot the pivot table
    plt.figure(figsize=(14, 8))
    pivot_data.plot(kind="line", marker="o", linestyle="-", figsize=(14, 8))
    plt.title("Subscribers Gained by Month Over the Years")
    plt.xlabel("Month")
    plt.ylabel("Subscribers Gained")
    plt.legend(title="Year")
    plt.tight_layout()

    img_buffer = io.BytesIO()
    plt.savefig(img_buffer, format="png")
    img_buffer.seek(0)

    return send_file(img_buffer, mimetype="image/png")


@app.route("/top_episodes", methods=["GET"])
def get_top_episodes():
    """Function to get the top 5 episodes based on a selected metric."""
    metric = request.args.get("metric", "views")
    # Get the top 5 episodes based on the selected metric
    top_episodes = df.nlargest(5, metric)[["episode_name", metric]].to_dict(
        orient="records"
    )
    return jsonify({"top_episodes": top_episodes})


@app.route("/bottom_episodes", methods=["GET"])
def get_bottom_episodes():
    """Function to get the bottom 5 episodes based on a selected metric."""
    metric = request.args.get("metric", "views")
    bottom_episodes = df.nsmallest(5, metric)[["episode_name", metric]].to_dict(
        orient="records"
    )
    return jsonify({"bottom_episodes": bottom_episodes})


if __name__ == "__main__":
    app.run(debug=True)
