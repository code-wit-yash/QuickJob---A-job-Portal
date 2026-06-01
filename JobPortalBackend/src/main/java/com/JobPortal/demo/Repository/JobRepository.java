package com.JobPortal.demo.Repository;

import com.JobPortal.demo.Entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job,Long> {
    List<Job> findByCompanyEmail(String companyEmail);
}
