package com.JobPortal.demo.Entity;


import jakarta.persistence.*;

@Entity
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String title;

    @Column(length = 2000)
    private String description;

    private String location;

    private double salary;

    @Column(name = "experience_required")
    private int experienceRequired;

    @Column(name = "skills_required")
    private String skillsRequired;

    @Column(name = "company_email")
    private String companyEmail;

    public Job(String title, String description, String location, double salary, int experienceRequired, String skillsRequired, String companyEmail) {
        this.title = title;
        this.description = description;
        this.location = location;
        this.salary = salary;
        this.experienceRequired = experienceRequired;
        this.skillsRequired = skillsRequired;
        this.companyEmail = companyEmail;
    }

    public Job() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    public int getExperienceRequired() {
        return experienceRequired;
    }

    public void setExperienceRequired(int experienceRequired) {
        this.experienceRequired = experienceRequired;
    }

    public String getSkillsRequired() {
        return skillsRequired;
    }

    public void setSkillsRequired(String skillsRequired) {
        this.skillsRequired = skillsRequired;
    }

    public String getCompanyEmail() {
        return companyEmail;
    }

    public void setCompanyEmail(String companyEmail) {
        this.companyEmail = companyEmail;
    }
}
