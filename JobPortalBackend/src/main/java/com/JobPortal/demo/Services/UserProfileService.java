package com.JobPortal.demo.Services;

import com.JobPortal.demo.DTO.UserProfileDTO;
import com.JobPortal.demo.Entity.User;
import com.JobPortal.demo.Entity.UserProfile;
import com.JobPortal.demo.Repository.UserProfileRepository;
import com.JobPortal.demo.Repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class UserProfileService {

    private final UserProfileRepository userProfileRepository;
    private final UserRepository userRepository;


    public UserProfileService(
            UserProfileRepository userProfileRepository,
            UserRepository userRepository
    ) {
        this.userProfileRepository = userProfileRepository;
        this.userRepository = userRepository;
    }

    public UserProfile getProfile(String email) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return userProfileRepository
                .findByUser(user)
                .orElse(null);
    }

    public UserProfile saveProfile(
            String email,
            UserProfileDTO dto
    ) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        UserProfile profile =
                userProfileRepository
                        .findByUser(user)
                        .orElse(new UserProfile());

        profile.setUser(user);

        profile.setName(dto.getName());
        profile.setPhoneNumber(dto.getPhoneNumber());
        profile.setLocation(dto.getLocation());
        profile.setEducation(dto.getEducation());
        profile.setExperience(dto.getExperience());
        profile.setLinkedinUrl(dto.getLinkedinUrl());

        profile.setSkills(dto.getSkills());
        profile.setProjects(dto.getProjects());

        profile.setPublications(
                dto.getPublications());

        profile.setCertifications(
                dto.getCertifications());

        return userProfileRepository.save(profile);
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

        UserProfile profile =
                userProfileRepository
                        .findByUser(user)
                        .orElse(new UserProfile());

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

        userProfileRepository.save(profile);

        return url;
    }

    public String uploadResume(
            MultipartFile file
    ) throws IOException {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository
                .findByEmail(email)
                .orElseThrow();

        UserProfile profile =
                userProfileRepository
                        .findByUser(user)
                        .orElse(new UserProfile());

        String fileName =
                System.currentTimeMillis()
                        + "_"
                        + file.getOriginalFilename();

        Path path = Paths.get(
                "Uploads/resumes/",
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
                "/Uploads/resumes/" + fileName;

        profile.setResumeUrl(url);

        profile.setUser(user);

        userProfileRepository.save(profile);

        return url;
    }

}
