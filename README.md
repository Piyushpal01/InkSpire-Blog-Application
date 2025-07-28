# InkSpire Blog App

**InkSpire** is a full-stack blog platform where users can read and manage tech-related blogs with category filters, pagination, and a clean UI.

**Live**: [https://inkspire-p7wi.onrender.com](https://inkspire-p7wi.onrender.com)

---

## Tech Stack

### 🔹 Backend (Django + DRF)
- Django
- Django REST Framework
- SQLite
- Whitenoise (for static file serving)
- Custom User Model

### 🔹 Frontend (React)
- React.js
- Axios
- Tailwind CSS

---

## Features

- Create, Update, Delete Blogs (Admin)
- Paginated Blog List API
- Admin Dashboard
- Categories Support
- Featured Images Upload
- Auth system with Custom User

---

## 🚀 Getting Started (Local Setup)

### 1: Clone the Repo
```bash
git clone https://github.com/yourusername/InkSpire-Blog-App.git
cd InkSpire-Blog-App
```

### 2: Backend setup

#### a) Create a virtual environment (Optional but recommended)
```
python -m venv venv
source venv/bin/activate  # For macOS/Linux
venv\Scripts\activate     # For Windows
```

#### b) Install dependencies
```
pip install -r requirements.txt
```

#### c) Run the build script
```
./build.sh
```

### 3: Frontend setup
```
cd frontend   # or wherever your frontend folder is
npm install
npm start
