from flask import Flask, request, jsonify
from recomend import get_yani

app = Flask(__name__)


@app.route("/api/recommend", methods=["POST"])
def recommend():
    data = request.get_json()
    user_data = data.get(
        "user_data"
    )  # 例: {'smoked_cigarettes': 10, 'other_user_preference': 'some_preference'}

    recommendation = get_yani(user_data)

    return jsonify({"recommendation": recommendation})


if __name__ == "__main__":
    app.run(debug=True)
