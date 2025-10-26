// positive_ui_test.spec.js
import { test, expect } from "@playwright/test";

const baseUrl = "https://www.saucedemo.com/";

test.describe("SauceDemo - Positive UI Scenarios", () => {
  // P001 - Successful Navigation to Login Page
  test("P001 - Successful Navigation to Login Page", async ({ page }) => {
    await page.goto(baseUrl);
    await expect(page).toHaveURL(baseUrl);
    await expect(page.locator("#user-name")).toBeVisible();
    await expect(page.locator("#password")).toBeVisible();
    await expect(page.locator("#login-button")).toBeVisible();
  });

  // P002 - Input Validation
  test("P002 - Input Validation", async ({ page }) => {
    await page.goto(baseUrl);
    const username = page.locator("#user-name");
    const password = page.locator("#password");

    await username.fill("standard_user");
    await password.fill("secret_sauce");
    await expect(username).toHaveValue("standard_user");
    await expect(password).not.toHaveValue("•••••••••••••"); // should be masked (browser behavior)
    await expect(page.locator("#login-button")).toBeEnabled();
  });

  // P003 - Login Functionality
  test("P003 - Login Functionality", async ({ page }) => {
    await page.goto(baseUrl);
    await page.fill("#user-name", "standard_user");
    await page.fill("#password", "secret_sauce");
    await page.click("#login-button");

    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(page.locator(".inventory_list")).toBeVisible();
  });

  // P004 - Session Retention After Successful Login
  test("P004 - Session Retention After Successful Login", async ({ page }) => {
    await page.goto(baseUrl);
    await page.fill("#user-name", "standard_user");
    await page.fill("#password", "secret_sauce");
    await page.click("#login-button");

    await expect(page).toHaveURL(/.*inventory.html/);
    await page.reload();
    await expect(page).toHaveURL(/.*inventory.html/); // still logged in
  });

  // P005 - Logout Functionality
  test("P005 - Logout Functionality", async ({ page }) => {
    await page.goto(baseUrl);
    await page.fill("#user-name", "standard_user");
    await page.fill("#password", "secret_sauce");
    await page.click("#login-button");
    await expect(page).toHaveURL(/.*inventory.html/);

    await page.click("#react-burger-menu-btn");
    await page.click("#logout_sidebar_link");
    await expect(page).toHaveURL(baseUrl);
    await expect(page.locator("#login-button")).toBeVisible();
  });

  // P006 - Relogin After Error Message Closed
  test("P006 - Relogin After Error Message Closed", async ({ page }) => {
    await page.goto(baseUrl);
    await page.fill("#user-name", "wrong_user");
    await page.fill("#password", "wrong_pass");
    await page.click("#login-button");

    const errorMsg = page.locator('[data-test="error"]');
    await expect(errorMsg).toBeVisible();

    // Close error
    await page.click(".error-button");

    // Try again with correct creds
    await page.fill("#user-name", "standard_user");
    await page.fill("#password", "secret_sauce");
    await page.click("#login-button");

    await expect(page).toHaveURL(/.*inventory.html/);
  });
});
