import React from 'react';
import VideoLessonPageTemplate from '@/components/videos/VideoLessonPageTemplate';
import { getLessonBySlug } from '@/lib/lessons-data';

/**
 * Video page: Climate Is a Mental Health Crisis (Lesson 7)
 */
export default function VideoClimateIsAMentalHealthCrisis() {
  const lesson = getLessonBySlug('climate-is-a-mental-health-crisis');
  return <VideoLessonPageTemplate lesson={lesson} />;
}