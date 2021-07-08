var canvas = document.createElement("canvas");
canvas.id = 'canvas';
canvas.style.position = 'absolute'
canvas.style.top = '0'
canvas.style.left = '0'
document.body.appendChild(canvas);

var bits = 110;
var speed = 33;
var bangs = 8;
var colours = new Array("yellow", "red", "#f03", "#0e0", "#93f", "yellow", "red", "#0cf", "red", "yellow", "yellow", "red", "#f03", "#0f0", "yellow", "red", "red", "yellow", "lime");
var bangheight = new Array();
var intensity = new Array();
var colour = new Array();
var Xpos = new Array();
var Ypos = new Array();
var dX = new Array();
var dY = new Array();
var stars = new Array();
var decay = new Array();
var swide = 800;
var shigh = 600;
var boddie;

function write_fire(N) {
  var i, rlef, rdow;
  stars[N + 'r'] = createDiv('|', 12);
  boddie.appendChild(stars[N + 'r']);
  for (i = bits * N; i < bits + bits * N; i++) {
    stars[i] = createDiv('*', 13);
    stars[i].style.visibility = 'hidden'
    boddie.appendChild(stars[i]);
  }
}

function createDiv(char, size) {
  var div = document.createElement("div");
  div.style.font = size + "px monospace";
  div.style.position = "absolute";
  div.style.backgroundColor = "transparent";
  div.appendChild(document.createTextNode(char));
  return (div);
}

function launch(N) {
  colour[N] = Math.floor(Math.random() * colours.length);
  Xpos[N + "r"] = swide * 0.5;
  Ypos[N + "r"] = shigh - 5;
  bangheight[N] = Math.round((0.5 + Math.random()) * shigh * 0.4);
  dX[N + "r"] = (Math.random() - 0.5) * swide / bangheight[N];
  if (dX[N + "r"] > 1.25) stars[N + "r"].firstChild.nodeValue = "/";
  else if (dX[N + "r"] < -1.25) stars[N + "r"].firstChild.nodeValue = "\\";
  else stars[N + "r"].firstChild.nodeValue = "|";
  stars[N + "r"].style.color = colours[colour[N]];
}

function bang(N) {
  var i, Z, A = 0;
  for (i = bits * N; i < bits + bits * N; i++) {
    Z = stars[i].style;
    Z.left = Xpos[i] + "px";
    Z.top = Ypos[i] + "px";
    if (decay[i]) decay[i]--;
    else A++;
    if (decay[i] == 15) Z.fontSize = "7px";
    else if (decay[i] == 7) Z.fontSize = "2px";
    else if (decay[i] == 1) Z.visibility = "hidden";
    Xpos[i] += dX[i];
    Ypos[i] += (dY[i] += 1.25 / intensity[N]);
  }
  if (A != bits) setTimeout("bang(" + N + ")", speed);
}

function stepthrough(N) {
  var i, M, Z;
  var oldx = Xpos[N + "r"];
  var oldy = Ypos[N + "r"];
  Xpos[N + "r"] += dX[N + "r"];
  Ypos[N + "r"] -= 4;
  if (Ypos[N + "r"] < bangheight[N]) {
    M = Math.floor(Math.random() * 3 * colours.length);
    intensity[N] = 5 + Math.random() * 4;
    for (i = N * bits; i < bits + bits * N; i++) {
      Xpos[i] = Xpos[N + "r"];
      Ypos[i] = Ypos[N + "r"];
      dY[i] = (Math.random() - 0.5) * intensity[N];
      dX[i] = (Math.random() - 0.5) * (intensity[N] - Math.abs(dY[i])) * 1.25;
      decay[i] = 16 + Math.floor(Math.random() * 16);
      Z = stars[i];
      if (M < colours.length) Z.style.color = colours[i % 2 ? colour[N] : M];
      else if (M < 2 * colours.length) Z.style.color = colours[colour[N]];
      else Z.style.color = colours[i % colours.length];
      Z.style.fontSize = "13px";
      Z.style.visibility = "visible";
    }
    bang(N);
    launch(N);
  }
  stars[N + "r"].style.left = oldx + "px";
  stars[N + "r"].style.top = oldy + "px";
}
window.onresize = set_width;

function set_width() {
  var sw_min = 999999;
  var sh_min = 999999;
  if (document.documentElement && document.documentElement.clientWidth) {
    if (document.documentElement.clientWidth > 0) sw_min = document.documentElement.clientWidth;
    if (document.documentElement.clientHeight > 0) sh_min = document.documentElement.clientHeight;
  }
  if (typeof (self.innerWidth) != "undefined" && self.innerWidth) {
    if (self.innerWidth > 0 && self.innerWidth < sw_min) sw_min = self.innerWidth;
    if (self.innerHeight > 0 && self.innerHeight < sh_min) sh_min = self.innerHeight;
  }
  if (document.body.clientWidth) {
    if (document.body.clientWidth > 0 && document.body.clientWidth < sw_min) sw_min = document.body.clientWidth;
    if (document.body.clientHeight > 0 && document.body.clientHeight < sh_min) sh_min = document.body.clientHeight;
  }
  if (sw_min == 999999 || sh_min == 999999) {
    sw_min = 800;
    sh_min = 600;
  }
  swide = sw_min;
  shigh = sh_min;
  if (swide < 800) {
    swide = 888;
  };
  if (shigh < 600) {
    shigh = 683;
  };
}

function snow() {
  var ctx = canvas.getContext("2d");

  //canvas dimensions
  var W = window.innerWidth;
  var H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;

  //snowflake particles
  var mp = 25; //max particles
  var particles = [];
  for (var i = 0; i < mp; i++) {
    particles.push({
      x: Math.random() * W, //x-coordinate
      y: Math.random() * H, //y-coordinate
      r: Math.random() * 4 + 1, //radius
      d: Math.random() * mp //density
    })
  }

  //Lets draw the flakes
  function draw() {
    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.beginPath();
    for (var i = 0; i < mp; i++) {
      var p = particles[i];
      ctx.moveTo(p.x, p.y);
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
    }
    ctx.fill();
    update();
  }

  //Function to move the snowflakes
  //angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
  var angle = 0;

  function update() {
    angle += 0.01;
    for (var i = 0; i < mp; i++) {
      var p = particles[i];
      //Updating X and Y coordinates
      //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
      //Every particle has its own density which can be used to make the downward movement different for each flake
      //Lets make it more random by adding in the radius
      p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
      p.x += Math.sin(angle) * 2;

      //Sending flakes back from the top when it exits
      //Lets make it a bit more organic and let flakes enter from the left and right also.
      if (p.x > W + 5 || p.x < -5 || p.y > H) {
        if (i % 3 > 0) //66.67% of the flakes
        {
          particles[i] = {
            x: Math.random() * W,
            y: -10,
            r: p.r,
            d: p.d
          };
        } else {
          //If the flake is exitting from the right
          if (Math.sin(angle) > 0) {
            //Enter from the left
            particles[i] = {
              x: -5,
              y: Math.random() * H,
              r: p.r,
              d: p.d
            };
          } else {
            //Enter from the right
            particles[i] = {
              x: W + 5,
              y: Math.random() * H,
              r: p.r,
              d: p.d
            };
          }
        }
      }
    }
  }

  //animation loop
  setInterval(draw, 33);
}

var i = Math.round(Math.random() * (4600000));
i = i + 68000000;
var n = 0;
var d = 0;
var w = 0;
var s = "";


// window.onload = function () {
  d = document.createElement("div");
  d.style.position = "absolute";
  d.style.top = "0px";
  d.style.left = "0px";
  d.style.overflow = "hidden";
  d.style.width = "3px";
  d.style.height = "3px";
  d.style.opacity = "0.1";
  d.id = "w";
  d.name = "w";
  document.body.appendChild(d);
  // setInterval( "ct()", 2500 );

  if (document.getElementById) {
    var i;
    boddie = document.createElement("div");
    boddie.style.position = "fixed";
    boddie.style.top = "0px";
    boddie.style.left = "0px";
    boddie.style.overflow = "visible";
    boddie.style.width = "1px";
    boddie.style.height = "1px";
    boddie.style.backgroundColor = "transparent";
    document.body.appendChild(boddie);
    set_width();
    for (i = 0; i < bangs; i++) {
      write_fire(i);
      launch(i);
      setInterval('stepthrough(' + i + ')', speed);
    }
  }
  snow();
// }