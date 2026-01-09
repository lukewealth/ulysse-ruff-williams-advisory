
import React from 'react';
import { TIMELINE } from '../constants';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 space-y-8">
            <p className="text-navy/40 text-[10px] uppercase tracking-[0.4em] font-bold">The Strategist</p>
            <h2 className="text-5xl font-display text-navy leading-tight">
              Bridging the gap <br />
              between <span className="italic font-light">Code</span> & <br />
              <span className="text-gold">Compliance.</span>
            </h2>
            
            <div className="space-y-6 text-slate-600 font-light leading-relaxed">
              <p>
                Ulysse Ruff Williams specializes in blockchain infrastructure, digital asset systems, and technology strategy for scalable businesses. She works with founders, technical teams, and enterprise partners to design, validate, and deploy institutional-grade blockchain solutions.
              </p>
              <p>
                Her approach is systems-first and execution-focused, prioritizing long-term scalability and risk-aware planning over market hype. She has spent the last decade navigating the evolution from early-stage mining operations to global tokenization frameworks.
              </p>
            </div>

            <div className="pt-8 grid grid-cols-2 gap-8">
              <div className="p-6 bg-slate-50 rounded-sm space-y-2 border-l-2 border-gold">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Languages</p>
                <p className="text-sm font-medium text-navy">English, French, Mandarin</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-sm space-y-2 border-l-2 border-gold">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Location</p>
                <p className="text-sm font-medium text-navy">Zurich / Dubai / London</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative pl-8 border-l border-slate-100 py-4">
              <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-navy mb-16">Professional Trajectory</h3>
              
              <div className="space-y-16">
                {TIMELINE.map((event, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-[37px] top-1 w-4 h-4 bg-white border border-slate-200 rounded-full group-hover:border-gold group-hover:scale-125 transition-all duration-300" />
                    <div className="absolute -left-[33px] top-1.5 w-2 h-2 bg-slate-100 rounded-full group-hover:bg-gold transition-colors" />
                    
                    <div className="space-y-2">
                      <span className="text-gold font-bold text-xs uppercase tracking-tighter">{event.year}</span>
                      <h4 className="text-xl font-display text-navy group-hover:translate-x-2 transition-transform duration-300">{event.title}</h4>
                      <p className="text-slate-500 font-light text-sm max-w-xl">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Decorative line end */}
              <div className="absolute bottom-0 -left-[1px] h-32 w-px bg-gradient-to-t from-transparent to-slate-100" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
