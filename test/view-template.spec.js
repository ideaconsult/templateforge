/* eslint-disable no-undef */

const { Builder, Browser, By, Key } = require("selenium-webdriver");

describe("View Template: open Template Designer and Search for Template and Click View", function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
  });

  it("should search for Template in The Table and Click View", async function () {
    await driver.get("https://enm-dev.adma.ai/designer");

    await driver
      .findElement(By.className("search"))
      .sendKeys("test", Key.RETURN);

    await driver.findElement(By.className("nonSelected")).click();

    await driver.findElement(By.id("View")).click();

    await driver.sleep(5000);
  });

  after(async function () {
    await driver.quit();
  });
});
