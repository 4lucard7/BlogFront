import { useState, useEffect, useContext } from 'react';
import { Plus, Edit, Trash2, Search, X } from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';
import { projectAPI } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';

const Projects = () => {
  const { t } = useContext(LanguageContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    impact: '',
    status: 'active',
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await projectAPI.getAll();
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([
        {
          id: 1,
          title: 'Ramadan Food Basket Initiative',
          description: 'Providing food baskets to families in need',
          impact: '500+ families helped',
          status: 'active',
        },
        {
          id: 2,
          title: 'Tech Education Program',
          description: 'Teaching coding to youth',
          impact: '200+ students trained',
          status: 'active',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setFormData({ title: '', description: '', impact: '', status: 'active' });
    setShowModal(true);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      impact: project.impact || '',
      status: project.status,
    });
    setShowModal(true);
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectAPI.delete(id);
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Error deleting project');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await projectAPI.update(editingProject.id, formData);
      } else {
        await projectAPI.create(formData);
      }
      setShowModal(false);
      fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project');
    }
  };

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold gradient-text mb-2">
            {t('projectManagement')}
          </h1>
          <p className="text-gray-600">
            Manage community projects and initiatives
          </p>
        </div>
        <button
          onClick={handleAddProject}
          className="btn-primary flex items-center gap-2 mt-4 md:mt-0"
        >
          <Plus className="w-5 h-5" />
          {t('addNew')}
        </button>
      </div>

      {/* Search Bar */}
      <div className="card p-6 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg 
                     focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="card p-6 group hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-display font-bold text-gray-900 flex-1">
                {project.title}
              </h3>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                project.status === 'active' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {project.status}
              </span>
            </div>
            
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
            
            <div className="flex gap-2 mt-auto pt-4 border-t border-gray-200">
              <button
                onClick={() => handleEditProject(project)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 
                         text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Edit className="w-4 h-4" />
                {t('edit')}
              </button>
              <button
                onClick={() => handleDeleteProject(project.id)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 
                         text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                {t('delete')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-display font-bold">
                {editingProject ? t('edit') : t('addNew')} Project
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Description</label>
                <textarea
                  required
                  rows="4"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Impact (Optional)</label>
                <input
                  type="text"
                  value={formData.impact}
                  onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., 500+ families helped"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="planned">Planned</option>
                </select>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-semibold 
                           hover:bg-gray-50 transition-colors"
                >
                  {t('cancel')}
                </button>
                <button type="submit" className="flex-1 btn-primary">
                  {t('save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
