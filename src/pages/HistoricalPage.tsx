import LineChart from "../components/LineChart";
import { historicalData } from "../data/populationData";

export default function HistoricalPage() {
  const chartData = historicalData.map((d) => ({
    year: d.year,
    value1: d.birth,
    value2: d.death,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
          中国历年出生与死亡人口对比 (1949-2026)
        </h1>
        <LineChart
          title="中国历年出生与死亡人口对比"
          data={chartData}
          seriesNames={["出生人口", "死亡人口"]}
          yAxisName="人口（万人）"
          yAxisMax={3500}
          colors={["#5470c6", "#ee6666"]}
          gradientColors={[
            "rgba(84, 112, 198, 0.3)",
            "rgba(238, 102, 102, 0.3)",
          ]}
          unit="万"
        />
      </div>
    </div>
  );
}
