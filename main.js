(function() {

  var getID = function (id) { return document.getElementById(id) };

  // Canvas
  var canvas = getID('my_canvas'),
    context = canvas.getContext('2d');
    context.lineJoin = context.lineCap = "round";
    context.lineWidth = 5;

  // Clear canvas
  var clearBtn = getID('clear').onclick = function () {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  };

  // Draw
  var drawLine = function (e) {
    var x = e.x - this.offsetLeft,
      y = e.y - this.offsetTop;

    context.lineTo(x, y);
    context.stroke();
  };

  var rect = {
    x: 0,
    y:0,
    w: 0,
    h: 0
  };

  var drawRect = function (e) {
    var x = e.x - this.offsetLeft,
      y = e.y - this.offsetTop;

    rect.w = x - rect.x;
    rect.h = y - rect.y;

    context.fillRect(rect.x, rect.y, rect.w, rect.h);
  };

  canvas.addEventListener('mousedown', function (e) {
    var x = e.x - this.offsetLeft,
      y = e.y - this.offsetTop;

    // context.beginPath();
    // context.moveTo(x, y);
    // canvas.addEventListener('mousemove', drawLine);

    rect.x = x;
    rect.y = y;

    canvas.addEventListener('mousemove', drawRect);
  });

  canvas.addEventListener('mouseup', function () {
    // context.closePath();
    // canvas.removeEventListener('mousemove', drawLine);
    canvas.removeEventListener('mousemove', drawRect);
  });

}());
