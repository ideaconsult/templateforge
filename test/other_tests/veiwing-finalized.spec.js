/* eslint-disable no-undef */
const { Builder, Browser, By, Key } = require("selenium-webdriver");
const { argv } = require("node:process");

describe("Veiwing Finalized Blueprint", async () => {
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

  // 1. Search for the template
  it("Search for template", async () => {
    await driver.get("https://enm-dev.adma.ai/designer");

    await driver.manage().window().maximize();

    await driver
      .findElement(By.className("search"))
      .sendKeys("ALI exposure Alamar Blue", Key.RETURN);
    await driver.findElement(By.id("View")).click();

    const template = await driver.findElement(By.className("nonSelected"));
    await driver.actions().scroll(0, 0, 0, 0, template).perform();
    template.click();

    await driver.findElement(By.id("View")).click();
    await driver.sleep(5000);
  });

  it("Go to the Next Page (1. Method)", async () => {
    // Scrolling
    const buttons = await driver.findElement(By.id("sv-nav-next"));
    await driver.actions().scroll(0, 0, 0, 0, buttons).perform();

    await driver.findElement(By.className("sd-navigation__next-btn")).click();

    await driver.sleep(5000);
  });

  it("Go to the Next Page (2. Result)", async () => {
    // Scrolling
    const buttons = await driver.findElement(By.id("sv-nav-next"));
    await driver.actions().scroll(0, 0, 0, 0, buttons).perform();

    await driver.findElement(By.className("sd-navigation__next-btn")).click();

    await driver.sleep(5000);
  });

  it("Go to the Next Page (3. Method parameters)", async () => {
    // Scrolling
    const buttons = await driver.findElement(By.id("sv-nav-next"));
    await driver.actions().scroll(0, 0, 0, 0, buttons).perform();

    await driver.findElement(By.className("sd-navigation__next-btn")).click();

    await driver.sleep(5000);
  });

  it("Go to the Next Page (4. Sample)", async () => {
    // Scrolling
    const buttons = await driver.findElement(By.id("sv-nav-next"));
    await driver.actions().scroll(0, 0, 0, 0, buttons).perform();

    await driver.findElement(By.className("sd-navigation__next-btn")).click();

    await driver.sleep(5000);
  });

  it("Go to the Next Page (5. Sample preparation)", async () => {
    // Scrolling
    const buttons = await driver.findElement(By.id("sv-nav-next"));
    await driver.actions().scroll(0, 0, 0, 0, buttons).perform();

    await driver.findElement(By.className("sd-navigation__next-btn")).click();

    await driver.sleep(5000);
  });

  it("Go to the Next Page (6. Provenance)", async () => {
    // Scrolling
    const buttons = await driver.findElement(By.id("sv-nav-next"));
    await driver.actions().scroll(0, 0, 0, 0, buttons).perform();

    await driver.findElement(By.className("sd-navigation__next-btn")).click();

    await driver.sleep(5000);
  });

  it("Go to the Next Page (7. Layout)", async () => {
    // Scrolling
    const buttons = await driver.findElement(By.id("sv-nav-next"));
    await driver.actions().scroll(0, 0, 0, 0, buttons).perform();

    await driver.findElement(By.className("sd-navigation__next-btn")).click();

    await driver.sleep(5000);
  });

  it("Go to the Next Page (8. Preview/Finalize)", async () => {
    // Scrolling
    const buttons = await driver.findElement(By.id("sv-nav-next"));
    await driver.actions().scroll(0, 0, 0, 0, buttons).perform();

    await driver.sleep(5000);
  });

  it("Generate Excel File", async () => {
    await driver.findElement(By.id("Generate Excel Template")).click();

    await driver.sleep(5000);
  });

  after(async function () {
    await driver.quit();
  });
});
