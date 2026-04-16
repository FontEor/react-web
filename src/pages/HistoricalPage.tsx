import LineChart from "../components/LineChart";
import { historicalData } from "../data/populationData";

export default function HistoricalPage() {
  const chartData = historicalData.map((d) => ({
    year: d.year,
    value1: d.birth,
    value2: d.death,
  }));

  return (
    <div className="flex-1 py-4 px-4 flex flex-col min-h-0">
      <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col min-h-0">
        {/* 页面标题 */}
        <div className="text-center mb-3 shrink-0">
          <h1 className="text-2xl font-medium text-slate-600">
            历年出生与死亡人口对比 (1949-2026)
          </h1>
        </div>

        {/* 图表 */}
        <div className="flex-1 min-h-0">
          <LineChart
            title=""
            data={chartData}
            seriesNames={["出生人口", "死亡人口"]}
            yAxisName="人口（万人）"
            yAxisMax={3500}
            colors={["#60a5fa", "#f87171"]}
            gradientColors={[
              "rgba(96, 165, 250, 0.25)",
              "rgba(248, 113, 113, 0.25)",
            ]}
            unit="万"
          />
        </div>
      </div>
    </div>
  );
}
