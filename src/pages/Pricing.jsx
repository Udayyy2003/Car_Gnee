import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PricingCard } from "@/components/PricingCard";
import { pricingData } from "@/lib/data";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import Typewriter from 'typewriter-effect';

const additionalServices = [
  {
    name: "Extra Interior Cleaning",
    price: "₹149",
    description: "Add-on deep interior cleaning session",
  },
  {
    name: "Engine Bay Cleaning",
    price: "₹299",
    description: "Professional engine bay detailing",
  },
  {
    name: "Tire & Alloy Shine",
    price: "₹99",
    description: "Premium tire dressing and alloy polish",
  },
];

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState("30");

  return (
    <div className="pt-20">
      <section className="relative py-24 gradient-bg overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#2d8b3f]/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-5xl mx-auto"
          >
            <div className="inline-flex items-center bg-[#2d8b3f]/10 text-[#2d8b3f] px-4 sm:px-10 py-3 sm:py-4 rounded-full text-sm sm:text-xl lg:text-2xl font-extrabold mb-6 sm:mb-8 border-2 border-[#2d8b3f]/20 shadow-md min-h-[44px] sm:min-h-[64px] tracking-tight mx-auto">
              <Typewriter
                options={{
                  strings: ['Pricing', 'Affordable Plans', 'No Hidden Fees', 'Transparent Costs'],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 30,
                  delay: 50,
                }}
              />
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-[#2d2d2d] mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-sm sm:text-xl lg:text-2xl text-gray-700 font-medium mb-8">
              Choose the plan that fits your needs. No hidden charges, no surprises.
            </p>

            <div className="inline-flex bg-white rounded-full p-2 shadow-lg">
              <button
                onClick={() => setSelectedPlan("30")}
                className={`px-4 sm:px-10 py-3 sm:py-5 rounded-full font-bold text-sm sm:text-lg transition-all ${
                  selectedPlan === "30"
                    ? "bg-[#2d8b3f] text-white shadow-xl"
                    : "text-gray-600 hover:text-[#2d8b3f]"
                }`}
              >
                30 Days (Daily)
              </button>
              <button
                onClick={() => setSelectedPlan("15")}
                className={`px-4 sm:px-10 py-3 sm:py-5 rounded-full font-bold text-sm sm:text-lg transition-all ${
                  selectedPlan === "15"
                    ? "bg-[#2d8b3f] text-white shadow-xl"
                    : "text-gray-600 hover:text-[#2d8b3f]"
                }`}
              >
                15 Days (Alternate)
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(pricingData).map(([key, data], index) => (
              <PricingCard
                key={key}
                name={data.name}
                price={data.plans[selectedPlan].price}
                interior={data.plans[selectedPlan].interior}
                planDays={selectedPlan}
                isPopular={key === "sedan"}
                delay={index * 0.1}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-block bg-gradient-to-r from-[#2d8b3f] to-[#22c55e] text-white px-12 py-4 rounded-3xl shadow-2xl animate-pulse-glow"
              >
                <h2 className="text-2xl lg:text-4xl font-extrabold tracking-tight">
                  Our Official Price List
                </h2>
              </motion.div>
            </div>
            <div className="w-full max-w-5xl mx-auto">
              <img
                src="/official pricing/official pricing.png"
                alt="Official Price List"
                className="w-full rounded-3xl shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 gradient-bg">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center bg-[#2d8b3f]/10 text-[#2d8b3f] px-4 sm:px-10 py-3 sm:py-4 rounded-full text-sm sm:text-xl lg:text-2xl font-extrabold mb-6 sm:mb-8 border-2 border-[#2d8b3f]/20 shadow-md min-h-[44px] sm:min-h-[64px] tracking-tight mx-auto">
              Add-Ons
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#2d2d2d] mb-4">
              Additional Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Enhance your cleaning experience with these optional add-on services.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {additionalServices.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl p-6 sm:p-10 text-center shadow-xl card-hover"
              >
                <h3 className="text-2xl font-bold text-[#2d2d2d] mb-3">
                  {service.name}
                </h3>
                <p className="text-4xl font-bold text-[#2d8b3f] mb-4">
                  {service.price}
                </p>
                <p className="text-gray-600 text-lg">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-4xl font-bold text-[#2d2d2d] mb-4">
              What&apos;s Included in Every Plan
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              "Eco-friendly waterless solution",
              "High-GSM microfiber cloths",
              "Doorstep service",
              "Morning time slots (5:00-7:30 AM)",
              "Trained professional cleaners",
              "No hidden charges",
              "Flexible rescheduling",
              "Rainy day compensation",
              "Satisfaction guarantee",
            ].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4 bg-[#f0f7f1] rounded-2xl p-6 min-w-0"
              >
                <CheckCircle2 size={24} className="text-[#2d8b3f] flex-shrink-0" />
                <span className="text-gray-700 text-sm sm:text-lg">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 gradient-hero text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Subscribe?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Start your eco-friendly car care journey today. Book online or call us!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/book">
                <Button
                  className="bg-white text-[#2d8b3f] hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-full shadow-lg transition-all hover:scale-105"
                >
                  Book Now
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  className="bg-white text-[#2d8b3f] hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-full shadow-lg transition-all hover:scale-105"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
