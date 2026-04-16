import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import HistoricalPage from './pages/HistoricalPage';
import ProjectionPage from './pages/ProjectionPage';
import TotalPopulationPage from './pages/TotalPopulationPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex-shrink-0">
                <span className="text-xl font-bold text-gray-800">
                  中国人口数据可视化
                </span>
              </div>
              <div className="flex space-x-1 md:space-x-4">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`
                  }
                >
                  历史数据
                </NavLink>
                <NavLink
                  to="/projection"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-green-500 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`
                  }
                >
                  未来预测
                </NavLink>
                <NavLink
                  to="/total"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-orange-500 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`
                  }
                >
                  人口总量
                </NavLink>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HistoricalPage />} />
          <Route path="/projection" element={<ProjectionPage />} />
          <Route path="/total" element={<TotalPopulationPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;