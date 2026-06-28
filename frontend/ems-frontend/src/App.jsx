
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header.jsx'
import EmployeeListPage from './pages/EmployeeListPage.jsx'
import EmployeeFormPage from './pages/EmployeeFormPage.jsx'

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <div className="container">
          <Routes>
            <Route path="/" element={<Navigate to="/employees" replace />} />
            <Route path="/employees" element={<EmployeeListPage />} />
            <Route path="/employees/new" element={<EmployeeFormPage />} />
            <Route path="/employees/:id/edit" element={<EmployeeFormPage />} />
            <Route path="*" element={<Navigate to="/employees" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default App
