import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function HomeFounder() {
  return (
    <section
      style={{
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 6vw, 6rem)',
        maxWidth: '1100px',
        margin: '0 auto',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{ maxWidth: '700px' }}
      >
        <p className="font-body" style={{ color: '#D4A12A', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '1rem' }}>
          Founder
        </p>

        <h2 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 400, lineHeight: 1.2, margin: '0 0 1.5rem' }}>
          Founded by Tex Wambui
        </h2>

        <p className="font-body" style={{ color: 'rgba(245,239,224,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300, marginBottom: '1.75rem' }}>
          Tex Wambui is a public policy professional, writer, youth mentor, nonprofit leader, and educator whose work connects public policy, youth development, environmental action, storytelling, and international learning. His experiences across Kenya and the United States informed the creation of Tamu Academy as a space where young people can engage seriously with the issues shaping their communities and the wider world.
        </p>

        <Link
          to="/about"
          className="font-body"
          style={{ color: '#D4A12A', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500 }}
        >
          Learn More About Tamu Academy →
        </Link>
      </motion.div>
    </section>
  );
}