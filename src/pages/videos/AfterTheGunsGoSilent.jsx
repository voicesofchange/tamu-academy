import React from 'react';
import VideoLessonPageTemplate from '@/components/videos/VideoLessonPageTemplate';
import { getLessonBySlug } from '@/lib/lessons-data';

/**
 * Video page: After the Guns Go Silent (Lesson 6)
 */
export default function VideoAfterTheGunsGoSilent() {
  const lesson = getLessonBySlug('after-the-guns-go-silent');
  return <VideoLessonPageTemplate lesson={lesson} />;
}