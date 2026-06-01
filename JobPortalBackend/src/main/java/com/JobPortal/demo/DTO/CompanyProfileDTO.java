package com.JobPortal.demo.DTO;

public class CompanyProfileDTO {
    private String companyName;

    private String location;

    private String website;

    private String helpNumber;

    private String description;


    public CompanyProfileDTO(String companyName, String location, String website, String helpNumber, String description) {
        this.companyName = companyName;
        this.location = location;
        this.website = website;
        this.helpNumber = helpNumber;
        this.description = description;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getHelpNumber() {
        return helpNumber;
    }

    public void setHelpNumber(String helpNumber) {
        this.helpNumber = helpNumber;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "CompanyProfileDTO{" +
                "companyName='" + companyName + '\'' +
                ", location='" + location + '\'' +
                ", website='" + website + '\'' +
                ", helpNumber='" + helpNumber + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
