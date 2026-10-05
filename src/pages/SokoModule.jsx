import React from 'react';
import { useParams } from 'react-router-dom';
import SokoModuleRoute from '@/components/courses/soko/SokoModuleRoute';

/**
 * SokoModule — the core-course module page, resolved from the route
 * parameter. Unknown routes fall through to the not-found page inside
 * SokoModuleRoute.
 */
export default function SokoModule() {
  const { moduleRoute } = useParams();
  return <SokoModuleRoute moduleRoute={moduleRoute} />;
}