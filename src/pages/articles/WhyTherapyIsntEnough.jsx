import React from 'react';
import ArticlePageTemplate from '@/components/articles/ArticlePageTemplate';
import { getArticleBySlug } from '@/lib/articles-data';

/**
 * Article page: Why Therapy Isn't Enough
 * Status: in-development — no article body content is displayed until
 * substantive editorial copy is supplied and approved.
 */
export default function WhyTherapyIsntEnough() {
  const article = getArticleBySlug('why-therapy-isnt-enough');
  return <ArticlePageTemplate article={article} />;
}