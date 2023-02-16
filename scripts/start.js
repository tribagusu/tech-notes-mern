const concurrently = require("concurrently");
const chalk = require("chalk");
const Logger = require("./helpers/logger");
const ms = require("ms");
const start = new Date().getTime();

Logger.info(`DEVELOPMENT MODE`);

(async () => {
  try {
    const { result } = concurrently(
      [
        { name: chalk.magenta("server"), command: "yarn server" },
        { name: chalk.cyan("client"), command: "yarn client" },
      ],
      {
        prefix: "name",
        killOthers: ["failure"],
        restartTries: 0,
      }
    );

    result.then(
      (data) => {
        const finish = new Date().getTime();
        Logger.success(`development was run for ${ms(finish - start)}`);
        process.exit(0);
      },
      (err) => {
        console.log(err);
        Logger.error(`error occurred`);
        process.exit(0);
      }
    );
  } catch (err) {
    Logger.error(err);
    Logger.error("error occurred");
    process.exit(0);
  }
})();
