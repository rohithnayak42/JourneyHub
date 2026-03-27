# 🌍 JourneyHub — Premium Travel Booking Platform

JourneyHub is a full-stack, all-in-one travel booking platform built for seamless, modern travel planning. Book **Buses**, **Trains**, **Flights**, and **Hotels** through a polished, high-performance interface with real booking flows, smart filters, and professional ticket generation.

---

## ✨ Feature Highlights

### 🚌 Bus Booking — Full 3-Step Flow
A complete, multi-step booking experience:
1. **Seat Selection** — Interactive seat simulator with live seat status (available / booked / selected), passenger details form.
2. **Boarding & Dropping Points** — Choose pickup and drop-off stops from a list of real city points.
3. **Payment & E-Ticket** — Choose UPI, Credit/Debit Card (with card details form), or Net Banking. On success, a professional **e-ticket** is generated with Booking ID, passenger details, boarding/dropping points, and a downloadable PDF option.

> Booking data is securely passed between steps via `localStorage`, and cleaned up after ticket generation.

### 🚆 Train Booking — Smart Search & Results
- **14-day scrollable date slider** to easily switch travel dates.
- **Fully scoped per-card class selection** — selecting a class chip on one train card does **not** affect other cards (no state leakage). Each `TrainCard` manages its own `selectedClass` independently.
- **Weekday filter buttons** on each card show running days; clicking a day updates the global filter in sync with the sidebar.
- **Smart Sort** options: Best Match, Lowest Price, Fastest, Early Birds.
- **Expandable detail panel** per train showing stoppages, on-board facilities, and cancellation policy.
- **Status badges**: Available (with seat count), Waiting List (WL number), or Sold Out — per class.

### 🔍 Advanced Filter Sidebar (Train)
A sticky, collapsible sidebar with animated sections:
- **Availability**: Show Confirmed Only / Hide Waiting List
- **Running Days**: Interactive M-T-W-T-F-S-S day toggles
- **Journey Class**: 1A / 2A / 3A / SL / CC / EC chip filters
- **Booking Quota**: General, Tatkal, Ladies, Senior Citizen
- **Time Preference**: Morning / Afternoon / Evening / Night departure slots
- **Special Filters**: Free Cancellation, Premium Trains Only toggles

### ✈️ Flight & 🏨 Hotel Booking
- Rich result cards with smart image fallbacks — no broken images, ever.
- Context-aware category images (beach, mountain, city) based on destination.
- Hover zoom animations, gradient overlays, and lazy loading for all cards.

### 📊 User Dashboard
- Authenticated user dashboard showing bookings and account details.
- Protected routes ensuring only logged-in users access booking flows.

### 🔐 Auth & Security
- Full signup and login flow with JWT-based authentication.
- `ProtectedRoute` component guards booking and dashboard pages.

### 🎨 Premium UI/UX
- **100vh Parallax Hero** sections for Bus and Train modules with high-quality background images.
- **Global smooth page transitions** using Framer Motion `AnimatePresence`.
- **Scroll-reveal animations** on all section components.
- **Glassmorphism** cards and overlays throughout.
- Fully responsive layout (mobile → desktop).

---

## 🛠️ Tech Stack

### Frontend
| Tool | Purpose |
|---|---|
| [React](https://reactjs.org/) + [Vite](https://vitejs.dev/) | Core framework & build tool |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [Framer Motion](https://www.framer.com/motion/) | Page transitions & animations |
| [Lucide React](https://lucide.dev/) + [React Icons](https://react-icons.github.io/react-icons/) | Icon libraries |
| [React Router DOM](https://reactrouter.com/) | Client-side routing |
| `localStorage` | Booking state between multi-step flows |

### Backend
| Tool | Purpose |
|---|---|
| [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/) | Server & REST API |
| [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/) | Database & ODM |
| JWT | Authentication tokens |
| [Vercel](https://vercel.com/) | Deployment (client + server) |

### API Routes
- `POST /api/auth/register` — User registration
- `POST /api/auth/login` — User login
- `GET /api/buses/search` — Bus search results
- `GET /api/trains/search` — Train search results
- `GET /api/flights/search` — Flight search results
- `GET /api/hotels/search` — Hotel search results
- `POST /api/bookings` — Create booking
- `POST /api/payments` — Payment processing

---

## 🗂️ Project Structure

```
JourneyHub/
├── client/                    # React + Vite frontend
│   └── src/
│       ├── components/
│       │   ├── bus/           # BusCard, BusHero, BusFilter, SeatSimulator, BusTracking, etc.
│       │   ├── train/         # TrainCard, TrainHero, TrainSearchBar, TrainOffers, TrainStats, etc.
│       │   ├── flight/        # Flight section components
│       │   ├── hotel/         # Hotel section components
│       │   ├── search/        # Shared search bar components
│       │   ├── common/        # Shared utility components
│       │   ├── FilterSidebar.jsx  # Advanced train filter sidebar
│       │   ├── TrainCard.jsx      # Per-card scoped class selection
│       │   └── Navbar.jsx
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── BusResults.jsx
│       │   ├── BusSeatSelection.jsx   # Step 1 of bus booking
│       │   ├── BusBoarding.jsx        # Step 2 of bus booking
│       │   ├── BusPayment.jsx         # Step 3 — payment + e-ticket
│       │   ├── TrainResults.jsx       # Train search with date slider & filters
│       │   ├── FlightResults.jsx
│       │   ├── HotelResults.jsx
│       │   ├── BookingPage.jsx
│       │   ├── Dashboard.jsx
│       │   ├── Login.jsx
│       │   └── Register.jsx
│       └── services/
│           └── api.js                 # Axios instance for backend calls
│
├── server/                    # Express.js + MongoDB backend
│   ├── controllers/           # Route handler logic
│   ├── models/                # Mongoose schemas
│   ├── routes/                # API route definitions
│   ├── middleware/            # Auth middleware
│   ├── seed/                  # Database seed scripts
│   └── server.js
│
├── images/                    # Hero & background images
├── vercel.json                # Deployment config
└── package.json               # Root scripts
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or a local MongoDB instance

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/rohithnayak42/JourneyHub.git
   cd JourneyHub
   ```

2. **Install all dependencies** (root, client, and server):
   ```bash
   npm run install-all
   ```

3. **Environment Setup**:
   Create a `.env` file inside the `server/` directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

### Running Locally

**Terminal 1 — Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd client
npm run dev
```

| Service | URL |
|---|---|
| Frontend | http://localhost:5173/ |
| Backend API | http://localhost:5000/ |

---

## 🎨 UI/UX Design Principles

- **Glassmorphism** — frosted glass cards and overlays.
- **Micro-animations** — hover lifts, scale transitions, shimmer loading skeletons.
- **Parallax Hero sections** — full-viewport immersive entry points for each travel mode.
- **Smart image fallbacks** — zero broken images; context-aware defaults per destination category.
- **Accessible interactions** — disabled states, loading feedback, and clear visual affordances throughout.

---


