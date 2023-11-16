import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    subject: 'Monday',
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: 'Tuesday',
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'Wednesdey',
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'Thursday',
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    subject: 'Friday',
    A: 150,
    B: 90,
    fullMark: 150,
  },
  {
    subject: 'Saturday',
    A: 65,
    B: 85,
    fullMark: 150,
  },
];

const Example = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis />
        <Radar name="Mike" dataKey="A" stroke="black" fill="gold" fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
  );
};

// Example.demoUrl = 'https://codesandbox.io/s/simple-radar-chart-rjoc6';

export default Example;
