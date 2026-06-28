import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteEmployee, getEmployees } from '../services/EmployeeService.js'

export default function EmployeeListPage() {
  const navigate = useNavigate()
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const employeeRows = useMemo(() => {
    if (!Array.isArray(employees)) return []
    return employees
  }, [employees])

  async function loadEmployees() {
    setLoading(true)
    setError('')
    try {
      const data = await getEmployees()
      setEmployees(data ?? [])
    } catch (e) {
      console.error('Failed to load employees:', e)
      setError(
        e?.message ??
          'Could not load employees. Verify the backend is running at http://localhost:8080 and GET /api/employees exists.',
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      loadEmployees()
    }, 0)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [])

  async function handleDelete(employee) {
    const id = employee?.id
    if (id == null) return

    const ok = window.confirm(
      `Delete employee ${employee?.firstName ?? ''} ${employee?.lastName ?? ''}?`,
    )
    if (!ok) return

    try {
      await deleteEmployee(id)
      setEmployees((prev) => prev.filter((e) => e?.id !== id))
    } catch (e) {
      console.error('Failed to delete employee:', e)
      setError(
        e?.message ??
          'Could not delete employee. Verify DELETE /api/employees/{id} exists on the backend.',
      )
    }
  }

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <h2 className="page-title">Employees</h2>
          <p className="page-subtitle">Manage your organization’s employees</p>
        </div>

        <div className="page-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate('/employees/new')}
          >
            Add Employee
          </button>
        </div>
      </div>

      {error ? <div className="alert alert-danger">{error}</div> : null}

      <div className="card">
        <div className="table-wrap">
          <table className="table" aria-label="Employee list">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th className="table-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="table-empty">
                    Loading...
                  </td>
                </tr>
              ) : employeeRows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="table-empty">
                    No employees found.
                  </td>
                </tr>
              ) : (
                employeeRows.map((employee) => (
                  <tr key={employee?.id}>
                    <td>{employee?.id}</td>
                    <td>{employee?.firstName}</td>
                    <td>{employee?.lastName}</td>
                    <td>{employee?.email}</td>
                    <td className="table-actions">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() =>
                          navigate(`/employees/${employee?.id}/edit`, {
                            state: { employee },
                          })
                        }
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDelete(employee)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="card-footer">
          <button type="button" className="btn btn-ghost" onClick={loadEmployees}>
            Refresh
          </button>
        </div>
      </div>
    </section>
  )
}
