import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

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
      className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 card-hover relative"
    >
      <Quote
        size={40}
        className="absolute top-6 right-6 text-[#f0fdf4]"
      />
      
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={18}
            className={
              i < rating
                ? "text-[#d4af37] fill-[#d4af37]"
                : "text-gray-300"
            }
          />
        ))}
      </div>

      <p className="text-gray-600 leading-relaxed mb-6 relative z-10">
        &ldquo;{comment}&rdquo;
      </p>

      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-[#2d2d2d]">{name}</h4>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
        <span className="text-xs bg-[#f0f7f1] text-[#2d8b3f] px-3 py-1 rounded-full font-medium">
          {carType}
        </span>
      </div>
    </motion.div>
  );
}
