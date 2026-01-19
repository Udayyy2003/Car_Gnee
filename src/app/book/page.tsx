"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
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
import { saveBooking } from "@/lib/localStorage";
import { carCategories, planTypes, pricingData } from "@/lib/data";
import { toast } from "sonner";
import {
  CheckCircle2,
  ArrowRight,
  Calendar,
  Car,
  Clock,
  MapPin,
} from "lucide-react";

export default function BookPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    carType: "",
    plan: "",
    address: "",
    preferredTime: "",
    startDate: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (
        !formData.name ||
        !formData.phone ||
        !formData.carType ||
        !formData.plan ||
        !formData.address ||
        !formData.preferredTime ||
        !formData.startDate
      ) {
        toast.error("Please fill in all required fields");
        setIsSubmitting(false);
        return;
      }

      saveBooking(formData);
      toast.success("Booking submitted successfully! We&apos;ll contact you shortly.");
      setStep(3);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPrice = () => {
    if (!formData.carType || !formData.plan) return null;
    const carKey = formData.carType.toLowerCase().replace(/ \/ /g, "").replace(/ /g, "") as keyof typeof pricingData;
    const mapping: Record<string, keyof typeof pricingData> = {
      hatchback: "hatchback",
      sedan: "sedan",
      compactsuv: "compactSuv",
      suvmuv: "suvMuv",
    };
    const key = mapping[carKey] || "hatchback";
    const planKey = formData.plan as "15" | "27";
    return pricingData[key]?.plans[planKey]?.price || 0;
  };

  const timeSlots = [
    "6:00 AM - 7:00 AM",
    "7:00 AM - 8:00 AM",
    "8:00 AM - 9:00 AM",
    "9:00 AM - 10:00 AM",
  ];

  return (
    <div className="pt-20">
      <section className="relative py-16 gradient-bg overflow-hidden">
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
              Book Service
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-[#2d2d2d] mb-4">
              Book Your
              <span className="text-gradient"> Car Cleaning</span>
            </h1>
            <p className="text-lg text-gray-600">
              Fill out the form below and we&apos;ll get your car sparkling clean!
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      step >= s
                        ? "bg-[#2d8b3f] text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step > s ? <CheckCircle2 size={20} /> : s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`w-16 h-1 mx-2 ${
                        step > s ? "bg-[#2d8b3f]" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {step === 3 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-lg mx-auto text-center"
            >
              <div className="w-24 h-24 bg-[#f0fdf4] rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={48} className="text-[#2d8b3f]" />
              </div>
              <h2 className="text-3xl font-bold text-[#2d2d2d] mb-4">
                Booking Confirmed!
              </h2>
              <p className="text-gray-600 mb-8">
                Thank you for choosing Car Gnee! We&apos;ve received your booking and
                will contact you shortly to confirm the details.
              </p>
              <div className="bg-[#f0f7f1] rounded-2xl p-6 mb-8 text-left">
                <h3 className="font-semibold text-[#2d2d2d] mb-4">
                  Booking Summary:
                </h3>
                <div className="space-y-2 text-gray-600">
                  <p>
                    <strong>Name:</strong> {formData.name}
                  </p>
                  <p>
                    <strong>Phone:</strong> {formData.phone}
                  </p>
                  <p>
                    <strong>Car Type:</strong> {formData.carType}
                  </p>
                  <p>
                    <strong>Plan:</strong>{" "}
                    {planTypes.find((p) => p.value === formData.plan)?.label}
                  </p>
                  <p>
                    <strong>Start Date:</strong> {formData.startDate}
                  </p>
                  <p>
                    <strong>Preferred Time:</strong> {formData.preferredTime}
                  </p>
                  {getPrice() && (
                    <p className="text-lg font-bold text-[#2d8b3f] mt-4">
                      Monthly Price: ₹{getPrice()}
                    </p>
                  )}
                </div>
              </div>
              <Link href="/">
                <Button className="bg-[#2d8b3f] hover:bg-[#236b31] text-white px-8 py-6 text-lg rounded-full">
                  Back to Home
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
            </motion.div>
          ) : (
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold text-[#2d2d2d] mb-6 flex items-center gap-3">
                      <Car className="text-[#2d8b3f]" />
                      Select Your Plan
                    </h2>

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
                          Select Plan *
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

                    {getPrice() && (
                      <div className="bg-[#f0f7f1] rounded-xl p-6">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Monthly Price:</span>
                          <span className="text-3xl font-bold text-[#2d8b3f]">
                            ₹{getPrice()}
                          </span>
                        </div>
                      </div>
                    )}

                    <Button
                      type="button"
                      onClick={() => {
                        if (!formData.carType || !formData.plan) {
                          toast.error("Please select car type and plan");
                          return;
                        }
                        setStep(2);
                      }}
                      className="w-full bg-[#2d8b3f] hover:bg-[#236b31] text-white py-6 text-lg rounded-xl"
                    >
                      Continue
                      <ArrowRight className="ml-2" size={20} />
                    </Button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold text-[#2d2d2d] mb-6 flex items-center gap-3">
                      <Calendar className="text-[#2d8b3f]" />
                      Your Details
                    </h2>

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

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin size={16} className="inline mr-1" />
                        Service Address *
                      </label>
                      <Textarea
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        placeholder="Full address where you want the service"
                        rows={3}
                        required
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Calendar size={16} className="inline mr-1" />
                          Preferred Start Date *
                        </label>
                        <Input
                          type="date"
                          value={formData.startDate}
                          onChange={(e) =>
                            setFormData({ ...formData, startDate: e.target.value })
                          }
                          className="h-12"
                          min={new Date().toISOString().split("T")[0]}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Clock size={16} className="inline mr-1" />
                          Preferred Time Slot *
                        </label>
                        <Select
                          value={formData.preferredTime}
                          onValueChange={(value) =>
                            setFormData({ ...formData, preferredTime: value })
                          }
                        >
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select time slot" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((slot) => (
                              <SelectItem key={slot} value={slot}>
                                {slot}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Notes (Optional)
                      </label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Any special instructions or requirements..."
                        rows={3}
                      />
                    </div>

                    <div className="bg-[#f0f7f1] rounded-xl p-6">
                      <h3 className="font-semibold text-[#2d2d2d] mb-3">
                        Order Summary:
                      </h3>
                      <div className="space-y-2 text-gray-600">
                        <div className="flex justify-between">
                          <span>Car Type:</span>
                          <span className="font-medium">{formData.carType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Plan:</span>
                          <span className="font-medium">
                            {planTypes.find((p) => p.value === formData.plan)?.label}
                          </span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-[#2d8b3f] pt-2 border-t">
                          <span>Total:</span>
                          <span>₹{getPrice()}/month</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(1)}
                        className="flex-1 py-6 text-lg rounded-xl"
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-[#2d8b3f] hover:bg-[#236b31] text-white py-6 text-lg rounded-xl"
                      >
                        {isSubmitting ? "Submitting..." : "Confirm Booking"}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
