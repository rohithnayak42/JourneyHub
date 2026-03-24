import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from '../search/SearchBar';

const heros = {
  bus: {
    bg: "/images/bus-image.png",
    heading: "India's No.1 Online Bus Ticket Booking",
    subtext: "Safe, reliable, and comfortable journeys across 10,000+ routes.",
    overlay: "from-black/40 to-black/60"
  },
  train: {
    bg: "/images/train-image-1.png",
    heading: "Seamless Train Ticket Reservations",
    subtext: "Experience the magic of rail travel with hassle-free booking.",
    overlay: "from-black/50 to-black/70"
  },
  flight: {
    bg: "/images/flight-image.png",
    heading: "Fly Higher with Exclusive Flight Deals",
    subtext: "Explore the world with unbeatable prices and premium comfort.",
    overlay: "from-black/40 to-black/60"
  },
  hotel: {
    bg: "/images/hotel-image.png",
    heading: "Find Your Perfect Stay Anywhere",
    subtext: "Luxury hotels, cozy homestays, and affordable rooms worldwide.",
    overlay: "from-black/40 to-black/60"
  }
};

const Hero = ({ type }) => {
  const config = heros[type] || heros.bus;
  const isTrain = type === 'train';

  return (
    <div className={`relative ${isTrain ? 'min-h-screen' : 'min-h-[95vh]'} w-full flex items-center justify-center z-[40] bg-slate-900 pb-32 transition-all duration-700`}>
      
      {/* 🏙️ Parallax Background Wrapper */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={type}
            className="absolute inset-0"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1 
            }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{
              opacity: { duration: 0.8 },
              scale: { 
                duration: isTrain ? 12 : 10, 
                repeat: Infinity, 
                repeatType: "reverse", 
                ease: "easeInOut" 
              }
            }}
            style={{
              backgroundImage: `url(${config.bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "fixed" // 🔥 Parallax Effect
            }}
          />
        </AnimatePresence>
      </div>

      {/* 🌙 Enhanced Gradient Overlay (Requested for professional look) */}
      <div className={`absolute inset-0 z-10 bg-gradient-to-b ${config.overlay} pointer-events-none transition-all duration-1000`} />

      {/* 🎨 Centered Premium Content (z-20) */}
      <div className="layout-container relative z-20 flex flex-col items-center justify-center text-center w-full px-4">
        
        {/* Typography with Page-Enter Style Animation */}
        <motion.div
          key={`text-${type}`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="mb-12 mt-12 md:mt-0"
        >
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[1.1]">
            {config.heading.split(' ').slice(0, -2).join(' ')} <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text">
              {config.heading.split(' ').slice(-2).join(' ')}
            </span>
          </h1>
          <p className="mt-8 text-lg md:text-2xl text-slate-200 font-medium max-w-3xl mx-auto leading-relaxed opacity-90">
            {config.subtext}
          </p>
        </motion.div>

        {/* 🚀 Smart Search Bar Container */}
        <motion.div
          key={`search-${type}`}
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full relative z-30"
        >
          <div className="w-full overflow-visible bg-white/10 backdrop-blur-xl rounded-[3.5rem] p-2 border border-white/20 shadow-[0_30px_100px_rgba(0,0,0,0.6)] group hover:border-white/30 transition-all duration-500">
            <SearchBar type={type} />
          </div>
        </motion.div>

      </div>

      {/* Modern Wave-Fade Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-slate-900 to-transparent z-10" />
    </div>
  );
};

export default Hero;
