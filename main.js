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


  /**
  * Draw
  */
  var draw = function (e) {
    var x = e.x - this.offsetLeft,
      y = e.y - this.offsetTop;

    context.lineTo(x, y);
    context.stroke();
  };

  canvas.addEventListener('mousedown', function (e) {
    var x = e.x - this.offsetLeft,
      y = e.y - this.offsetTop;

    context.moveTo(x, y);
    canvas.addEventListener('mousemove', draw);
  });

  canvas.addEventListener('mouseup', function () {
    canvas.removeEventListener('mousemove', draw);
  });

}());
