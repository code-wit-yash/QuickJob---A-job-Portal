package com.JobPortal.demo.Controller;

import com.JobPortal.demo.DTO.UserProfileDTO;
import com.JobPortal.demo.Entity.CompanyProfile;
import com.JobPortal.demo.Entity.UserProfile;
import com.JobPortal.demo.Services.CompanyProfileService;
import com.JobPortal.demo.Services.UserProfileService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/user")
public class UserProfileController {
    private final UserProfileService userProfileService;
    private final CompanyProfileService companyProfileService;

    public UserProfileController(
            UserProfileService userProfileService,
            CompanyProfileService companyProfileService
    ) {
        this.userProfileService = userProfileService;
        this.companyProfileService = companyProfileService;
    }

    @GetMapping("/profile")
    public UserProfile getProfile() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return userProfileService.getProfile(email);
    }

    @PutMapping("/profile")
    public UserProfile updateProfile(
            @RequestBody UserProfileDTO dto
    ) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return userProfileService.saveProfile(
                email,
                dto
        );
    }

    @PostMapping("/profile/upload-photo")
    public String uploadPhoto(
            @RequestParam MultipartFile file
    ) throws IOException {
        return userProfileService.uploadPhoto(file);
    }

    @PostMapping("/profile/upload-resume")
    public String uploadResume(
            @RequestParam MultipartFile file
    ) throws IOException {
        return userProfileService.uploadResume(file);
    }


}
