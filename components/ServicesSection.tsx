
import React from 'react';
import { SERVICES } from '../constants';
import { Check } from 'lucide-react';

const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-32 bg-navy text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-20 space-y-6">
          <p className="text-gold text-[10px] uppercase tracking-[0.4em] font-bold">Professional Expertise</p>
          <h2 className="text-5xl md:text-6xl font-display leading-tight max-w-2xl">
            Institutional Standards. <br />
            <span className="italic font-light">Decentralized</span> Future.
          </h2>
          <div className="h-px w-24 bg-gold" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-800/50 border border-slate-800/50 rounded-sm overflow-hidden">
          {SERVICES.map((service) => (
            <div 
              key={service.id}
              className="group relative bg-navy p-12 hover:bg-slate-900 transition-all duration-500 overflow-hidden"
            >
              {/* Subtle accent hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="mb-8 w-14 h-14 bg-slate-800 flex items-center justify-center rounded-sm text-gold group-hover:bg-gold group-hover:text-navy transition-colors duration-300">
                {service.icon}
              </div>

              <h3 className="text-2xl font-display mb-4 group-hover:text-gold transition-colors">
                {service.title}
              </h3>
              
              <p className="text-slate-400 font-light mb-10 leading-relaxed group-hover:text-slate-300 transition-colors">
                {service.description}
              </p>

              <ul className="space-y-4">
                {service.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-sm text-slate-500 group-hover:text-slate-400 transition-colors">
                    <Check className="w-4 h-4 text-gold/60 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-12 pt-8 border-t border-slate-800/50 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <a href="#contact" className="text-xs font-bold uppercase tracking-widest text-gold flex items-center hover:translate-x-2 transition-transform">
                  Inquire Further
                  <span className="ml-2">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-12 border border-slate-800/50 rounded-sm flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">
          <div className="space-y-2">
            <h4 className="text-xl font-display">Technical Due Diligence & Audits</h4>
            <p className="text-slate-400 font-light text-sm max-w-lg">
              We provide comprehensive system validation for Tier 1 exchanges, family offices, and institutional investors.
            </p>
          </div>
          <button className="px-10 py-4 border border-gold text-gold text-xs font-bold uppercase tracking-widest hover:bg-gold hover:text-navy transition-all">
            Download Tech Specs
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
