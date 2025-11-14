package com.qademo;

import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class LogoutTest extends BaseUiTest {

    @Test
    void logoutRegresaAlLogin() {
        loginAsDefaultUser();

        // Esperar a que esté visible el botón Salir
        By logoutBtn = By.xpath("//button[contains(.,'Salir')]");
        new WebDriverWait(driver, Duration.ofSeconds(10))
                .until(ExpectedConditions.elementToBeClickable(logoutBtn));

        driver.findElement(logoutBtn).click();

        // Esperar a que vuelva el formulario de login
        new WebDriverWait(driver, Duration.ofSeconds(10))
                .until(ExpectedConditions.visibilityOfElementLocated(By.id("email")));

        assertTrue(driver.findElement(By.id("email")).isDisplayed());
        assertTrue(driver.findElement(By.id("password")).isDisplayed());
    }
}
