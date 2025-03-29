
# How to Run the Project

## Backend
1. Navigate to the backend directory:
    ```bash
    cd backend
    ```
2. Install the required dependencies:
    ```bash
    pip install -r requirements.txt
    ```
3. Run the application:
    ```bash
    python app.py
    ```

## Frontend
1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2. Install the required dependencies:
    ```bash
    npm install
    ```
3. Start the development server:
    ```bash
    npm run dev
    ```

## Running on:
`http://localhost:5173/`

---

## Technologies Used

### Backend
- **Flask**: For building the RESTful API.
- **Pandas**: For data manipulation and analysis.
- **Matplotlib**: For generating charts and visualizations.

### Frontend
- **React**: For building the user interface.
- **ESLint**: For maintaining code quality and consistency.

---

## Assumptions & Decisions
- Missing values in the `episode_description` column are filled with `"no description"`.
- Views are aggregated by month for trend analysis.
