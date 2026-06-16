import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone, LogIn } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <div className="rounded-full shadow-md overflow-hidden">
              <img src="/logo/logo.png" alt="Car Gnee Logo" className="w-14 h-14 lg:w-16 lg:h-16 object-contain" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl lg:text-3xl font-bold text-[#2d8b3f]">Car Gnee</h1>
              <p className="text-sm lg:text-base text-gray-600">Waterless Shine & Care</p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center bg-[#2d8b3f] px-8 py-3 rounded-full shadow-lg border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-white hover:text-white/80 font-semibold transition-all relative group text-sm uppercase tracking-wider"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <div className="flex flex-col bg-[#2d8b3f]/5 border border-[#2d8b3f]/20 px-5 py-2.5 rounded-2xl shadow-sm">
              <a
                href="tel:+918160057141"
                className="flex items-center gap-2 text-gray-700 hover:text-[#2d8b3f] transition-colors text-[13px] font-bold"
              >
                <Phone size={14} className="text-[#2d8b3f]" />
                <span className="opacity-60">Uday:</span> +91 8160057141
              </a>
              <a
                href="tel:+919328818557"
                className="flex items-center gap-2 text-gray-700 hover:text-[#2d8b3f] transition-colors text-[13px] font-bold"
              >
                <Phone size={14} className="text-[#2d8b3f]" />
                <span className="opacity-60">Roshan:</span> +91 9328818557
              </a>
            </div>
            <Link to="/login">
              <Button variant="outline" className="border-[#2d8b3f] text-[#2d8b3f] hover:bg-[#2d8b3f] hover:text-white px-4 rounded-full shadow-md font-bold transition-all">
                <LogIn size={18} className="mr-2" />
                Login
              </Button>
            </Link>
            <Link to="/book">
              <Button className="bg-[#2d8b3f] hover:bg-[#236b31] text-white px-6 rounded-full shadow-md font-bold transition-all hover:scale-105">
                Book Now
              </Button>
            </Link>

          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-700"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#2d8b3f] text-white border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-4 text-white hover:bg-white/10 px-4 rounded-xl font-semibold transition-all uppercase tracking-wider text-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-white/10 flex flex-col gap-5">
                <div className="flex flex-col gap-4 px-4">
                  <a
                    href="tel:+918160057141"
                    className="flex items-center gap-3 text-white"
                  >
                    <Phone size={20} />
                    <span className="font-bold">Uday: +91 8160057141</span>
                  </a>
                  <a
                    href="tel:+919328818557"
                    className="flex items-center gap-3 text-white"
                  >
                    <Phone size={20} />
                    <span className="font-bold">Roshan: +91 9328818557</span>
                  </a>
                </div>
                <Link to="/login" onClick={() => setIsOpen(false)} className="px-4">
                  <Button className="w-full bg-white/10 text-white hover:bg-white/20 font-bold py-3 rounded-xl transition-all">
                    <LogIn size={18} className="mr-2" />
                    Login
                  </Button>
                </Link>
                <Link to="/book" onClick={() => setIsOpen(false)} className="px-4">
                  <Button className="w-full bg-white text-[#2d8b3f] hover:bg-gray-100 font-bold py-6 rounded-xl transition-all hover:scale-[1.02]">
                    Book Now
                  </Button>
                </Link>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
