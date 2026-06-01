package com.JobPortal.demo.Services;


import com.JobPortal.demo.DTO.ApplicationResponse;
import com.JobPortal.demo.Entity.Application;
import com.JobPortal.demo.Entity.Job;
import com.JobPortal.demo.Repository.ApplicationRepository;
import com.JobPortal.demo.Repository.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;

    private final JobRepository jobRepository;

    public ApplicationService(ApplicationRepository applicationRepository, JobRepository jobRepository) {
        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
    }

    public Application apply(Application application) {
        return applicationRepository.save(application);
    }


    public List<Application> getApplicationsByJob(Long jobId) {
        return applicationRepository.findByJobId(jobId);
    }

    public Application apply(Long jobId, String email) {

        if (applicationRepository.existsByJobIdAndUserEmail(jobId, email)) {
            throw new IllegalStateException("You have already applied to this job");
        }

        Application app = new Application();
        app.setJobId(jobId);
        app.setUserEmail(email);
        app.setStatus("APPLIED");

        return applicationRepository.save(app);
    }

    public Application updateStatus(Long id, String status) {

        Application app = applicationRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Application not found"));

        app.setStatus(status);

        return applicationRepository.save(app);
    }

    public List<ApplicationResponse> getUserApplications(String email) {

        List<Application> applications =
                applicationRepository.findByUserEmail(email);

        return applications.stream()
                .map(app -> {

                    Job job = jobRepository
                            .findById(app.getJobId())
                            .orElse(null);

                    ApplicationResponse dto = new ApplicationResponse();

                    dto.setApplicationId(app.getId());
                    dto.setJobId(app.getJobId());
                    dto.setStatus(app.getStatus());

                    if(job != null){
                        dto.setTitle(job.getTitle());
                        dto.setCompanyEmail(job.getCompanyEmail());
                    }

                    return dto;
                })
                .toList();
    }

}
