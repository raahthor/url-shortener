# 🚀 URL Shortener

A full-stack URL shortener built using the **PERN stack** (PostgreSQL, Express.js, React, Node.js). This application allows users to shorten URLs, track clicks, and manage their links efficiently.

## 🌟 Features

✅ Instantly shorten long URLs  
✅ User authentication (sign up, login, logout)  
✅ Track click statistics for shortened URLs  
✅ Guest users can shorten URLs without an account  
✅ Logged-in users can manage and view their shortened URLs  
✅ Secure password storage with bcrypt  
✅ Modern UI with **Tailwind CSS**  
✅ Fully responsive design  

## 🛠️ Tech Stack

**Frontend:** React, Tailwind CSS  
**Backend:** Node.js, Express.js  
**Database:** PostgreSQL  
**Authentication:** bcrypt for password hashing  
**Hosting:**  
- **Frontend:** GitHub Pages  
- **Backend:** Railway  

## 🚀 Getting Started

### 📥 Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/url-shortener.git
   cd url-shortener
   ```

2. **Backend Setup**
   ```sh
   cd backend
   npm install
   npm start
   ```

3. **Frontend Setup**
   ```sh
   cd frontend
   npm install
   npm start
   ```

### 🔧 Environment Variables

Create a `.env` file in the **backend** directory and add:

```
PORT=5000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000
```

## 🎯 Usage

- Open `http://localhost:3000` in your browser.
- Register or log in to manage your URLs.
- As a guest, you can still shorten URLs but without tracking features.

## 🚢 Deployment

- **Frontend:** Deploy on GitHub Pages using:
  ```sh
  npm run deploy
  ```
- **Backend:** Deploy on **Railway** following their documentation.

## 🤝 Contributing

Contributions are **welcome**! Feel free to **fork** the repository and submit a pull request.

## 📜 License

This project is licensed under the **MIT License**.

## 📬 Contact

For any inquiries, reach out at [your email] or open an **issue** on GitHub. 🚀

