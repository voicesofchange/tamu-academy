import React from 'react';
import ArticlePageTemplate from '@/components/articles/ArticlePageTemplate';
import { getArticleBySlug } from '@/lib/articles-data';

/**
 * Article page: Who Controls the Global Economy?
 * Status: published — July 12, 2026
 */
export default function WhoControlsTheGlobalEconomy() {
  const article = getArticleBySlug('who-controls-the-global-economy');
  return <ArticlePageTemplate article={article} />;
}