import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export function PricingCard({
  name,
  price,
  interior,
  planDays,
  isPopular = false,
  delay = 0,
}) {
  const features = [
    `${planDays === "27" ? "Daily" : "Alternate Day"} Exterior Cleaning`,
    `${interior} Interior Cleaning${interior > 1 ? "s" : ""} Included`,
    "Eco-Friendly Solutions",
    "High-GSM Microfiber Cloths",
    "Paint-Safe Technology",
    "Doorstep Service",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`relative bg-white rounded-2xl p-8 card-hover ${
        isPopular
          ? "border-2 border-[#2d8b3f] shadow-xl"
          : "border border-gray-200 shadow-lg"
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-[#d4af37] text-white text-sm font-semibold px-4 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-[#2d2d2d] mb-2">{name}</h3>
        <p className="text-gray-500 text-sm">
          {planDays === "27" ? "27-30 Days Plan" : "15 Days Plan"}
        </p>
      </div>

      <div className="text-center mb-8">
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-2xl font-semibold text-[#2d2d2d]">₹</span>
          <span className="text-5xl font-bold text-[#2d8b3f]">{price}</span>
        </div>
        <p className="text-gray-500 mt-2">per month</p>
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-[#f0fdf4] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check size={12} className="text-[#2d8b3f]" />
            </div>
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>

      <Link to="/book">
        <Button
          className={`w-full py-6 text-lg font-semibold ${
            isPopular
              ? "bg-[#2d8b3f] hover:bg-[#236b31] text-white"
              : "bg-[#f0f7f1] hover:bg-[#dcfce7] text-[#2d8b3f]"
          }`}
        >
          Subscribe Now
        </Button>
      </Link>
    </motion.div>
  );
}
