import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';

const axisStyle = { fontSize: '0.72rem', fontFamily: "'DM Sans', sans-serif", fill: 'rgba(245,239,224,0.4)' };
const tooltipContentStyle = {
  backgroundColor: '#1A130E',
  border: '1px solid rgba(212,161,42,0.3)',
  borderRadius: '4px',
  color: '#F5EFE0',
  fontSize: '0.85rem',
  fontFamily: "'DM Sans', sans-serif",
};
const legendStyle = { fontSize: '0.75rem', fontFamily: "'DM Sans', sans-serif", color: 'rgba(245,239,224,0.6)' };

export default function CourseBreakdownChart({ data, labels }) {
  const chartData = data.map(d => ({
    name: labels.courses[d.slug] || d.slug,
    [labels.enrollments]: d.enrollments,
    [labels.completions]: d.completions,
    [labels.certificates]: d.certificates,
  }));
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(245,239,224,0.06)" horizontal={false} />
        <XAxis type="number" tick={axisStyle} axisLine={false} tickLine={false} allowDecimals={false} />
        <YAxis type="category" dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} width={140} />
        <Tooltip contentStyle={tooltipContentStyle} cursor={{ fill: 'rgba(212,161,42,0.05)' }} />
        <Legend wrapperStyle={legendStyle} />
        <Bar dataKey={labels.enrollments} fill="#D4A12A" radius={[0, 3, 3, 0]} />
        <Bar dataKey={labels.completions} fill="#E8951C" radius={[0, 3, 3, 0]} />
        <Bar dataKey={labels.certificates} fill="rgba(212,161,42,0.35)" radius={[0, 3, 3, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}