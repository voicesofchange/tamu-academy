import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const axisStyle = { fontSize: '0.72rem', fontFamily: "'DM Sans', sans-serif", fill: 'rgba(245,239,224,0.4)' };
const tooltipContentStyle = {
  backgroundColor: '#1A130E',
  border: '1px solid rgba(212,161,42,0.3)',
  borderRadius: '4px',
  color: '#F5EFE0',
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
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(245,239,224,0.06)" horizontal={false} />
        <XAxis type="number" tick={axisStyle} axisLine={false} tickLine={false} allowDecimals={false} />
        <YAxis type="category" dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} width={70} />
        <Tooltip contentStyle={tooltipContentStyle} cursor={{ fill: 'rgba(212,161,42,0.05)' }} />
        <Bar dataKey="completions" name={labels.completions} fill="#D4A12A" radius={[0, 3, 3, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}