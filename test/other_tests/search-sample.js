/* eslint-disable no-undef */
const { Builder, Browser, By, Key } = require("selenium-webdriver");

(async function () {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();

  await driver.get("https://enm-dev.adma.ai/designer");

  await driver.findElement(By.className("tab")).click();

  await driver
    .findElement(By.className("search"))
    .sendKeys("hts_metadata_test_finalized", Key.RETURN);

  await driver.findElement(By.className("nonSelected")).click();

  await driver.findElement(By.id("Edit")).click();

  await driver.sleep(5000);

  await driver.quit();
})();
