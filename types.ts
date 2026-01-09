
import React from 'react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
}

export interface InsightPost {
  id: string;
  title: string;
  category: 'Blockchain' | 'Investment' | 'Strategy';
  date: string;
  readTime: string;
  excerpt: string;
  imageUrl: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}