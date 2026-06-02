package com.JobPortal.demo.Services;


import com.JobPortal.demo.Entity.Application;
import com.JobPortal.demo.Entity.Job;
import com.JobPortal.demo.Repository.ApplicationRepository;
import com.JobPortal.demo.Repository.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {
    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;
    private final CompanyProfileService companyProfileService;

    public JobService(JobRepository jobRepository, ApplicationRepository applicationRepository, CompanyProfileService companyProfileService){
        this.jobRepository = jobRepository;
        this.applicationRepository = applicationRepository;
        this.companyProfileService = companyProfileService;
    }

    public Job postJob(Job job){

        if(!companyProfileService
                .isProfileComplete(
                        job.getCompanyEmail()
                )){
            throw new RuntimeException(
                    "Complete your company profile before posting jobs"
            );
        }

        return jobRepository.save(job);
    }

    public List<Job> getAllJobs(){
        return jobRepository.findAll();
    }

    public List<Job> getJobsByCompany(String email){
        return jobRepository.findByCompanyEmail(email);
    }

    public List<Application> getApplicationsForCompany(Long jobId, String email) {

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (!job.getCompanyEmail().equals(email)) {
            throw new RuntimeException("Unauthorized access");
        }

        return applicationRepository.findByJobId(jobId);
    }

    public void deleteJob(Long jobId, String companyEmail) {

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (!job.getCompanyEmail().equals(companyEmail)) {
            throw new RuntimeException("Unauthorized");
        }

        jobRepository.delete(job);
    }

    public Job updateJob(Long jobId, Job updatedJob, String companyEmail) {

        Job existingJob = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (!existingJob.getCompanyEmail().equals(companyEmail)) {
            throw new RuntimeException("Unauthorized");
        }

        existingJob.setTitle(updatedJob.getTitle());
        existingJob.setDescription(updatedJob.getDescription());
        existingJob.setSkillsRequired(updatedJob.getSkillsRequired());
        existingJob.setLocation(updatedJob.getLocation());
        existingJob.setSalary(updatedJob.getSalary());
        existingJob.setExperienceRequired(updatedJob.getExperienceRequired());

        return jobRepository.save(existingJob);
    }

}
