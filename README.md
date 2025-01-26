# Employee Directory

This project is a Full Stack Employee Directory application built using React.js for the frontend and Python Django for the backend. It provides functionality to manage employee records, including creating, editing, deleting, and viewing employee information, with data persistence through PostgreSQL.

## Installation and Setup

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   env\Scripts\activate # On Windows
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up the PostgreSQL database:
   - Create a database (e.g., `employee_directory`).
   - Update the `DATABASES` settings in `backend/settings.py` with your database credentials.
5. Run migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

   
6. Start the development server:
   ```bash
   python manage.py runserver
   ```

## To view Output ScreenShots (Ref: Wiki)
https://github.com/vishnu-w3/Employee-Directory/wiki
