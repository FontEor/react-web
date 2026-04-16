import ReactECharts from "echarts-for-react";
import { useEffect, useState, useRef } from "react";

interface DataPoint {
  year: number;
  value1: number;
  value2?: number;
}

interface LineChartProps {
  title: string;
  data: DataPoint[];
  seriesNames: [string, string?];
  yAxisName: string;
  yAxisMax: number;
  colors: [string, string?];
  gradientColors?: [string, string?];
  animationSpeed?: number;
  showEndLabels?: boolean;
  unit?: string;
}

export default function LineChart({
  title,
  data,
  seriesNames,
  yAxisName,
  yAxisMax,
  colors,
  gradientColors,
  animationSpeed = 300,
  showEndLabels = true,
  unit = "",
}: LineChartProps) {
  const [displayData, setDisplayData] = useState({
    years: [data[0].year],
    values1: [data[0].value1],
    values2: data[0].value2 !== undefined ? [data[0].value2] : [],
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const chartRef = useRef<any>(null);

  // 显示tooltip的函数
  const showTooltip = (index: number) => {
    const chartInstance = chartRef.current?.getEchartsInstance();
    if (chartInstance) {
      chartInstance.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: index,
      });
    }
  };

  // 隐藏tooltip的函数
  const hideTooltip = () => {
    const chartInstance = chartRef.current?.getEchartsInstance();
    if (chartInstance) {
      chartInstance.dispatchAction({
        type: "hideTip",
      });
    }
  };

  useEffect(() => {
    if (isPaused || currentIndex >= data.length - 1) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = window.setInterval(() => {
      if (currentIndex < data.length - 1) {
        const newIndex = currentIndex + 1;
        setCurrentIndex(newIndex);
        setDisplayData({
          years: data.slice(0, newIndex + 1).map((d) => d.year),
          values1: data.slice(0, newIndex + 1).map((d) => d.value1),
          values2:
            data[0].value2 !== undefined
              ? data.slice(0, newIndex + 1).map((d) => d.value2!)
              : [],
        });
        // 显示tooltip在最新的数据点
        setTimeout(() => showTooltip(newIndex), 50);
      }
    }, animationSpeed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex, data, animationSpeed, isPaused]);

  // 当暂停时显示tooltip在当前位置
  useEffect(() => {
    if (isPaused) {
      showTooltip(currentIndex);
    }
  }, [isPaused, currentIndex]);

  const handleTogglePause = () => {
    if (!isPaused) {
      // 暂停时保持tooltip显示
      showTooltip(currentIndex);
    }
    setIsPaused(!isPaused);
  };

  const handleRestart = () => {
    hideTooltip();
    setCurrentIndex(0);
    setDisplayData({
      years: [data[0].year],
      values1: [data[0].value1],
      values2: data[0].value2 !== undefined ? [data[0].value2] : [],
    });
    setIsPaused(false);
    setTimeout(() => showTooltip(0), 100);
  };

  const currentYear = displayData.years[displayData.years.length - 1];
  const currentValue1 = displayData.values1[displayData.values1.length - 1];
  const currentValue2 =
    displayData.values2.length > 0
      ? displayData.values2[displayData.values2.length - 1]
      : undefined;

  const isComplete = currentIndex >= data.length - 1;

  const series: any[] = [
    {
      name: seriesNames[0],
      type: "line",
      data: displayData.values1,
      smooth: true,
      itemStyle: {
        color: colors[0],
      },
      lineStyle: {
        width: 3,
      },
      areaStyle: {
        color: gradientColors?.[0] || `rgba(${colors[0]}, 0.3)`,
      },
      emphasis: {
        focus: "series",
      },
      endLabel: showEndLabels
        ? {
            show: true,
            formatter: "{c}",
            fontSize: 14,
            fontWeight: "bold",
            color: colors[0],
          }
        : undefined,
    },
  ];

  if (seriesNames[1] && colors[1] && displayData.values2.length > 0) {
    series.push({
      name: seriesNames[1],
      type: "line",
      data: displayData.values2,
      smooth: true,
      itemStyle: {
        color: colors[1],
      },
      lineStyle: {
        width: 3,
      },
      areaStyle: {
        color: gradientColors?.[1] || `rgba(${colors[1]}, 0.3)`,
      },
      emphasis: {
        focus: "series",
      },
      endLabel: showEndLabels
        ? {
            show: true,
            formatter: "{c}",
            fontSize: 14,
            fontWeight: "bold",
            color: colors[1],
          }
        : undefined,
    });
  }

  const option = {
    title: {
      text: title,
      left: "center",
      textStyle: {
        fontSize: 18,
        fontWeight: "bold",
      },
    },
    tooltip: {
      trigger: "axis",
      confine: true,
      backgroundColor: "rgba(50, 50, 50, 0.9)",
      borderColor: "#333",
      borderWidth: 1,
      padding: [10, 15],
      textStyle: {
        color: "#fff",
        fontSize: 14,
      },
      formatter: (params: any[]) => {
        const year = params[0].axisValue;
        let result = `<div style="font-weight:bold;font-size:16px;margin-bottom:5px;">${year}年</div>`;
        params.forEach((param) => {
          result += `<div style="margin:3px 0;"><span style="color:${param.color}">●</span> ${param.seriesName}: <span style="font-weight:bold">${param.value}</span>${unit}</div>`;
        });
        return result;
      },
    },
    legend: {
      data: seriesNames.filter(Boolean),
      top: 40,
    },
    grid: {
      left: "3%",
      right: "6%",
      bottom: "12%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: displayData.years,
      axisLabel: {
        interval: Math.floor(data.length / 20),
        rotate: 45,
        fontSize: 11,
      },
    },
    yAxis: {
      type: "value",
      name: yAxisName,
      min: 0,
      max: yAxisMax,
    },
    series,
    animation: true,
    animationDuration: 50,
    animationEasing: "linear",
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
      <ReactECharts
        ref={chartRef}
        option={option}
        style={{ height: "500px", width: "100%" }}
        opts={{ renderer: "svg" }}
      />
      <div className="mt-4 flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={handleTogglePause}
            disabled={isComplete}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isComplete
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : isPaused
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-yellow-500 text-white hover:bg-yellow-600"
            }`}
          >
            {isPaused ? "继续" : "暂停"}
          </button>
          <button
            onClick={handleRestart}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            重新开始
          </button>
          <span className="text-sm text-gray-500">
            进度: {currentIndex + 1} / {data.length}
          </span>
        </div>
      </div>
    </div>
  );
}
