from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
cors = CORS(app)  # Enable Cross-Origin Resource Sharing

# Load data
df = pd.read_csv("DiaryOfACEO_episodes.csv")

@app.route("/summary", methods=["GET"])
def get_summary():
    summary = df.describe().to_dict()
    return summary


@app.route("/top_episodes", methods=["GET"])
def get_top_episodes():
    metric = request.args.get("metric", "views")
    # Get the top 5 episodes based on the selected metric
    top_episodes = df.nlargest(5, metric)[["episode_name", metric]].to_dict(orient="records")
    return jsonify({"top_episodes": top_episodes})


@app.route("/bottom_episodes", methods=["GET"])
def get_bottom_episodes():
    metric = request.args.get("metric", "views")
    bottom_episodes = df.nsmallest(5, metric)[["episode_name", metric]].to_dict(orient="records")
    return jsonify({"bottom_episodes": bottom_episodes})

if __name__ == "__main__":
    app.run(debug=True)
