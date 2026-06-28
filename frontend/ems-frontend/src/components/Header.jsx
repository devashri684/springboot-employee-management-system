import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const location = useLocation()
  const isEmployeesRoute = location.pathname.startsWith('/employees')

  return (
    <header className="app-header">
      <div className="container header-inner">
        <div className="header-title">
          <Link to="/employees" className="header-title-link">
            Employee Management System
          </Link>
        </div>

        <nav className="header-nav" aria-label="Primary">
          <Link
            to="/employees"
            className={isEmployeesRoute ? 'header-link header-link-active' : 'header-link'}
          >
            Employees
          </Link>
        </nav>
      </div>
    </header>
  )
}
