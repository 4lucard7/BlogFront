import { useState, useContext } from 'react';
import { Heart, Users, Handshake, Send } from 'lucide-react';
import { LanguageContext } from '../context/LanguageContext';
import { volunteerAPI, contactAPI } from '../services/api';

const GetInvolved = () => {
  const { t } = useContext(LanguageContext);
  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    email: '',
    phone: '',
    interests: '',
  });
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleVolunteerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await volunteerAPI.submit(volunteerForm);
      setSuccessMessage('Thank you for volunteering! We will contact you soon.');
      setVolunteerForm({ name: '', email: '', phone: '', interests: '' });
    } catch (error) {
      console.error('Error submitting volunteer form:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactAPI.submit(contactForm);
      setSuccessMessage('Message sent successfully! We will get back to you soon.');
      setContactForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Error sending message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const ways = [
    {
      icon: Users,
      title: 'Volunteer',
      description: 'Join our team of dedicated volunteers and help us deliver programs to the community.',
    },
    {
      icon: Heart,
      title: 'Donate',
      description: 'Support our initiatives with a financial contribution to help more families.',
    },
    {
      icon: Handshake,
      title: 'Partner',
      description: 'Collaborate with us as a corporate partner or organization to amplify our impact.',
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920"
            alt="Get Involved"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero"></div>
        </div>
        <div className="container-custom relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-display font-bold animate-slide-up">
            {t('getInvolved')}
          </h1>
          <p className="text-xl mt-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Be part of the change you want to see
          </p>
        </div>
      </section>

      {/* Ways to Get Involved */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-4">
              How You Can Help
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              There are many ways to contribute to our mission
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {ways.map((way, index) => (
              <div key={index} className="card p-8 text-center hover:scale-105 transition-transform">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-4">
                  <way.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">{way.title}</h3>
                <p className="text-gray-600">{way.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Forms Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-lg mb-8 text-center">
              {successMessage}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            {/* Volunteer Form */}
            <div className="card p-8">
              <h3 className="text-2xl font-display font-bold gradient-text mb-6">
                {t('volunteerForm')}
              </h3>
              <form onSubmit={handleVolunteerSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    {t('name')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={volunteerForm.name}
                    onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
                             focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    {t('email')} *
                  </label>
                  <input
                    type="email"
                    required
                    value={volunteerForm.email}
                    onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
                             focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={volunteerForm.phone}
                    onChange={(e) => setVolunteerForm({ ...volunteerForm, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
                             focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="+1 (234) 567-890"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Areas of Interest
                  </label>
                  <textarea
                    value={volunteerForm.interests}
                    onChange={(e) => setVolunteerForm({ ...volunteerForm, interests: e.target.value })}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
                             focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about your interests and skills..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  {loading ? 'Submitting...' : t('submit')}
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>

            {/* Contact Form */}
            <div className="card p-8">
              <h3 className="text-2xl font-display font-bold gradient-text mb-6">
                {t('contactForm')}
              </h3>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    {t('name')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
                             focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    {t('email')} *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
                             focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    {t('message')} *
                  </label>
                  <textarea
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
                             focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  {loading ? 'Sending...' : t('submit')}
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section className="section-padding bg-gradient-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Make a Donation
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Your financial support helps us reach more families and expand our programs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
              One-Time Donation
            </button>
            <button className="btn-secondary border-white text-white hover:bg-white/10">
              Monthly Giving
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetInvolved;
