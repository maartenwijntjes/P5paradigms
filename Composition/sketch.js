/*
This P5 sketch was made by Maarten Wijntjes and Mitchell Van Zuijlen, 
*/

let running = true;

let dataHeader = ['x', 'y'];
let counter = 0;
let maxtrials = 1;
let data;

function preload() {
  im1 = loadImage('https://p5paradigms.s3.eu-central-1.amazonaws.com/Composition/images/staalmeesters1.png');
  im2 = loadImage('https://p5paradigms.s3.eu-central-1.amazonaws.com/Composition/images/staalmeesters2.png');
  im3 = loadImage('https://p5paradigms.s3.eu-central-1.amazonaws.com/Composition/images/staalmeesters3.png');

}

function setup() {

  canvas = createCanvas(im1.width, im1.height);

  if (!onP5Editor()) {
    canvas.parent('p5sketch');
  }
  data = new p5.Table();
  for (let i = 0; i < dataHeader.length; i++) {
    data.addColumn(dataHeader[i]);
  }
  noCursor();
}

function draw() {
  if (running) {
    image(im1, 0, 0);
    image(im3, mouseX - 50, mouseY - 30);
    image(im2, 0, 0);
  } else {
    background(160, 190, 210);
    noStroke();
    fill(0);
    textSize(16)
    text('Thanks! you can press submit now!\n\n(to see the \'answer\' google \"Syndics of the Drapers\' Guild\")', 20, height / 2);
  }

}


function mousePressed() {
  let newRow = data.addRow();
  newRow.setNum('x', mouseX);
  newRow.setNum('y', mouseY);
  counter++;
  if (counter >= maxtrials) {
    running = false;
    finished();
    counter = 0;
  }
}

function finished() {
  if (onP5Editor()) {
    saveTable(data, 'data.csv'); // This would work in the p5 editor
  } else {
    let expout = document.getElementById('expout');
    expout.value = table2csv();
  }
}

function table2csv() {
  let outstrheader = join(dataHeader, ',');

  let nrows = data.getRowCount();
  let ncols = dataHeader.length;

  let outstr = [];
  for (let j = 0; j < nrows; j++) {
    let tempArray = [];
    for (let i = 0; i < ncols; i++) {
      tempArray[i] = data.get(j, i);
    }
    outstr[j] = join(tempArray, ',');
  }
  return outstrheader + '\n' + join(outstr, '\n');
}

function onP5Editor() {
  let document_ancestor = document.location.ancestorOrigins;
  if (document_ancestor.length) { // if it's in an iframe{}
    return document_ancestor[0].includes('editor.p5js.org');
  }
  return false;
}