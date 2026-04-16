import LineChart from "../components/LineChart";
import { projectedData } from "../data/populationData";

export default function ProjectionPage() {
  const chartData = projectedData.map((d) => ({
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
            出生与死亡人口预测 (2026-2100)
          </h1>
        </div>

        {/* 图表 */}
        <div className="flex-1 min-h-0">
          <LineChart
            title=""
            data={chartData}
            seriesNames={["出生人口预测", "死亡人口预测"]}
            yAxisName="人口（万人）"
            yAxisMax={2000}
            colors={["#22d3ee", "#fb923c"]}
            gradientColors={[
              "rgba(34, 211, 238, 0.25)",
              "rgba(251, 146, 60, 0.25)",
            ]}
            unit="万"
          />
        </div>
      </div>
    </div>
  );
}
