
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Expertise', href: '#services', isExternal: true },
    { name: 'Case Studies', href: '/case-studies', isExternal: false },
    { name: 'Portfolio', href: '/portfolio', isExternal: false },
    { name: 'Team', href: '/team', isExternal: false },
    { name: 'Insights', href: '#insights', isExternal: true },
    { name: 'Contact', href: '#contact', isExternal: true },
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
          {navLinks.map((link) => (
            link.isExternal ? (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium tracking-wide uppercase transition-colors duration-200 ${
                  isScrolled ? 'text-slate-300 hover:text-white' : 'text-navy/70 hover:text-navy'
                }`}
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-medium tracking-wide uppercase transition-colors duration-200 ${
                  isScrolled ? 'text-slate-300 hover:text-white' : 'text-navy/70 hover:text-navy'
                }`}
              >
                {link.name}
              </Link>
            )
          ))}
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
        isMobileMenuOpen ? 'max-h-96' : 'max-h-0'
      }`}>
        <div className="px-6 py-8 space-y-6">
          {navLinks.map((link) => (
            link.isExternal ? (
              <a
                key={link.name}
                href={link.href}
                className="block text-lg font-light tracking-wide hover:text-gold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                className="block text-lg font-light tracking-wide hover:text-gold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            )
          ))}
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
