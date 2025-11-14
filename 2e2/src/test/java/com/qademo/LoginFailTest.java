package com.qademo;

import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class LoginFailTest extends BaseUiTest {

    @Test
    void loginConPasswordIncorrectoMuestraError() {
        driver.get(BASE);
        driver.findElement(By.id("email")).clear();
        driver.findElement(By.id("email")).sendKeys("user@test.com");
        driver.findElement(By.id("password")).clear();
        driver.findElement(By.id("password")).sendKeys("claveMala");
        driver.findElement(By.id("submit")).click();

        // Esperar a que aparezca el mensaje de error
        By errorSelector = By.cssSelector("p.error");
        new WebDriverWait(driver, Duration.ofSeconds(10))
                .until(ExpectedConditions.visibilityOfElementLocated(errorSelector));

        String errorText = driver.findElement(errorSelector).getText().toLowerCase();
        // basta con que haya algún mensaje de error y contenga "credenciales"
        assertTrue(!errorText.isBlank(), "Debe mostrar un mensaje de error");
        assertTrue(errorText.contains("credenciales"), "El mensaje debe mencionar credenciales");
    }
}
