/* eslint-disable no-undef */
const { Builder, Browser, By, Key } = require("selenium-webdriver");

describe("Simple sequence of tests", async () => {
  let driver;

  // const browsers = [
  //   { browser: "CHROME" },
  //   { browser: "FIREFOX" },
  //   { browser: "EDGE" },
  // ];

  before(async function () {
    driver = await new Builder().forBrowser(Browser.FIREFOX).build();
  });

  // 1. Search for the template
  it("Search for template", async () => {
    await driver.get("https://enm-dev.adma.ai/designer");
    await driver
      .findElement(By.className("search"))
      .sendKeys("test", Key.RETURN);
    const template = await driver.findElement(By.className("nonSelected"));
    await driver.actions().scroll(0, 0, 0, 0, template).perform();
    template.click();
    await driver.findElement(By.id("View")).click();
    await driver.sleep(5000);
  });

  // 2. View Finalized Template
  it("View Finalized Template", async () => {
    await driver.get("https://enm-dev.adma.ai/designer");
    await driver
      .findElement(By.className("search"))
      .sendKeys("test", Key.RETURN);
    const template = await driver.findElement(By.className("nonSelected"));
    await driver.actions().scroll(0, 0, 0, 0, template).perform();
    template.click();
    await driver.findElement(By.id("View")).click();
    await driver.sleep(5000);
  });

  // 3. Create a New Template
  it("Create a New Template", async () => {
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

  // 4. Copy an existing Template
  it("Copy an existing Template", async () => {
    await driver.get("https://enm-dev.adma.ai/designer");
    await driver.findElement(By.id("Draft")).click();
    await driver
      .findElement(By.className("search"))
      .sendKeys("HARMLESS", Key.RETURN);
    await driver.findElement(By.className("nonSelected")).click();
    await driver.findElement(By.id("makeCopy")).click();
    await driver
      .findElement(By.id("name"))
      .sendKeys("Selenium Testing: Name (copy)");
    await driver
      .findElement(By.id("author"))
      .sendKeys("Selenium Testing: Author (copy)");
    await driver
      .findElement(By.id("template_acknowledgment"))
      .sendKeys("Selenium Testing: Acknowledgment (copy)");
    await driver.findElement(By.className("Button")).click();
    await driver.sleep(5000);
  });

  // 5. Generate Excel File from Start Screen
  it("Generate Excel File from Start Screen", async () => {
    await driver.get("https://enm-dev.adma.ai/designer");
    await driver
      .findElement(By.className("search"))
      .sendKeys("hts", Key.RETURN);
    await driver.findElement(By.className("nonSelected")).click();
    await driver.findElement(By.id("Generate Excel Template")).click();
    await driver.sleep(5000);
  });

  // 6. Share Template
  it("Share Template", async () => {});

  after(async () => {
    await driver.quit();
  });
});
