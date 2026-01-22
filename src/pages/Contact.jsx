import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { saveContact } from "@/lib/localStorage";
import { submitContact } from "@/services/api";
import { carCategories, planTypes } from "@/lib/data";
import { toast } from "sonner";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
} from "lucide-react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    carType: "",
    plan: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formData.name || !formData.phone || !formData.carType || !formData.plan) {
        toast.error("Please fill in all required fields");
        setIsSubmitting(false);
        return;
      }

      // Save to localStorage (as per requirement)
      saveContact(formData);
      
      // Call backend API (as per requirement)
      await submitContact(formData);

      toast.success("Message sent successfully! We'll contact you soon.");
      setFormData({
        name: "",
        phone: "",
        email: "",
        carType: "",
        plan: "",
        message: "",
      });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Numbers",
      details: [
        { label: "Uday", value: "8160057141", href: "tel:8160057141" },
        { label: "Roshan", value: "9328818557", href: "tel:9328818557" },
      ],
    },
    {
      icon: Mail,
      title: "Email",
      details: [
        {
          label: "Email Us",
          value: "info@cargnee.com",
          href: "mailto:info@cargnee.com",
        },
      ],
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [
        { label: "Service Time", value: "6:00 AM - 10:00 AM" },
        { label: "Support", value: "9:00 AM - 6:00 PM" },
      ],
    },
    {
      icon: MapPin,
      title: "Service Area",
      details: [{ label: "Coverage", value: "Doorstep service in your locality" }],
    },
  ];

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
              Contact Us
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold text-[#2d2d2d] mb-6">
              Get in Touch
              <br />
              <span className="text-gradient">We&apos;re Here to Help</span>
            </h1>
            <p className="text-xl text-gray-600">
              Have questions about our services? Want to book a cleaning? Reach out
              to us and we&apos;ll get back to you as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-[#2d2d2d] mb-8">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Your name"
                      className="h-12"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="Your phone number"
                      className="h-12"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="your.email@example.com"
                    className="h-12"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Car Type *
                    </label>
                    <Select
                      value={formData.carType}
                      onValueChange={(value) =>
                        setFormData({ ...formData, carType: value })
                      }
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select car type" />
                      </SelectTrigger>
                      <SelectContent>
                        {carCategories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interested Plan *
                    </label>
                    <Select
                      value={formData.plan}
                      onValueChange={(value) =>
                        setFormData({ ...formData, plan: value })
                      }
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select plan" />
                      </SelectTrigger>
                      <SelectContent>
                        {planTypes.map((plan) => (
                          <SelectItem key={plan.value} value={plan.value}>
                            {plan.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message (Optional)
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell us about your requirements..."
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#2d8b3f] hover:bg-[#236b31] text-white py-6 text-lg font-semibold rounded-xl"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="mr-2" size={20} />
                      Send Message
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-8 p-6 bg-[#f0f7f1] rounded-2xl">
                <div className="flex items-center gap-4">
                  <a
                    href="https://wa.me/918160057141"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 rounded-xl font-semibold hover:bg-[#1fb855] transition-colors"
                  >
                    <MessageCircle size={24} />
                    Chat on WhatsApp
                  </a>
                </div>
                <p className="text-center text-gray-600 mt-4 text-sm">
                  Get instant response via WhatsApp
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-[#2d2d2d] mb-8">
                Contact Information
              </h2>

              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div
                    key={item.title}
                    className="bg-[#f0f7f1] rounded-2xl p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#2d8b3f] flex items-center justify-center flex-shrink-0">
                        <item.icon size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#2d2d2d] mb-2">
                          {item.title}
                        </h3>
                        {item.details.map((detail, index) => (
                          <p key={index} className="text-gray-600">
                            <span className="text-gray-500">{detail.label}: </span>
                            {detail.href ? (
                              <a
                                href={detail.href}
                                className="text-[#2d8b3f] hover:underline font-medium"
                              >
                                {detail.value}
                              </a>
                            ) : (
                              <span className="font-medium">{detail.value}</span>
                            )}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-gray-100 rounded-2xl overflow-hidden h-80">
                <div className="w-full h-full flex items-center justify-center bg-[#f0f7f1]">
                  <div className="text-center p-8">
                    <MapPin size={48} className="text-[#2d8b3f] mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-[#2d2d2d] mb-2">
                      Doorstep Service
                    </h3>
                    <p className="text-gray-600">
                      We come to your location - home, office, or anywhere
                      convenient for you.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
