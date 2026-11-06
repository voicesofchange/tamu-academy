import { MENTAL_HEALTH_COURSE } from '../../src/lib/mental-health-tracks.js';

export default async function () {
  return Response.json({ title: MENTAL_HEALTH_COURSE.title });
}