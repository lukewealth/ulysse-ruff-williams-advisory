import React, { useState, useEffect } from 'react';
import { Briefcase, ExternalLink } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { fetchPortfolio } from '../services/api';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  tags: string[];
  link?: string;
}

const PortfolioPage: React.FC = () => {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const response = await fetchPortfolio();
        setPortfolio(response.data);
      } catch (error) {
        console.error('Error loading portfolio:', error);
        // Fallback to mock data
        setPortfolio(mockPortfolio);
      } finally {
        setLoading(false);
      }
    };

    loadPortfolio();
  }, []);

  const mockPortfolio: PortfolioItem[] = [
    {
      id: '1',
      title: 'PoW Mining Protocol',
      category: 'Infrastructure',
      description: 'Enterprise-grade mining pool infrastructure with real-time optimization',
      imageUrl: 'https://picsum.photos/seed/protocol1/800/600',
      tags: ['Mining', 'Optimization', 'Institutional'],
    },
    {
      id: '2',
      title: 'RWA Tokenization',
      category: 'Tokenization',
      description: 'Real-world asset tokenization platform for commodities and securities',
      imageUrl: 'https://picsum.photos/seed/protocol2/800/600',
      tags: ['RWA', 'DeFi', 'Compliance'],
    },
    {
      id: '3',
      title: 'Validator Node Network',
      category: 'Infrastructure',
      description: 'Global validator network with institutional-grade performance',
      imageUrl: 'https://picsum.photos/seed/protocol3/800/600',
      tags: ['Staking', 'Validators', 'Performance'],
    },
    {
      id: '4',
      title: 'Capital Readiness Program',
      category: 'Advisory',
      description: 'Comprehensive due diligence and preparation for institutional funding',
      imageUrl: 'https://picsum.photos/seed/advisory1/800/600',
      tags: ['Funding', 'Strategy', 'Due Diligence'],
    },
    {
      id: '5',
      title: 'Energy Compliance Framework',
      category: 'Compliance',
      description: 'Regulatory-compliant energy management for blockchain operations',
      imageUrl: 'https://picsum.photos/seed/compliance1/800/600',
      tags: ['Regulatory', 'Energy', 'Compliance'],
    },
    {
      id: '6',
      title: 'Smart Contract Audit',
      category: 'Advisory',
      description: 'Comprehensive security and functionality audit for production systems',
      imageUrl: 'https://picsum.photos/seed/audit1/800/600',
      tags: ['Security', 'Audit', 'Smart Contracts'],
    },
  ];

  const categories = ['All', 'Infrastructure', 'Tokenization', 'Advisory', 'Compliance'];
  const filteredPortfolio = activeCategory === 'All'
    ? portfolio.length > 0 ? portfolio : mockPortfolio
    : (portfolio.length > 0 ? portfolio : mockPortfolio).filter(
        (item) => item.category === activeCategory
      );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        {/* Page Header */}
        <section className="py-32 bg-gradient-to-br from-slate-50 to-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="space-y-6 max-w-3xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-gold/10 text-navy rounded-full border border-gold/20">
                <Briefcase className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Portfolio</span>
              </div>

              <h1 className="text-6xl md:text-7xl font-display text-navy leading-tight">
                Infrastructure<br />
                & Advisory <span className="text-gold italic font-light">Solutions</span>
              </h1>

              <p className="text-xl text-slate-600 font-light leading-relaxed max-w-xl">
                Institutional-grade implementations across blockchain infrastructure, tokenization, and strategic advisory.
              </p>
            </div>
          </div>
        </section>

        {/* Filter Buttons */}
        <section className="py-12 border-b border-slate-100 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex flex-wrap gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2.5 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all ${
                    activeCategory === category
                      ? 'bg-navy text-white shadow-lg'
                      : 'bg-white text-slate-400 border border-slate-200 hover:text-navy'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            {loading ? (
              <div className="text-center py-20">
                <div className="w-12 h-12 border-4 border-navy border-t-gold rounded-full animate-spin mx-auto"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPortfolio.map((item) => (
                  <div
                    key={item.id}
                    className="group bg-white rounded-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-500"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden aspect-[16/10] bg-slate-100">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Content */}
                    <div className="p-8 space-y-4">
                      <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-gold bg-gold/10 px-3 py-1 rounded-full">
                        {item.category}
                      </span>

                      <h3 className="text-2xl font-display text-navy group-hover:text-gold transition-colors line-clamp-2">
                        {item.title}
                      </h3>

                      <p className="text-slate-600 font-light text-sm leading-relaxed line-clamp-2">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] text-slate-400 bg-slate-50 px-2 py-1 rounded-sm"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {item.link ? (
                        <a
                          href={item.link}
                          className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-navy hover:text-gold transition-colors pt-4"
                        >
                          View Project
                          <ExternalLink className="w-3 h-3 ml-2" />
                        </a>
                      ) : (
                        <a
                          href="/#contact"
                          className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-navy hover:text-gold transition-colors pt-4"
                        >
                          Inquire
                          <ExternalLink className="w-3 h-3 ml-2" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-navy text-white">
          <div className="max-w-3xl mx-auto px-6 md:px-12 text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-display leading-tight">
              See Your Project <span className="text-gold">in Our Portfolio</span>
            </h2>
            <p className="text-lg text-slate-300 font-light">
              Let's create the next institutional-grade implementation in blockchain infrastructure.
            </p>
            <a
              href="/#contact"
              className="inline-block px-10 py-5 bg-gold text-navy font-bold uppercase tracking-widest text-xs rounded-sm hover:bg-white transition-all"
            >
              Start Your Project
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PortfolioPage;
