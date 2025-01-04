# Project Setup

This project consists of a **Next.js** frontend and a **Nest.js** backend. Follow these steps to set up and run the application:

## Prerequisites
- **Node.js** (v16+ recommended)
- **npm** (comes with Node.js)

---

## Setup Instructions

### 1. Frontend Setup
1. Navigate to the **root folder**:
   ```bash
   cd <project-root>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. The frontend will run at [http://localhost:3000](http://localhost:3000).

---

### 2. Backend Setup
1. Navigate to the **backend folder**:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Add your **GitHub token** to the `.env` file:
   ```env
   GITHUB_TOKEN=<your_github_token>
   ```
4. Start the development server:
   ```bash
   npm run start:dev
   ```

---

Now your frontend will be accessible on port `3000`, and the backend will start on its configured port. 🎉

--- 
Suggest any improvements/issues you have !!!
