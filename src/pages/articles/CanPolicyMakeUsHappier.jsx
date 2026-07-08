import React from 'react';
import ArticlePageTemplate from '@/components/articles/ArticlePageTemplate';
import { getArticleBySlug } from '@/lib/articles-data';

/**
 * Article page: Can Policy Make Us Happier?
 * Status: in-development — no article body content is displayed until
 * substantive editorial copy is supplied and approved.
 */
export default function CanPolicyMakeUsHappier() {
  const article = getArticleBySlug('can-policy-make-us-happier');
  return <ArticlePageTemplate article={article} />;
}