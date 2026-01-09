
import React from 'react';
import { Linkedin, Twitter, ArrowUp, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy text-white pt-24 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8 col-span-1 lg:col-span-1">
            <a href="#" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gold flex items-center justify-center rounded-sm">
                <span className="text-navy font-bold text-xs">UW</span>
              </div>
              <span className="text-xl font-display font-medium tracking-tight">ULYSSE RUFF <span className="italic font-light">WILLIAMS</span></span>
            </a>
            <p className="text-slate-400 font-light text-sm leading-relaxed max-w-xs">
              Empowering institutions with compliant, scalable blockchain infrastructure intelligence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 border border-slate-800 hover:border-gold hover:text-gold transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 border border-slate-800 hover:border-gold hover:text-gold transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 border border-slate-800 hover:border-gold hover:text-gold transition-colors">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold">Expertise</h4>
            <ul className="space-y-4 text-sm text-slate-400 font-light">
              <li><a href="#" className="hover:text-white transition-colors">Blockchain Advisory</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tokenization Strategy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Infrastructure Audits</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Due Diligence</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold">Corporate</h4>
            <ul className="space-y-4 text-sm text-slate-400 font-light">
              <li><a href="#" className="hover:text-white transition-colors">About Strategy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Insights & Archive</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Compliance Portal</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Expert</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold">Global Intelligence</h4>
            <p className="text-sm text-slate-400 font-light mb-4">Subscribe to the quarterly infrastructure report.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Institutional Email" 
                className="bg-slate-900/50 border border-slate-800 px-4 py-3 text-xs w-full outline-none focus:border-gold"
              />
              <button className="bg-gold text-navy p-3 hover:bg-white transition-colors">
                <ArrowUp className="w-4 h-4 rotate-45" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest">
            © 2024 Ulysse Ruff Williams Advisory Ltd. All Rights Reserved.
          </p>
          <div className="flex space-x-8 text-[10px] text-slate-500 uppercase tracking-widest">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Engagement</a>
            <a href="#" className="hover:text-gold transition-colors">Regulatory Disclosures</a>
          </div>
          <button 
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-[10px] text-slate-500 uppercase tracking-widest hover:text-white transition-colors group"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3 h-3 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
