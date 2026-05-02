"use client";

export interface ContactSubmission {
  id: string;
  name: string;
  phone: string;
  email: string;
  carType: string;
  plan: string;
  message?: string;
  createdAt: string;
}

export interface BookingSubmission {
  id: string;
  name: string;
  phone: string;
  email: string;
  carType: string;
  plan: string;
  address: string;
  preferredTime: string;
  startDate: string;
  message?: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  carType: string;
  date: string;
}

const CONTACT_KEY = "cargnee_contacts";
const BOOKING_KEY = "cargnee_bookings";
const TESTIMONIAL_KEY = "cargnee_testimonials";

export function saveContact(data: Omit<ContactSubmission, "id" | "createdAt">): ContactSubmission {
  const contacts = getContacts();
  const newContact: ContactSubmission = {
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

export function getContacts(): ContactSubmission[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(CONTACT_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveBooking(data: Omit<BookingSubmission, "id" | "createdAt">): BookingSubmission {
  const bookings = getBookings();
  const newBooking: BookingSubmission = {
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

export function getBookings(): BookingSubmission[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(BOOKING_KEY);
  return data ? JSON.parse(data) : [];
}

export function initializeTestimonials(defaultTestimonials: Testimonial[]): void {
  if (typeof window === "undefined") return;
  const existing = localStorage.getItem(TESTIMONIAL_KEY);
  if (!existing) {
    localStorage.setItem(TESTIMONIAL_KEY, JSON.stringify(defaultTestimonials));
  }
}

export function getTestimonials(): Testimonial[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(TESTIMONIAL_KEY);
  return data ? JSON.parse(data) : [];
}

export function addTestimonial(data: Omit<Testimonial, "id" | "date">): Testimonial {
  const testimonials = getTestimonials();
  const newTestimonial: Testimonial = {
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
