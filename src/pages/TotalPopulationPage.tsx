import ReactECharts from 'echarts-for-react';
import { allTotalPopulation } from '../data/populationData';
import { useEffect, useState } from 'react';

export default function TotalPopulationPage() {
  const [displayData, setDisplayData] = useState({
    years: [allTotalPopulation[0].year],
    populations: [allTotalPopulation[0].population],
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < allTotalPopulation.length - 1) {
        const newIndex = currentIndex + 1;
        setCurrentIndex(newIndex);
        setDisplayData({
          years: allTotalPopulation.slice(0, newIndex + 1).map(d => d.year),
          populations: allTotalPopulation.slice(0, newIndex + 1).map(d => d.population),
        });
      }
    }, 40);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const option = {
    title: {
      text: '中国总人口变化 (1949-2100)',
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
        const population = params[0].value;
        const isHistorical = parseInt(year) <= 2024;
        return `年份: ${year}<br/>总人口: ${population}亿人<br/>${isHistorical ? '(历史数据)' : '(预测数据)'}`;
      },
    },
    visualMap: {
      show: false,
      pieces: [
        { gt: 2024, lte: 2100, color: '#91cc75' },
        { lte: 2024, color: '#5470c6' },
      ],
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
        interval: 15,
        rotate: 45,
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
        },
      },
    },
    yAxis: {
      type: 'value',
      name: '人口（亿人）',
      min: 5,
      max: 15,
    },
    series: [
      {
        name: '总人口',
        type: 'line',
        data: displayData.populations,
        smooth: true,
        lineStyle: {
          width: 4,
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(84, 112, 198, 0.5)' },
              { offset: 1, color: 'rgba(84, 112, 198, 0.1)' },
            ],
          },
        },
        markPoint: {
          data: [
            {
              type: 'max',
              name: '最大值',
              itemStyle: { color: '#ee6666' },
              label: {
                formatter: (params: any) => `${params.value}亿`,
              },
            },
          ],
        },
        markLine: {
          data: [
            {
              xAxis: 2024,
              name: '历史/预测分界线',
              lineStyle: {
                color: '#999',
                type: 'solid',
                width: 2,
              },
              label: {
                formatter: '2024年分界',
              },
            },
          ],
        },
      },
    ],
    animation: true,
    animationDuration: 50,
    animationEasing: 'linear',
  };

  const peakPopulation = Math.max(...allTotalPopulation.map(d => d.population));
  const peakYear = allTotalPopulation.find(d => d.population === peakPopulation)?.year;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
          中国总人口变化趋势 (1949-2100)
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
            数据来源：国家统计局(1949-2024)、联合国世界人口展望(2025-2100)
          </p>
          <p className="text-sm mt-2">
            当前显示年份: {displayData.years[displayData.years.length - 1]}
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800 font-semibold">人口峰值</p>
              <p className="text-blue-600">{peakPopulation}亿人 ({peakYear}年)</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-green-800 font-semibold">1949年人口</p>
              <p className="text-green-600">5.42亿人</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <p className="text-orange-800 font-semibold">2100年预测</p>
              <p className="text-orange-600">约5.97亿人</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}