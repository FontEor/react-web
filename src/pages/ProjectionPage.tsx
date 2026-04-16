import ReactECharts from 'echarts-for-react';
import { projectedData } from '../data/populationData';
import { useEffect, useState } from 'react';

export default function ProjectionPage() {
  const [displayData, setDisplayData] = useState({
    years: [2025],
    births: [projectedData[0].birth],
    deaths: [projectedData[0].death],
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < projectedData.length - 1) {
        const newIndex = currentIndex + 1;
        setCurrentIndex(newIndex);
        setDisplayData({
          years: projectedData.slice(0, newIndex + 1).map(d => d.year),
          births: projectedData.slice(0, newIndex + 1).map(d => d.birth),
          deaths: projectedData.slice(0, newIndex + 1).map(d => d.death),
        });
      }
    }, 80);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const option = {
    title: {
      text: '中国出生与死亡人口预测对比 (2025-2100)',
      left: 'center',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
      },
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        const year = params[0].axisValue;
        const birth = params[0].value;
        const death = params[1]?.value || 0;
        return `年份: ${year}<br/>出生人口预测: ${birth}万人<br/>死亡人口预测: ${death}万人`;
      },
    },
    legend: {
      data: ['出生人口预测', '死亡人口预测'],
      top: 40,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: displayData.years,
      axisLabel: {
        interval: 10,
        rotate: 45,
      },
    },
    yAxis: {
      type: 'value',
      name: '人口（万人）',
      min: 0,
      max: 2000,
    },
    series: [
      {
        name: '出生人口预测',
        type: 'line',
        data: displayData.births,
        smooth: true,
        itemStyle: {
          color: '#73c0de',
        },
        lineStyle: {
          width: 3,
        },
        areaStyle: {
          color: 'rgba(115, 192, 222, 0.3)',
        },
      },
      {
        name: '死亡人口预测',
        type: 'line',
        data: displayData.deaths,
        smooth: true,
        itemStyle: {
          color: '#fc8452',
        },
        lineStyle: {
          width: 3,
        },
        areaStyle: {
          color: 'rgba(252, 132, 82, 0.3)',
        },
      },
    ],
    animation: true,
    animationDuration: 100,
    animationEasing: 'linear',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
          中国出生与死亡人口预测对比 (2025-2100)
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
          <ReactECharts
            option={option}
            style={{ height: '500px', width: '100%' }}
            opts={{ renderer: 'svg' }}
          />
        </div>
        <div className="mt-4 text-center text-gray-600">
          <p className="text-sm md:text-base">
            数据来源：联合国世界人口展望(中方案)。图表动态展示未来人口预测趋势。
          </p>
          <p className="text-sm mt-2">
            当前显示年份: {displayData.years[displayData.years.length - 1]}
          </p>
          <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-800">
              注：预测数据基于联合国人口司的中方案预测，实际人口变化可能因政策调整、经济发展等因素而有所不同。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}