# 🚀 Rank Pilot — AI-Powered SEO Analyzer & Rank Tracker

Rank Pilot is a full-stack SEO analysis and keyword rank tracking platform that helps users audit websites, discover SEO issues, monitor keyword rankings, analyze competitors, and track performance over time.

The platform combines browser automation, AI-powered analysis, scheduled rank tracking, and a modern dashboard to provide actionable SEO insights through a clean and responsive interface.

## 🌐 Live Demo

**Live Application:** https://seo-rank-tracker-front.vercel.app

## ✨ Features

- **AI-Powered SEO Audits** — Analyze any public website and generate actionable SEO insights.
- **Comprehensive SEO Scoring** — View overall, SEO, performance, accessibility, and best-practices scores.
- **Metadata Analysis** — Inspect title, description, canonical URL, robots directives, Open Graph tags, Twitter cards, viewport, and charset.
- **Technical SEO Insights** — Analyze headings, internal and external links, images, missing alt text, page size, load time, and word count.
- **Issue Detection & Recommendations** — Identify critical issues, warnings, and informational opportunities with AI-generated recommendations.
- **Keyword Analysis** — Extract frequently used keywords and keyword density from page content.
- **Google Rank Tracking** — Track a target domain's position for selected keywords.
- **Competitor Insights** — Discover competing domains appearing in search results.
- **Ranking History** — Store historical keyword positions and monitor changes over time.
- **Scheduled Updates** — Automatically refresh keyword rankings using cron jobs.
- **Secure Authentication** — JWT-based registration, login, protected routes, and user-specific data.
- **Analysis History** — Search, review, and manage previous SEO audits.
- **Responsive Dark UI** — Modern interface built with React and TypeScript.

## 📸 Screenshots

### 🏠 Home Page

<img width="1920" height="1200" alt="Rank Pilot Home Page" src="https://github.com/user-attachments/assets/8ef51161-1b6b-4ca4-aa5d-79d1912cbc50" />

### 🎯 Keyword Rank Tracker

<img width="1920" height="1200" alt="Rank Pilot Keyword Rank Tracker" src="https://github.com/user-attachments/assets/08506b26-7b17-477c-abf1-c4079dc472ce" />

### 📊 AI-Powered SEO Report

<img width="1920" height="1200" alt="Rank Pilot SEO Report" src="https://github.com/user-attachments/assets/e431db59-e5aa-4ccc-aa84-f0e1851fbed0" />

### 🔍 Analyze Website

<img width="1920" height="1200" alt="Rank Pilot Analyze Website" src="https://github.com/user-attachments/assets/adc45b88-da1d-4c07-9df6-1f3cd9dcf890" />

### 📈 Dashboard

<img width="1920" height="1200" alt="Rank Pilot Dashboard" src="https://github.com/user-attachments/assets/fa969cc8-d534-495f-b976-4fe8dcb52a70" />

### 🕒 Analysis History

<img width="1920" height="1200" alt="Rank Pilot Analysis History" src="https://github.com/user-attachments/assets/fd0f3f03-f155-4ed3-9b2a-7b729d6894ff" />

## 🛠️ Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React, TypeScript, Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcrypt |
| AI Analysis | Google Gemini API |
| Browser Automation | Playwright |
| Cloud Browser Infrastructure | Browserbase |
| Rank Scheduling | node-cron |
| HTTP Client | Axios |
| UI Icons & Notifications | Lucide React, React Hot Toast |
| Deployment | Vercel |

## 🧠 How It Works

Rank Pilot follows a multi-stage workflow:

1. The user submits a website URL for analysis.
2. The backend creates an analysis record and starts processing the request.
3. Browserbase creates a remote browser session.
4. Playwright loads the target website and extracts SEO-relevant information.
5. Extracted data includes metadata, headings, links, images, content, load time, page size, and word count.
6. Google Gemini analyzes the collected data and returns structured scores, keywords, issues, and recommendations.
7. Results are saved in MongoDB and displayed through the interactive SEO report dashboard.

For rank tracking, the application searches Google results for a keyword, checks the target domain's ranking position, collects competitor information, stores historical changes, and automatically refreshes tracked keywords through scheduled cron jobs.

## 📁 Project Structure

```text
SEO-Rank-Tracker/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── server/
│   ├── config/
│   ├── controller/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   │   ├── geminiService.js
│   │   ├── scraperService.js
│   │   ├── rankTrackerService.js
│   │   └── keywordTrackingService.js
│   ├── package.json
│   └── server.js
│
├── screenshots/
│   ├── home.png
│   ├── dashboard.png
│   ├── analyze.png
│   ├── seo-report.png
│   ├── rank-tracker.png
│   └── history.png
│
├── .gitignore
└── README.md
```

## ⚙️ Installation & Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/kartikpalan1022-reaper/SEO-Rank-Tracker.git
cd SEO-Rank-Tracker
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

Open another terminal:

```bash
cd server
npm install
```

### 4. Configure environment variables

Create a `.env` file inside the `server` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
BROWSERBASE_API_KEY=your_browserbase_api_key
GEMINI_API_KEY=your_gemini_api_key
```

Create a `.env` file inside the `client` directory:

```env
VITE_BACKEND_URL=http://localhost:5000
```

> Never commit real API keys, database credentials, or JWT secrets to GitHub.

### 5. Start the backend

```bash
cd server
npm run server
```

If your `package.json` uses a different script name, use the corresponding command, such as:

```bash
npm start
```

### 6. Start the frontend

```bash
cd client
npm run dev
```

The frontend will typically be available at `http://localhost:5173`.

## 🔐 Authentication Flow

Rank Pilot uses JWT-based authentication:

1. A user registers or logs in.
2. The backend validates credentials and returns a JWT.
3. The frontend stores the token and attaches it to protected API requests using the `Authorization: Bearer <token>` header.
4. Authentication middleware verifies the token and makes user-specific data available to protected routes.

## 🤖 AI-Powered SEO Analysis

The SEO analysis engine uses Google Gemini to convert raw scraped website information into structured audit results, including:

- Overall SEO score
- SEO category score
- Performance score
- Accessibility score
- Best-practices score
- Top keywords and keyword density
- Critical issues
- Warnings
- Informational improvements
- Actionable recommendations

Structured AI responses help ensure predictable data that can be stored in MongoDB and rendered consistently in the frontend.

## 🔎 Website Scraping

The scraper uses Browserbase and Playwright to load websites in a remote browser environment and extract:

- Page title and meta description
- Canonical URL
- Robots metadata
- Open Graph metadata
- Twitter card metadata
- Viewport and charset
- H1–H6 heading counts
- H1 text content
- Internal and external links
- Total images and missing alt attributes
- Page content and word count
- Page size
- Load time
- HTTP status code

## 📈 Keyword Rank Tracking

Users can track a keyword against a target domain. The rank tracking engine:

- Searches Google result pages.
- Extracts organic result URLs, domains, titles, and snippets.
- Detects the target domain's ranking position.
- Records the search-result page where the target was found.
- Identifies competing domains.
- Saves ranking history and position changes.
- Tracks the best recorded position.
- Refreshes keyword data automatically through scheduled cron jobs.

## 🗃️ Data Models

The application stores data for:

- Users and authentication
- SEO analyses and audit reports
- SEO issues and recommendations
- Keyword tracking
- Ranking history
- Competitor results

MongoDB and Mongoose provide persistent storage and schema-based data modeling.

## 🔒 Security Notes

- Passwords should always be hashed before storage.
- JWT secrets and API keys must remain in environment variables.
- `.env` files must be excluded through `.gitignore`.
- Production deployments should restrict CORS to trusted frontend origins.
- API inputs should be validated before scraping or processing.

Recommended `.gitignore` entries:

```gitignore
node_modules/
.env
*.env
dist/
```

## 🚧 Future Improvements

Potential enhancements include:

- Google Search Console integration
- Lighthouse or PageSpeed Insights integration
- PDF report exports
- Email notifications for major ranking changes
- Advanced charts for keyword history
- Multi-device SERP tracking
- Country and language-specific rank tracking
- Team workspaces and shared reports
- Subscription plans with expanded usage limits

## 👨‍💻 Author

**Kartik Palan**

GitHub: https://github.com/kartikpalan1022-reaper

## 📄 License

This project is available under the terms specified in the repository's `LICENSE.md` file.

---

If you find this project useful, consider giving the repository a ⭐.
