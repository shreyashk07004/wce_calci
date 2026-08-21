# 🎓 WCE CGPA to Percent Calculator

> **Official Grade Conversion & Academic Utility for Walchand College of Engineering, Sangli (Maharashtra, India) Students.**

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&size=22&pause=1000&color=6366F1&center=true&vCenter=true&width=600&lines=WCE+CGPA+to+Percentage+Converter;Based+on+Official+WCE+Rules+%26+Regulations+2023-24;100%25+Free+%7C+No+Login+%7C+No+Backend)](https://git.io/typing-svg)

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Site-emerald?style=for-the-badge&logo=vercel)](https://wce-cgpa-to-percentage.vercel.app/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 📌 Table of Contents

- [🌐 Live Site](#-live-site)
- [✨ Key Features](#-key-features)
- [📸 Demo Preview](#-demo-preview)
- [🛠️ Tech Stack](#️-tech-stack)
- [🔒 Security & Privacy](#-security--privacy)
- [🚀 Getting Started](#-getting-started)
- [🧪 Testing](#-testing)
- [📁 Project Structure](#-project-structure)
- [⚖️ Legal Disclaimer](#️-legal-disclaimer)

---

## 🌐 Live Site

🔗 **[WCE CGPA to Percent Calculator](https://wce-cgpa-to-percentage.vercel.app/)**

This is the deployed, publicly accessible version of the application hosted on Vercel.

It is an independent, unofficial Grade Conversion & Academic Utility built strictly according to the authoritative formulas and grade point scales defined in WCE's **"Academic and Examination Rules and Regulations 2023-24"** (Sections 04.04, 12, and 16).

---

## ✨ Key Features

- **⚡ Core CGPA to Percentage Converter (Route `/`)**:
  - Official WCE conversion formula: $\text{Percentage} = (10.00 \times \text{CGPA}) - 7.50$
  - Live input validation ($0.00$ to $10.00$) with real-time error guidance.
  - Substituted formula breakdown showing step-by-step math with actual user inputs.
  - Automatic official warning note for CGPA $< 5.00$ as per WCE policy.
  - **Quick Test Value** preset buttons ($6.25$, $6.75$, $7.25$, $7.75$, $8.25$, $8.50$, $9.00$) matching WCE's official verification table.
- **📄 Client-Side PDF & PNG Report Card Export**:
  - Download high-resolution PNG or print-ready PDF grade conversion reports using `html2canvas` and `jsPDF`.
- **📖 Educational "How It's Calculated" Section (Route `/how-its-calculated`)**:
  - Complete reference guide with the official WCE Grade Point Table (AA=10, AB=9, BB=8, etc.), Section 04.04 attendance penalty threshold matrix, relative grading explanation, and a step-by-step worked example ($7.80 \rightarrow 70.50\%$).
- **💾 Local History Panel (Route `/history`)**:
  - Safe browser `localStorage` integration storing past CGPA conversions with timestamping and 1-click fallback for private window browsing.
- **🌙 Dark & Light Theme Modes**:
  - Persistent user preference toggle with automatic system theme detection.
- **📋 Google AdSense & Publisher Eligibility Pages**:
  - Dedicated pages for [Privacy Policy (`/privacy-policy`)](https://wce-cgpa-to-percentage.vercel.app/privacy-policy), [Terms of Use (`/terms`)](https://wce-cgpa-to-percentage.vercel.app/terms), [About Us (`/about`)](https://wce-cgpa-to-percentage.vercel.app/about), and [Contact Us (`/contact`)](https://wce-cgpa-to-percentage.vercel.app/contact).

---

## 📸 Demo Preview

<!-- TODO: Add a screenshot or short GIF demo of the CGPA calculator here -->

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **[React 18](https://react.dev/)** | Core UI component framework |
| **[TypeScript](https://www.typescriptlang.org/)** | Type-safe strict component logic & calculation models |
| **[Vite 6](https://vitejs.dev/)** | Lightning-fast build tool and dev server |
| **[React Router 6](https://reactrouter.com/)** | Client-side routing with clean SEO URLs |
| **[Tailwind CSS 3](https://tailwindcss.com/)** | Modern responsive design system & dark mode styling |
| **[Lucide React](https://lucide.dev/)** | Clean UI icons |
| **[Vercel Analytics](https://vercel.com/analytics)** | Privacy-friendly visitor insights |
| **[Vitest 3](https://vitest.dev/)** | Unit testing framework for math engine correctness |
| **[html2canvas](https://html2canvas.hertzen.com/) & [jsPDF](https://github.com/parallax/jsPDF)** | Client-side PNG/PDF report export |

---

## 🔒 Security & Privacy

- **100% Client-Side**: No backend server, no database, no external data tracking. All calculations happen entirely within the user's browser.
- **Strict Input Validation**: Client-side boundary checks ($0.00$ to $10.00$).
- **Content Security Policy (CSP)**: Hardened meta headers in `index.html`.
- **Zero Secrets**: No API keys, credentials, or backend endpoints required.
- **HTTPS Enforcement**: Deployed on Vercel with automatic TLS encryption.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Installation & Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/shreyashk07004/wce_calci.git

# 2. Navigate to project directory
cd "wce cpga to per new"

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

---

## 🧪 Testing

The formula engine is strictly validated using unit tests covering standard decimal rounding, out-of-range boundaries, and WCE's official verification table values.

```bash
# Run unit tests
npx vitest run
```

---

## 📁 Project Structure

```
wce-cgpa-to-percent-calculator/
├── public/
│   ├── favicon.svg               # Web app favicon
│   ├── sitemap.xml               # SEO XML Sitemap
│   ├── robots.txt                # Crawler directives
│   └── googled64e8bd0af712256.html # Google Search Console verification
├── src/
│   ├── components/               # UI components (Navbar, Footer, Calculator, etc.)
│   ├── pages/                    # Legal & Info pages (Privacy, Terms, About, Contact)
│   ├── types/                    # TypeScript interfaces & types
│   ├── utils/                    # Formula engine, pdf export, & localStorage wrapper
│   ├── App.tsx                   # React Router entry point
│   ├── main.tsx                  # Vite React DOM root
│   └── index.css                 # Tailwind CSS styles & custom rules
├── index.html                    # Root HTML document with Open Graph & CSP tags
├── vercel.json                   # Vercel SPA rewrite fallback configuration
├── vite.config.ts                # Vite configuration
└── package.json                  # Project dependencies & scripts
```

---

## ⚖️ Legal Disclaimer

This tool is independently built by a student for the convenience of Walchand College of Engineering (WCE), Sangli students based on the published Academic and Examination Rules and Regulations 2023-24. Always verify your official grade card and results with the WCE Examination Section for any official or legal purpose.
