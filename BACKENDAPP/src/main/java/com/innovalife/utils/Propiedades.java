package com.innovalife.utils;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class Propiedades {

    private static Properties prop = new Properties();

    public Propiedades() {
        try {
            InputStream input = getClass().getClassLoader().getResourceAsStream("emails.properties");
            if (input == null) {
                System.out.println("Lo siento, no se pudo encontrar el archivo emails.properties");
                return;
            }
                prop.load(input);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static String getProperty(String key) {
        return prop.getProperty(key);
    }
}
