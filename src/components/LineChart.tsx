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
        setTimeout(() => showTooltip(newIndex), 50);
      }
    }, animationSpeed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex, data, animationSpeed, isPaused]);

  useEffect(() => {
    if (isPaused) {
      showTooltip(currentIndex);
    }
  }, [isPaused, currentIndex]);

  const handleTogglePause = () => {
    if (!isPaused) {
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
  const progressPercent = ((currentIndex + 1) / data.length) * 100;

  const series: any[] = [
    {
      name: seriesNames[0],
      type: "line",
      data: displayData.values1,
      smooth: true,
      symbol: "circle",
      symbolSize: 4,
      itemStyle: {
        color: colors[0],
      },
      lineStyle: {
        width: 2.5,
      },
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: gradientColors?.[0] || colors[0] },
            { offset: 1, color: "rgba(255,255,255,0.05)" },
          ],
        },
      },
      emphasis: {
        focus: "series",
      },
      endLabel: showEndLabels
        ? {
            show: false,
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
      symbol: "circle",
      symbolSize: 4,
      itemStyle: {
        color: colors[1],
      },
      lineStyle: {
        width: 2.5,
      },
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: gradientColors?.[1] || colors[1] },
            { offset: 1, color: "rgba(255,255,255,0.05)" },
          ],
        },
      },
      emphasis: {
        focus: "series",
      },
      endLabel: showEndLabels
        ? {
            show: false,
          }
        : undefined,
    });
  }

  const option = {
    title: {
      text: title,
      left: "center",
      top: 5,
      textStyle: {
        fontSize: 14,
        fontWeight: "500",
        color: "#475569",
      },
    },
    tooltip: {
      trigger: "axis",
      confine: true,
      backgroundColor: "rgba(51, 65, 85, 0.9)",
      borderColor: "#64748b",
      borderWidth: 1,
      padding: [8, 12],
      borderRadius: 6,
      textStyle: {
        color: "#e2e8f0",
        fontSize: 12,
      },
      formatter: (params: any[]) => {
        const year = params[0].axisValue;
        let result = `<div style="font-weight:500;margin-bottom:4px;">${year}年</div>`;
        params.forEach((param) => {
          result += `<div style="margin:2px 0;"><span style="color:${param.color}">●</span> ${param.seriesName}: ${param.value}${unit}</div>`;
        });
        return result;
      },
    },
    legend: {
      data: seriesNames.filter(Boolean),
      top: 30,
      textStyle: {
        fontSize: 12,
        color: "#64748b",
      },
      itemWidth: 16,
      itemHeight: 10,
      itemGap: 16,
    },
    grid: {
      left: "50",
      right: "50",
      bottom: "30",
      top: "50",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: displayData.years,
      axisLine: {
        lineStyle: {
          color: "#cbd5e1",
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        interval: Math.floor(data.length / 20),
        rotate: 40,
        fontSize: 10,
        color: "#94a3b8",
      },
    },
    yAxis: {
      type: "value",
      name: yAxisName,
      nameTextStyle: {
        color: "#64748b",
        fontSize: 11,
        padding: [0, 30, 0, 0],
      },
      min: 0,
      max: yAxisMax,
      axisLine: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          color: "#e2e8f0",
          type: "dashed",
        },
      },
      axisLabel: {
        color: "#94a3b8",
        fontSize: 10,
      },
    },
    series,
    animation: true,
    animationDuration: 50,
    animationEasing: "linear",
  };

  return (
    <div className="bg-white rounded-lg shadow border border-slate-200/60 flex-1 flex flex-col">
      {/* 图表区域 */}
      <div className="flex-1">
        <ReactECharts
          ref={chartRef}
          option={option}
          style={{ height: "100%", width: "100%", minHeight: "480px" }}
          opts={{ renderer: "svg" }}
        />
      </div>

      {/* 控制面板 */}
      <div className="bg-slate-50/50 px-4 py-2.5 border-t border-slate-100 flex items-center justify-between gap-4">
        {/* 数据展示 */}
        <div className="flex items-center gap-3 bg-slate-100 px-3 py-1.5 rounded-lg">
          <span className="text-slate-600 text-sm font-medium">{currentYear}年</span>
          <span className="text-slate-300">|</span>
          <span className="text-sm" style={{ color: colors[0] }}>
            {seriesNames[0]}: <span className="font-medium">{currentValue1}{unit}</span>
          </span>
          {currentValue2 !== undefined && seriesNames[1] && (
            <span className="text-sm" style={{ color: colors[1] }}>
              {seriesNames[1]}: <span className="font-medium">{currentValue2}{unit}</span>
            </span>
          )}
        </div>

        {/* 进度条 */}
        <div className="flex items-center gap-2 w-32">
          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden flex-1">
            <div
              className="h-full rounded-full transition-all duration-100"
              style={{
                width: `${progressPercent}%`,
                background: colors[1] ? `linear-gradient(to right, ${colors[0]}, ${colors[1]})` : colors[0],
              }}
            ></div>
          </div>
          <span className="text-xs text-slate-400 w-12 text-right">{currentIndex + 1}/{data.length}</span>
        </div>

        {/* 控制按钮 */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleTogglePause}
            disabled={isComplete}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
              isComplete
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : isPaused
                  ? "bg-emerald-100 text-emerald-600 hover:bg-emerald-200"
                  : "bg-amber-100 text-amber-600 hover:bg-amber-200"
            }`}
          >
            {isPaused ? "继续" : "暂停"}
          </button>
          <button
            onClick={handleRestart}
            className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-200 transition-all"
          >
            重播
          </button>
        </div>
      </div>
    </div>
  );
}