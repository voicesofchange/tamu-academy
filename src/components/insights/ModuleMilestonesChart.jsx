import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const axisStyle = { fontSize: '0.72rem', fontFamily: "'DM Sans', sans-serif", fill: 'rgba(243,234,216,0.4)' };
const tooltipContentStyle = {
  backgroundColor: '#24150f',
  border: '1px solid rgba(232,184,91,0.3)',
  borderRadius: '4px',
  color: '#f8f0df',
  fontSize: '0.85rem',
  fontFamily: "'DM Sans', sans-serif",
};

export default function ModuleMilestonesChart({ data, labels }) {
  const chartData = data.map(d => {
    const courseShort = d.slug.includes('economics') ? 'Econ' : 'MH';
    const modNum = d.module.replace('module-', 'M');
    return { name: `${courseShort} ${modNum}`, completions: d.completions };
  });
  return (
    <ResponsiveContainer width="100%" height={Math.max(200, chartData.length * 36)}>
      <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(243,234,216,0.06)" horizontal={false} />
        <XAxis type="number" tick={axisStyle} axisLine={false} tickLine={false} allowDecimals={false} />
        <YAxis type="category" dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} width={70} />
        <Tooltip contentStyle={tooltipContentStyle} cursor={{ fill: 'rgba(232,184,91,0.05)' }} />
        <Bar dataKey="completions" name={labels.completions} fill="#e8b85b" radius={[0, 3, 3, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}