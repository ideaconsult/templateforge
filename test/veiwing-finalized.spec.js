/* eslint-disable no-undef */
const { Builder, Browser, By, Key } = require("selenium-webdriver");

describe("Veiwing Finalized Blueprint", async () => {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
  });

  // 1. Search for the template
  it("Search for template", async () => {
    await driver.get("https://enm-dev.adma.ai/designer");
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

    // await driver.findElement(By.className("sd-navigation__next-btn")).click();

    await driver.sleep(5000);
  });

  after(async function () {
    await driver.quit();
  });
});
