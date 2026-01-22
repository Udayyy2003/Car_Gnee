import { motion } from "framer-motion";

export default function Terms() {
  return (
    <div className="pt-32 pb-24 container mx-auto px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto prose prose-green"
      >
        <h1 className="text-4xl font-bold text-[#2d2d2d] mb-8">Terms of Service</h1>
        <p className="text-gray-600 mb-6">Last updated: January 22, 2026</p>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#2d2d2d] mb-4">1. Service Description</h2>
          <p className="text-gray-600">
            Car Gnee provides waterless car cleaning services at the customer's doorstep. Our services include monthly subscription plans and standalone interior cleaning.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#2d2d2d] mb-4">2. Subscription & Payments</h2>
          <p className="text-gray-600">
            Subscription plans are billed monthly. Payments must be made in advance to start the service. You can cancel or upgrade your plan at any time.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#2d2d2d] mb-4">3. Service Schedule</h2>
          <p className="text-gray-600">
            Cleaning is performed between 6:00 AM and 10:00 AM. In case of rain, service may be rescheduled or a compensatory day will be added to your plan.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#2d2d2d] mb-4">4. Liability</h2>
          <p className="text-gray-600">
            While we use premium paint-safe technology, Car Gnee is not responsible for pre-existing damage, scratches, or wear and tear on the vehicle.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#2d2d2d] mb-4">5. Governing Law</h2>
          <p className="text-gray-600">
            These terms are governed by the laws of India. Any disputes will be subject to the exclusive jurisdiction of the courts in Gujarat.
          </p>
        </section>
      </motion.div>
    </div>
  );
}
