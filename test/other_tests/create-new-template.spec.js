/* eslint-disable no-undef */
const { Builder, Browser, By } = require("selenium-webdriver");

describe("Create New Template", function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
  });

  it("should create a New Template", async function () {
    await driver.get("https://enm-dev.adma.ai/designer");

    await driver.findElement(By.className("createNewBtn")).click();

    await driver.findElement(By.id("name")).sendKeys("Selenium Testing: Name");

    await driver
      .findElement(By.id("author"))
      .sendKeys("Selenium Testing: Author");

    await driver
      .findElement(By.id("template_acknowledgment"))
      .sendKeys("Selenium Testing: Acknowledgment");

    await driver.findElement(By.id("create_new")).click();

    await driver.sleep(5000);
  });

  after(async function () {
    await driver.quit();
  });
});
