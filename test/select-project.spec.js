/* eslint-disable no-undef */
const { Builder, Browser, By, Key } = require("selenium-webdriver");
const { argv } = require("node:process");

describe("Testing of Selecting Project Functionality", async () => {
  let driver;

  console.log(argv[5] != null ? argv[5] : "CHROME");

  before(async function () {
    if (argv[5] === "CHROME") {
      driver = await new Builder().forBrowser(Browser.CHROME).build();
    }
    if (argv[5] === "FIREFOX") {
      driver = await new Builder().forBrowser(Browser.FIREFOX).build();
    }
    if (argv[5] === "EDGE") {
      driver = await new Builder().forBrowser(Browser.EDGE).build();
    }
    if (argv[5] == null) {
      driver = await new Builder().forBrowser(Browser.CHROME).build();
    }
  });

  // 1. Select a Project
  it("Search for template", async () => {
    await driver.get("https://enm-dev.adma.ai/designer");
    await driver.manage().window().maximize();
    await driver
      .findElement(By.className("search"))
      .sendKeys("test", Key.RETURN);
    const template = await driver.findElement(By.className("nonSelected"));
    await driver.actions().scroll(0, 0, 0, 0, template).perform();
    template.click();
    await driver.findElement(By.id("View")).click();
    await driver.sleep(5000);
  });
});
