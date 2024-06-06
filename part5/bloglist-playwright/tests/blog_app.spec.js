const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:5173/api/testing/reset");
    await request.post("http://localhost:5173/api/users", {
      data: {
        username: "root",
        name: "Superuser",
        password: "password",
      },
    });

    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    const title = page.getByText("Please Log In");

    const username = page.getByPlaceholder("username");
    const password = page.getByPlaceholder("password");

    const loginButton = page.getByText("login");

    await expect(title).toBeVisible();
    await expect(username).toBeVisible();
    await expect(password).toBeVisible();
    await expect(loginButton).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByTestId("username").fill("root");
      await page.getByTestId("password").fill("password");
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("Logged in as Superuser")).toBeVisible();
      await expect(page.getByRole("button", { name: "Log out" })).toBeVisible();

      const localStorage = await page.evaluate(() => {
        return JSON.parse(JSON.stringify(window.localStorage));
      });

      expect(localStorage).toBeDefined();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByTestId("username").fill("hello");
      await page.getByTestId("password").fill("world");
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("Wrong credentials")).toBeVisible();
      await expect(page.getByText("Wrong credentials")).toHaveCSS(
        "background-color",
        "rgb(255, 153, 153)"
      );
      await expect(
        page.getByRole("button", { name: "Log out" })
      ).not.toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId("username").fill("root");
      await page.getByTestId("password").fill("password");
      await page.getByRole("button", { name: "login" }).click();
    });

    test.only("a new blog can be created", async ({ page }) => {
      const title = "Test Title";
      const author = "Test Author";
      const url = "http://test.com";

      await page.getByRole("button", { name: "New Blog" }).click();

      await page.getByTestId("title").fill(title);
      await page.getByTestId("author").fill(author);
      await page.getByTestId("url").fill(url);

      await page.getByRole("button", { name: "Create" }).click();

      await page.waitForTimeout(1000);

      await expect(
        page.getByText(`A new blog ${title} by ${author} added`)
      ).toBeVisible();

      const listItem = page.locator(".blogListItem").last();

      await expect(listItem).toBeVisible();
    });
  });
});
