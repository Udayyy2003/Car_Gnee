"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/data";
import { ArrowRight, HelpCircle, MessageCircle } from "lucide-react";

export default function FAQPage() {
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
              FAQ
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold text-[#2d2d2d] mb-6">
              Frequently Asked
              <br />
              <span className="text-gradient">Questions</span>
            </h1>
            <p className="text-xl text-gray-600">
              Got questions about waterless car cleaning? We&apos;ve got answers. Find
              everything you need to know about our services below.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="bg-[#f0f7f1] rounded-2xl px-6 border-none"
                  >
                    <AccordionTrigger className="text-left text-lg font-semibold text-[#2d2d2d] hover:text-[#2d8b3f] hover:no-underline py-6">
                      <div className="flex items-start gap-4">
                        <HelpCircle
                          size={24}
                          className="text-[#2d8b3f] flex-shrink-0 mt-0.5"
                        />
                        <span>{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 text-base leading-relaxed pl-10 pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#f0f7f1]">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <MessageCircle size={48} className="text-[#2d8b3f] mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-[#2d2d2d] mb-4">
              Still Have Questions?
            </h2>
            <p className="text-gray-600 mb-8">
              Can&apos;t find the answer you&apos;re looking for? Our team is here to help.
              Reach out to us and we&apos;ll get back to you as soon as possible.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button className="bg-[#2d8b3f] hover:bg-[#236b31] text-white px-8 py-6 text-lg rounded-full">
                  Contact Us
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <a
                href="https://wa.me/918160057141"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white px-8 py-6 text-lg rounded-full"
                >
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </motion.div>
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
              Ready to Experience Waterless Cleaning?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Join hundreds of satisfied customers. Book your first clean today!
            </p>
            <Link href="/book">
              <Button className="bg-white text-[#2d8b3f] hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-full">
                Book Now
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
