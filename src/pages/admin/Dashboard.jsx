import { useState, useEffect, useContext } from 'react';
import { Users, FolderKanban, Calendar, TrendingUp } from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';
import { dashboardAPI } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';

const Dashboard = () => {
  const { t } = useContext(LanguageContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await dashboardAPI.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Use fallback data
      setStats({
        users: 150,
        projects: 12,
        events: 28,
        volunteers: 95,
      });
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    {
      icon: Users,
      title: 'Total Users',
      value: stats?.users || 0,
      change: '+12%',
      color: 'bg-blue-500',
    },
    {
      icon: FolderKanban,
      title: 'Active Projects',
      value: stats?.projects || 0,
      change: '+5%',
      color: 'bg-green-500',
    },
    {
      icon: Calendar,
      title: 'Upcoming Events',
      value: stats?.events || 0,
      change: '+18%',
      color: 'bg-purple-500',
    },
    {
      icon: TrendingUp,
      title: 'Active Volunteers',
      value: stats?.volunteers || 0,
      change: '+25%',
      color: 'bg-orange-500',
    },
  ];

  if (loading) return <LoadingSpinner />;

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold gradient-text mb-2">
          {t('dashboard')}
        </h1>
        <p className="text-gray-600">
          Overview of your Impact Society administration
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat, index) => (
          <div
            key={index}
            className="card p-6 hover:scale-105 transition-transform"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-green-600 text-sm font-semibold">
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">
              {stat.title}
            </h3>
            <p className="text-3xl font-display font-bold text-gray-900">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="card p-6">
          <h3 className="text-xl font-display font-bold mb-4">Recent Users</h3>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                  U{i}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">User {i}</p>
                  <p className="text-sm text-gray-600">user{i}@example.com</p>
                </div>
                <span className="text-xs text-gray-500">2h ago</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Events */}
        <div className="card p-6">
          <h3 className="text-xl font-display font-bold mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-gradient-secondary rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Event {i}</p>
                  <p className="text-sm text-gray-600">March {i * 5}, 2026</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <button className="card p-6 text-center hover:scale-105 transition-transform group">
          <Users className="w-12 h-12 mx-auto mb-3 text-primary-600 group-hover:scale-110 transition-transform" />
          <h4 className="font-display font-bold text-gray-900 mb-2">Add User</h4>
          <p className="text-sm text-gray-600">Create a new user account</p>
        </button>

        <button className="card p-6 text-center hover:scale-105 transition-transform group">
          <FolderKanban className="w-12 h-12 mx-auto mb-3 text-secondary-600 group-hover:scale-110 transition-transform" />
          <h4 className="font-display font-bold text-gray-900 mb-2">New Project</h4>
          <p className="text-sm text-gray-600">Start a new community project</p>
        </button>

        <button className="card p-6 text-center hover:scale-105 transition-transform group">
          <Calendar className="w-12 h-12 mx-auto mb-3 text-purple-600 group-hover:scale-110 transition-transform" />
          <h4 className="font-display font-bold text-gray-900 mb-2">Create Event</h4>
          <p className="text-sm text-gray-600">Schedule a new event</p>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
