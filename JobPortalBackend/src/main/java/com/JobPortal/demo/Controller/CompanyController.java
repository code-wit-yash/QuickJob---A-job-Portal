package com.JobPortal.demo.Controller;

import com.JobPortal.demo.Entity.Application;
import com.JobPortal.demo.Services.ApplicationService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/company")
public class CompanyController {

    private final ApplicationService applicationService;

    public CompanyController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @GetMapping("/test")
    public String companyTest(){
        return "COMPANY ACCESS GRANTED";
    }

    @PutMapping("/application/{applicationId}/status")
    public Application updateApplicationStatus(
            @PathVariable Long applicationId,
            @RequestParam String status
    ) {
        return applicationService.updateStatus(
                applicationId,
                status
        );
    }


}
