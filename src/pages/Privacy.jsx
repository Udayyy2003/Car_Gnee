import { motion } from "framer-motion";

export default function Privacy() {
  return (
    <div className="pt-32 pb-24 container mx-auto px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto prose prose-green"
      >
        <h1 className="text-4xl font-bold text-[#2d2d2d] mb-8">Privacy Policy</h1>
        <p className="text-gray-600 mb-6">Last updated: January 22, 2026</p>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#2d2d2d] mb-4">1. Information We Collect</h2>
          <p className="text-gray-600">
            We collect information you provide directly to us when you book a service, contact us, or subscribe to our plans. This may include your name, phone number, email address, car details, and service address.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#2d2d2d] mb-4">2. How We Use Your Information</h2>
          <p className="text-gray-600">
            We use the information we collect to provide, maintain, and improve our services, to process your bookings, and to communicate with you about your subscription.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#2d2d2d] mb-4">3. Data Security</h2>
          <p className="text-gray-600">
            We take reasonable measures to protect your personal information from loss, theft, misuse, and unauthorized access.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#2d2d2d] mb-4">4. Contact Us</h2>
          <p className="text-gray-600">
            If you have any questions about this Privacy Policy, please contact us at info@cargnee.com or 8160057141.
          </p>
        </section>
      </motion.div>
    </div>
  );
}
