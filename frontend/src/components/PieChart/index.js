import React from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import * as S from './styles';

export default function PieChartComponent({ data }) {
  return (
    <S.ChartWrapper>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={40}
            outerRadius={80}
            paddingAngle={4}
            label
          >
            {data.map((entry, idx) => (
              <Cell key={idx} fill={S.COLORS[idx % S.COLORS.length]} />
            ))}
          </Pie>
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </S.ChartWrapper>
  );
}
