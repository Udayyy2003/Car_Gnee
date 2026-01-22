export const pricingData = {
  hatchback: {
    name: "Hatchback",
    icon: "🚗",
    plans: {
      "27": { price: 699, interior: 2 },
      "15": { price: 399, interior: 1 },
    },
  },
  sedan: {
    name: "Sedan",
    icon: "🚙",
    plans: {
      "27": { price: 749, interior: 2 },
      "15": { price: 449, interior: 1 },
    },
  },
  compactSuv: {
    name: "Compact SUV",
    icon: "🚐",
    plans: {
      "27": { price: 799, interior: 2 },
      "15": { price: 499, interior: 1 },
    },
  },
  suvMuv: {
    name: "SUV / MUV",
    icon: "🚎",
    plans: {
      "27": { price: 849, interior: 2 },
      "15": { price: 549, interior: 1 },
    },
  },
};

export const testimonials = [
  {
    id: "1",
    name: "Rajesh Patel",
    location: "Ahmedabad",
    rating: 5,
    comment: "Car Gnee has been cleaning my Honda City for 3 months now. The waterless cleaning is amazing - my car looks showroom fresh every day! Highly recommend their 27-day plan.",
    carType: "Sedan",
    date: "2024-01-15",
  },
  {
    id: "2",
    name: "Priya Sharma",
    location: "Surat",
    rating: 5,
    comment: "Finally found a car cleaning service that doesn't damage my car's paint. The eco-friendly approach is exactly what I was looking for. Great job, team!",
    carType: "Hatchback",
    date: "2024-01-10",
  },
  {
    id: "3",
    name: "Amit Desai",
    location: "Vadodara",
    rating: 4,
    comment: "Very professional service. The interior cleaning is thorough and they use quality microfiber cloths. Worth every rupee!",
    carType: "SUV / MUV",
    date: "2024-01-05",
  },
  {
    id: "4",
    name: "Neha Joshi",
    location: "Rajkot",
    rating: 5,
    comment: "My Creta has never looked better! The team is punctual and the waterless technology really works. No water wastage and brilliant shine.",
    carType: "Compact SUV",
    date: "2023-12-28",
  },
  {
    id: "5",
    name: "Vikram Singh",
    location: "Gandhinagar",
    rating: 5,
    comment: "I was skeptical about waterless cleaning at first, but after seeing the results, I'm a believer! My black Fortuner looks stunning.",
    carType: "SUV / MUV",
    date: "2023-12-20",
  },
];

export const faqs = [
  {
    question: "What is waterless car cleaning?",
    answer: "Waterless car cleaning is an eco-friendly method that uses specially formulated liquid solutions and high-GSM microfiber cloths to clean your car without water. The solution encapsulates dirt particles, allowing them to be safely wiped away without scratching the paint.",
  },
  {
    question: "Is waterless cleaning safe for my car's paint?",
    answer: "Absolutely! Our waterless cleaning method is actually safer than traditional water washing. The high-quality lubricants in our eco-friendly solution create a protective barrier between the dirt and your car's paint, preventing scratches. Our premium microfiber cloths are designed to lift and trap particles safely.",
  },
  {
    question: "How often should I get my car cleaned?",
    answer: "For best results, we recommend our 27-day plan with daily cleaning. This keeps your car consistently clean and protected. If daily cleaning isn't necessary for your needs, our 15-day alternate day plan is also excellent for maintaining your vehicle.",
  },
  {
    question: "What's included in the interior cleaning service?",
    answer: "Our interior cleaning includes dashboard cleaning, seat cleaning, floor mat cleaning, door panel wiping, glass cleaning from inside, and general dusting. We use specialized products that are safe for all interior materials including leather, fabric, and plastic.",
  },
  {
    question: "Do you provide service at my doorstep?",
    answer: "Yes! We provide convenient doorstep service. Our team will come to your home, office, or any location to clean your car. No need to visit a car wash station.",
  },
  {
    question: "What time do you provide the cleaning service?",
    answer: "Our standard service hours are from 6:00 AM to 10:00 AM. This ensures your car is clean and ready before you start your day. We can discuss specific timing based on your convenience.",
  },
  {
    question: "Can I switch my plan after subscribing?",
    answer: "Yes, you can upgrade or downgrade your plan. Contact us and we'll adjust your subscription accordingly. Any balance amount will be adjusted in the new plan.",
  },
  {
    question: "What happens on rainy days?",
    answer: "If it's raining during your scheduled cleaning time, our team will reschedule for later that day when conditions improve, or we'll add a compensatory cleaning day to your plan.",
  },
];

export const carCategories = ["Hatchback", "Sedan", "Compact SUV", "SUV / MUV"];

export const planTypes = [
  { value: "15", label: "15 Days Plan (Alternate Day)" },
  { value: "27", label: "27-30 Days Plan (Daily)" },
];
