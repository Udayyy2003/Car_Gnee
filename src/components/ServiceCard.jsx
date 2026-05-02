import { motion } from "framer-motion";

export function ServiceCard({
  icon: Icon,
  title,
  description,
  delay = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-gradient-to-br from-white to-[#f0fdf4] rounded-3xl p-10 shadow-xl border-2 border-[#2d8b3f]/20 card-hover group text-center"
    >
      <div className="mb-6">
        <div className="inline-block w-2 h-2 rounded-full bg-[#2d8b3f] mb-4"></div>
        <h3 className="text-2xl lg:text-3xl font-extrabold text-[#2d2d2d] mb-4 tracking-tight">{title}</h3>
        <div className="w-16 h-1 bg-gradient-to-r from-[#2d8b3f] to-[#4ade80] mx-auto rounded-full"></div>
      </div>
      <p className="text-gray-700 leading-relaxed text-lg">{description}</p>
      <div className="mt-6 inline-flex items-center gap-2 text-[#2d8b3f] font-semibold">
        <span>Learn more</span>
        <svg 
          className="w-4 h-4 group-hover:translate-x-2 transition-transform" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </motion.div>
  );
}
