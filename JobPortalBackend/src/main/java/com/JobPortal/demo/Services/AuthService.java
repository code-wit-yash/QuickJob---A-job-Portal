package com.JobPortal.demo.Services;

import com.JobPortal.demo.Util.JwtUtil;
import com.JobPortal.demo.DTO.LoginRequest;
import com.JobPortal.demo.DTO.RegisterRequest;
import com.JobPortal.demo.Entity.User;
import com.JobPortal.demo.Repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @Transactional
    public String register(RegisterRequest request){

        User user = new User(request.getName(), request.getEmail(), passwordEncoder.encode(request.getPassword()), request.getRole());

        userRepository.save(user);

        System.out.println("USER SAVED: " + user); // debug

        return "User Registered Successfully";
    }

    @Transactional
    public Map<String, String>  login(LoginRequest request){
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(()-> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())){
            throw new RuntimeException("Invalid password");
        }


        Map<String, String> response = new HashMap<>();

        response.put("token", jwtUtil.generateToken(user.getEmail()));
        response.put("role", user.getRole());

        return response;
    }
}
