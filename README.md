# Maheen Fatima — Personal Portfolio Website

A production-ready, cinematic, editorial personal portfolio website engineered for **Maheen Fatima**, highlighting her academic journey in Computer Science and Engineering, verified technical expertise, competitive hackathon podium finishes, technical certifications, and featured software engineering projects.

---

## 🎨 Visual Design System

Strictly constructed using the bespoke editorial design system:

- **Primary Colours**:
  - `Deep Graphite` (`#1C1D20`): Main backgrounds, dark surfaces, navigation, and footer.
  - `Soft Cloud White` (`#F2F4F1`): Content text, light surfaces, and card backgrounds.
- **Accent Colour**:
  - `Sunshine Yellow` (`#FFC928`): Buttons, active navigation indicators, icon highlights, subtle borders, and warm golden spotlight glows.
- **Atmosphere**: Cinematic golden halo lighting (`radial-gradient`), subtle shadows, editorial spacing, and minimal borders.
- **Typography**:
  - **Headings & Selected Emphasis**: `Playfair Display` (Classic editorial serif)
  - **Interface & Body Text**: `Manrope` (Modern geometric sans-serif)

---

## 📁 Architecture & File Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts         # Secure API route for contact form submissions
│   │   ├── globals.css              # Custom scrollbars, font variables, and Tailwind base
│   │   ├── layout.tsx               # Root layout, SEO metadata, and fonts
│   │   └── page.tsx                 # Main portfolio page composing all 6 sections
│   ├── components/
│   │   ├── Navbar.tsx               # Sticky nav, smooth scrolling, active section tracking, mobile drawer
│   │   ├── Hero.tsx                 # Cinematic hero with portrait canvas & approved tagline
│   │   ├── AboutSection.tsx         # Academic credentials card, verified links, and personal bio
│   │   ├── SkillsSection.tsx        # Categorized skill cards with discipline filter tabs
│   │   ├── AchievementsSection.tsx  # Timeline of hackathon podiums, finale shortlists, and honors
│   │   ├── CertificatesSection.tsx  # Interactive credentials gallery with verification links
│   │   ├── CertificateModal.tsx     # Fullscreen document inspection modal (PDF / high-res scan)
│   │   ├── ProjectsSection.tsx      # Visual project showcase with discipline filters
│   │   ├── ProjectModal.tsx         # Comprehensive project deep-dive modal
│   │   ├── ContactSection.tsx       # Functional contact form with validation and direct channels
│   │   ├── Footer.tsx               # Brand typography, quick jump links, and back-to-top button
│   │   └── Icons.tsx                # Crisp vector SVGs for GitHub, LinkedIn, and brands
│   ├── data/
│   │   └── placeholderData.ts       # Structured single source of truth for portfolio content
│   └── types/
│       └── portfolio.ts             # TypeScript interfaces for projects, certificates, achievements
├── tailwind.config.ts               # Custom color palette, fonts, shadows, and radial spotlight glows
└── package.json                     # Next.js 14, React 18, TypeScript, Tailwind CSS, Lucide React
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.17+ or v20+)
- npm or pnpm or yarn

### 1. Installation

```bash
# Clone the repository
git clone https://github.com/itsLUNEXA/portfolio.git
cd portfolio

# Install dependencies
npm install
```

### 2. Local Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build

```bash
npm run build
npm start
```

---

## 🌐 Deployment to Vercel

The portfolio is architected for zero-configuration, continuous deployment on **Vercel**:

1. Push this repository to your GitHub account (`https://github.com/itsLUNEXA/portfolio`).
2. Log into [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your `portfolio` repository.
4. Framework Preset will automatically detect **Next.js**.
5. Click **Deploy**.

### Environment Variables (Optional)

To enable live email delivery from the contact form (e.g. via Resend, SendGrid, or Nodemailer):
- `CONTACT_EMAIL` = `26fatimasiddiqui@gmail.com`
- `RESEND_API_KEY` = `your_resend_api_key_here`

---

## 👤 Profile & Contact

- **Name**: Maheen Fatima
- **Degree**: B.Tech in Computer Science and Engineering (3rd Year, Class of 2028)
- **College**: Raj Kumar Goel Institute of Technology (RKGIT), Ghaziabad
- **University**: Dr. A.P.J. Abdul Kalam Technical University, Lucknow
- **LinkedIn**: [linkedin.com/in/itslunexa](https://www.linkedin.com/in/itslunexa/)
- **GitHub**: [github.com/itsLUNEXA](https://github.com/itsLUNEXA)
- **Email**: `26fatimasiddiqui@gmail.com`
- **Phone**: `+91 7455996287`
