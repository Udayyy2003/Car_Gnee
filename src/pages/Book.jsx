import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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
import { submitBooking } from "@/services/api";
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
import Typewriter from 'typewriter-effect';

export default function Book() {
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

  const handleSubmit = async (e) => {
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

      // Save to localStorage (as per requirement)
      saveBooking(formData);
      
      // Call backend API (as per requirement)
      await submitBooking(formData);

      toast.success("Booking submitted successfully! We'll contact you shortly.");
      setStep(3);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPrice = () => {
    if (!formData.carType || !formData.plan) return null;
    const carKey = formData.carType.toLowerCase().replace(/ \/ /g, "").replace(/ /g, "");
    const mapping = {
      hatchback: "hatchback",
      sedan: "sedan",
      compactsuv: "compactSuv",
      suvmuv: "suvMuv",
    };
    const key = mapping[carKey] || "hatchback";
    const planKey = formData.plan;
    return pricingData[key]?.plans[planKey]?.price || 0;
  };

  const timeSlots = [
    "5:00 AM - 6:00 AM",
    "6:00 AM - 7:00 AM",
    "7:00 AM - 7:30 AM",
  ];

  return (
    <div className="pt-20">
      <section className="relative py-16 gradient-bg overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#2d8b3f]/10 rounded-full blur-3xl" />
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
                  strings: ['Book Service', 'Schedule a Clean', 'Book Now', 'Get Started'],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 30,
                  delay: 50,
                }}
              />
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#2d2d2d] mb-4">
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
              className="max-w-2xl mx-auto text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-32 h-32 bg-gradient-to-br from-[#2d8b3f] to-[#4ade80] rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
              >
                <CheckCircle2 size={64} className="text-white" />
              </motion.div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#2d2d2d] mb-4">
                Booking Confirmed!
              </h2>
              <p className="text-base sm:text-xl text-gray-600 mb-10 max-w-xl mx-auto">
                Thank you for choosing Car Gnee! We&apos;ve received your booking and
                will contact you shortly to confirm the details.
              </p>
              <div className="bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] rounded-3xl p-8 mb-10 text-left shadow-xl border border-[#2d8b3f]/20">
                <h3 className="font-bold text-2xl text-[#2d2d2d] mb-6 text-center">
                  Booking Summary
                </h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-5 shadow-md">
                    <p className="text-sm text-gray-500 mb-1">Name</p>
                    <p className="text-lg font-bold text-[#2d2d2d]">{formData.name}</p>
                  </div>
                  <div className="bg-white rounded-2xl p-5 shadow-md">
                    <p className="text-sm text-gray-500 mb-1">Phone</p>
                    <p className="text-lg font-bold text-[#2d2d2d]">{formData.phone}</p>
                  </div>
                  <div className="bg-white rounded-2xl p-5 shadow-md">
                    <p className="text-sm text-gray-500 mb-1">Car Type</p>
                    <p className="text-lg font-bold text-[#2d8b3f]">{formData.carType}</p>
                  </div>
                  <div className="bg-white rounded-2xl p-5 shadow-md">
                    <p className="text-sm text-gray-500 mb-1">Plan</p>
                    <p className="text-lg font-bold text-[#2d8b3f]">
                      {planTypes.find((p) => p.value === formData.plan)?.label}
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl p-5 shadow-md">
                    <p className="text-sm text-gray-500 mb-1">Start Date</p>
                    <p className="text-lg font-bold text-[#2d2d2d]">{formData.startDate}</p>
                  </div>
                  <div className="bg-white rounded-2xl p-5 shadow-md">
                    <p className="text-sm text-gray-500 mb-1">Preferred Time</p>
                    <p className="text-lg font-bold text-[#2d2d2d]">{formData.preferredTime}</p>
                  </div>
                </div>
                {getPrice() && (
                  <div className="mt-8 pt-6 border-t-2 border-[#2d8b3f]/30 text-center">
                    <p className="text-xl font-semibold text-gray-700 mb-2">Monthly Price</p>
                    <p className="text-4xl font-extrabold text-[#2d8b3f]">₹{getPrice()}</p>
                  </div>
                )}
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/">
                  <Button className="bg-[#2d8b3f] hover:bg-[#236b31] text-white px-10 py-6 text-lg font-semibold rounded-full shadow-lg transition-all hover:scale-105">
                    Back to Home
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button
                    variant="outline"
                    className="border-2 border-[#2d8b3f] text-[#2d8b3f] hover:bg-[#2d8b3f] hover:text-white px-10 py-6 text-lg font-semibold rounded-full shadow-lg transition-all hover:scale-105"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
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

                    <div className="flex justify-center">
                      <div className="bg-[#f0f7f1] rounded-3xl p-8 w-full max-w-2xl shadow-lg border border-[#2d8b3f]/10">
                        <h3 className="font-bold text-2xl text-[#2d2d2d] mb-6 text-center">
                          Order Summary
                        </h3>
                        <div className="space-y-4 text-gray-700">
                          <div className="flex justify-between items-center py-2 border-b border-[#2d8b3f]/10">
                            <span className="text-lg font-semibold text-gray-600">Car Type:</span>
                            <span className="text-lg font-bold text-[#2d8b3f]">{formData.carType}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-[#2d8b3f]/10">
                            <span className="text-lg font-semibold text-gray-600">Plan:</span>
                            <span className="text-lg font-bold text-[#2d8b3f]">
                              {planTypes.find((p) => p.value === formData.plan)?.label}
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-[#2d8b3f]/10">
                            <span className="text-lg font-semibold text-gray-600">Name:</span>
                            <span className="text-lg font-medium">{formData.name}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-[#2d8b3f]/10">
                            <span className="text-lg font-semibold text-gray-600">Phone:</span>
                            <span className="text-lg font-medium">{formData.phone}</span>
                          </div>
                          {formData.email && (
                            <div className="flex justify-between items-center py-2 border-b border-[#2d8b3f]/10">
                              <span className="text-lg font-semibold text-gray-600">Email:</span>
                              <span className="text-lg font-medium">{formData.email}</span>
                            </div>
                          )}
                          <div className="flex justify-between items-center py-2 border-b border-[#2d8b3f]/10">
                            <span className="text-lg font-semibold text-gray-600">Start Date:</span>
                            <span className="text-lg font-medium">{formData.startDate}</span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="text-lg font-semibold text-gray-600">Preferred Time:</span>
                            <span className="text-lg font-medium">{formData.preferredTime}</span>
                          </div>
                          <div className="flex justify-between items-center pt-4 border-t-2 border-[#2d8b3f]/30">
                            <span className="text-xl font-bold text-[#2d2d2d]">Total:</span>
                            <span className="text-3xl font-extrabold text-[#2d8b3f]">₹{getPrice()}/month</span>
                          </div>
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
