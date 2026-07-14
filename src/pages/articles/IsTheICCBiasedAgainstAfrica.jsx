import React from 'react';
import ArticlePageTemplate from '@/components/articles/ArticlePageTemplate';
import { getArticleBySlug } from '@/lib/articles-data';

/**
 * Article page: Is the ICC Biased Against Africa? (Lesson 5)
 * Status: published — July 14, 2026
 */
export default function IsTheICCBiasedAgainstAfrica() {
  const article = getArticleBySlug('is-the-icc-biased-against-africa');
  return <ArticlePageTemplate article={article} />;
}