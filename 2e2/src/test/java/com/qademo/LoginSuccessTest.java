package com.qademo;

import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class LoginSuccessTest extends BaseUiTest {

    @Test
    void loginConCredencialesCorrectasMuestraProductos() {
        driver.get(BASE);

        driver.findElement(By.id("email")).clear();
        driver.findElement(By.id("email")).sendKeys("user@test.com");
        driver.findElement(By.id("password")).clear();
        driver.findElement(By.id("password")).sendKeys("Pass123!");
        driver.findElement(By.id("submit")).click();

        new WebDriverWait(driver, Duration.ofSeconds(5))
                .until(ExpectedConditions.visibilityOfElementLocated(By.id("welcomeUser")));

        assertTrue(driver.findElement(By.id("welcomeUser")).getText().contains("Productos"));
    }
}
