import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { fetchServiceById } from '../services/api';
import { Service } from '../types';

const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadService = async () => {
      try {
        if (id) {
          const response = await fetchServiceById(id);
          setService(response.data);
        }
      } catch (error) {
        console.error('Error loading service:', error);
      } finally {
        setLoading(false);
      }
    };

    loadService();
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

  if (!service) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-32">
          <p className="text-center text-slate-400">Service not found</p>
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
              onClick={() => navigate('/#services')}
              className="flex items-center space-x-2 text-navy hover:text-gold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Services</span>
            </button>
          </div>
        </section>

        {/* Hero Section */}
        <section className="py-32 bg-gradient-to-br from-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-gold/10 text-navy rounded-full border border-gold/20">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Service Detail</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl font-display font-medium text-navy leading-tight">
                {service.title}
              </h1>

              <p className="text-xl text-slate-600 font-light leading-relaxed max-w-2xl">
                {service.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 pt-20 border-t border-slate-100">
              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Service Type</p>
                <p className="text-lg font-display text-navy">{service.title}</p>
              </div>
              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Delivery Model</p>
                <p className="text-lg font-display text-navy">Enterprise & Institutional</p>
              </div>
              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Engagement</p>
                <p className="text-lg font-display text-navy">Custom Consulting</p>
              </div>
            </div>
          </div>
        </section>

        {/* Details Section */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="lg:col-span-2 space-y-12">
                <div>
                  <h2 className="text-4xl font-display text-navy mb-8">What's Included</h2>
                  <ul className="space-y-4">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-gold/10 flex items-center justify-center rounded-sm mt-1 flex-shrink-0">
                          <Check className="w-4 h-4 text-gold" />
                        </div>
                        <span className="text-lg text-slate-600 font-light leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50 p-12 rounded-sm border-l-4 border-gold">
                  <h3 className="text-2xl font-display text-navy mb-4">Why This Matters</h3>
                  <p className="text-slate-600 font-light leading-relaxed mb-4">
                    Institutional-grade advisory isn't about trendy solutions—it's about sustainable infrastructure. Whether you're deploying a mining operation, tokenizing real assets, or raising institutional capital, the technical foundation determines your long-term success.
                  </p>
                  <p className="text-slate-600 font-light leading-relaxed">
                    Our services are designed for teams that understand that compliance and technology are not obstacles—they're competitive advantages.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-24 p-8 bg-navy text-white rounded-sm space-y-6">
                  <h3 className="text-2xl font-display">Ready to Engage?</h3>
                  <p className="text-slate-300 font-light text-sm leading-relaxed">
                    Let's discuss how this service can be customized for your specific needs.
                  </p>
                  <a
                    href="/#contact"
                    className="block w-full bg-gold text-navy font-bold uppercase tracking-widest text-xs py-4 rounded-sm text-center hover:bg-white transition-all"
                  >
                    Request Consultation
                  </a>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold text-center">
                    Typical engagement: 4-12 weeks
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-navy text-white">
          <div className="max-w-3xl mx-auto px-6 md:px-12 text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-display leading-tight">
              Ready to Strengthen Your <span className="text-gold">Infrastructure?</span>
            </h2>
            <p className="text-lg text-slate-300 font-light">
              Schedule a technical consultation with our advisory team to explore how this service aligns with your strategy.
            </p>
            <a
              href="/#contact"
              className="inline-block px-10 py-5 bg-gold text-navy font-bold uppercase tracking-widest text-xs rounded-sm hover:bg-white transition-all"
            >
              Start Your Strategy Call
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceDetailPage;
