import LineChart from "../components/LineChart";
import { allTotalPopulation } from "../data/populationData";

export default function TotalPopulationPage() {
  const chartData = allTotalPopulation.map((d) => ({
    year: d.year,
    value1: d.population,
  }));

  const peakPopulation = Math.max(...allTotalPopulation.map((d) => d.population));
  const peakYear = allTotalPopulation.find((d) => d.population === peakPopulation)?.year;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
          中国总人口变化趋势 (1949-2100)
        </h1>
        <LineChart
          title="中国总人口变化"
          data={chartData}
          seriesNames={["总人口"]}
          yAxisName="人口（亿人）"
          yAxisMax={15}
          colors={["#5470c6"]}
          gradientColors={["rgba(84, 112, 198, 0.3)"]}
          animationSpeed={150}
          unit="亿"
        />
        <div className="mt-4 text-center text-gray-600">
          <p className="text-sm md:text-base">
            数据来源：国家统计局(1949-2026)、联合国世界人口展望(2027-2100)
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