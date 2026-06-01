package com.JobPortal.demo.DTO;

public class CompanyStatsDTO {
    private long jobsPosted;
    private long applicants;
    private long hired;

    public CompanyStatsDTO() {
    }

    public CompanyStatsDTO(
            long jobsPosted,
            long applicants,
            long hired
    ) {
        this.jobsPosted = jobsPosted;
        this.applicants = applicants;
        this.hired = hired;
    }

    public long getJobsPosted() {
        return jobsPosted;
    }

    public void setJobsPosted(long jobsPosted) {
        this.jobsPosted = jobsPosted;
    }

    public long getApplicants() {
        return applicants;
    }

    public void setApplicants(long applicants) {
        this.applicants = applicants;
    }

    public long getHired() {
        return hired;
    }

    public void setHired(long hired) {
        this.hired = hired;
    }
}
