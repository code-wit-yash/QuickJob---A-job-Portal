package com.JobPortal.demo.DTO;

public class ApplicationResponse {
    private Long applicationId;

    private Long jobId;

    private String title;

    private String companyEmail;

    private String status;

    public ApplicationResponse() {
    }

    public ApplicationResponse(Long applicationId, Long jobId, String title, String companyEmail, String status) {
        this.applicationId = applicationId;
        this.jobId = jobId;
        this.title = title;
        this.companyEmail = companyEmail;
        this.status = status;
    }

    public Long getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(Long applicationId) {
        this.applicationId = applicationId;
    }

    public Long getJobId() {
        return jobId;
    }

    public void setJobId(Long jobId) {
        this.jobId = jobId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCompanyEmail() {
        return companyEmail;
    }

    public void setCompanyEmail(String companyEmail) {
        this.companyEmail = companyEmail;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "ApplicationResponse{" +
                "applicationId=" + applicationId +
                ", jobId=" + jobId +
                ", title='" + title + '\'' +
                ", companyEmail='" + companyEmail + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}
