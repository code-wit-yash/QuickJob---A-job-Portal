package com.JobPortal.demo.Controller;


import com.JobPortal.demo.DTO.ApplicationResponse;
import com.JobPortal.demo.Entity.Application;
import com.JobPortal.demo.Services.ApplicationService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

//    @PostMapping("/apply/{jobId}")
//    public Application applyToJob(@PathVariable Long jobId) {
//
//        String email = SecurityContextHolder
//                .getContext()
//                .getAuthentication()
//                .getName();
//
//        Application application = new Application();
//        application.setJobId(jobId);
//        application.setUserEmail(email);
//        application.setStatus("APPLIED");
//
//        return applicationService.apply(application);
//    }

    @PostMapping("/apply/{jobId}")
    public Application apply(@PathVariable Long jobId) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return applicationService.apply(jobId, email);
    }

    @PutMapping("/application/{id}/status")
    public Application updateStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {
        System.out.println("UPDATE STATUS HIT");
        return applicationService.updateStatus(id, status);
    }

    @GetMapping("/my-applications")
    public List<ApplicationResponse> getMyApplications() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return applicationService.getUserApplications(email);
    }


}
