const chalk = require("chalk");

const Logger = {
  clear() {
    process.stdout.write("\\033c");
  },

  info() {
    console.log.apply(console, [`${chalk.blue("[info]")}`, ...arguments]);
  },

  error() {
    console.log.apply(console, [`${chalk.red("[error]")}`, ...arguments]);
  },

  warn() {
    console.log.apply(console, [`${chalk.yellow("[warning]")}`, ...arguments]);
  },

  success() {
    console.log.apply(console, [`${chalk.green("[success]")}`, ...arguments]);
  },
};

module.exports = Logger;

