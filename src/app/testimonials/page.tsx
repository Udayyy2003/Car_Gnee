"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TestimonialCard } from "@/components/TestimonialCard";
import {
  testimonials as defaultTestimonials,
} from "@/lib/data";
import {
  initializeTestimonials,
  getTestimonials,
  type Testimonial,
} from "@/lib/localStorage";
import { ArrowRight, Star } from "lucide-react";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    initializeTestimonials(defaultTestimonials);
    const storedTestimonials = getTestimonials();
    if (storedTestimonials.length > 0) {
      setTestimonials(storedTestimonials);
    } else {
      setTestimonials(defaultTestimonials);
    }
  }, []);

  const filteredTestimonials =
    filter === "all"
      ? testimonials
      : testimonials.filter((t) => t.carType === filter);

  const carTypes = ["all", "Hatchback", "Sedan", "Compact SUV", "SUV / MUV"];

  const averageRating =
    testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length || 0;

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
              Testimonials
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold text-[#2d2d2d] mb-6">
              What Our Customers
              <br />
              <span className="text-gradient">Say About Us</span>
            </h1>
            <p className="text-xl text-gray-600">
              Real reviews from real customers. See why car owners love Car Gnee&apos;s
              waterless cleaning service.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={24}
                    className="text-[#d4af37] fill-[#d4af37]"
                  />
                ))}
              </div>
              <p className="text-4xl font-bold text-[#2d8b3f]">
                {averageRating.toFixed(1)}
              </p>
              <p className="text-gray-600">Average Rating</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#2d8b3f]">
                {testimonials.length}+
              </p>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#2d8b3f]">100%</p>
              <p className="text-gray-600">Satisfaction Rate</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#2d8b3f]">500+</p>
              <p className="text-gray-600">Reviews</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {carTypes.map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  filter === type
                    ? "bg-[#2d8b3f] text-white"
                    : "bg-[#f0f7f1] text-gray-600 hover:bg-[#dcfce7]"
                }`}
              >
                {type === "all" ? "All Reviews" : type}
              </button>
            ))}
          </motion.div>

          {filteredTestimonials.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTestimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.id}
                  name={testimonial.name}
                  location={testimonial.location}
                  rating={testimonial.rating}
                  comment={testimonial.comment}
                  carType={testimonial.carType}
                  delay={index * 0.05}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No testimonials found for this filter.
              </p>
            </div>
          )}
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
              Ready to Join Our Happy Customers?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Experience the Car Gnee difference today and see why our customers
              keep coming back.
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
