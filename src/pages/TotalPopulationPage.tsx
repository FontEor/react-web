import LineChart from "../components/LineChart";
import { allTotalPopulation } from "../data/populationData";

export default function TotalPopulationPage() {
  const chartData = allTotalPopulation.map((d) => ({
    year: d.year,
    value1: d.population,
  }));

  const peakPopulation = Math.max(
    ...allTotalPopulation.map((d) => d.population),
  );
  const peakYear = allTotalPopulation.find(
    (d) => d.population === peakPopulation,
  )?.year;

  return (
    <div className="flex-1 py-4 px-4 flex flex-col min-h-0">
      <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col min-h-0">
        {/* 页面标题 */}
        <div className="text-center mb-3 shrink-0">
          <h1 className="text-2xl font-medium text-slate-600">
            总人口变化趋势 (1949-2100)
          </h1>
        </div>

        {/* 图表 */}
        <div className="flex-1 min-h-0">
          <LineChart
            title=""
            data={chartData}
            seriesNames={["总人口"]}
            yAxisName="人口（亿人）"
            yAxisMax={15}
            colors={["#818cf8"]}
            gradientColors={["rgba(129, 140, 248, 0.25)"]}
            animationSpeed={700}
            unit="亿"
          />
        </div>

        {/* 关键数据 */}
        <div className="grid grid-cols-3 gap-2 mt-2 shrink-0">
          <div className="bg-emerald-50/50 rounded-lg p-3 text-center border border-emerald-100">
            <p className="text-emerald-600 text-xs mb-0.5">1949年</p>
            <p className="text-emerald-700 text-sm font-medium">5.42亿人</p>
          </div>
          <div className="bg-blue-50/50 rounded-lg p-3 text-center border border-blue-100">
            <p className="text-blue-600 text-xs mb-0.5">人口峰值</p>
            <p className="text-blue-700 text-sm font-medium">
              {peakPopulation}亿 ({peakYear}年)
            </p>
          </div>
          <div className="bg-orange-50/50 rounded-lg p-3 text-center border border-orange-100">
            <p className="text-orange-600 text-xs mb-0.5">2100年预测</p>
            <p className="text-orange-700 text-sm font-medium">约5.97亿</p>
          </div>
        </div>
      </div>
    </div>
  );
}
