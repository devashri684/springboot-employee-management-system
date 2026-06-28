import axios from 'axios'

const EMPLOYEE_API_BASE_URL = 'http://localhost:8080/api/employees'

export async function getEmployees() {
  const response = await axios.get(EMPLOYEE_API_BASE_URL)
  return response.data
}

export async function createEmployee(employee) {
  const response = await axios.post(EMPLOYEE_API_BASE_URL, employee)
  return response.data
}

export async function updateEmployee(id, employee) {
  const response = await axios.put(`${EMPLOYEE_API_BASE_URL}/${id}`, employee)
  return response.data
}

export async function deleteEmployee(id) {
  const response = await axios.delete(`${EMPLOYEE_API_BASE_URL}/${id}`)
  return response.data
}
