import React from 'react';
import ArticlePageTemplate from '@/components/articles/ArticlePageTemplate';
import { getArticleBySlug } from '@/lib/articles-data';

/**
 * Article page: Who Controls the Global Economy?
 * Status: in-development — no article body content is displayed until
 * substantive editorial copy is supplied and approved.
 */
export default function WhoControlsTheGlobalEconomy() {
  const article = getArticleBySlug('who-controls-the-global-economy');
  return <ArticlePageTemplate article={article} />;
}