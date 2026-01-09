import React, { useState, useEffect } from 'react';
import { Star, TrendingUp, Shield } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { fetchCaseStudies } from '../services/api';

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  industry: string;
  results: string[];
  imageUrl: string;
}

const CaseStudiesPage: React.FC = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCaseStudies = async () => {
      try {
        const response = await fetchCaseStudies();
        setCaseStudies(response.data);
      } catch (error) {
        console.error('Error loading case studies:', error);
        // Fallback to mock data
        setCaseStudies(mockCaseStudies);
      } finally {
        setLoading(false);
      }
    };

    loadCaseStudies();
  }, []);

  const mockCaseStudies: CaseStudy[] = [
    {
      id: '1',
      title: 'Institutional Mining Operation Scaling',
      description: 'Designing and validating infrastructure for 500MW mining operation in Texas',
      industry: 'Infrastructure',
      results: ['Grid compliance achieved', '99.9% uptime', '$50M+ capital deployed'],
      imageUrl: 'https://picsum.photos/seed/mining/800/600',
    },
    {
      id: '2',
      title: 'RWA Tokenization Framework',
      description: 'Building real-world asset tokenization protocol for $200M in physical commodities',
      industry: 'Tokenization',
      results: ['SEC compliance', 'Institutional grade', '2M+ monthly transactions'],
      imageUrl: 'https://picsum.photos/seed/tokenization/800/600',
    },
    {
      id: '3',
      title: 'Validator Network Optimization',
      description: 'Optimizing validator node performance for institutional staking platform',
      industry: 'Blockchain',
      results: ['25% efficiency gain', 'Reduced latency by 40%', 'Scaled to 10K validators'],
      imageUrl: 'https://picsum.photos/seed/validators/800/600',
    },
    {
      id: '4',
      title: 'Series B Due Diligence',
      description: 'Technical audit and infrastructure assessment for $50M Series B funding',
      industry: 'Advisory',
      results: ['Clean audit', 'Funding secured', 'Operational roadmap aligned'],
      imageUrl: 'https://picsum.photos/seed/funding/800/600',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        {/* Page Header */}
        <section className="py-32 bg-gradient-to-br from-slate-50 to-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="space-y-6 max-w-3xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-gold/10 text-navy rounded-full border border-gold/20">
                <Star className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Case Studies</span>
              </div>

              <h1 className="text-6xl md:text-7xl font-display text-navy leading-tight">
                Proven Results<br />
                <span className="text-gold italic font-light">at Scale</span>
              </h1>

              <p className="text-xl text-slate-600 font-light leading-relaxed max-w-xl">
                Real-world implementations of blockchain infrastructure, tokenization frameworks, and institutional advisory across multiple sectors.
              </p>
            </div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {(loading ? mockCaseStudies : caseStudies).map((study) => (
                <div key={study.id} className="group cursor-pointer">
                  {/* Image */}
                  <div className="relative overflow-hidden rounded-sm mb-8 aspect-[16/10]">
                    <img
                      src={study.imageUrl}
                      alt={study.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                        {study.industry}
                      </span>
                      <TrendingUp className="w-4 h-4 text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <h3 className="text-2xl font-display text-navy group-hover:text-gold transition-colors">
                      {study.title}
                    </h3>

                    <p className="text-slate-600 font-light leading-relaxed">
                      {study.description}
                    </p>

                    <div className="pt-6 border-t border-slate-100">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-3">
                        Key Results
                      </p>
                      <ul className="space-y-2">
                        {study.results.map((result, idx) => (
                          <li key={idx} className="flex items-center space-x-2 text-sm text-slate-600">
                            <Shield className="w-3 h-3 text-gold flex-shrink-0" />
                            <span>{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href="#contact"
                      className="inline-block mt-6 text-xs font-bold uppercase tracking-widest text-navy hover:text-gold transition-colors"
                    >
                      Request Similar Engagement →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-navy text-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="text-center space-y-3">
                <p className="text-5xl font-display text-gold">$500M+</p>
                <p className="text-slate-300 font-light">Assets Advised</p>
              </div>
              <div className="text-center space-y-3">
                <p className="text-5xl font-display text-gold">50+</p>
                <p className="text-slate-300 font-light">Projects Completed</p>
              </div>
              <div className="text-center space-y-3">
                <p className="text-5xl font-display text-gold">99.9%</p>
                <p className="text-slate-300 font-light">Uptime Average</p>
              </div>
              <div className="text-center space-y-3">
                <p className="text-5xl font-display text-gold">10+</p>
                <p className="text-slate-300 font-light">Years Experience</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-slate-50 to-white">
          <div className="max-w-3xl mx-auto px-6 md:px-12 text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-display text-navy leading-tight">
              Ready to Build Your <span className="text-gold">Success Story?</span>
            </h2>
            <p className="text-lg text-slate-600 font-light">
              Let's discuss how our advisory experience can accelerate your infrastructure development.
            </p>
            <a
              href="/#contact"
              className="inline-block px-10 py-5 bg-navy text-white font-bold uppercase tracking-widest text-xs rounded-sm hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              Schedule Strategy Call
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudiesPage;
