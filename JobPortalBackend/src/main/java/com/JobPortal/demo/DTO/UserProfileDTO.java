package com.JobPortal.demo.DTO;

public class UserProfileDTO {
    private String name;

    private String phoneNumber;

    private String location;

    private String education;

    private String experience;

    private String linkedinUrl;

    private String skills;

    private String projects;

    private String publications;

    private String certifications;


    public UserProfileDTO(String name, String phoneNumber, String location, String education, String experience, String linkedinUrl, String skills, String projects, String publications, String certifications) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.location = location;
        this.education = education;
        this.experience = experience;
        this.linkedinUrl = linkedinUrl;
        this.skills = skills;
        this.projects = projects;
        this.publications = publications;
        this.certifications = certifications;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getLinkedinUrl() {
        return linkedinUrl;
    }

    public void setLinkedinUrl(String linkedinUrl) {
        this.linkedinUrl = linkedinUrl;
    }

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public String getProjects() {
        return projects;
    }

    public void setProjects(String projects) {
        this.projects = projects;
    }

    public String getPublications() {
        return publications;
    }

    public void setPublications(String publications) {
        this.publications = publications;
    }

    public String getCertifications() {
        return certifications;
    }

    public void setCertifications(String certifications) {
        this.certifications = certifications;
    }

    @Override
    public String toString() {
        return "UserProfileDTO{" +
                "name='" + name + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", location='" + location + '\'' +
                ", education='" + education + '\'' +
                ", experience='" + experience + '\'' +
                ", linkedinUrl='" + linkedinUrl + '\'' +
                ", skills='" + skills + '\'' +
                ", projects='" + projects + '\'' +
                ", publications='" + publications + '\'' +
                ", certifications='" + certifications + '\'' +
                '}';
    }
}
