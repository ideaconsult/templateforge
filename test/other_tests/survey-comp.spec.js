/* eslint-disable no-undef */
const { Builder, Browser, By, Key } = require("selenium-webdriver");

describe("Creating a Template, fill the survey", function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
  });

  it("should fill the survey fields, go through all gages", async function () {
    // 0. Creating a new Template
    // await driver.get("https://enm-dev.adma.ai/designer");
    // await driver.findElement(By.className("createNewBtn")).click();
    // await driver.findElement(By.id("name")).sendKeys("Selenium Testing: Name");
    // await driver
    //   .findElement(By.id("author"))
    //   .sendKeys("Selenium Testing: Author");
    // await driver
    //   .findElement(By.id("template_acknowledgment"))
    //   .sendKeys("Selenium Testing: Acknowledgment");
    // await driver.findElement(By.id("create_new")).click();

    // 0. Choosing the Template
    await driver.get("https://enm-dev.adma.ai/designer");
    await driver.findElement(By.id("Draft")).click();
    await driver
      .findElement(By.className("search"))
      .sendKeys("Selenium Testing: Name", Key.RETURN);
    await driver.findElement(By.className("nonSelected")).click();
    await driver.findElement(By.id("Edit")).click();
    await driver.sleep(5000);

    // 0.1 Welcome page: renaming

    await driver.findElement(By.id("sq_396i")).clear();
    await driver.findElement(By.id("sq_396i")).sendKeys("New Name", Key.RETURN);

    await driver.findElement(By.id("sq_398i")).clear();
    await driver
      .findElement(By.id("sq_398i"))
      .sendKeys("New Author", Key.RETURN);

    await driver.findElement(By.id("sq_397i")).clear();
    await driver
      .findElement(By.id("sq_397i"))
      .sendKeys("New Acknowledgment", Key.RETURN);

    // Scrolling
    const buttons = await driver.findElement(By.id("sv-nav-next"));
    await driver.actions().scroll(0, 0, 0, 0, buttons).perform();

    await driver.findElement(By.className("sd-checkbox--allowhover")).click();

    await driver.findElement(By.className("sd-navigation__next-btn")).click();

    await driver.sleep(5000);

    console.log("END of Welcome page");

    // 1. Method Page
    await driver.findElement(By.id("sq_400i")).clear();
    await driver
      .findElement(By.id("sq_400i"))
      .sendKeys("Alamar blue", Key.RETURN);

    await driver.findElement(By.id("sq_402i")).clear();
    await driver
      .findElement(By.id("sq_402i"))
      .sendKeys("Alamar blue assay for cell viability", Key.RETURN);

    // Checks Negative controls and Positive controls
    await driver.findElement(By.className("sd-item--allowhover")).click();
    await driver.findElement(By.className("sd-item--allowhover")).click();

    // issue here
    await driver.findElement(By.id("sq_411i")).sendKeys(Key.RETURN);

    await driver.sleep(5000);
  });

  after(async function () {
    await driver.quit();
  });
});
