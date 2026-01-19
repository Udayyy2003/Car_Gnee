"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export function ServiceCard({
  icon: Icon,
  title,
  description,
  delay = 0,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 card-hover group"
    >
      <div className="w-16 h-16 rounded-2xl bg-[#f0fdf4] flex items-center justify-center mb-6 group-hover:bg-[#2d8b3f] transition-colors">
        <Icon
          size={32}
          className="text-[#2d8b3f] group-hover:text-white transition-colors"
        />
      </div>
      <h3 className="text-xl font-bold text-[#2d2d2d] mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}
