package com.qademo;

import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class CreateProductUiTest extends BaseUiTest {

    @Test
    void crearProductoDesdeLaUiYVerloEnLaTabla() {
        loginAsDefaultUser();

        // Esperar a que exista el input nombre
        new WebDriverWait(driver, Duration.ofSeconds(10))
                .until(ExpectedConditions.visibilityOfElementLocated(By.id("nombre")));

        String nombre = "Prod-" + System.currentTimeMillis();
        driver.findElement(By.id("nombre")).sendKeys(nombre);
        driver.findElement(By.id("precio")).sendKeys("55.5");
        driver.findElement(By.cssSelector("button.save")).click();

        // Esperar a que la tabla tenga al menos una fila que contenga el nombre
        new WebDriverWait(driver, Duration.ofSeconds(10))
                .until(d -> {
                    List<WebElement> rows = d.findElements(By.cssSelector("tbody tr"));
                    return rows.stream().anyMatch(r -> r.getText().contains(nombre));
                });

        List<WebElement> rows = driver.findElements(By.cssSelector("tbody tr"));
        boolean found = rows.stream().anyMatch(r -> r.getText().contains(nombre));
        assertTrue(found, "El producto nuevo debe aparecer en la tabla");
    }
}
