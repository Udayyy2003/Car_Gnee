const CONTACT_KEY = "cargnee_contacts";
const BOOKING_KEY = "cargnee_bookings";
const TESTIMONIAL_KEY = "cargnee_testimonials";

export function saveContact(data) {
  const contacts = getContacts();
  const newContact = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  contacts.push(newContact);
  if (typeof window !== "undefined") {
    localStorage.setItem(CONTACT_KEY, JSON.stringify(contacts));
  }
  return newContact;
}

export function getContacts() {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(CONTACT_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveBooking(data) {
  const bookings = getBookings();
  const newBooking = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  bookings.push(newBooking);
  if (typeof window !== "undefined") {
    localStorage.setItem(BOOKING_KEY, JSON.stringify(bookings));
  }
  return newBooking;
}

export function getBookings() {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(BOOKING_KEY);
  return data ? JSON.parse(data) : [];
}

export function initializeTestimonials(defaultTestimonials) {
  if (typeof window === "undefined") return;
  const existing = localStorage.getItem(TESTIMONIAL_KEY);
  if (!existing) {
    localStorage.setItem(TESTIMONIAL_KEY, JSON.stringify(defaultTestimonials));
  }
}

export function getTestimonials() {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(TESTIMONIAL_KEY);
  return data ? JSON.parse(data) : [];
}

export function addTestimonial(data) {
  const testimonials = getTestimonials();
  const newTestimonial = {
    ...data,
    id: crypto.randomUUID(),
    date: new Date().toISOString().split("T")[0],
  };
  testimonials.unshift(newTestimonial);
  if (typeof window !== "undefined") {
    localStorage.setItem(TESTIMONIAL_KEY, JSON.stringify(testimonials));
  }
  return newTestimonial;
}
