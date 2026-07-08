import React from 'react';
import ArticlePageTemplate from '@/components/articles/ArticlePageTemplate';
import { getArticleBySlug } from '@/lib/articles-data';

/**
 * Article page: The Real Cost of Always Achieving
 * Status: in-development — no article body content is displayed until
 * substantive editorial copy is supplied and approved.
 */
export default function TheRealCostOfAlwaysAchieving() {
  const article = getArticleBySlug('the-real-cost-of-always-achieving');
  return <ArticlePageTemplate article={article} />;
}