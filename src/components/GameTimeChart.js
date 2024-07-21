import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const GameTimeChart = ({ chartData }) => {
  const [chartDisplayData, setChartDisplayData] = useState(null);
  
  useEffect(() => {
    if (chartData && chartData.allTimes && chartData.playerTime) {
      const { allTimes, playerTime } = chartData;
      
      // Find the max completion time
      const maxTime = Math.max(...allTimes, playerTime);
      
      // Create an array from 0 to maxTime
      const timeRange = Array.from({ length: maxTime + 1 }, (_, i) => i);
      
      // Count frequency of each completion time
      const timeFrequency = allTimes.reduce((acc, time) => {
        acc[time] = (acc[time] || 0) + 1;
        return acc;
      }, {});
      
      setChartDisplayData({
        labels: timeRange,
        datasets: [
          {
            label: 'All Players',
            data: timeRange.map(time => timeFrequency[time] || 0),
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            tension: 0.1,
            fill: false
          },
          {
            label: 'Your Time',
            data: timeRange.map(time => time === playerTime ? (timeFrequency[time] || 1) : null),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgb(255, 99, 132)',
            pointRadius: 8,
            pointHoverRadius: 12,
            showLine: false // Only show point, not line
          }
        ]
      });
    }
  }, [chartData]);

  const options = {
    scales: {
      x: {
        type: 'linear',
        title: {
          display: true,
          text: 'Completion Time (seconds)'
        },
        ticks: {
          stepSize: Math.ceil((chartDisplayData?.labels.length || 100) / 10)
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Players'
        },
        ticks: {
          stepSize: 1
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: (context) => `Time: ${context[0].label} seconds`,
          label: (context) => {
            if (context.dataset.label === 'Your Time') {
              return `Your Time: ${context.label} seconds`;
            }
            return `Number of Players: ${context.formattedValue}`;
          }
        }
      }
    },
    elements: {
      line: {
        tension: 0.3 // Adds a slight curve to the line
      }
    }
  };

  console.log(chartDisplayData?.datasets[0].data,chartDisplayData?.datasets[1].data )
  if (!chartDisplayData) return <div>Loading...</div>;

  return (
    <div>
      <h2>Game Completion Times Distribution</h2>
      <Line data={chartDisplayData} options={options} />
    </div>
  );
};

export default GameTimeChart;
