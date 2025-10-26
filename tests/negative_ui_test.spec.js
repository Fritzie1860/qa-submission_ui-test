// tests/negative_ui_test.spec.js
import { test, expect } from "@playwright/test";

const baseUrl = "https://www.saucedemo.com/";

test.describe("SauceDemo - Negative UI Scenarios", () => {
  // N001 - Empty Username and Password Fields
  test("N001 - Empty Username and Password Fields", async ({ page }) => {
    await page.goto(baseUrl);
    await page.click("#login-button");
    const errorMsg = page.locator('[data-test="error"]');
    await expect(errorMsg).toHaveText("Epic sadface: Username is required");
    await expect(page).toHaveURL(baseUrl);
  });

  // N002 - Empty Password Field
  test("N002 - Empty Password Field", async ({ page }) => {
    await page.goto(baseUrl);
    await page.fill("#user-name", "standard_user");
    await page.click("#login-button");
    const errorMsg = page.locator('[data-test="error"]');
    await expect(errorMsg).toHaveText("Epic sadface: Password is required");
    await expect(page).toHaveURL(baseUrl);
  });

  // N003 - Empty Username Field
  test("N003 - Empty Username Field", async ({ page }) => {
    await page.goto(baseUrl);
    await page.fill("#password", "secret_sauce");
    await page.click("#login-button");
    const errorMsg = page.locator('[data-test="error"]');
    await expect(errorMsg).toHaveText("Epic sadface: Username is required");
    await expect(page).toHaveURL(baseUrl);
  });

  // N004 - Error Whitespace Handling in Credentials
  test("N004 - Error Whitespace Handling in Credentials", async ({ page }) => {
    await page.goto(baseUrl);
    await page.fill("#user-name", "standard_user ");
    await page.fill("#password", "secret_sauce");
    await page.click("#login-button");
    const errorMsg = page.locator('[data-test="error"]');
    await expect(errorMsg).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
    await expect(page).toHaveURL(baseUrl);
  });

  // N005 - Error Sensitive Case Handling in Credentials
  test("N005 - Error Sensitive Case Handling in Credentials", async ({
    page,
  }) => {
    await page.goto(baseUrl);
    await page.fill("#user-name", "Standard_User");
    await page.fill("#password", "Secret_Sauce");
    await page.click("#login-button");
    const errorMsg = page.locator('[data-test="error"]');
    await expect(errorMsg).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
    await expect(page).toHaveURL(baseUrl);
  });

  // N006 - Invalid Password
  test("N006 - Invalid Password", async ({ page }) => {
    await page.goto(baseUrl);
    await page.fill("#user-name", "standard_user");
    await page.fill("#password", "wrong_password");
    await page.click("#login-button");
    const errorMsg = page.locator('[data-test="error"]');
    await expect(errorMsg).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
    await expect(page).toHaveURL(baseUrl);
  });

  // N007 - Invalid Username
  test("N007 - Invalid Username", async ({ page }) => {
    await page.goto(baseUrl);
    await page.fill("#user-name", "invalid_user");
    await page.fill("#password", "secret_sauce");
    await page.click("#login-button");
    const errorMsg = page.locator('[data-test="error"]');
    await expect(errorMsg).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
    await expect(page).toHaveURL(baseUrl);
  });
});
