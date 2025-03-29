How to Run the project:

for the backend:
cd backend
pip install -r requirements.txt
python app.py

for the frontend:
cd frontend
npm install
npm run dev

running on:
http://localhost:5173/

Technologies used:

Backend
Flask: For building the RESTful API.
Pandas: For data manipulation and analysis.
Matplotlib: For generating charts and visualizations.


Frontend
React: For building the user interface.
Vite: For fast development and build tooling.
ESLint: For maintaining code quality and consistency.

Assumptions & Decisions:

- Missing values in the episode_description column are filled with "no description".
- Views are aggregated by month for trend analysis.
