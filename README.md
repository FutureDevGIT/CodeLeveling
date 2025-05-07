# 👑 CodeLeveling: Gamified Learning Platform for Programmers

**CodeLeveling** is an immersive, gamified web platform inspired by *Solo Leveling*. Designed for aspiring and intermediate developers, it transforms programming education into an epic quest with daily missions, XP, skill trees, level-ups, and dynamic mentorship—just like becoming a top-ranked Hunter.

![CodeLeveling Banner](./assets/banner.png) <!-- Optional image -->

---

## 🚀 Features

- 🎯 **Quests & Daily Missions** – Learn programming through interactive challenges and structured missions.
- 🧬 **Skill Progression System** – Earn XP, level up, and unlock advanced quests based on your specialization.
- 🏆 **Reward System** – Complete challenges to earn badges, items, or power-ups (to be integrated).
- 👨‍🏫 **Smart Mentorship** – Get personalized task suggestions and tips based on your progress.
- 💬 **Real-Time Code Editor** – Built with Sandpack for instant feedback and code execution.
- 📊 **User Stats Dashboard** – Track your learning journey and achievements.
- 🧠 **ML-ready backend** – Designed to evolve into an adaptive, AI-assisted tutor system.

---

## 📦 Tech Stack

| Layer       | Tech                             |
|-------------|----------------------------------|
| Frontend    | React.js + TypeScript + Sandpack |
| Backend     | Django + Django REST Framework   |
| Database    | PostgreSQL                        |
| Styling     | Tailwind CSS                      |
| DevOps      | Docker (planned), GitHub Actions (planned) |

---

## 🛠️ Installation

### ⚙️ Backend Setup (Django)
```bash
cd codeleveling_backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
### 🌐 Frontend Setup (React + TypeScript)
```bash
cd codeleveling-frontend
npm install
npm run dev
```

### 📁 Project Structure
CodeLeveling/
├── codeleveling_backend/     # Django backend with REST APIs
│   ├── apps/                 # Modular app structure (missions, auth, etc.)
│   └── ...
├── codeleveling-frontend/    # React frontend with Sandpack editor
│   ├── components/
│   ├── pages/
│   └── ...
└── README.md

### 🔮 Planned Features
- AI-based mission generation based on user skill
- Real-time multiplayer coding duels
-  Dynamic leaderboard & guilds
- Integration with GitHub for real-world task simulations
- Mobile app version (React Native)

### 🤝 Contributing
1. Fork the repo
2. Create a feature branch (git checkout -b feature/your-feature)
3. Commit your changes (git commit -m "Add something cool")
4. Push to the branch (git push origin feature/your-feature)
5. Open a Pull Request

### 📜 License
> This project is under the MIT License.

### 👑 Inspired By
- [Solo Leveling (Manhwa)](https://en.wikipedia.org/wiki/Solo_Leveling)
- RPG progression mechanics
- Code learning platforms like LeetCode, Codewars, and Codecademy

### 📫 Contact

Created by [@FutureDevGIT](https://github.com/FutureDevGIT).  
For collaboration or mentorship integration ideas, feel free to reach out via GitHub or open an issue.

---

## 👾 ARISE

> *"The moment I accepted the quest to grow stronger, my leveling began."*  
> — *CodeLeveling: Awaken Your Inner Developer*
