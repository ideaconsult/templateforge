import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser = {}, launchOptions) => {
        if (browser.name === "chrome") {
          launchOptions.args.push("--disable-web-security");
          launchOptions.args.push(
            "--disable-features=IsolateOrigins,site-per-process"
          );
        }
        return launchOptions;
      });
    },
  },
  fixturesFolder: "cypress/fixtures",

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
