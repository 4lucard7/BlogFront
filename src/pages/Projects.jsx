import { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { projectAPI } from '../services/api';
import ProjectCard from '../components/ProjectCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Projects = () => {
  const { t } = useContext(LanguageContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await projectAPI.getAll();
      setProjects(response.data);
    } catch (err) {
      console.error('Error fetching projects:', err);
      // Use fallback data if API fails
      setProjects(fallbackProjects);
    } finally {
      setLoading(false);
    }
  };

  // Fallback data for demo
  const fallbackProjects = [
    {
      id: 1,
      title: 'Ramadan Food Basket Initiative',
      description: 'Providing essential food packages to 500+ families during Ramadan, ensuring they can observe this holy month with dignity and proper nutrition.',
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800',
      impact: '500+ families helped',
    },
    {
      id: 2,
      title: 'Tech Education for Youth',
      description: 'Free coding bootcamps and tech workshops for underprivileged youth, empowering the next generation with digital skills.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
      impact: '200+ students trained',
    },
    {
      id: 3,
      title: 'Community Health Drives',
      description: 'Organizing free health checkups and awareness campaigns in underserved communities.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
      impact: '1000+ people screened',
    },
    {
      id: 4,
      title: 'Clean Water Initiative',
      description: 'Installing water filtration systems in areas with limited access to clean drinking water.',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
      impact: '15 communities served',
    },
  ];

  const displayProjects = projects.length > 0 ? projects : fallbackProjects;

  if (loading) return <LoadingSpinner />;

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920"
            alt="Our Projects"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero"></div>
        </div>
        <div className="container-custom relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-display font-bold animate-slide-up">
            {t('projects')}
          </h1>
          <p className="text-xl mt-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Creating lasting impact through meaningful initiatives
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {displayProjects.length === 0 && !loading && (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">No projects found.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Want to Start a Project?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Have an idea for a community project? We'd love to hear from you!
          </p>
          <Link to="/get-involved" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

import { Link } from 'react-router-dom';
export default Projects;
