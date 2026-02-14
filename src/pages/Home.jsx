import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Target, ArrowRight } from 'lucide-react';
import { LanguageContext } from '../context/LanguageContext';

const Home = () => {
  const { t } = useContext(LanguageContext);

  const stats = [
    { icon: Heart, value: '500+', label: t('familiesHelped') },
    { icon: Users, value: '150+', label: t('volunteers') },
    { icon: Target, value: '25+', label: t('projectsCompleted') },
  ];

  const testimonials = [
    {
      name: 'Sarah Ahmed',
      role: 'Volunteer',
      text: 'Being part of Impact Society has been life-changing. I\'ve learned so much while helping others.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    },
    {
      name: 'Mohamed Ali',
      role: 'Beneficiary',
      text: 'The support we received during Ramadan was incredible. Impact Society truly cares about the community.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920"
            alt="Community helping"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero"></div>
        </div>

        <div className="container-custom relative z-10 text-center text-white px-4">
          <img
            src="/logo.jpeg"
            alt="Impact Society Logo"
            className="h-24 w-24 mx-auto mb-6 animate-scale-in"
          />
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 animate-slide-up">
            {t('heroTitle')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            {t('heroSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/get-involved" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
              {t('donate')}
            </Link>
            <Link to="/get-involved" className="btn-secondary border-white text-white hover:bg-white/10">
              {t('joinUs')}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-8 card hover:scale-105 transition-transform"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-4xl font-display font-bold gradient-text mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Project - Ramadan Food Basket */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-4">
              {t('ramadanBasket')} Initiative
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Our flagship program providing essential food packages to families during Ramadan
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-display font-bold mb-4">Making a Real Impact</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Every Ramadan, we distribute food baskets to families in need, ensuring they can observe 
                this holy month with dignity and proper nutrition. Each basket contains essential items 
                carefully selected to provide nutritious meals throughout the month.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-primary"></div>
                  <span className="text-gray-700">500+ families served annually</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-primary"></div>
                  <span className="text-gray-700">Fresh and nutritious food items</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-primary"></div>
                  <span className="text-gray-700">Delivered with respect and care</span>
                </div>
              </div>
              <Link to="/projects" className="inline-flex items-center gap-2 btn-primary">
                {t('learnMore')}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="order-1 md:order-2">
              <img
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800"
                alt="Ramadan Food Basket"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-4">
              Community Voices
            </h2>
            <p className="text-gray-600 text-lg">
              Hear from those who make our mission possible
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card p-8">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community of volunteers and help us create positive change
          </p>
          <Link to="/get-involved" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
            Get Involved Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
