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

}
