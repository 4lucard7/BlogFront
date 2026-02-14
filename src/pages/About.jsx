import { useContext } from 'react';
import { Heart, Eye, Shield, Users as UsersIcon } from 'lucide-react';
import { LanguageContext } from '../context/LanguageContext';

const About = () => {
  const { t } = useContext(LanguageContext);

  const values = [
    {
      icon: Heart,
      title: t('compassion'),
      description: 'We approach every interaction with empathy and kindness, understanding the struggles of those we serve.',
    },
    {
      icon: Shield,
      title: t('integrity'),
      description: 'We operate with honesty and transparency in all our actions, building trust within our community.',
    },
    {
      icon: Eye,
      title: t('transparency'),
      description: 'We maintain open communication about our operations, finances, and impact to ensure accountability.',
    },
    {
      icon: UsersIcon,
      title: t('community'),
      description: 'We believe in the power of collective action and work together to create lasting positive change.',
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1920"
            alt="About Impact Society"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero"></div>
        </div>
        <div className="container-custom relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-display font-bold animate-slide-up">
            {t('about')}
          </h1>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-6 text-center">
              {t('ourStory')}
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
              <p>
                Impact Society was born from a simple yet powerful idea: young people have the passion, 
                creativity, and determination to make a real difference in their communities. What started 
                as a small group of friends wanting to help during Ramadan has grown into a thriving 
                organization that combines technology, innovation, and traditional charitable work.
              </p>
              <p>
                We recognized that our generation uniquely understands both the challenges facing modern 
                communities and the digital tools that can amplify our impact. By bringing together youth 
                passionate about service and those skilled in technology, we've created a hybrid model 
                that maximizes our ability to serve.
              </p>
              <p>
                Today, Impact Society stands as a testament to what dedicated young people can achieve 
                when they work together with a shared vision of positive change. Our members come from 
                diverse backgrounds, united by a common commitment to compassion, integrity, and community service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="card p-8 hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-display font-bold gradient-text mb-4">
                {t('mission')}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                To empower youth to serve their communities through innovative charity work and 
                technological solutions, creating sustainable positive impact while fostering a 
                culture of compassion and social responsibility.
              </p>
            </div>

            {/* Vision */}
            <div className="card p-8 hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-gradient-secondary rounded-2xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-display font-bold gradient-text mb-4">
                {t('vision')}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                A world where every young person is an active agent of positive change in their 
                community, using both traditional service and modern technology to address social 
                challenges and build a more compassionate society.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-4">
              {t('coreValues')}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 card hover:scale-105 transition-transform"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3 text-gray-900">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-gradient-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Join Our Growing Community
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            We're always looking for passionate individuals who want to make a difference. 
            Whether you have technical skills, time to volunteer, or resources to share, 
            there's a place for you at Impact Society.
          </p>
          <Link to="/get-involved" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
            Become a Member
          </Link>
        </div>
      </section>
    </div>
  );
};

// Import Target and Link
import { Target } from 'lucide-react';
import { Link } from 'react-router-dom';

export default About;
