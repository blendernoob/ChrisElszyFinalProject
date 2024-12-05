//original platformer game created by L0808866

//allows us to communicate with the serial port on the PCB
var serial;
var latestData = "waiting for data";

var 

//the map editor. Each number is a different tile
var level1 = [
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 3, 4, 3, 4, 3, 3, 0, 0, 0, 0, 0, 3, 0, 3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 7, 2],
  [2, 1, 1, 1, 1, 1, 1, 1, 8, 8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 8, 1, 8, 1, 1, 1, 1, 1, 2],




];

function preload() 
{
  player_image = loadImage("images/player.png");
  player_injured_image = loadImage("images/player.png");
  tiles_image = loadImage("images/tiles.png");
}

function setup() 
{
  createCanvas(800, 600);
  player_injured_image.filter(THRESHOLD);
  player = new Player();
  map1 = new Map(level1);
 
  //from the original P5.serialControl template
  serial = new p5.SerialPort();

  serial.list();
  serial.open('/dev/tty.usbmodem14201');

  serial.on('connected', serverConnected);

  serial.on('list', gotList);

  serial.on('data', gotData);

  serial.on('error', gotError);

  serial.on('open', gotOpen);

  serial.on('close', gotClose);
}

//from the original p5.serialControl template
function serverConnected() 
{
 print("Connected to Server");
}

function gotList(thelist) 
{
 print("List of Serial Ports:");

 for (let i = 0; i < thelist.length; i++) 
 {
  print(i + " " + thelist[i]);
 }
}

function gotOpen() 
{
 print("Serial Port is Open");
}

function gotClose()
{
 print("Serial Port is Closed");
 latestData = "Serial Port is Closed";
}

function gotError(theerror) 
{
 print(theerror);
}

function gotData() 
{
 let currentString = serial.readLine();
  
 trim(currentString);
  
 if (!currentString) 
 {
   return;
 }
  
 console.log(currentString);
 latestData = currentString;
}

//from the original platforming script
function draw() 
{
  background(0, 246, 255);
  map1.draw();
  player.draw();
  player.update();
}


