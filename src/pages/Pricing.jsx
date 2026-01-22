import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PricingCard } from "@/components/PricingCard";
import { pricingData } from "@/lib/data";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";

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
  const [selectedPlan, setSelectedPlan] = useState("27");

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
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block bg-[#2d8b3f]/10 text-[#2d8b3f] px-4 py-2 rounded-full text-sm font-medium mb-6">
              Pricing
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold text-[#2d2d2d] mb-6">
              Simple, Transparent
              <br />
              <span className="text-gradient">Pricing</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Choose the plan that fits your needs. No hidden charges, no surprises.
            </p>

            <div className="inline-flex bg-white rounded-full p-1 shadow-lg">
              <button
                onClick={() => setSelectedPlan("27")}
                className={`px-8 py-4 rounded-full font-semibold transition-all ${
                  selectedPlan === "27"
                    ? "bg-[#2d8b3f] text-white"
                    : "text-gray-600 hover:text-[#2d8b3f]"
                }`}
              >
                27-30 Days (Daily)
              </button>
              <button
                onClick={() => setSelectedPlan("15")}
                className={`px-8 py-4 rounded-full font-semibold transition-all ${
                  selectedPlan === "15"
                    ? "bg-[#2d8b3f] text-white"
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
            className="mt-16 bg-[#f0f7f1] rounded-3xl p-8 lg:p-12"
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-[#2d2d2d] mb-4">
                  Official Price List
                </h2>
                <p className="text-gray-600 mb-6">
                  View our complete pricing structure directly from our official price list. All prices include GST.
                </p>
                <ul className="space-y-3">
                  {[
                    "Hatchback: ₹399/15 days | ₹699/month",
                    "Sedan: ₹449/15 days | ₹749/month",
                    "Compact SUV: ₹499/15 days | ₹799/month",
                    "SUV/MUV: ₹549/15 days | ₹849/month",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 size={18} className="text-[#2d8b3f]" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative aspect-[3/4] max-w-sm mx-auto lg:mx-0 lg:ml-auto rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/poster-1768807507644.jpeg?width=8000&height=8000&resize=contain"
                  alt="Car Gnee Price List"
                  className="object-cover w-full h-full"
                />
              </div>
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
            <span className="inline-block bg-[#2d8b3f]/10 text-[#2d8b3f] px-4 py-2 rounded-full text-sm font-medium mb-4">
              Add-Ons
            </span>
            <h2 className="text-4xl font-bold text-[#2d2d2d] mb-4">
              Additional Services
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Enhance your cleaning experience with these optional add-on services.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {additionalServices.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 text-center shadow-lg card-hover"
              >
                <h3 className="text-xl font-bold text-[#2d2d2d] mb-2">
                  {service.name}
                </h3>
                <p className="text-3xl font-bold text-[#2d8b3f] mb-3">
                  {service.price}
                </p>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[#2d2d2d] mb-4">
              What&apos;s Included in Every Plan
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              "Eco-friendly waterless solution",
              "High-GSM microfiber cloths",
              "Doorstep service",
              "Morning time slots (6-10 AM)",
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
                className="flex items-center gap-3 bg-[#f0f7f1] rounded-xl p-4"
              >
                <CheckCircle2 size={20} className="text-[#2d8b3f] flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
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
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Subscribe?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Start your eco-friendly car care journey today. Book online or call us!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/book">
                <Button className="bg-white text-[#2d8b3f] hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-full">
                  Book Now
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <a href="tel:8160057141">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-full"
                >
                  <Phone className="mr-2" size={20} />
                  8160057141
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
