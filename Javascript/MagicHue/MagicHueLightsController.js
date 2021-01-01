const {Control} = require("magic-home");
const {Discovery} = require('magic-home');

const bathroom = new Control("192.168.1.181");
const bedroom = new Control("192.168.1.214");
const floodTop = new Control("192.168.1.248");
const floodBottom = new Control("192.168.1.249");
const lampTop = new Control("192.168.1.208");
const lampBottom = new Control("192.168.1.210");
const bookshelfA = new Control("192.168.1.184");
const bookshelfB = new Control("192.168.1.185");
const office = new Control("192.168.1.213");

const Bulbs =
    {
      bathroom : new Control("192.168.1.181"),
      bedroom : new Control("192.168.1.214"),
      floodTop : new Control("192.168.1.248"),
      floodBottom : new Control("192.168.1.249"),
      lampTop : new Control("192.168.1.208"),
      lampBottom : new Control("192.168.1.210"),
      bookshelfA : new Control("192.168.1.184"),
      bookshelfB : new Control("192.168.1.185"),
      office : new Control("192.168.1.213")
    }

function
setup() {
  debugger;
  Control.ackMask(2);
  Control.setTimeout = 5000;
  let discovery = new Discovery();
  console.log(Bulbs.bedroom._options)
  for (const value of Object.values(Bulbs)) {
    value.log_all_received = true;
    console.log(value._options);
  }
  console.log(Bulbs.office._options);
}

function dim(whichBulb, percentage) {
  debugger;
  let state = whichBulb.queryState();
  state
      .then((result) => {
        console.log(result);
        console.log(result.color.red);
        console.log(result.color.green);
        console.log(result.color.blue);
        console.log(1.0 - percentage)

        var newRed = result.color.red * (1.0 - percentage);
        var newGreen = result.color.green * (1.0 - percentage);
        var newBlue = result.color.blue * (1.0 - percentage);
        console.log("[" + newRed + "," + newGreen + "," + newBlue + "]");

        Bulbs.bedroom.setColor(newRed, newGreen, newBlue);
        // whichBulb.setColor(newRed, newGreen, newBlue)

        if (result.mode === "color") {
          console.log("it's color!")
        } else {
          console.log("not color");
        };
      })
      .catch((error) => { console.log(error); })
  console.log(state);
}

setup();
Bulbs.bedroom.turnOn;
console.log(Bulbs.bedroom._options);
dim(Bulbs.bedroom, 0.15);
