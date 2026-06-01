package com.JobPortal.demo.Repository;


import com.JobPortal.demo.Entity.CompanyProfile;
import com.JobPortal.demo.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompanyProfileRepository extends JpaRepository<CompanyProfile,Long> {

    Optional<CompanyProfile> findByUser(User user);

    Optional<CompanyProfile> findByUserEmail(String email);
}
