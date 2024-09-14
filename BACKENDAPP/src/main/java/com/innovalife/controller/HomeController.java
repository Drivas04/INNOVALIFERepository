package com.innovalife.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class HomeController {

    @RequestMapping("/")
    public String home() {
        return "Bienvenido!";
    }

    @RequestMapping("/usuario")
    public Principal usuario(Principal u) {
        return u;
    }

    @RequestMapping("/login")
    public String login() {
        return "Bienvenido!";
    }

    @RequestMapping("/login")
    public String logins() {
        return "Bienvenido!";
    }
}
