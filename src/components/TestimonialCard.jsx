import { motion } from "framer-motion";
import { Star, Quote, MapPin } from "lucide-react";

export function TestimonialCard({
  name,
  location,
  rating,
  comment,
  carType,
  delay = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-gradient-to-br from-[#e8faf0] to-[#d1f5e0] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl border border-[#2d8b3f]/15 card-hover relative overflow-hidden"
    >
      <div className="absolute -top-10 -right-10 w-32 sm:w-52 h-32 sm:h-52 bg-[#2d8b3f]/5 rounded-full" />
      <Quote
        size={40}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 text-[#2d8b3f]/20 sm:w-[72px] sm:h-[72px]"
      />

      <div className="flex gap-1 sm:gap-2 mb-5 sm:mb-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={18}
            className={
              i < rating
                ? "text-[#d4af37] fill-[#d4af37] sm:w-7 sm:h-7"
                : "text-gray-300 sm:w-7 sm:h-7"
            }
          />
        ))}
      </div>

      <p className="text-gray-700 text-sm sm:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-10 relative z-10 font-medium">
        &ldquo;{comment}&rdquo;
      </p>

      <div className="flex items-center justify-between relative z-10">
        <div>
          <h4 className="font-bold text-[#2d2d2d] text-base sm:text-xl lg:text-2xl mb-1 sm:mb-2">{name}</h4>
          <div className="flex items-center gap-1 sm:gap-2 text-gray-500 text-xs sm:text-base">
            <MapPin size={14} className="text-[#2d8b3f]" />
            {location}
          </div>
        </div>
        <span className="text-xs sm:text-base bg-[#2d8b3f] text-white px-3 sm:px-5 py-1.5 sm:py-3 rounded-full font-bold shadow-md">
          {carType}
        </span>
      </div>
    </motion.div>
  );
}
