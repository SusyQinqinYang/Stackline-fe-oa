import React from 'react';
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  LineChart, 
  Line
} from 'recharts';

import { useSelector } from 'react-redux';
import { selectCurrProduct } from '../redux/productSlice';
import './chart.css';

export default function SalesChart(props) {
  const currentProduct = useSelector(selectCurrProduct);
  
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", 
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  const formatToMonth = (dateStr) => {
    const parts = dateStr.split("-");
    return months[parseInt(parts[1]) - 1];
  };

  return (
    <div className={`${props.className} sales-chart-wrapper`}>
      <p className="sales-chart-title">Retail Sales</p>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={currentProduct.sales}>
          <XAxis 
            dataKey="weekEnding"
            minTickGap={50}
            tickLine={false}
            tickFormatter={formatToMonth}
          />
          <YAxis hide domain={['dataMin-1000000', 'dataMax+1000000']}/>
          <Line type="monotone" dataKey="retailSales" strokeWidth={4} dot={false} stroke="#346eeb" />
          <Line type="monotone" dataKey="wholesaleSales" strokeWidth={4} dot={false} stroke="#565a63" />
        </LineChart>
      </ResponsiveContainer> 
    </div>  
  );
}
