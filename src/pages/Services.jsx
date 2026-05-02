import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
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
import Typewriter from 'typewriter-effect';

const services = [
  {
    icon: CalendarDays,
    title: "15 Days Plan",
    subtitle: "Alternate Day Cleaning",
    description:
      "Our most popular alternate day cleaning plan. Perfect for those who need regular maintenance without daily cleaning. Get your car cleaned on alternate days with our premium waterless solution.",
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
    title: "30 Days Plan",
    subtitle: "Daily Cleaning",
    description:
      "Our most popular daily cleaning plan. Wake up to a spotless car every single day with comprehensive exterior cleaning. The ultimate care for your vehicle.",
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
  const [interiorIndex, setInteriorIndex] = useState(0);

  const interiorImages = [
    '/interior cleaning/1.jpeg',
    '/interior cleaning/2.jpeg',
    '/interior cleaning/3.jpeg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setInteriorIndex((prev) => (prev + 1) % interiorImages.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [interiorImages.length]);

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
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center bg-[#2d8b3f]/10 text-[#2d8b3f] px-4 sm:px-10 py-3 sm:py-4 rounded-full text-sm sm:text-xl lg:text-2xl font-extrabold mb-6 sm:mb-8 border-2 border-[#2d8b3f]/20 shadow-md min-h-[48px] sm:min-h-[64px] tracking-tight mx-auto">
              <Typewriter
                options={{
                  strings: ['Our Services', 'Premium Plans', 'Car Care', 'Waterless Cleaning'],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 30,
                  delay: 50,
                }}
              />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-[#2d2d2d] mb-6">
              Premium Waterless
              <br />
              <span className="text-gradient">Car Care Services</span>
            </h1>
            <div className="space-y-3">
              <p className="text-base sm:text-xl lg:text-2xl font-semibold text-gray-700">
                Choose from our range of flexible plans
              </p>
              <p className="text-base sm:text-xl lg:text-2xl font-semibold text-gray-700">
                Designed to keep your car looking its best
              </p>
              <p className="text-base sm:text-xl lg:text-2xl font-semibold text-gray-700">
                While being kind to the environment.
              </p>
            </div>
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
                  <div className="relative mt-10">
                    {service.popular && (
                      <span className="absolute -top-3 left-4 bg-[#d4af37] text-white text-sm font-semibold px-4 py-1 rounded-full z-10">
                        Most Popular
                      </span>
                    )}
                    {service.title === "15 Days Plan" && (
                      <img 
                        src="/15 days.png" 
                        alt="15 Days Plan" 
                        className="w-full rounded-3xl shadow-2xl scale-110 transform"
                      />
                    )}
                    {service.title === "30 Days Plan" && (
                      <img 
                        src="/30 days.png" 
                        alt="30 Days Plan" 
                        className="w-full rounded-3xl shadow-2xl scale-110 transform"
                      />
                    )}
                    {service.title === "Interior Cleaning" && (
                      <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
                        {interiorImages.map((img, i) => (
                          <motion.img
                            key={i}
                            src={img}
                            alt="Interior Cleaning"
                            initial={{ opacity: 0 }}
                            animate={{ 
                              opacity: interiorIndex === i ? 1 : 0,
                              scale: interiorIndex === i ? 1 : 0.95
                            }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="text-center">
                    <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#2d2d2d] mb-5">
                      {service.title}
                    </h2>
                    <p className="text-lg sm:text-2xl font-semibold text-[#2d8b3f] mb-7">
                      {service.subtitle}
                    </p>
                    <p className="text-base sm:text-xl text-gray-700 mb-10 leading-relaxed">
                      {service.description}
                    </p>
                    <h3 className="text-xl sm:text-3xl font-bold text-[#2d2d2d] mb-7">
                      What&apos;s Included:
                    </h3>
                    <ul className="space-y-6 mb-10">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center justify-center gap-5">
                          <div className="w-10 h-10 rounded-full bg-[#f0fdf4] flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 size={24} className="text-[#2d8b3f]" />
                          </div>
                          <span className="text-base sm:text-2xl text-gray-700 font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-xl text-[#2d8b3f] font-bold mb-10 bg-[#f0f7f1] px-8 py-4 rounded-2xl inline-block">
                      {service.ideal}
                    </p>
                    <div>
                      <Link to="/pricing">
                        <motion.div
                          whileHover={{ scale: 1.08, y: -3 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-block"
                        >
                          <Button className="bg-[#2d8b3f] hover:bg-[#236b31] text-white px-8 sm:px-14 py-6 sm:py-9 text-lg sm:text-2xl font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300">
                            View Pricing
                            <ArrowRight className="ml-4" size={32} />
                          </Button>
                        </motion.div>
                      </Link>
                    </div>
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
            <span className="inline-block bg-[#4ade80]/20 text-[#4ade80] px-8 py-4 rounded-full text-2xl font-bold mb-6">
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
            <span className="inline-block bg-[#2d8b3f]/10 text-[#2d8b3f] px-8 py-4 rounded-full text-2xl font-bold mb-6">
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
                whileHover={{ scale: 1.1, y: -8, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
                className="bg-white rounded-2xl p-10 text-center shadow-xl cursor-pointer transition-all duration-300"
              >
                <div className="w-20 h-20 rounded-2xl bg-[#f0fdf4] flex items-center justify-center mx-auto mb-6">
                  <item.icon size={40} className="text-[#2d8b3f]" />
                </div>
                <h3 className="text-2xl font-bold text-[#2d2d2d] mb-3">
                  {item.title}
                </h3>
                <p className="text-lg text-gray-600">{item.description}</p>
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
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-block"
                >
                  <Button className="bg-white text-[#2d8b3f] hover:bg-gray-100 px-6 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                    Book Now
                    <ArrowRight className="ml-2" size={18} />
                  </Button>
                </motion.div>
              </Link>
              <Link to="/pricing">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-block"
                >
                  <Button className="bg-white text-[#2d8b3f] hover:bg-white hover:text-[#2d8b3f] px-6 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                    View Pricing
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
