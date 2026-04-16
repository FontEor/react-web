import LineChart from "../components/LineChart";
import { projectedData } from "../data/populationData";

export default function ProjectionPage() {
  const chartData = projectedData.map((d) => ({
    year: d.year,
    value1: d.birth,
    value2: d.death,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
          中国出生与死亡人口预测对比 (2027-2100)
        </h1>
        <LineChart
          title="中国出生与死亡人口预测对比"
          data={chartData}
          seriesNames={["出生人口预测", "死亡人口预测"]}
          yAxisName="人口（万人）"
          yAxisMax={2000}
          colors={["#73c0de", "#fc8452"]}
          gradientColors={[
            "rgba(115, 192, 222, 0.3)",
            "rgba(252, 132, 82, 0.3)",
          ]}
          unit="万"
        />
      </div>
    </div>
  );
}
