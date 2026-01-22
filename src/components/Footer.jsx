import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

const services = [
  "15 Days Plan",
  "27-30 Days Plan",
  "Interior Cleaning",
  "Premium Detailing",
  "Eco-Friendly Solutions",
];

export function Footer() {
  return (
    <footer className="bg-[#2d2d2d] text-white">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/cargnee-logo-1768807479306.jpg?width=8000&height=8000&resize=contain"
                alt="Car Gnee Logo"
                width={60}
                height={60}
                className="rounded-full"
              />
              <div>
                <h3 className="text-xl font-bold">Car Gnee</h3>
                <p className="text-sm text-gray-400">Waterless Shine & Care</p>
              </div>
            </Link>
            <p className="text-gray-400 mb-6">
              Premium waterless car cleaning service using eco-friendly solutions and high-GSM microfiber cloths for superior shine without damaging your car.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-[#2d8b3f] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-[#2d8b3f] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-[#2d8b3f] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-[#2d8b3f] transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-[#4ade80] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-gray-400">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={20} className="text-[#4ade80] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400">Uday: <a href="tel:8160057141" className="hover:text-[#4ade80]">8160057141</a></p>
                  <p className="text-gray-400">Roshan: <a href="tel:9328818557" className="hover:text-[#4ade80]">9328818557</a></p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={20} className="text-[#4ade80] mt-1 flex-shrink-0" />
                <a href="mailto:info@cargnee.com" className="text-gray-400 hover:text-[#4ade80]">
                  info@cargnee.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-[#4ade80] mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  Serving your locality with doorstep service
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={20} className="text-[#4ade80] mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  Mon - Sun: 6:00 AM - 10:00 AM
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Car Gnee. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-[#4ade80]">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-[#4ade80]">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
