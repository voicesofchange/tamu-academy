import React from 'react';
import ArticlePageTemplate from '@/components/articles/ArticlePageTemplate';
import { getArticleBySlug } from '@/lib/articles-data';

/**
 * Article page: After the Guns Go Silent (Lesson 6)
 * Status: published — July 14, 2026
 */
export default function AfterTheGunsGoSilent() {
  const article = getArticleBySlug('after-the-guns-go-silent');
  return <ArticlePageTemplate article={article} />;
}