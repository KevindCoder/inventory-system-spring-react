# Master Thesis Project - Semester One

This repository contains the code and resources for my Master Thesis project for Semester One. The project is a full-stack application with the following structure:

- **Backend**: Spring Boot (Java)
- **Frontend**: React.js
- **Database**: MySQL

---

## Project Structure

### 1. **Backend** (Spring Boot)
- Located in the `backend` folder.
- Built with Java and the Spring Boot framework.
- Provides APIs for the frontend to interact with the database.

### 2. **Frontend** (React.js)
- Located in the `frontend` folder.
- A React-based user interface for interacting with the application.

### 3. **Database** (MySQL)
- The database schema and initial data are included in the `database.sql` file.
- Use this file to set up the database before running the backend.

---

## How to Run the Project

### Step 1: Set Up the Database
1. Install MySQL on your local machine or use a hosted MySQL service.
2. Create a new database (e.g., `master_thesis`).
3. Import the `database.sql` file into your MySQL database:
   ```bash
   mysql -u <username> -p < database.sql
