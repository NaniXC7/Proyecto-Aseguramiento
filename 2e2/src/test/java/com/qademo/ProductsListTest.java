package com.qademo;

import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;

public class ProductsListTest extends BaseUiTest {

    @Test
    void alEntrarAlListadoHayAlMenosUnProducto() {
        loginAsDefaultUser();

        // Esperar a que haya al menos una fila en la tabla
        new WebDriverWait(driver, Duration.ofSeconds(10))
                .until(ExpectedConditions.numberOfElementsToBeMoreThan(
                        By.cssSelector("tbody tr"), 0));

        List<WebElement> rows = driver.findElements(By.cssSelector("tbody tr"));
        assertFalse(rows.isEmpty(), "Debe existir al menos 1 producto (el seed)");
    }
}
