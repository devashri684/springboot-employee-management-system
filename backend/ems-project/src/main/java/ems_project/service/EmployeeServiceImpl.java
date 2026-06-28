package ems_project.service;

import ems_project.repository.EmployeeRepository;
import lombok.AllArgsConstructor;
import ems_project.dto.EmployeeDto;
import ems_project.entity.Employee;
import ems_project.exception.ResourceNotFoundException;
import ems_project.mapper.EmployeeMapper;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository repository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto dto) {
        Employee emp = EmployeeMapper.mapToEmployee(dto);
        return EmployeeMapper.mapToEmployeeDto(repository.save(emp));
    }

    @Override
    public EmployeeDto getEmployeeById(Long id) {
        Employee emp = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));
        return EmployeeMapper.mapToEmployeeDto(emp);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        return repository.findAll()
                .stream()
                .map(EmployeeMapper::mapToEmployeeDto)
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long id, EmployeeDto dto) {
        Employee emp = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

        emp.setFirstName(dto.getFirstName());
        emp.setLastName(dto.getLastName());
        emp.setEmail(dto.getEmail());

        return EmployeeMapper.mapToEmployeeDto(repository.save(emp));
    }

    @Override
    public void deleteEmployee(Long id) {
        repository.deleteById(id);
    }
}