import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { fetchInsightById } from '../services/api';
import { InsightPost } from '../types';

const InsightDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [insight, setInsight] = useState<InsightPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInsight = async () => {
      try {
        if (id) {
          const response = await fetchInsightById(id);
          setInsight(response.data);
        }
      } catch (error) {
        console.error('Error loading insight:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInsight();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-navy border-t-gold rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!insight) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-32">
          <p className="text-center text-slate-400">Insight not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        {/* Breadcrumb */}
        <section className="border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
            <button
              onClick={() => navigate('/#insights')}
              className="flex items-center space-x-2 text-navy hover:text-gold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Insights</span>
            </button>
          </div>
        </section>

        {/* Hero Image */}
        <section className="relative h-96 md:h-[500px] overflow-hidden bg-slate-100">
          <img
            src={insight.imageUrl}
            alt={insight.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </section>

        {/* Article Header */}
        <section className="bg-slate-50 border-b border-slate-100">
          <div className="max-w-3xl mx-auto px-6 md:px-12 py-12 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-gold/10 text-navy rounded-full border border-gold/20">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{insight.category}</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-display text-navy leading-tight">
              {insight.title}
            </h1>

            <div className="flex flex-wrap items-center gap-8 text-sm text-slate-500 font-light">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gold" />
                <span>{insight.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gold" />
                <span>{insight.readTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-gold" />
                <span>By Ulysse Ruff Williams</span>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-6 md:px-12 prose prose-lg">
            <p className="text-xl text-slate-600 font-light leading-relaxed mb-8">
              {insight.excerpt}
            </p>

            <div className="space-y-8 text-slate-600 font-light leading-relaxed">
              <p>
                This comprehensive analysis explores the intersection of institutional investment, regulatory frameworks, and emerging technologies in the blockchain space. The landscape continues to evolve rapidly, and staying ahead requires both technical expertise and strategic foresight.
              </p>

              <h2 className="text-3xl font-display text-navy mt-12 mb-6">Key Insights</h2>
              <ul className="space-y-4 ml-6">
                <li className="list-disc">Institutional adoption is driving standardization in infrastructure protocols</li>
                <li className="list-disc">Regulatory clarity is becoming a competitive advantage for compliant operators</li>
                <li className="list-disc">Real-world asset tokenization represents the next frontier in digital finance</li>
              </ul>

              <h2 className="text-3xl font-display text-navy mt-12 mb-6">Market Implications</h2>
              <p>
                The convergence of traditional finance and decentralized technologies is creating unprecedented opportunities for well-positioned infrastructure providers. Organizations that can bridge the gap between compliance and innovation will capture disproportionate value in the coming cycle.
              </p>

              <h2 className="text-3xl font-display text-navy mt-12 mb-6">Looking Ahead</h2>
              <p>
                We expect continued maturation of institutional infrastructure, with increasing focus on energy efficiency, regulatory compliance, and institutional-grade security. Early positioning in these trends will be critical for long-term success.
              </p>
            </div>

            <div className="mt-16 pt-12 border-t-2 border-slate-100">
              <div className="bg-navy text-white p-8 rounded-sm">
                <h3 className="text-2xl font-display mb-4">Want Strategic Guidance?</h3>
                <p className="text-slate-300 font-light mb-6">
                  Discuss how these insights apply to your specific infrastructure and investment strategy.
                </p>
                <a
                  href="/#contact"
                  className="inline-block px-8 py-3 bg-gold text-navy font-bold uppercase tracking-widest text-xs rounded-sm hover:bg-white transition-all"
                >
                  Schedule Consultation
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="py-20 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <h2 className="text-4xl font-display text-navy mb-12">Related Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-slate-100"></div>
                  <div className="p-6 space-y-4">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Related Article</p>
                    <h3 className="text-lg font-display text-navy line-clamp-2">
                      Related insight {i}
                    </h3>
                    <a href="#" className="text-xs font-bold uppercase tracking-widest text-gold hover:text-navy transition-colors">
                      Read More →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default InsightDetailPage;
