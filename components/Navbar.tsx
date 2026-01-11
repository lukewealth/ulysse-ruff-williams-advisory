
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainNavLinks = [
    { name: 'Expertise', href: '/expertise', isExternal: false },
    { name: 'Industries', href: '/industries', isExternal: false },
    { name: 'Case Studies', href: '/case-studies', isExternal: false },
    { name: 'Portfolio', href: '/portfolio', isExternal: false },
    { name: 'Publications', href: '/publications', isExternal: false },
    { name: 'Team', href: '/team', isExternal: false },
  ];

  const specializedServices = [
    { name: 'AML & Sanctions', href: '/aml-sanctions' },
    { name: 'Blockchain Security', href: '/blockchain-security' },
    { name: 'Digital Assets', href: '/digital-assets' },
    { name: 'Mining Compliance', href: '/mining-compliance' },
    { name: 'Regulatory Insights', href: '/regulatory-insight' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-navy/95 backdrop-blur-md py-4 shadow-xl' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-8 h-8 bg-gold flex items-center justify-center rounded-sm group-hover:rotate-45 transition-transform duration-500">
            <span className="text-navy font-bold text-xs">UW</span>
          </div>
          <span className={`text-xl font-display font-medium tracking-tight ${
            isScrolled ? 'text-white' : 'text-navy'
          }`}>
            ULYSSE <span className="font-light italic">RUFF WILLIAMS</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {mainNavLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`text-sm font-medium tracking-wide uppercase transition-colors duration-200 ${
                isScrolled ? 'text-slate-300 hover:text-white' : 'text-navy/70 hover:text-navy'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          {/* Services Dropdown */}
          <div className="relative group">
            <button
              className={`text-sm font-medium tracking-wide uppercase transition-colors duration-200 flex items-center space-x-1 ${
                isScrolled ? 'text-slate-300 hover:text-white' : 'text-navy/70 hover:text-navy'
              }`}
              onMouseEnter={() => setIsServicesDropdownOpen(true)}
              onMouseLeave={() => setIsServicesDropdownOpen(false)}
            >
              <span>Services</span>
              <ChevronDown size={16} className={`transition-transform ${isServicesDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Dropdown Menu */}
            <div
              className={`absolute left-0 top-full pt-2 w-48 bg-navy text-white rounded-md shadow-xl transition-all duration-200 ${
                isServicesDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}
              onMouseEnter={() => setIsServicesDropdownOpen(true)}
              onMouseLeave={() => setIsServicesDropdownOpen(false)}
            >
              {specializedServices.map((service) => (
                <Link
                  key={service.name}
                  to={service.href}
                  className="block px-4 py-3 text-sm font-medium hover:bg-gold hover:text-navy transition-colors first:rounded-t-md last:rounded-b-md"
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </div>
          <a
            href="/#contact"
            className={`px-5 py-2.5 rounded-sm text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
              isScrolled 
                ? 'bg-gold text-navy hover:bg-white' 
                : 'bg-navy text-white hover:bg-gold hover:text-navy'
            }`}
          >
            Connect
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={isScrolled ? 'text-white' : 'text-navy'} />
          ) : (
            <Menu className={isScrolled ? 'text-white' : 'text-navy'} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-navy text-white overflow-hidden transition-all duration-300 ${
        isMobileMenuOpen ? 'max-h-screen' : 'max-h-0'
      }`}>
        <div className="px-6 py-8 space-y-4">
          {mainNavLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="block text-lg font-light tracking-wide hover:text-gold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          
          {/* Mobile Services Submenu */}
          <div className="border-t border-gold/30 pt-4">
            <p className="text-sm font-bold text-gold uppercase mb-3">Specialized Services</p>
            {specializedServices.map((service) => (
              <Link
                key={service.name}
                to={service.href}
                className="block text-base font-light tracking-wide hover:text-gold pl-4 mb-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {service.name}
              </Link>
            ))}
          </div>
          
          <a
            href="/#contact"
            className="block w-full bg-gold text-navy text-center py-4 font-bold uppercase tracking-widest"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Request Strategy Call
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
