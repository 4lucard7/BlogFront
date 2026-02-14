import { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { eventAPI } from '../services/api';
import EventCard from '../components/EventCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Events = () => {
  const { t } = useContext(LanguageContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, upcoming, past

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await eventAPI.getAll();
      setEvents(response.data);
    } catch (err) {
      console.error('Error fetching events:', err);
      // Use fallback data
      setEvents(fallbackEvents);
    } finally {
      setLoading(false);
    }
  };

  // Fallback data
  const fallbackEvents = [
    {
      id: 1,
      title: 'Ramadan Food Distribution 2026',
      description: 'Join us in distributing food baskets to families in need across the city.',
      date: '2026-03-15',
      time: '9:00 AM - 5:00 PM',
      location: 'Community Center, Downtown',
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800',
      status: 'Upcoming',
    },
    {
      id: 2,
      title: 'Youth Tech Bootcamp',
      description: 'Free coding workshop for high school students covering web development basics.',
      date: '2026-02-28',
      time: '10:00 AM - 4:00 PM',
      location: 'Tech Hub, Innovation District',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
      status: 'Upcoming',
    },
    {
      id: 3,
      title: 'Community Health Fair',
      description: 'Free health screenings, consultations, and wellness workshops for all ages.',
      date: '2026-01-20',
      time: '8:00 AM - 2:00 PM',
      location: 'City Park',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
      status: 'Past',
    },
    {
      id: 4,
      title: 'Winter Clothing Drive',
      description: 'Collecting and distributing warm clothing to homeless individuals.',
      date: '2025-12-15',
      time: 'All Day',
      location: 'Multiple Locations',
      image: 'https://images.unsplash.com/photo-1509099863731-ef4bff19e808?w=800',
      status: 'Past',
    },
  ];

  const displayEvents = events.length > 0 ? events : fallbackEvents;

  const filteredEvents = displayEvents.filter(event => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') return event.status === 'Upcoming';
    if (filter === 'past') return event.status === 'Past';
    return true;
  });

  if (loading) return <LoadingSpinner />;

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920"
            alt="Our Events"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero"></div>
        </div>
        <div className="container-custom relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-display font-bold animate-slide-up">
            {t('events')}
          </h1>
          <p className="text-xl mt-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Join us in making a difference
          </p>
        </div>
      </section>

      {/* Events Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-4 mb-12 justify-center">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-gradient-primary text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Events
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                filter === 'upcoming'
                  ? 'bg-gradient-primary text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t('upcomingEvents')}
            </button>
            <button
              onClick={() => setFilter('past')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                filter === 'past'
                  ? 'bg-gradient-primary text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t('pastEvents')}
            </button>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">No events found for this filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Never Miss an Event
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to stay updated on upcoming events and opportunities to volunteer
          </p>
          <Link to="/get-involved" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
            Get Involved
          </Link>
        </div>
      </section>
    </div>
  );
};

import { Link } from 'react-router-dom';
export default Events;
