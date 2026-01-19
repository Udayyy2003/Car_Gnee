"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Droplets,
  Leaf,
  Shield,
  Target,
  Eye,
  Heart,
  Award,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const values = [
  {
    icon: Leaf,
    title: "Sustainability",
    description:
      "We're committed to protecting the environment by eliminating water usage and using biodegradable cleaning solutions.",
  },
  {
    icon: Award,
    title: "Quality",
    description:
      "Premium cleaning solutions and high-GSM microfiber cloths ensure your car gets the best care possible.",
  },
  {
    icon: Heart,
    title: "Customer First",
    description:
      "Your satisfaction is our priority. We go above and beyond to deliver exceptional service every time.",
  },
  {
    icon: Shield,
    title: "Trust & Reliability",
    description:
      "Punctual, professional, and consistent. You can count on us for reliable doorstep service.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Spray Application",
    description:
      "Our eco-friendly waterless solution is sprayed onto the car's surface, encapsulating dirt and grime.",
  },
  {
    step: "02",
    title: "Gentle Wipe",
    description:
      "Using high-GSM microfiber cloths, we gently lift and remove the encapsulated dirt without scratching.",
  },
  {
    step: "03",
    title: "Buff to Shine",
    description:
      "A final buff with a clean microfiber cloth leaves your car with a brilliant, showroom-like shine.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      <section className="relative py-24 gradient-bg overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#2d8b3f]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#4ade80]/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block bg-[#2d8b3f]/10 text-[#2d8b3f] px-4 py-2 rounded-full text-sm font-medium mb-6">
                About Us
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold text-[#2d2d2d] mb-6 leading-tight">
                Redefining Car Care
                <br />
                <span className="text-gradient">The Eco Way</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Car Gnee was born from a simple idea: why waste hundreds of liters
                of water to clean a car when there&apos;s a better way? Our waterless
                cleaning technology delivers superior results while protecting
                both your car and the environment.
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#2d8b3f] flex items-center justify-center">
                    <Droplets size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-[#2d2d2d]">Zero Water</p>
                    <p className="text-sm text-gray-600">100% Waterless</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#2d8b3f] flex items-center justify-center">
                    <Leaf size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-[#2d2d2d]">Eco-Friendly</p>
                    <p className="text-sm text-gray-600">Biodegradable</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/cargnee-logo-1768807479306.jpg?width=8000&height=8000&resize=contain"
                  alt="Car Gnee Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#f0f7f1] rounded-3xl p-10"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#2d8b3f] flex items-center justify-center mb-6">
                <Target size={32} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold text-[#2d2d2d] mb-4">
                Our Mission
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                To revolutionize car care by providing premium waterless cleaning
                services that deliver exceptional results while significantly
                reducing environmental impact. We aim to make eco-friendly car
                care accessible, convenient, and affordable for every car owner.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#2d2d2d] rounded-3xl p-10 text-white"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#4ade80] flex items-center justify-center mb-6">
                <Eye size={32} className="text-[#2d2d2d]" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                To become the leading waterless car care service, inspiring a
                global shift towards sustainable automotive maintenance. We
                envision a future where every car is cleaned without wasting a
                single drop of water.
              </p>
            </motion.div>
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
              How It Works
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#2d2d2d] mb-6">
              The Science Behind Waterless Cleaning
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our advanced waterless cleaning technology uses specially
              formulated solutions that safely encapsulate dirt particles,
allowing them to be wiped away without scratching your car&apos;s
            paint.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg relative"
              >
                <span className="absolute -top-6 left-8 text-7xl font-bold text-[#2d8b3f]/10">
                  {item.step}
                </span>
                <div className="relative z-10 pt-6">
                  <h3 className="text-xl font-bold text-[#2d2d2d] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
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
            className="text-center mb-16"
          >
            <span className="inline-block bg-[#2d8b3f]/10 text-[#2d8b3f] px-4 py-2 rounded-full text-sm font-medium mb-4">
              Our Values
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#2d2d2d] mb-6">
              What We Stand For
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#f0fdf4] flex items-center justify-center mx-auto mb-6">
                  <value.icon size={32} className="text-[#2d8b3f]" />
                </div>
                <h3 className="text-xl font-bold text-[#2d2d2d] mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#2d2d2d] text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block bg-[#4ade80]/20 text-[#4ade80] px-4 py-2 rounded-full text-sm font-medium mb-6">
                Paint Safety
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Your Car&apos;s Paint is Safe With Us
              </h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Traditional water washing can actually cause more harm than good.
                Hard water minerals, abrasive sponges, and improper techniques
                create micro-scratches that dull your car&apos;s finish over time.
              </p>
              <ul className="space-y-4">
                {[
                  "High-GSM microfiber cloths trap dirt safely",
                  "Lubricating solutions prevent paint contact",
                  "No abrasive brushes or sponges",
                  "pH-balanced, paint-safe formulas",
                  "Protective wax layer with every clean",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-[#4ade80]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 rounded-3xl p-10"
            >
              <h3 className="text-2xl font-bold mb-6">
                Our Sustainability Commitment
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#2d8b3f] flex items-center justify-center flex-shrink-0">
                    <Droplets size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Water Conservation</h4>
                    <p className="text-gray-400">
                      Save 150+ liters of water per car wash compared to
                      traditional methods.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#2d8b3f] flex items-center justify-center flex-shrink-0">
                    <Leaf size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Biodegradable Products</h4>
                    <p className="text-gray-400">
                      All our cleaning solutions are 100% biodegradable and
                      eco-friendly.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#2d8b3f] flex items-center justify-center flex-shrink-0">
                    <Shield size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">No Runoff Pollution</h4>
                    <p className="text-gray-400">
                      Zero contaminated water runoff means cleaner streets and
                      drains.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
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
              Ready to Experience the Difference?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Join hundreds of car owners who have switched to eco-friendly
              waterless cleaning.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/book">
                <Button className="bg-white text-[#2d8b3f] hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-full">
                  Book Your First Clean
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-full"
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
