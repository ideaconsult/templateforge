/* eslint-disable no-undef */
const { Builder, Browser, By, Key } = require("selenium-webdriver");

describe("Share a Template", function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
  });

  it("should search for Template in The Table", async function () {
    await driver.get("https://enm-dev.adma.ai/designer");

    await driver.findElement(By.id("Draft")).click();

    await driver
      .findElement(By.className("search"))
      .sendKeys("HARMLESS", Key.RETURN);

    await driver.findElement(By.className("nonSelected")).click();

    await driver.findElement(By.id("Share a link")).click();
    await driver.switchTo().newWindow("tab");

    // await driver.get(templateUrl);
    // await driver
    //   .findElement(By.id("name"))
    //   .sendKeys("Selenium Testing: Name (copy)");

    // await driver
    //   .findElement(By.id("author"))
    //   .sendKeys("Selenium Testing: Author (copy)");

    // await driver
    //   .findElement(By.id("template_acknowledgment"))
    //   .sendKeys("Selenium Testing: Acknowledgment (copy)");

    // await driver.findElement(By.className("Button")).click();

    await driver.sleep(5000);
  });

  after(async function () {
    await driver.quit();
  });
});
