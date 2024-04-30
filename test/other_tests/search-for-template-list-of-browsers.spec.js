/* eslint-disable no-undef */

const { Builder, Browser, By, Key } = require("selenium-webdriver");

describe("View Template, using different browsers: open Template Designer and Search for Template and Click View", function () {
  let driver;

  const browsers = [
    { browser: "CHROME" },
    { browser: "FIREFOX" },
    { browser: "EDGE" },
  ];

  browsers.forEach(({ browser }) => {
    it(`should search for Template in ${browser} browser and Click Edit`, async function () {
      driver = await new Builder().forBrowser(Browser[`${browser}`]).build();
      await driver.get("https://enm-dev.adma.ai/designer");
      await driver
        .findElement(By.className("search"))
        .sendKeys("test", Key.RETURN);
      const template = await driver.findElement(By.className("nonSelected"));
      await driver.actions().scroll(0, 0, 0, 0, template).perform();
      template.click();
      await driver.findElement(By.id("View")).click();
      await driver.sleep(5000);
      await driver.quit();
    });
  });
});
