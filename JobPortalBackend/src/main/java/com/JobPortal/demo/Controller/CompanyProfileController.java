package com.JobPortal.demo.Controller;

import com.JobPortal.demo.DTO.CompanyProfileDTO;
import com.JobPortal.demo.DTO.CompanyStatsDTO;
import com.JobPortal.demo.Entity.CompanyProfile;
import com.JobPortal.demo.Entity.UserProfile;
import com.JobPortal.demo.Repository.CompanyProfileRepository;
import com.JobPortal.demo.Services.CompanyProfileService;
import com.JobPortal.demo.Services.UserProfileService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/api/company")
public class CompanyProfileController {

    private final CompanyProfileService companyProfileService;
    private final UserProfileService userProfileService;
    private final CompanyProfileRepository companyProfileRepository;

    public CompanyProfileController(
            CompanyProfileService companyProfileService,
            UserProfileService userProfileService,
            CompanyProfileRepository companyProfileRepository
    ) {
        this.companyProfileService = companyProfileService;
        this.userProfileService = userProfileService;
        this.companyProfileRepository = companyProfileRepository;
    }

    @GetMapping("/profile")
    public CompanyProfile getProfile() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return companyProfileService.getProfile(email);
    }

    @PutMapping("/profile")
    public CompanyProfile updateProfile(
            @RequestBody CompanyProfileDTO dto
    ) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return companyProfileService.saveProfile(
                email,
                dto
        );
    }

    @PostMapping("/profile/upload-photo")
    public String uploadPhoto(
            @RequestParam MultipartFile file
    ) throws IOException {
        return companyProfileService.uploadPhoto(file);
    }

    @GetMapping("/profile/{email}")
    public UserProfile getProfile(
            @PathVariable String email
    ){
        return userProfileService.getProfile(email);
    }

    @GetMapping("/stats")
    public CompanyStatsDTO getStats(){

        String email =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        return companyProfileService.getStats(email);
    }

    @GetMapping("/public/company-view/{email}")
    public ResponseEntity<CompanyProfile> getCompanyProfile(
            @PathVariable String email
    ) {
        Optional<CompanyProfile> profile = companyProfileRepository.findByUserEmail(email);

        if(profile.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(
                profile.get()
        );
    }

    @GetMapping("/profile-complete")
    public boolean profileComplete(
            Authentication authentication
    ){

        return companyProfileService
                .isProfileComplete(
                        authentication.getName()
                );
    }
}
