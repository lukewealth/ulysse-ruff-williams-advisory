
import React from 'react';
import { 
  ShieldCheck, 
  Coins, 
  BarChart4, 
  Database, 
  Zap, 
  Scale, 
  Globe, 
  FileText 
} from 'lucide-react';
import { Service, InsightPost, TimelineEvent } from './types';

export const SERVICES: Service[] = [
  {
    id: 'advisory',
    title: 'Blockchain Advisory',
    description: 'Technical due diligence and infrastructure assessment for institutional grade deployments.',
    icon: <ShieldCheck className="w-6 h-6" />,
    details: [
      'PoW / PoS systems validation',
      'Infrastructure risk assessment',
      'Governance framework design',
      'Protocol selection & strategy'
    ]
  },
  {
    id: 'tokenization',
    title: 'Tokenization Strategy',
    description: 'Bridging the gap between physical assets and digital liquidity through RWA frameworks.',
    icon: <Coins className="w-6 h-6" />,
    details: [
      'Real World Asset (RWA) modeling',
      'Token economy design',
      'Regulatory-aware architectures',
      'Lifecycle management systems'
    ]
  },
  {
    id: 'scaling',
    title: 'Startup Capital Readiness',
    description: 'Preparing high-growth Web3 ventures for institutional investment and global scale.',
    icon: <BarChart4 className="w-6 h-6" />,
    details: [
      'Technical roadmap audit',
      'Pitch deck & strategy alignment',
      'Investor due diligence prep',
      'Operational scaling roadmaps'
    ]
  },
  {
    id: 'consulting',
    title: 'Web3 Infrastructure',
    description: 'Designing resilient, scalable systems that power the next generation of finance.',
    icon: <Database className="w-6 h-6" />,
    details: [
      'API-driven fintech integration',
      'Validator node operations',
      'Smart contract systems audit',
      'Network performance optimization'
    ]
  }
];

export const INSIGHTS: InsightPost[] = [
  {
    id: '1',
    title: 'The Future of Institutional RWA Tokenization',
    category: 'Investment',
    date: 'Oct 24, 2024',
    readTime: '8 min read',
    excerpt: 'An in-depth analysis of how mining operations are stabilizing the ERCOT grid while adhering to new SEC guidelines.',
    imageUrl: 'https://picsum.photos/seed/blockchain/800/600'
  },
  {
    id: '2',
    title: 'Regulatory Updates: Energy Compliance for Web3',
    category: 'Strategy',
    date: 'Oct 15, 2024',
    readTime: '6 min read',
    excerpt: 'Navigating the intersection of grid stability and proof-of-work in a rapidly evolving legislative landscape.',
    imageUrl: 'https://picsum.photos/seed/finance/800/600'
  },
  {
    id: '3',
    title: 'Optimizing Validator Node Performance',
    category: 'Blockchain',
    date: 'Sep 28, 2024',
    readTime: '12 min read',
    excerpt: 'How VCs are valuing real-world asset tokenization protocols in the current market cycle.',
    imageUrl: 'https://picsum.photos/seed/tech/800/600'
  }
];

export const TIMELINE: TimelineEvent[] = [
  {
    year: '2018',
    title: 'Mining Ecosystem Entry',
    description: 'Early involvement in ASIC hardware procurement and logistics. Navigated early regulatory gray zones.'
  },
  {
    year: '2020',
    title: 'Energy Partnership Formation',
    description: 'Facilitated JV agreements between stranded energy assets and Bitcoin mining operators in Texas.'
  },
  {
    year: '2022',
    title: 'Institutional Advisory Launch',
    description: 'Established specialized practice for VCs entering the digital asset space. Advised on SAFT structures.'
  },
  {
    year: 'Current',
    title: 'Lead Infrastructure Strategist',
    description: 'Consulting for Tier 1 blockchain projects on global infrastructure and scaling strategy.'
  }
];
