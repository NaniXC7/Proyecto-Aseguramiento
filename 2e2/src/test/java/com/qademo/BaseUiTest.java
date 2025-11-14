package com.qademo;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class BaseUiTest {

    protected WebDriver driver;
    protected String BASE = "http://localhost:5173";

    @BeforeEach
    void setup() {
        WebDriverManager.chromedriver().setup();
        ChromeOptions opts = new ChromeOptions();
        // si quieres ver el navegador, comenta la siguiente línea:
        opts.addArguments("--headless=new");
        driver = new ChromeDriver(opts);
    }

    @AfterEach
    void tearDown() {
        if (driver != null) driver.quit();
    }

    /** Login estándar y espera a que cargue la pantalla de productos */
    protected void loginAsDefaultUser() {
        driver.get(BASE);
        driver.findElement(By.id("email")).clear();
        driver.findElement(By.id("email")).sendKeys("user@test.com");
        driver.findElement(By.id("password")).clear();
        driver.findElement(By.id("password")).sendKeys("Pass123!");
        driver.findElement(By.id("submit")).click();

        // Esperar hasta que aparezca el título de productos
        new WebDriverWait(driver, Duration.ofSeconds(10))
                .until(ExpectedConditions.visibilityOfElementLocated(By.id("welcomeUser")));
    }
}
