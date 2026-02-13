import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Events', href: '/events' },
    { name: 'Team', href: '/team' },
    { name: 'Posts', href: '/posts' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-white shadow-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo Section */}
            <a 
              href="/" 
              className="flex items-center gap-3 group"
              aria-label="Impact Society Home"
            >
              {/* Logo Container */}
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 group-hover:scale-110 bg-gradient-to-br from-blue-600 to-green-600 flex items-center justify-center">
                  {/* Try to load logo, fallback to text if it fails */}
                  <img 
                    src="/logo_is_00177_jpg.jpeg" 
                    alt="Impact Society Logo"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      // Fallback to text logo if image doesn't load
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'block';
                    }}
                  />
                  <span className="hidden text-white font-bold text-xl">IS</span>
                </div>
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
              </div>
              
              {/* Brand Text */}
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-green-600 bg-clip-text text-transparent">
                  Impact Society
                </h1>
                <p className="text-xs font-medium text-gray-600">
                  Tech • Community • Impact
                </p>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1" role="navigation">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative px-4 py-2 rounded-lg font-medium text-sm text-gray-700 hover:text-blue-700 transition-all duration-300 group"
                >
                  {item.name}
                  {/* Hover Background */}
                  <span className="absolute inset-0 rounded-lg bg-blue-50 transition-opacity duration-300 opacity-0 group-hover:opacity-100 -z-10"></span>
                  {/* Active Indicator */}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-green-600 transition-all duration-300 group-hover:w-3/4 rounded-full"></span>
                </a>
              ))}
            </nav>

            {/* CTA Buttons - Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="/signin"
                className="px-5 py-2.5 rounded-lg font-medium text-sm text-gray-700 hover:bg-gray-100 transition-all duration-300"
              >
                Sign In
              </a>
              <a
                href="/join"
                className="relative px-6 py-2.5 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg font-medium text-sm overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="relative z-10">Join Impact</span>
                {/* Shine Effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-300"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Slide-in Panel */}
      <div
        className={`lg:hidden fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-50 shadow-2xl transform transition-transform duration-500 ease-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-green-600 flex items-center justify-center text-white font-bold">
                IS
              </div>
              <div>
                <h2 className="text-lg font-bold bg-gradient-to-r from-blue-700 to-green-600 bg-clip-text text-transparent">
                  Impact Society
                </h2>
                <p className="text-xs text-gray-600">Tech for Good</p>
              </div>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex-1 overflow-y-auto p-6" role="navigation">
            <div className="space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={handleNavClick}
                  className="block px-4 py-3.5 text-gray-700 hover:text-blue-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 rounded-xl font-medium transition-all duration-300 transform hover:translate-x-1"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </nav>

          {/* Mobile CTA Buttons */}
          <div className="p-6 border-t border-gray-100 space-y-3">
            <a
              href="/signin"
              onClick={handleNavClick}
              className="block w-full px-4 py-3.5 text-center text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-xl font-medium transition-all duration-300"
            >
              Sign In
            </a>
            <a
              href="/join"
              onClick={handleNavClick}
              className="block w-full px-4 py-3.5 text-center bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              Join Impact Society
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;