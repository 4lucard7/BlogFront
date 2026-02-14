import { Calendar, MapPin, Clock } from 'lucide-react';

const EventCard = ({ event }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="card group">
      <div className="relative overflow-hidden h-48">
        <img
          src={event.image || 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800'}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-lg">
          <span className="text-primary-600 font-bold text-sm">{event.status || 'Upcoming'}</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-display font-bold mb-3 text-gray-900 group-hover:text-primary-600 transition-colors">
          {event.title}
        </h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4 text-primary-500" />
            <span className="text-sm">{formatDate(event.date)}</span>
          </div>
          
          {event.time && (
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4 text-primary-500" />
              <span className="text-sm">{event.time}</span>
            </div>
          )}
          
          {event.location && (
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4 text-primary-500" />
              <span className="text-sm">{event.location}</span>
            </div>
          )}
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">
          {event.description}
        </p>
        
        <button className="w-full btn-primary text-center">
          Register Now
        </button>
      </div>
    </div>
  );
};

export default EventCard;
