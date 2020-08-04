package ru.mixed.mixed;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;

@SpringBootApplication
public class Application {

	public static void main(String[] args) throws IOException {
//		Runtime runtime = Runtime.getRuntime();
//		runtime.exec("rundll32 url.dll,FileProtocolHandler " + "http://localhost:8080/login");
		SpringApplication.run(Application.class, args);
		}


}