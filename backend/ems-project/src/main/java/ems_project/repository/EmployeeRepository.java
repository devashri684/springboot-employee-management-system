package ems_project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ems_project.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}