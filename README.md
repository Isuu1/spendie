# Spendie 💸

Spendie is a modern personal finance dashboard that helps users track balances, recurring payments, and future cash flow in a clear and intuitive way. It’s designed to feel fast, minimal, and data-driven, with a strong focus on user experience and performance.

This project was built as a **portfolio-grade full‑stack application**, showcasing real-world patterns such as authentication, database persistence, API integrations, and scalable UI architecture.

---

## ✨ Features

- 🔐 **Authentication & Accounts**

  - Secure authentication using Supabase Auth
  - User-specific data isolation

- 💰 **Balance & Cash Flow Tracking**

  - Current balance overview
  - Future balance projection based on recurring payments

- 🔁 **Recurring Payments Engine**

  - Supports income & expenses
  - Frequency handling (monthly, yearly, etc.)
  - Automatic future balance calculation

- 📊 **Dashboard UI**

  - Modular, component-based layout
  - Animated UI elements using Framer Motion
  - Responsive design for desktop & mobile

- ⚡ **Performance-focused UX**

  - GPU-accelerated animations
  - Layout-safe transitions (no reflows)
  - Memoized calculations where needed

---

## 🧱 Tech Stack

### Frontend

- **Next.js 15** (App Router)
- **React 18**
- **TypeScript**
- **SCSS Modules**
- **Framer Motion** (animations)
- **clsx** (conditional styling)

### Backend & Infrastructure

- **Supabase**

  - Authentication
  - PostgreSQL database
  - Server Actions integration

- **Next.js Server Actions**
- **Plaid API** (bank account connections)

### Tooling

- **ESLint**
- **Prettier**
- **Git & GitHub**

---

## 🗂️ Project Structure

```txt
app/
├─ (auth)/
│  ├─ login/
│  └─ signup/
├─ (dashboard)/
│  ├─ dashboard/
│  ├─ user/
│  └─ layout.tsx
├─ actions/
├─ api/
components/
features/
lib/
styles/
```

- **app/** – Next.js App Router structure
- **components/** – Shared UI components
- **features/** – Domain-based feature modules (balances, payments, etc.)
- **lib/** – Utilities, helpers, and shared logic

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm / pnpm / yarn
- Supabase project
- Plaid developer account (optional)

### Installation

```bash
git clone https://github.com/your-username/spendie.git
cd spendie
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
PLAID_CLIENT_ID=your_plaid_client_id
PLAID_SECRET=your_plaid_secret
```

### Run the App

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## 🧠 Key Implementation Details

- **Future Balance Calculation**

  - Recurring payments are expanded into future dates and aggregated to produce balance projections.

- **Server Actions First**

  - Data mutations (create/update/delete) are handled via Next.js Server Actions instead of traditional REST endpoints.

- **Reusable Feature Logic**

  - Business logic is extracted into feature-level utilities to keep components lean and reusable.

---

## 📸 Screenshots

> _Coming soon_

---

## 🛣️ Roadmap

- [ ] Budget categories & limits
- [ ] Advanced analytics & charts
- [ ] Export data (CSV)
- [ ] Multi-currency support
- [ ] Mobile-first improvements

---

## 🤝 Contributing

This is primarily a portfolio project, but suggestions and feedback are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👤 Author

**Jakub**

- Aspiring Full‑Stack Software Engineer
- React / Next.js / TypeScript focused

If you found this project interesting or useful, feel free to ⭐ the repository.
