import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import {getMetrics} from '../../../app/services/analytics.service.js';



const metrics = getMetrics();



const MetricsComponent = ({ }) => {
  // Format the data
  const formattedData = Object.keys(metrics.blogSource).map(source => ({
    source,
    count: metrics.uniqueVisit[source] || 0
  }));

  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && formattedData.length > 0) {
      const ctx = chartRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: formattedData.map(entry => entry.source),
          datasets: [{
            label: 'Unique Visits',
            data: formattedData.map(entry => entry.count),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }, [formattedData]);

  return (
    <div>
      <h2>Unique Visits from Blog Sources</h2>
      <canvas ref={chartRef} width="400" height="400"></canvas>
    </div>
  );
};

export default MetricsComponent;
