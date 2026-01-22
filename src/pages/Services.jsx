import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  Sparkles,
  Car,
  CheckCircle2,
  ArrowRight,
  Clock,
  Droplets,
  Shield,
  Leaf,
} from "lucide-react";

const services = [
  {
    icon: CalendarDays,
    title: "15 Days Plan",
    subtitle: "Alternate Day Cleaning",
    description:
      "Perfect for car owners who want regular maintenance without daily cleaning. Your car gets cleaned on alternate days, keeping it consistently clean throughout the month.",
    features: [
      "15 exterior cleaning sessions per month",
      "1 interior cleaning included",
      "Eco-friendly waterless solution",
      "High-GSM microfiber cloths",
      "Doorstep service",
      "Morning time slot (6 AM - 10 AM)",
    ],
    ideal: "Ideal for: Cars parked in covered areas, occasional users",
  },
  {
    icon: Sparkles,
    title: "27-30 Days Plan",
    subtitle: "Daily Cleaning",
    description:
      "Our most popular plan for car enthusiasts who want their vehicle spotless every single day. Wake up to a showroom-fresh car every morning.",
    features: [
      "Daily exterior cleaning (27-30 sessions)",
      "2 interior cleanings included",
      "Premium waterless solution",
      "High-GSM microfiber cloths",
      "Priority doorstep service",
      "Flexible morning time slots",
    ],
    ideal: "Ideal for: Daily commuters, car enthusiasts, business professionals",
    popular: true,
  },
  {
    icon: Car,
    title: "Interior Cleaning",
    subtitle: "Deep Interior Care",
    description:
      "Comprehensive interior cleaning service that covers every surface inside your car. Available as a standalone service or add-on to your monthly plan.",
    features: [
      "Dashboard & console cleaning",
      "Seat cleaning (leather/fabric safe)",
      "Floor mat cleaning",
      "Door panel wiping",
      "Glass cleaning (inside)",
      "Air vent dusting",
    ],
    ideal: "Ideal for: Everyone who wants a fresh, clean cabin",
  },
];

const process = [
  {
    step: "1",
    title: "Book Your Plan",
    description:
      "Choose your preferred plan online or call us. We'll confirm your subscription and start date.",
  },
  {
    step: "2",
    title: "We Come to You",
    description:
      "Our trained technicians arrive at your doorstep during morning hours with all equipment.",
  },
  {
    step: "3",
    title: "Premium Cleaning",
    description:
      "Using eco-friendly solutions and high-GSM microfiber cloths, we clean your car to perfection.",
  },
  {
    step: "4",
    title: "Enjoy the Shine",
    description:
      "Drive away in a sparkling clean car! We repeat this process according to your plan schedule.",
  },
];

export default function Services() {
  return (
    <div className="pt-20">
      <section className="relative py-24 gradient-bg overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#2d8b3f]/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block bg-[#2d8b3f]/10 text-[#2d8b3f] px-4 py-2 rounded-full text-sm font-medium mb-6">
              Our Services
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold text-[#2d2d2d] mb-6">
              Premium Waterless
              <br />
              <span className="text-gradient">Car Care Services</span>
            </h1>
            <p className="text-xl text-gray-600">
              Choose from our range of flexible plans designed to keep your car
              looking its best while being kind to the environment.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="relative">
                    {service.popular && (
                      <span className="absolute -top-3 left-4 bg-[#d4af37] text-white text-sm font-semibold px-4 py-1 rounded-full">
                        Most Popular
                      </span>
                    )}
                    <div
                      className={`bg-gradient-to-br ${
                        service.popular
                          ? "from-[#2d8b3f] to-[#4ade80]"
                          : "from-[#f0f7f1] to-[#dcfce7]"
                      } rounded-3xl p-10`}
                    >
                      <div
                        className={`w-20 h-20 rounded-2xl ${
                          service.popular ? "bg-white/20" : "bg-white"
                        } flex items-center justify-center mb-6`}
                      >
                        <service.icon
                          size={40}
                          className={
                            service.popular ? "text-white" : "text-[#2d8b3f]"
                          }
                        />
                      </div>
                      <h2
                        className={`text-3xl font-bold mb-2 ${
                          service.popular ? "text-white" : "text-[#2d2d2d]"
                        }`}
                      >
                        {service.title}
                      </h2>
                      <p
                        className={`text-lg mb-4 ${
                          service.popular ? "text-white/80" : "text-gray-600"
                        }`}
                      >
                        {service.subtitle}
                      </p>
                      <p
                        className={`${
                          service.popular ? "text-white/90" : "text-gray-600"
                        } leading-relaxed`}
                      >
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <h3 className="text-xl font-bold text-[#2d2d2d] mb-6">
                    What&apos;s Included:
                  </h3>
                  <ul className="space-y-4 mb-8">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#f0fdf4] flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 size={14} className="text-[#2d8b3f]" />
                        </div>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-[#2d8b3f] font-medium mb-6 bg-[#f0f7f1] px-4 py-2 rounded-lg inline-block">
                    {service.ideal}
                  </p>
                  <div>
                    <Link to="/pricing">
                      <Button className="bg-[#2d8b3f] hover:bg-[#236b31] text-white px-8 py-6 text-lg rounded-full">
                        View Pricing
                        <ArrowRight className="ml-2" size={20} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#2d2d2d] text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block bg-[#4ade80]/20 text-[#4ade80] px-4 py-2 rounded-full text-sm font-medium mb-4">
              How It Works
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Simple 4-Step Process
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Getting started with Car Gnee is easy. Here&apos;s how it works.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white/5 rounded-2xl p-8 h-full">
                  <span className="text-6xl font-bold text-[#2d8b3f]/30 absolute top-4 right-4">
                    {item.step}
                  </span>
                  <h3 className="text-xl font-bold mb-3 relative z-10">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 relative z-10">
                    {item.description}
                  </p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-[#2d8b3f]" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 gradient-bg">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block bg-[#2d8b3f]/10 text-[#2d8b3f] px-4 py-2 rounded-full text-sm font-medium mb-4">
              Why Waterless?
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#2d2d2d] mb-6">
              Benefits of Waterless Cleaning
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Droplets,
                title: "Save Water",
                description: "Save 150+ liters per wash",
              },
              {
                icon: Shield,
                title: "Protect Paint",
                description: "No micro-scratches",
              },
              {
                icon: Clock,
                title: "Save Time",
                description: "Doorstep service",
              },
              {
                icon: Leaf,
                title: "Eco-Friendly",
                description: "Biodegradable solutions",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 text-center shadow-lg card-hover"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#f0fdf4] flex items-center justify-center mx-auto mb-4">
                  <item.icon size={32} className="text-[#2d8b3f]" />
                </div>
                <h3 className="text-lg font-bold text-[#2d2d2d] mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Choose your plan and experience the Car Gnee difference today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/book">
                <Button className="bg-white text-[#2d8b3f] hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-full">
                  Book Now
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-full"
                >
                  View Pricing
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
