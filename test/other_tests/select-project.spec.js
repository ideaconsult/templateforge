/* eslint-disable no-undef */
const { Builder, Browser, By } = require("selenium-webdriver");
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

  // 1. Select a project
  it("Select a project", async () => {
    await driver.get("https://enm-dev.adma.ai/designer");
    await driver.manage().window().maximize();
    await driver.findElement(By.id("preferences")).click();
    await driver.findElement(By.className("selectBtn")).click();
    await driver
      .findElement(By.xpath('//*[@data-project="calibrate"]'))
      .click();
    await driver.sleep(2000);
    await driver.findElement(By.id("okBtn")).click();
    await driver.sleep(5000);
  });

  it("Clear", async () => {
    await driver.findElement(By.id("preferences")).click();
    await driver.findElement(By.className("closeBtn")).click();

    await driver.sleep(2000);
    await driver.findElement(By.id("okBtn")).click();
    await driver.sleep(5000);
  });
});
