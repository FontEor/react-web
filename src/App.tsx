import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import HistoricalPage from "./pages/HistoricalPage";
import ProjectionPage from "./pages/ProjectionPage";
import TotalPopulationPage from "./pages/TotalPopulationPage";

function App() {
  return (
    <BrowserRouter>
      <div className="h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200 flex flex-col overflow-hidden">
        {/* 导航栏 */}
        <nav className="bg-slate-700/95 shadow-md shrink-0">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex-shrink-0 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-slate-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <span className="text-base font-medium text-slate-200">
                  人口数据可视化
                </span>
              </div>
              <div className="flex space-x-1">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-lg text-sm transition-all ${
                      isActive
                        ? "bg-slate-500 text-white"
                        : "text-slate-300 hover:text-white hover:bg-slate-600/50"
                    }`
                  }
                >
                  历史数据
                </NavLink>
                <NavLink
                  to="/projection"
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-lg text-sm transition-all ${
                      isActive
                        ? "bg-slate-500 text-white"
                        : "text-slate-300 hover:text-white hover:bg-slate-600/50"
                    }`
                  }
                >
                  未来预测
                </NavLink>
                <NavLink
                  to="/total"
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-lg text-sm transition-all ${
                      isActive
                        ? "bg-slate-500 text-white"
                        : "text-slate-300 hover:text-white hover:bg-slate-600/50"
                    }`
                  }
                >
                  人口总量
                </NavLink>
              </div>
            </div>
          </div>
        </nav>

        {/* 页面内容 */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <Routes>
            <Route path="/" element={<HistoricalPage />} />
            <Route path="/projection" element={<ProjectionPage />} />
            <Route path="/total" element={<TotalPopulationPage />} />
          </Routes>
        </div>

        {/* 页脚 */}
        <footer className="bg-slate-600 text-slate-300 py-3.5 shrink-0">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-xs">
              部分数据来源：国家统计局、联合国世界人口展望
            </p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
