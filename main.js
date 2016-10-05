(function() {

  var getID = function (id) { return document.getElementById(id) },
    getN = function (n) { return document.getElementsByName(n) };

  // Canvas
  var canvas = getID('my_canvas'),
    context = canvas.getContext('2d');
    context.lineJoin = context.lineCap = "round";
    context.lineWidth = 5;

  // Controls
  var toolForm = getID('toolForm'),
    tools = getN('tools'),
    selectedTool = 'pen';

  toolForm.addEventListener('click', function () {
    for (var i = 0; i < tools.length; i++) {
      var tool = tools[i];
      if (tool.checked === true) {
        selectedTool = tool.value;
      }
    }
  });

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

    context.strokeRect(rect.x, rect.y, rect.w, rect.h);
  };


  // Bind mouse events
  canvas.addEventListener('mousedown', function (e) {
    var x = e.x - this.offsetLeft,
      y = e.y - this.offsetTop;

    switch (selectedTool) {
      case 'pen':
        context.beginPath();
        context.moveTo(x, y);

        canvas.addEventListener('mousemove', drawLine);
        break;

      case 'rectangle':
        rect.x = x;
        rect.y = y;

        canvas.addEventListener('mousemove', drawRect);
        break;

      default:
        console.error('Unknown tool seleceted: ', selectedTool);
    }
  });


  canvas.addEventListener('mouseup', function () {
    switch (selectedTool) {
      case 'pen':
        context.closePath();
        canvas.removeEventListener('mousemove', drawLine);
        break;

      case 'rectangle':
        canvas.removeEventListener('mousemove', drawRect);
        break;
    }
  });

}());
