package com.JobPortal.demo.Repository;

import com.JobPortal.demo.Entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findByUserEmail(String userEmail);

    List<Application> findByJobId(Long jobId);

    boolean existsByJobIdAndUserEmail(Long jobId, String userEmail);
}
