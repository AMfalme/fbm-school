"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { db } from "../lib/firebase";
import { collection, getDocs, orderBy, query, Timestamp } from "firebase/firestore";
import { Calendar, MapPin, Clock, ChevronRight } from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: Timestamp | null;
  time: string;
  location: string;
  image?: string;
  featured: boolean;
  createdAt: Timestamp | null;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { collection, getDocs, orderBy, query, where } = await import("firebase/firestore");
      const q = query(collection(db, "events"), orderBy("date", "asc"));
      const snapshot = await getDocs(q);
      const eventsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Event[];
      
      const now = new Date();
      const upcomingEvents = eventsData.filter(event => {
        if (!event.date) return false;
        const eventDate = event.date.toDate();
        return eventDate >= now;
      });
      
      setEvents(upcomingEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: Timestamp | null) => {
    if (!timestamp) return "N/A";
    return timestamp.toDate().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const formatTime = (time: string) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFFDF9]">
        <div className="rounded-2xl bg-white px-8 py-6 shadow-lg">
          <p className="font-medium text-slate-600">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF9]">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-r from-[#0055b8] to-[#3b82f6] py-20 pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black text-white sm:text-5xl">Upcoming Events</h1>
          <p className="mt-4 text-lg text-blue-100">
            Join us for these exciting events and be part of our community
          </p>
        </div>
      </div>

      {/* Events List */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {events.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow-lg">
            <Calendar className="mx-auto h-16 w-16 text-slate-300" />
            <h3 className="mt-4 text-xl font-bold text-slate-900">No upcoming events</h3>
            <p className="mt-2 text-slate-600">
              Check back soon for new events and gatherings
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="overflow-hidden rounded-3xl bg-white shadow-lg transition-all hover:shadow-xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                  {/* Event Image */}
                  {event.image && (
                    <div className="lg:col-span-1 h-64 lg:h-auto">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}

                  {/* Event Details */}
                  <div className={`p-8 ${event.image ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      {event.featured && (
                        <span className="inline-flex rounded-full bg-[#0055b8] px-4 py-1 text-xs font-bold text-white">
                          Featured Event
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-black text-slate-900 mb-4">
                      {event.title}
                    </h3>

                    <div className="flex flex-wrap gap-6 mb-4">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Calendar className="h-5 w-5 text-[#0055b8]" />
                        <span className="text-sm font-medium">
                          {formatDate(event.date)}
                        </span>
                      </div>

                      {event.time && (
                        <div className="flex items-center gap-2 text-slate-600">
                          <Clock className="h-5 w-5 text-[#0055b8]" />
                          <span className="text-sm font-medium">
                            {formatTime(event.time)}
                          </span>
                        </div>
                      )}

                      {event.location && (
                        <div className="flex items-center gap-2 text-slate-600">
                          <MapPin className="h-5 w-5 text-[#0055b8]" />
                          <span className="text-sm font-medium">
                            {event.location}
                          </span>
                        </div>
                      )}
                    </div>

                    <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                      {event.description}
                    </p>

                    <div className="mt-6">
                      <button className="inline-flex items-center gap-2 rounded-xl bg-[#0055b8] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#003d7a]">
                        Learn More
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
