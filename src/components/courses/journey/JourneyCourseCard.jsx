import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function JourneyCourseCard({ number, course, status, exploreLabel, index = 0 }) {
  const coursePath = course.slug ? `/courses/${course.slug}` : null;
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.1 }}
      className="tamu-course-card"
      style={{
        position: 'relative',
        padding: '28px',
        background: 'rgba(255,255,255,0.48)',
        border: '1px solid #dac7ab',
        borderRadius: '4px',
        minHeight: '245px',
      }}
    >
      <span className="font-body" style={{ color: '#b97827', fontSize: '12px', letterSpacing: '0.15em' }}>{number}</span>
      <span className="font-body" style={{ position: 'absolute', right: '24px', top: '25px', color: '#9b5d1d', border: '1px solid #d7b57c', borderRadius: '20px', padding: '6px 10px', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        {status}
      </span>
      <h3 className="font-heading" style={{ fontWeight: 400, fontSize: '27px', lineHeight: 1.15, margin: '22px 0 13px', color: '#39251b' }}>
        {course.title}
      </h3>
      <p className="font-body" style={{ fontSize: '14px', lineHeight: 1.7, color: '#796552', margin: 0, maxWidth: '560px' }}>
        {course.description}
      </p>
      {coursePath && (
        <Link to={coursePath} className="font-body" style={{ display: 'inline-flex', alignItems: 'center', marginTop: '18px', color: '#9b5d1d', fontSize: '11px', letterSpacing: '0.13em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, borderBottom: '1px solid #c18a36', paddingBottom: '2px', transition: 'color 0.25s ease' }}>
          {exploreLabel} →
        </Link>
      )}
    </motion.article>
  );
}