# WCE CGPA to Percent Calculator

## Live Site
🔗 [WCE CGPA to Percent Calculator](https://wce-cgpa-to-percentage.vercel.app/)

This is the deployed, publicly accessible version of the application hosted on Vercel.

Official Grade Conversion & Academic Utility for **Walchand College of Engineering, Sangli (Maharashtra, India)** students.

This web application is built strictly according to the authoritative formulas and grade point scales defined in WCE's **"Academic and Examination Rules and Regulations 2023-24"** (Sections 04.04, 12, and 16).

---

## 🌟 Key Features

1. **CGPA to Percentage Converter (Core Feature - Route `/`)**:
   - Official conversion formula: $\text{Percentage} = (10.00 \times \text{CGPA}) - 7.50$
   - Live input validation ($0.00$ to $10.00$) with friendly error messaging.
   - Shows formula substitution with actual user inputs.
   - Automatic warning note for CGPA $< 5.00$ as per official policy.
2. **Attendance Grade-Penalty Checker (Route `/attendance-checker`)**:
   - Evaluates attendance percentage against official theory course penalty thresholds (Grade caps: BB, BC, CC, XX).
3. **PDF & PNG Report Export**:
   - Client-side export of calculation report cards using `html2canvas` and `jsPDF`.
4. **Local History (Route `/history`)**:
   - Safe browser `localStorage` integration with fallback for private browsing.
5. **Dark / Light Theme Toggle**:
   - Supports system preferences and dark mode with persistent user choice.
6. **Educational Section (Route `/how-its-calculated`)**:
   - Step-by-step worked example ($7.80 \rightarrow 70.50\%$), grade tables, relative grading note, and official rule citations.
7. **Google AdSense Eligibility Pages**:
   - Privacy Policy (`/privacy-policy`)
   - Terms of Use & Disclaimer (`/terms`)
   - About Us (`/about`)
   - Contact Us (`/contact`)

---

## 🛠️ Tech Stack

- **Framework**: React 18+ with TypeScript (Strict mode)
- **Routing**: React Router (`react-router-dom` v6.28)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Client-Side Export**: `html2canvas` (1.4.1) + `jsPDF` (2.5.2)
- **Analytics**: Vercel Analytics (`@vercel/analytics`)
- **Testing**: Vitest (3.0.5)

---

## 🔒 Security & Privacy

- **100% Client-Side**: No backend, no server, no database.
- **Strict Input Validation**: Sanitize and check numeric ranges client-side.
- **Content Security Policy (CSP)**: Hardened meta tag in `index.html`.
- **Zero Secrets**: No API keys or credentials.
- **HTTPS Enforcement**: **Important Note for Deployment**: Enforce HTTPS at the static hosting platform layer (e.g., Vercel, Netlify, Cloudflare Pages, GitHub Pages).

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js `v18+`
- npm `v9+`

### Installation
```bash
# Install dependencies
npm install
```

### Running Dev Server
```bash
npm run dev
```

### Running Unit Tests
```bash
npx vitest run
```

### Building for Production
```bash
npm run build
```
The production bundle will be generated in the `dist/` directory, ready to be deployed to any static host.

---

## ⚖️ Legal Disclaimer

This tool is independently built by a student for the convenience of WCE Sangli students based on the published Academic and Examination Rules and Regulations. Always verify your official grade card and results with the WCE Examination Section for any official or legal purpose.
