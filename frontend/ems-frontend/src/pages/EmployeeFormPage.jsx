import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import {
  createEmployee,
  getEmployees,
  updateEmployee,
} from '../services/EmployeeService.js'

export default function EmployeeFormPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const location = useLocation()

  const isEditMode = Boolean(id)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(isEditMode)
  const [error, setError] = useState('')

  const title = useMemo(
    () => (isEditMode ? 'Update Employee' : 'Add Employee'),
    [isEditMode],
  )

  useEffect(() => {
    let cancelled = false

    async function hydrateForEdit() {
      if (!isEditMode) return

      const stateEmployee = location.state?.employee
      if (stateEmployee && String(stateEmployee.id) === String(id)) {
        setFirstName(stateEmployee.firstName ?? '')
        setLastName(stateEmployee.lastName ?? '')
        setEmail(stateEmployee.email ?? '')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError('')
        const list = await getEmployees()
        const found = Array.isArray(list)
          ? list.find((e) => String(e?.id) === String(id))
          : null

        if (!cancelled && found) {
          setFirstName(found.firstName ?? '')
          setLastName(found.lastName ?? '')
          setEmail(found.email ?? '')
        }
      } catch (e) {
        console.error('Failed to load employee:', e)
        if (!cancelled) setError(e?.message ?? 'Failed to load employee')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    hydrateForEdit()

    return () => {
      cancelled = true
    }
  }, [id, isEditMode, location.state])

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    const payload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
    }

    if (!payload.firstName || !payload.lastName || !payload.email) {
      setError('Please fill out First Name, Last Name, and Email.')
      return
    }

    setSubmitting(true)
    try {
      if (isEditMode) {
        await updateEmployee(id, payload)
      } else {
        await createEmployee(payload)
      }
      navigate('/employees')
    } catch (e) {
      console.error('Failed to save employee:', e)
      setError(e?.message ?? 'Save failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <h2 className="page-title">{title}</h2>
          <p className="page-subtitle">{isEditMode ? 'Edit employee details' : 'Create a new employee'}</p>
        </div>

        <div className="page-actions">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => navigate('/employees')}
          >
            Back
          </button>
        </div>
      </div>

      {error ? <div className="alert alert-danger">{error}</div> : null}

      <div className="form-center">
        <div className="card form-card">
          <div className="card-body">
            {loading ? (
              <div className="muted">Loading...</div>
            ) : (
              <form className="form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <label className="label" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    className="input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    autoComplete="given-name"
                  />
                </div>

                <div className="form-row">
                  <label className="label" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    className="input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    autoComplete="family-name"
                  />
                </div>

                <div className="form-row">
                  <label className="label" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john.doe@company.com"
                    autoComplete="email"
                    inputMode="email"
                  />
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    className="btn btn-gradient"
                    disabled={submitting}
                  >
                    {submitting
                      ? isEditMode
                        ? 'Updating...'
                        : 'Creating...'
                      : isEditMode
                        ? 'Update Employee'
                        : 'Add Employee'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
