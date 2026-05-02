import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/data";
import { ArrowRight, HelpCircle, MessageCircle } from "lucide-react";
import Typewriter from 'typewriter-effect';

export default function FAQ() {
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
            <div className="inline-flex items-center bg-[#2d8b3f]/10 text-[#2d8b3f] px-4 sm:px-10 py-3 sm:py-4 rounded-full text-sm sm:text-xl lg:text-2xl font-extrabold mb-6 sm:mb-8 border-2 border-[#2d8b3f]/20 shadow-md min-h-[44px] sm:min-h-[64px] tracking-tight mx-auto">
              <Typewriter
                options={{
                  strings: ['FAQ', 'Questions', 'Help', 'FAQ &amp; Support'],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 30,
                  delay: 50,
                }}
              />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-[#2d2d2d] mb-6">
              Frequently Asked
              <br />
              <span className="text-gradient">Questions</span>
            </h1>
            <div className="space-y-3">
              <p className="text-base sm:text-xl lg:text-2xl font-semibold text-gray-700">
                Got questions about waterless car cleaning?
              </p>
              <p className="text-base sm:text-xl lg:text-2xl font-semibold text-gray-700">
                We&apos;ve got answers.
              </p>
              <p className="text-base sm:text-xl lg:text-2xl font-semibold text-gray-700">
                Find everything you need to know about our services below.
              </p>
            </div>
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
            className="text-center max-w-3xl mx-auto"
          >
            <div className="w-20 h-20 bg-[#2d8b3f]/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <MessageCircle size={48} className="text-[#2d8b3f]" />
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#2d2d2d] mb-6">
              Still Have Questions?
            </h2>
            <div className="space-y-3 mb-10">
              <p className="text-xl font-semibold text-gray-700">
                Can&apos;t find the answer you&apos;re looking for?
              </p>
              <p className="text-xl font-semibold text-gray-700">
                Our team is here to help.
              </p>
              <p className="text-xl font-semibold text-gray-700">
                Reach out to us and we&apos;ll get back to you as soon as possible.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact">
                <Button className="bg-[#2d8b3f] hover:bg-[#236b31] text-white px-10 py-6 text-lg font-semibold rounded-full shadow-lg transition-all hover:scale-105">
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
                  className="border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white px-10 py-6 text-lg font-semibold rounded-full shadow-lg transition-all hover:scale-105"
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
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Experience Waterless Cleaning?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Join hundreds of satisfied customers. Book your first clean today!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/book">
                <Button className="bg-white text-[#2d8b3f] hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-full shadow-lg transition-all hover:scale-105">
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
