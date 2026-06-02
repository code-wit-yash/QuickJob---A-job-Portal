package com.JobPortal.demo.Controller;

import com.JobPortal.demo.Entity.Application;
import com.JobPortal.demo.Entity.Job;
import com.JobPortal.demo.Repository.JobRepository;
import com.JobPortal.demo.Services.ApplicationService;
import com.JobPortal.demo.Services.JobService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/company")
public class JobController {

    private final JobService jobService;

    private final ApplicationService applicationService;

    private final JobRepository jobRepository;

    public JobController(JobService jobService, ApplicationService applicationService, JobRepository jobRepository) {
        this.jobService = jobService;
        this.applicationService = applicationService;
        this.jobRepository = jobRepository;
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

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteJob(
            @PathVariable Long id,
            Authentication authentication) {

        String companyEmail = authentication.getName();

        jobService.deleteJob(id, companyEmail);

        return ResponseEntity.ok("Job deleted successfully");
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateJob(
            @PathVariable Long id,
            @RequestBody Job updatedJob,
            Authentication authentication) {

        String companyEmail = authentication.getName();

        Job job = jobService.updateJob(id, updatedJob, companyEmail);

        return ResponseEntity.ok(job);
    }

    @GetMapping("/job/{id}")
    public ResponseEntity<?> getJob(@PathVariable Long id) {

        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        return ResponseEntity.ok(job);
    }


}


