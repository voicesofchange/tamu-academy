import React from 'react';
import ArticlePageTemplate from '@/components/articles/ArticlePageTemplate';
import { getArticleBySlug } from '@/lib/articles-data';

/**
 * Article page: Climate Is a Mental Health Crisis (Lesson 7)
 * Status: published — July 14, 2026
 */
export default function ClimateIsAMentalHealthCrisis() {
  const article = getArticleBySlug('climate-is-a-mental-health-crisis');
  return <ArticlePageTemplate article={article} />;
}