/* eslint-disable no-undef */
const { Builder, Browser, By, Key } = require("selenium-webdriver");

describe("Creating a Template, fill the survey", function () {
  let driver;

  // https://enm-dev.adma.ai/designer?uuid=86aa3b26-4936-426f-8d66-07ba2144fd8b

  const templateUrl = "https://enm-dev.adma.ai/designer?uuid=";

  const uuid = "86aa3b26-4936-426f-8d66-07ba2144fd8b";

  // const browsers = ["CHROME", "FIREFOX"];

  before(async function () {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
  });

  it("open the template", async function () {
    // 0. Choosing the Template
    await driver.get(`${templateUrl}${uuid}`);
    await driver.manage().window().maximize();
    await driver.sleep(5000);
  });

  // 0.1 Welcome page: renaming
  it("Filling Name, Author and Acknowledgment (0.Welcome )", async function () {
    await driver.findElement(By.id("sq_174i")).clear();
    await driver.findElement(By.id("sq_174i")).sendKeys("New Name", Key.RETURN);

    await driver.findElement(By.id("sq_176i")).clear();
    await driver.findElement(By.id("sq_176i")).sendKeys("Sergey", Key.RETURN);

    await driver.findElement(By.id("sq_175i")).clear();
    await driver
      .findElement(By.id("sq_175i"))
      .sendKeys("New Acknowledgment", Key.RETURN);

    // Scrolling and Click Next
    const buttons = await driver.findElement(By.id("sv-nav-next"));
    await driver.actions().scroll(0, 0, 0, 0, buttons).perform();
    await driver.findElement(By.className("sd-navigation__next-btn")).click();
    await driver.sleep(5000);
  });

  // 1. Method Page
  it("Filling Method Page (1. Method)", async () => {
    await driver.findElement(By.id("sq_178i")).clear();
    await driver
      .findElement(By.id("sq_178i"))
      .sendKeys("Alamar blue", Key.RETURN);

    await driver.findElement(By.id("sq_180i")).clear();
    await driver
      .findElement(By.id("sq_180i"))
      .sendKeys("Alamar blue assay for cell viability", Key.RETURN);

    // Checks Negative controls and Positive controls
    await driver.findElement(By.className("sd-item--allowhover")).click();
    await driver.findElement(By.className("sd-item--allowhover")).click();

    // issue here
    await driver.findElement(By.id("sq_189i")).click();
    // await driver.findElement(By.css('[title="4.1.Appearance"]')).click();

    await driver
      .findElement(By.xpath('//div[@title="4.3.Boiling point")]'))
      .click();

    await driver.sleep(5000);
  });

  // 2. Result Page
  it("Filling Result Page (2. Result)", async () => {
    await driver.findElement(By.id("sq_191i")).clear();
    await driver
      .findElement(By.id("sq_191i"))
      .sendKeys(
        "The results are presented as a links to files, which is additionally processed",
        Key.RETURN
      );

    // Checks Negative controls and Positive controls
    await driver.findElement(By.className("sd-selectbase__label")).click();
    await driver.findElement(By.className("sd-selectbase__label")).click();

    // issue here
    await driver.findElement(By.id("sq_411i")).sendKeys(Key.RETURN);

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
