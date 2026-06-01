package com.JobPortal.demo.Controller;

import com.JobPortal.demo.Entity.Application;
import com.JobPortal.demo.Entity.Job;
import com.JobPortal.demo.Services.ApplicationService;
import com.JobPortal.demo.Services.JobService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/company")
public class JobController {

    private final JobService jobService;

    private final ApplicationService applicationService;

    public JobController(JobService jobService, ApplicationService applicationService) {
        this.jobService = jobService;
        this.applicationService = applicationService;
    }


    @PostMapping("/post-job")
    public Job postJob(@RequestBody Job job) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName(); // comes from JWT

        job.setCompanyEmail(email);

        return jobService.postJob(job);
    }

//    @GetMapping("/applications/{jobId}")
//    public List<Application> getApplicants(@PathVariable Long jobId) {
//        return applicationService.getApplicationsByJob(jobId);
//    }

    @GetMapping("/applications/{jobId}")
    public List<Application> getApplicants(@PathVariable Long jobId) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return jobService.getApplicationsForCompany(jobId, email);
    }

    @GetMapping("/my-jobs")
    public List<Job> getMyJobs() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return jobService.getJobsByCompany(email);
    }

    // USER
    @GetMapping("/jobs")
    public List<Job> getAllJobs() {
        return jobService.getAllJobs();
    }
}
