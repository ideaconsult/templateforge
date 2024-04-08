/* eslint-disable no-undef */
const { Builder, Browser, By, Key } = require("selenium-webdriver");

describe("Open Template Designer and Search for Template", function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
  });

  it("should search for Template in The Table", async function () {
    await driver.get("https://enm-dev.adma.ai/designer");

    await driver.findElement(By.id("Draft")).click();

    await driver
      .findElement(By.className("search"))
      .sendKeys("test", Key.RETURN);

    await driver.findElement(By.className("nonSelected")).click();

    await driver.findElement(By.id("Edit")).click();

    await driver.sleep(5000);
  });

  after(async function () {
    await driver.quit();
  });
});
