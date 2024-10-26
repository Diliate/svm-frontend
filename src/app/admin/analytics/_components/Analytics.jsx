"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "January", Desktop: 4000, Mobile: 2400, Tablet: 2400 },
  { name: "February", Desktop: 3000, Mobile: 1398, Tablet: 2210 },
  { name: "March", Desktop: 2000, Mobile: 9800, Tablet: 2290 },
  { name: "April", Desktop: 2780, Mobile: 3908, Tablet: 2000 },
  { name: "May", Desktop: 1890, Mobile: 4800, Tablet: 2181 },
  { name: "June", Desktop: 2390, Mobile: 3800, Tablet: 2500 },
];

const AnalyticsGraph = () => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data} margin={{ top: 12, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="Desktop"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="Mobile" stroke="#82ca9d" />
      <Line type="monotone" dataKey="Tablet" stroke="#ffc658" />
    </LineChart>
  </ResponsiveContainer>
);

export default AnalyticsGraph;
