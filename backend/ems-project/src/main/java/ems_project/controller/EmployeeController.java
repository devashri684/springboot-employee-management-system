package ems_project.controller;


import lombok.AllArgsConstructor;
import ems_project.dto.EmployeeDto;
import ems_project.service.EmployeeService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/employees")
@AllArgsConstructor
public class EmployeeController {

    private EmployeeService service;

    @PostMapping
    public EmployeeDto createEmployee(@RequestBody EmployeeDto dto) {
        return service.createEmployee(dto);
    }


    @GetMapping("/{id}")
    public EmployeeDto getEmployee(@PathVariable Long id) {
        return service.getEmployeeById(id);
    }

    @GetMapping
    public List<EmployeeDto> getAllEmployees() {
        return service.getAllEmployees();
    }

    @PutMapping("/{id}")
    public EmployeeDto updateEmployee(@PathVariable Long id,
                                      @RequestBody EmployeeDto dto) {
        return service.updateEmployee(id, dto);
    }

    @DeleteMapping("/{id}")
    public String deleteEmployee(@PathVariable Long id) {
        service.deleteEmployee(id);
        return "Deleted Successfully";
    }
}