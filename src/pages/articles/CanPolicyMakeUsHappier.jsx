import React from 'react';
import ArticlePageTemplate from '@/components/articles/ArticlePageTemplate';
import { getArticleBySlug } from '@/lib/articles-data';

/**
 * Article page: Can Policy Make Us Happier?
 * Status: published — July 12, 2026
 */
export default function CanPolicyMakeUsHappier() {
  const article = getArticleBySlug('can-policy-make-us-happier');
  return <ArticlePageTemplate article={article} />;
}