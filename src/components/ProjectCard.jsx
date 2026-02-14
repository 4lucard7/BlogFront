import { useContext } from 'react';
import { ArrowRight } from 'lucide-react';
import { LanguageContext } from '../context/LanguageContext';

const ProjectCard = ({ project }) => {
  const { t } = useContext(LanguageContext);

  return (
    <div className="card group">
      <div className="relative overflow-hidden h-48">
        <img
          src={project.image || 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800'}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-display font-bold mb-2 text-gray-900 group-hover:text-primary-600 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {project.description}
        </p>
        
        {project.impact && (
          <div className="mb-4 p-3 bg-secondary-50 rounded-lg">
            <p className="text-sm text-secondary-700 font-semibold">
              Impact: {project.impact}
            </p>
          </div>
        )}
        
        <button className="flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all">
          {t('learnMore')}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
