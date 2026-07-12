import React from 'react';
import ArticlePageTemplate from '@/components/articles/ArticlePageTemplate';
import { getArticleBySlug } from '@/lib/articles-data';

/**
 * Article page: The Real Cost of Always Achieving
 * Status: published — July 12, 2026
 */
export default function TheRealCostOfAlwaysAchieving() {
  const article = getArticleBySlug('the-real-cost-of-always-achieving');
  return <ArticlePageTemplate article={article} />;
}