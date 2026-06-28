import axios from 'axios'

// Spring Boot backend base URL (React dev server runs on http://localhost:5173)
export const EMPLOYEE_API_BASE_URL = 'http://localhost:8080/api/employees'

function toUserMessage(error, fallback) {
  if (!error) return fallback

  // Axios error shape: https://axios-http.com/docs/handling_errors
  const status = error?.response?.status
  const statusText = error?.response?.statusText
  const data = error?.response?.data

  // If backend returns a string message
  if (typeof data === 'string' && data.trim()) return data

  // Common Spring Boot error formats
  const backendMessage =
    data?.message || data?.error || data?.details || data?.title || null
  if (backendMessage) return backendMessage

  if (status) return `${fallback} (HTTP ${status}${statusText ? ` ${statusText}` : ''})`

  return error?.message || fallback
}

export async function getEmployees() {
  try {
    const response = await axios.get(EMPLOYEE_API_BASE_URL)
    return response.data
  } catch (error) {
    throw new Error(toUserMessage(error, 'Failed to fetch employees'), {
      cause: error,
    })
  }
}

export async function createEmployee(employee) {
  try {
    const response = await axios.post(EMPLOYEE_API_BASE_URL, employee)
    return response.data
  } catch (error) {
    throw new Error(toUserMessage(error, 'Failed to create employee'), {
      cause: error,
    })
  }
}

export async function updateEmployee(id, employee) {
  try {
    const response = await axios.put(`${EMPLOYEE_API_BASE_URL}/${id}`, employee)
    return response.data
  } catch (error) {
    throw new Error(toUserMessage(error, 'Failed to update employee'), {
      cause: error,
    })
  }
}

export async function deleteEmployee(id) {
  try {
    const response = await axios.delete(`${EMPLOYEE_API_BASE_URL}/${id}`)
    return response.data
  } catch (error) {
    throw new Error(toUserMessage(error, 'Failed to delete employee'), {
      cause: error,
    })
  }
}
