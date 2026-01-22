import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Droplets,
  Leaf,
  Shield,
  Clock,
  Sparkles,
  Car,
  CalendarDays,
  ArrowRight,
  Phone,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/ServiceCard";
import { PricingCard } from "@/components/PricingCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { pricingData, testimonials } from "@/lib/data";

const services = [
  {
    icon: CalendarDays,
    title: "15 Days Plan",
    description:
      "Perfect for those who need alternate day cleaning. Get your car cleaned on alternate days with our premium waterless solution.",
  },
  {
    icon: Sparkles,
    title: "27-30 Days Plan",
    description:
      "Our most popular daily cleaning plan. Wake up to a spotless car every single day with comprehensive exterior cleaning.",
  },
  {
    icon: Car,
    title: "Interior Cleaning",
    description:
      "Deep interior cleaning including dashboard, seats, floor mats, and all surfaces. Available as standalone or add-on service.",
  },
];

const whyChooseUs = [
  {
    icon: Droplets,
    title: "100% Waterless",
    description: "Zero water usage - completely eco-friendly cleaning process",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "Biodegradable solutions safe for the environment",
  },
  {
    icon: Shield,
    title: "Paint Safe",
    description: "High-GSM microfiber cloths protect your car's finish",
  },
  {
    icon: Clock,
    title: "Doorstep Service",
    description: "We come to you - home, office, or anywhere convenient",
  },
];

const stats = [
  { value: "500+", label: "Happy Customers" },
  { value: "15,000+", label: "Cars Cleaned" },
  { value: "50,000L", label: "Water Saved" },
  { value: "4.9/5", label: "Customer Rating" },
];

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState("27");

  return (
    <div className="overflow-hidden">
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 gradient-bg" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#2d8b3f]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#4ade80]/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block bg-[#2d8b3f]/10 text-[#2d8b3f] px-4 py-2 rounded-full text-sm font-medium mb-6">
                Premium Waterless Car Care
              </span>
              <h1 className="text-5xl lg:text-7xl font-bold text-[#2d2d2d] mb-6 leading-tight">
                Waterless
                <br />
                <span className="text-gradient">Shine & Care</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-lg leading-relaxed">
                Experience premium car cleaning without a single drop of water.
                Our eco-friendly solutions and high-GSM microfiber cloths deliver
                showroom shine while protecting your car&apos;s paint.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/book">
                  <Button className="bg-[#2d8b3f] hover:bg-[#236b31] text-white px-8 py-6 text-lg font-semibold rounded-full animate-pulse-glow">
                    Book Now
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button
                    variant="outline"
                    className="px-8 py-6 text-lg font-semibold rounded-full border-2 border-[#2d8b3f] text-[#2d8b3f] hover:bg-[#f0fdf4]"
                  >
                    View Plans
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <a
                  href="tel:8160057141"
                  className="flex items-center gap-2 text-gray-600 hover:text-[#2d8b3f] transition-colors"
                >
                  <Phone size={18} />
                  <span>Call: 8160057141</span>
                </a>
                <span className="text-gray-300">|</span>
                <a
                  href="https://wa.me/918160057141"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-[#25D366] transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>WhatsApp</span>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <img
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/cargnee-logo-1768807479306.jpg?width=8000&height=8000&resize=contain"
                  alt="Car Gnee Logo"
                  className="object-contain drop-shadow-2xl w-full h-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl lg:text-5xl font-bold text-[#2d8b3f] mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-600">{stat.label}</p>
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
              Our Services
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#2d2d2d] mb-6">
              Premium Car Care Plans
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan that suits your lifestyle. All plans include
              our signature waterless cleaning technology.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                description={service.description}
                delay={index * 0.1}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/services">
              <Button
                variant="outline"
                className="border-2 border-[#2d8b3f] text-[#2d8b3f] hover:bg-[#2d8b3f] hover:text-white px-8 py-6 text-lg rounded-full"
              >
                Explore All Services
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </motion.div>
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
            <span className="inline-block bg-[#2d8b3f]/10 text-[#2d8b3f] px-4 py-2 rounded-full text-sm font-medium mb-4">
              Pricing
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#2d2d2d] mb-6">
              Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Simple, affordable plans for every car type. No hidden charges.
            </p>

            <div className="inline-flex bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setSelectedPlan("27")}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedPlan === "27"
                    ? "bg-[#2d8b3f] text-white"
                    : "text-gray-600 hover:text-[#2d8b3f]"
                }`}
              >
                27-30 Days (Daily)
              </button>
              <button
                onClick={() => setSelectedPlan("15")}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedPlan === "15"
                    ? "bg-[#2d8b3f] text-white"
                    : "text-gray-600 hover:text-[#2d8b3f]"
                }`}
              >
                15 Days (Alternate)
              </button>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
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
            className="text-center mt-12"
          >
            <Link to="/pricing">
              <Button
                variant="outline"
                className="border-2 border-[#2d8b3f] text-[#2d8b3f] hover:bg-[#2d8b3f] hover:text-white px-8 py-6 text-lg rounded-full"
              >
                View Full Pricing
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </motion.div>
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
              Why Car Gnee
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Why Choose Our Service?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              We combine cutting-edge waterless technology with premium care for
              the ultimate car cleaning experience.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#2d8b3f] flex items-center justify-center mx-auto mb-6">
                  <item.icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
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
              Testimonials
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#2d2d2d] mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don&apos;t just take our word for it. Here&apos;s what our happy customers
              have to say about Car Gnee.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                name={testimonial.name}
                location={testimonial.location}
                rating={testimonial.rating}
                comment={testimonial.comment}
                carType={testimonial.carType}
                delay={index * 0.1}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/testimonials">
              <Button
                variant="outline"
                className="border-2 border-[#2d8b3f] text-[#2d8b3f] hover:bg-[#2d8b3f] hover:text-white px-8 py-6 text-lg rounded-full"
              >
                Read More Reviews
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </motion.div>
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
              Our Clients
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#2d2d2d] mb-6">
              Trusted by Car Owners
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We serve a diverse range of vehicles from compact hatchbacks to
              premium SUVs.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "Hatchback Owners", icon: "🚗", count: "150+" },
              { name: "Sedan Owners", icon: "🚙", count: "200+" },
              { name: "Compact SUV Owners", icon: "🚐", count: "100+" },
              { name: "SUV/MUV Owners", icon: "🚎", count: "50+" },
            ].map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 rounded-2xl bg-[#f0f7f1] hover:shadow-lg transition-shadow"
              >
                <span className="text-5xl mb-4 block">{client.icon}</span>
                <p className="text-2xl font-bold text-[#2d8b3f] mb-1">
                  {client.count}
                </p>
                <p className="text-gray-600">{client.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 gradient-hero text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready for a Sparkling Clean Car?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Join 500+ happy customers who trust Car Gnee for their car care
              needs. Book your first service today!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/book">
                <Button className="bg-white text-[#2d8b3f] hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-full">
                  Book Service Now
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <a href="tel:8160057141">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-full"
                >
                  <Phone className="mr-2" size={20} />
                  Call Us
                </Button>
              </a>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={20} />
                <span>No commitment required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={20} />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={20} />
                <span>100% satisfaction guaranteed</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
