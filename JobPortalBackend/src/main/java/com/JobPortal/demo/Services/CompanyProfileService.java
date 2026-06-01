package com.JobPortal.demo.Services;

import com.JobPortal.demo.DTO.CompanyProfileDTO;
import com.JobPortal.demo.DTO.CompanyStatsDTO;
import com.JobPortal.demo.Entity.*;
import com.JobPortal.demo.Repository.ApplicationRepository;
import com.JobPortal.demo.Repository.CompanyProfileRepository;
import com.JobPortal.demo.Repository.JobRepository;
import com.JobPortal.demo.Repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class CompanyProfileService {
    private final CompanyProfileRepository companyProfileRepository;
    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;

    public CompanyProfileService(
            CompanyProfileRepository companyProfileRepository,
            UserRepository userRepository,
            JobRepository jobRepository,
            ApplicationRepository applicationRepository
    ) {
        this.companyProfileRepository =
                companyProfileRepository;

        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
        this.applicationRepository = applicationRepository;
    }

    public CompanyProfile getProfile(String email) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return companyProfileRepository
                .findByUser(user)
                .orElse(null);
    }

    public CompanyProfile saveProfile(
            String email,
            CompanyProfileDTO dto
    ) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        CompanyProfile profile =
                companyProfileRepository
                        .findByUser(user)
                        .orElse(new CompanyProfile());

        profile.setUser(user);

        profile.setCompanyName(
                dto.getCompanyName());

        profile.setLocation(
                dto.getLocation());

        profile.setWebsite(
                dto.getWebsite());

        profile.setHelpNumber(
                dto.getHelpNumber());

        profile.setDescription(
                dto.getDescription());

        return companyProfileRepository.save(profile);
    }

    public String uploadPhoto(
            MultipartFile file
    ) throws IOException {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository
                .findByEmail(email)
                .orElseThrow();

        CompanyProfile profile =
                companyProfileRepository
                        .findByUser(user)
                        .orElse(new CompanyProfile());

        String fileName =
                System.currentTimeMillis()
                        + "_"
                        + file.getOriginalFilename();

        Path path = Paths.get(
                "Uploads/photos/",
                fileName
        );

        Files.createDirectories(
                path.getParent()
        );

        Files.write(
                path,
                file.getBytes()
        );

        String url =
                "/Uploads/photos/" + fileName;

        profile.setProfilePhotoUrl(url);

        profile.setUser(user);

        companyProfileRepository.save(profile);

        return url;
    }

    public CompanyStatsDTO getStats(String companyEmail) {

        List<Job> jobs =
                jobRepository.findByCompanyEmail(
                        companyEmail
                );

        long jobsPosted = jobs.size();

        long applicants = 0;
        long hired = 0;

        for(Job job : jobs){

            List<Application> applications =
                    applicationRepository
                            .findByJobId(job.getId());

            applicants += applications.size();

            hired += applications.stream()
                    .filter(app ->
                            "HIRED".equals(
                                    app.getStatus()
                            )
                    )
                    .count();
        }

        return new CompanyStatsDTO(
                jobsPosted,
                applicants,
                hired
        );
    }

    public CompanyProfile getByEmail(String email){
        return companyProfileRepository
                .findByUserEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Company profile not found"));
    }

    public boolean profileExists(
            String email
    ){
        return companyProfileRepository
                .findByUserEmail(email)
                .isPresent();
    }

    public boolean isProfileComplete(String email) {

        CompanyProfile profile =
                companyProfileRepository
                        .findByUserEmail(email)
                        .orElse(null);

        if(profile == null){
            return false;
        }

        return profile.getCompanyName() != null
                && !profile.getCompanyName().isBlank()

                && profile.getLocation() != null
                && !profile.getLocation().isBlank()

                && profile.getWebsite() != null
                && !profile.getWebsite().isBlank()

                && profile.getHelpNumber() != null
                && !profile.getHelpNumber().isBlank()

                && profile.getDescription() != null
                && !profile.getDescription().isBlank();
    }


}
