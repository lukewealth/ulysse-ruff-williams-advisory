
import React, { useState } from 'react';
import { INSIGHTS } from '../constants';
import { Search, ArrowRight } from 'lucide-react';

const InsightsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Blockchain', 'Investment', 'Strategy'];

  const filteredPosts = activeFilter === 'All' 
    ? INSIGHTS 
    : INSIGHTS.filter(post => post.category === activeFilter);

  return (
    <section id="insights" className="py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <p className="text-navy/40 text-[10px] uppercase tracking-[0.4em] font-bold">Market Intelligence</p>
            <h2 className="text-5xl font-display text-navy leading-tight">Infrastructure <span className="italic font-light text-gold">Insights</span></h2>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 bg-white p-2 rounded-sm shadow-sm border border-slate-100">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2.5 text-[10px] uppercase tracking-widest font-bold transition-all ${
                  activeFilter === filter 
                    ? 'bg-navy text-white shadow-lg' 
                    : 'text-slate-400 hover:text-navy'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {filteredPosts.map((post) => (
            <article 
              key={post.id}
              className="group bg-white rounded-sm overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
            >
              <div className="relative overflow-hidden aspect-[16/10]">
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-sm shadow-sm">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-navy">{post.category}</span>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow space-y-4">
                <div className="flex items-center space-x-4 text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 bg-gold rounded-full" />
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-2xl font-display text-navy group-hover:text-gold transition-colors leading-snug">
                  {post.title}
                </h3>
                
                <p className="text-slate-500 font-light text-sm line-clamp-3 leading-relaxed flex-grow">
                  {post.excerpt}
                </p>

                <div className="pt-6 border-t border-slate-50 mt-auto">
                  <a href="#" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-navy group-hover:text-gold transition-all">
                    Continue Reading
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20 text-center">
          <button className="px-10 py-5 bg-navy text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-gold hover:text-navy hover:shadow-xl transition-all duration-300">
            Access Full Knowledge Base
          </button>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
