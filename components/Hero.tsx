
import React from 'react';
import { ArrowRight, Globe, ChevronDown } from 'lucide-react';

interface HeroProps {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onLoginClick, onSignupClick }) => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 -z-10 translate-x-1/4 skew-x-[-12deg]" />
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-amber-50 rounded-full blur-3xl opacity-40 -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-navy/5 text-navy rounded-full border border-navy/10">
            <Globe className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Global Digital Asset Strategy</span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-medium text-navy leading-[0.95] tracking-tight">
            Infrastructure <br />
            <span className="italic font-light">Builds</span> Wealth. <br />
            Strategy <span className="text-gold">Scales</span> It.
          </h1>

          <p className="text-xl text-slate-600 max-w-lg leading-relaxed font-light">
            Ulysse Ruff Williams provides institutional-grade technical advisory at the intersection of blockchain infrastructure, global regulation, and capital deployment.
          </p>

          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 pt-4">
            <a 
              href="#contact" 
              className="group relative px-8 py-5 bg-navy text-white font-bold uppercase tracking-widest text-xs rounded-sm overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 w-full sm:w-auto text-center"
            >
              <span className="relative z-10 flex items-center justify-center">
                Strategy Consultation
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-0" />
            </a>
            <button 
              onClick={onSignupClick}
              className="text-navy font-bold uppercase tracking-widest text-xs hover:text-gold transition-colors py-4"
            >
              Create Account
            </button>
            <button 
              onClick={onLoginClick}
              className="text-navy font-bold uppercase tracking-widest text-xs hover:text-gold transition-colors py-4"
            >
              Login
            </button>
          </div>

          <div className="flex items-center space-x-8 pt-12 border-t border-slate-100 max-w-sm">
            <div>
              <p className="text-2xl font-display font-bold text-navy">$500M+</p>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">AUM Advised</p>
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-navy">99.9%</p>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Network Uptime</p>
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-navy">Global</p>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Asset Presence</p>
            </div>
          </div>
        </div>

        <div className="relative hidden lg:block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="relative z-10 rounded-sm overflow-hidden aspect-[4/5] shadow-2xl border-[12px] border-white">
            <img 
              src="/images/ulysse-ruff-williams.png" 
              alt="Ulysse Ruff Williams - Principal Advisor"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop';
              }}
            />
          </div>
          {/* Abstract background elements */}
          <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-gold/10 -z-0" />
          <div className="absolute -top-8 -right-8 w-64 h-64 border border-navy/5 -z-0" />
          
          <div className="absolute bottom-12 -right-6 z-20 bg-navy text-white p-6 shadow-2xl max-w-[200px]">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold mb-2">Lead Consultant</p>
            <p className="text-sm font-light leading-snug">Expertise in PoW/PoS infrastructure & RWA scaling.</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
        <ChevronDown className="text-navy" />
      </div>
    </section>
  );
};

export default Hero;
