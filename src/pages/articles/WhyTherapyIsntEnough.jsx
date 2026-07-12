import React from 'react';
import ArticlePageTemplate from '@/components/articles/ArticlePageTemplate';
import { getArticleBySlug } from '@/lib/articles-data';

/**
 * Article page: Why Therapy Isn't Enough
 * Status: published — July 12, 2026
 */
export default function WhyTherapyIsntEnough() {
  const article = getArticleBySlug('why-therapy-isnt-enough');
  return <ArticlePageTemplate article={article} />;
}