import React, { useState, useEffect } from 'react';
import { Users, Linkedin, Mail } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { fetchTeamMembers } from '../services/api';

interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
  expertise: string[];
  social?: {
    linkedin?: string;
    email?: string;
  };
}

const TeamPage: React.FC = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeam = async () => {
      try {
        const response = await fetchTeamMembers();
        setTeam(response.data);
      } catch (error) {
        console.error('Error loading team:', error);
        // Fallback to mock data
        setTeam(mockTeam);
      } finally {
        setLoading(false);
      }
    };

    loadTeam();
  }, []);

  const mockTeam: TeamMember[] = [
    {
      id: '1',
      name: 'Ulysse Ruff Williams',
      title: 'Principal Advisor',
      bio: 'Blockchain infrastructure specialist with 10+ years experience in PoW/PoS systems, RWA tokenization, and institutional capital deployment.',
      imageUrl: '/images/ulysse-ruff-williams.png',
      expertise: [
        'Blockchain Infrastructure',
        'Mining Operations',
        'RWA Tokenization',
        'Regulatory Strategy',
        'Capital Deployment',
      ],
      social: {
        linkedin: '#',
        email: 'ulysse@example.com',
      },
    },
    {
      id: '2',
      name: 'Technical Advisor',
      title: 'Infrastructure Lead',
      bio: 'Expert in consensus mechanisms, validator optimization, and smart contract architecture. Former lead engineer at major blockchain infrastructure company.',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1976&auto=format&fit=crop',
      expertise: [
        'Smart Contracts',
        'Validator Optimization',
        'Protocol Design',
        'Performance Engineering',
        'Security Audit',
      ],
      social: {
        linkedin: '#',
        email: 'tech@example.com',
      },
    },
    {
      id: '3',
      name: 'Compliance Officer',
      title: 'Regulatory Advisor',
      bio: 'Specialized in blockchain regulatory frameworks across jurisdictions. Previously worked with major financial institutions on digital asset compliance.',
      imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1976&auto=format&fit=crop',
      expertise: [
        'Regulatory Compliance',
        'Legal Framework',
        'Risk Management',
        'Due Diligence',
        'Policy Advocacy',
      ],
      social: {
        linkedin: '#',
        email: 'compliance@example.com',
      },
    },
    {
      id: '4',
      name: 'Strategy Consultant',
      title: 'Investment Advisor',
      bio: 'Capital deployment strategist with experience in venture, institutional, and hedge fund investment in blockchain infrastructure.',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1976&auto=format&fit=crop',
      expertise: [
        'Capital Strategy',
        'Investment Analysis',
        'Business Development',
        'Market Analysis',
        'Fund Management',
      ],
      social: {
        linkedin: '#',
        email: 'strategy@example.com',
      },
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
                <Users className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Our Team</span>
              </div>

              <h1 className="text-6xl md:text-7xl font-display text-navy leading-tight">
                Expert Advisory<br />
                <span className="text-gold italic font-light">Team</span>
              </h1>

              <p className="text-xl text-slate-600 font-light leading-relaxed max-w-xl">
                Institutional-grade expertise across blockchain infrastructure, compliance, capital strategy, and technical architecture.
              </p>
            </div>
          </div>
        </section>

        {/* Team Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            {loading ? (
              <div className="text-center py-20">
                <div className="w-12 h-12 border-4 border-navy border-t-gold rounded-full animate-spin mx-auto"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {(team.length > 0 ? team : mockTeam).map((member) => (
                  <div key={member.id} className="group">
                    {/* Image */}
                    <div className="relative overflow-hidden rounded-sm mb-8 aspect-[4/5]">
                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = member.name === 'Ulysse Ruff Williams' 
                            ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop'
                            : 'https://via.placeholder.com/400x500?text=' + member.name.split(' ')[0];
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold mb-2">
                          {member.title}
                        </p>
                        <h3 className="text-3xl font-display text-navy group-hover:text-gold transition-colors">
                          {member.name}
                        </h3>
                      </div>

                      <p className="text-slate-600 font-light leading-relaxed">
                        {member.bio}
                      </p>

                      <div className="space-y-3">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                          Areas of Expertise
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {member.expertise.map((skill) => (
                            <span
                              key={skill}
                              className="text-[10px] px-3 py-1.5 bg-navy/5 text-navy rounded-sm border border-navy/10"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {member.social && (
                        <div className="flex items-center space-x-4 pt-6 border-t border-slate-100">
                          {member.social.linkedin && (
                            <a
                              href={member.social.linkedin}
                              className="text-slate-400 hover:text-gold transition-colors"
                              aria-label="LinkedIn"
                            >
                              <Linkedin className="w-5 h-5" />
                            </a>
                          )}
                          {member.social.email && (
                            <a
                              href={`mailto:${member.social.email}`}
                              className="text-slate-400 hover:text-gold transition-colors"
                              aria-label="Email"
                            >
                              <Mail className="w-5 h-5" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-navy text-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <h2 className="text-4xl font-display mb-16">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <h3 className="text-2xl font-display text-gold">Systems-First</h3>
                <p className="text-slate-300 font-light leading-relaxed">
                  We prioritize long-term scalability and institutional-grade infrastructure over market hype and short-term trends.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-display text-gold">Execution-Focused</h3>
                <p className="text-slate-300 font-light leading-relaxed">
                  Strategic planning without implementation is incomplete. We deliver actionable roadmaps with measurable outcomes.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-display text-gold">Risk-Aware</h3>
                <p className="text-slate-300 font-light leading-relaxed">
                  Innovation requires calculated risk management. We ensure compliance and security are competitive advantages.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-slate-50 to-white">
          <div className="max-w-3xl mx-auto px-6 md:px-12 text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-display text-navy leading-tight">
              Connect With Our <span className="text-gold">Advisory Team</span>
            </h2>
            <p className="text-lg text-slate-600 font-light">
              Schedule a consultation to discuss your infrastructure strategy and needs.
            </p>
            <a
              href="/#contact"
              className="inline-block px-10 py-5 bg-navy text-white font-bold uppercase tracking-widest text-xs rounded-sm hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              Request Consultation
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TeamPage;
