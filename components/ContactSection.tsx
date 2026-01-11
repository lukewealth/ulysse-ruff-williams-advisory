
import React, { useState } from 'react';
import { Mail, Shield, CheckCircle, Send } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  };

  return (
    <section id="contact" className="py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="space-y-10">
          <div className="space-y-4">
            <p className="text-navy/40 text-[10px] uppercase tracking-[0.4em] font-bold">Inquiries</p>
            <h2 className="text-5xl font-display text-navy leading-[1.1]">
              Strategic Partnerships <br />
              & <span className="italic font-light">Institutional</span> <br />
              <span className="text-gold">Inquiries.</span>
            </h2>
          </div>

          <p className="text-slate-600 font-light leading-relaxed max-w-md">
            Connect regarding infrastructure, regulation, or capital deployment. We facilitate high-frequency compliance audits and institutional-grade node operation.
          </p>

          <div className="space-y-8 pt-4">
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-slate-50 flex items-center justify-center rounded-sm text-navy">
                <Shield className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-navy uppercase tracking-widest">Confidential Channel</p>
                <p className="text-xs text-slate-500 font-light">Encrypted 256-bit inquiry submission protocol.</p>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-slate-50 flex items-center justify-center rounded-sm text-navy">
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-navy uppercase tracking-widest">Direct Desk</p>
                <p className="text-xs text-slate-500 font-light">advisory@ulysse-william.web3</p>
              </div>
            </div>
          </div>

          <div className="p-8 bg-navy text-white rounded-sm space-y-4 shadow-2xl">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Compliance Standards</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 text-[10px] text-slate-400">
                <CheckCircle className="w-3 h-3 text-gold" />
                <span>SOC 2 Type II</span>
              </div>
              <div className="flex items-center space-x-2 text-[10px] text-slate-400">
                <CheckCircle className="w-3 h-3 text-gold" />
                <span>RegTech Compliant</span>
              </div>
              <div className="flex items-center space-x-2 text-[10px] text-slate-400">
                <CheckCircle className="w-3 h-3 text-gold" />
                <span>ISO 27001 Ready</span>
              </div>
              <div className="flex items-center space-x-2 text-[10px] text-slate-400">
                <CheckCircle className="w-3 h-3 text-gold" />
                <span>GDPR / CCPA Audit</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-slate-50 -z-10 translate-x-12 translate-y-12 rounded-sm" />
          
          <div className="bg-white p-10 md:p-14 shadow-2xl rounded-sm border border-slate-100 h-full">
            {formStatus === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-fade-in-up">
                <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-display text-navy">Inquiry Received</h3>
                <p className="text-slate-500 font-light max-w-xs mx-auto leading-relaxed">
                  Your strategy request has been logged. An analyst will review your requirements within 12 business hours.
                </p>
                <button 
                  onClick={() => {
                    console.log('📧 Resetting inquiry form');
                    setFormStatus('idle');
                  }}
                  className="text-xs font-bold uppercase tracking-widest text-gold hover:text-navy hover:shadow-md hover:shadow-gray-400/50 active:shadow-md active:shadow-gray-500/50 transition-all duration-200"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-1">
                  <h3 className="text-2xl font-display text-navy">Secure Inquiry Form</h3>
                  <p className="text-xs text-slate-400 font-light uppercase tracking-widest">Provide organization details for verification</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-navy uppercase tracking-widest">Full Name</label>
                    <input 
                      required 
                      type="text" 
                      className="w-full bg-slate-50 border-b border-slate-200 px-0 py-3 text-sm focus:border-gold outline-none transition-colors" 
                      placeholder="e.g. Alexander Vance"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-navy uppercase tracking-widest">Organization</label>
                    <input 
                      required 
                      type="text" 
                      className="w-full bg-slate-50 border-b border-slate-200 px-0 py-3 text-sm focus:border-gold outline-none transition-colors" 
                      placeholder="e.g. Apex Global Partners"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-navy uppercase tracking-widest">Corporate Email</label>
                    <input 
                      required 
                      type="email" 
                      className="w-full bg-slate-50 border-b border-slate-200 px-0 py-3 text-sm focus:border-gold outline-none transition-colors" 
                      placeholder="name@company.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-navy uppercase tracking-widest">Inquiry Type</label>
                    <select className="w-full bg-slate-50 border-b border-slate-200 px-0 py-3 text-sm focus:border-gold outline-none transition-colors appearance-none cursor-pointer">
                      <option>Infrastructure Advisory</option>
                      <option>Tokenization Strategy</option>
                      <option>Technical Due Diligence</option>
                      <option>Startup Scale Planning</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-navy uppercase tracking-widest">Project Scope / Message</label>
                  <textarea 
                    required 
                    rows={4} 
                    className="w-full bg-slate-50 border-b border-slate-200 px-0 py-3 text-sm focus:border-gold outline-none transition-colors resize-none" 
                    placeholder="Briefly describe your infrastructure needs..."
                  />
                </div>

                <button 
                  disabled={formStatus === 'submitting'}
                  className="w-full py-5 bg-navy text-white text-xs font-bold uppercase tracking-[0.3em] rounded-sm hover:bg-gold hover:text-navy hover:shadow-xl hover:shadow-gray-500/40 active:shadow-lg active:shadow-gray-600/50 transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50"
                >
                  {formStatus === 'submitting' ? (
                    <span className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Validating Channels...</span>
                    </span>
                  ) : (
                    <>
                      <span>Submit Secure Inquiry</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-[10px] text-center text-slate-400 font-light leading-relaxed">
                  By submitting this form, you acknowledge that all data is processed in accordance with our Global Privacy Policy. All communications are confidential and privileged.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
