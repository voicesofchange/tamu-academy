import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const axisStyle = { fontSize: '0.72rem', fontFamily: "'DM Sans', sans-serif", fill: 'rgba(243,234,216,0.4)' };
const tooltipContentStyle = {
  backgroundColor: '#24150f',
  border: '1px solid rgba(232,184,91,0.3)',
  borderRadius: '4px',
  color: '#f8f0df',
  fontSize: '0.85rem',
  fontFamily: "'DM Sans', sans-serif",
};

export default function EnrollmentTrendChart({ data, labels }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="enrollGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#e8b85b" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#e8b85b" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="compGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#E8951C" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#E8951C" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(243,234,216,0.06)" />
        <XAxis dataKey="month" tick={axisStyle} axisLine={{ stroke: 'rgba(243,234,216,0.1)' }} tickLine={false} />
        <YAxis tick={axisStyle} axisLine={false} tickLine={false} allowDecimals={false} />
        <Tooltip contentStyle={tooltipContentStyle} cursor={{ stroke: 'rgba(232,184,91,0.2)' }} />
        <Area type="monotone" dataKey="enrollments" name={labels.enrollments} stroke="#e8b85b" strokeWidth={2} fill="url(#enrollGrad)" />
        <Area type="monotone" dataKey="completions" name={labels.completions} stroke="#E8951C" strokeWidth={2} fill="url(#compGrad)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}