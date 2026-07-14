import React from 'react';
import VideoLessonPageTemplate from '@/components/videos/VideoLessonPageTemplate';
import { getLessonBySlug } from '@/lib/lessons-data';

/**
 * Video page: Is the ICC Biased Against Africa? (Lesson 5)
 */
export default function VideoIsTheICCBiasedAgainstAfrica() {
  const lesson = getLessonBySlug('is-the-icc-biased-against-africa');
  return <VideoLessonPageTemplate lesson={lesson} />;
}