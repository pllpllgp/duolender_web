package com.example.duolender_back.auth.service;

import com.example.duolender_back.auth.entity.AuthEntity;
import com.example.duolender_back.auth.repository.AuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private AuthRepository authRepository;

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        AuthEntity user = authRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("사용자 없음: " + id));

        return User.builder()
                .username(user.getUserId())
                .password(user.getUserPw())
                .roles("USER")
                .build();
    }
}
