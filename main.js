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
      selectedTool = 'pencil',
      strokeSize = getID('strokeSize'),
      strokeValue = getID('strokeValue'),
      strokeColour = getID('strokeColour'),
      strokeMin = 1,
      strokeMax = 30;
      strokeSize.min = strokeValue.min = strokeMin;
      strokeSize.max = strokeValue.max = strokeMax;
      strokeSize.value = strokeValue.value = context.lineWidth;


  // Tool radio buttons
  toolForm.addEventListener('click', function () {
    for (var i = 0; i < tools.length; i++) {
      var tool = tools[i];
      if (tool.checked === true) {
        selectedTool = tool.value;
      }
    }
  });

  // Set stroke size
  strokeSize.addEventListener('change', function (e) {
    context.lineWidth = strokeValue.value = e.target.value;
  });

  // Set stroke colour
  strokeColour.addEventListener('change', function (e) {
    context.strokeStyle = e.target.value;
  });

  // Clear canvas
  var clearCanvas = function () {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  };

  var clearBtn = getID('clear');
      clearBtn.onclick = clearCanvas;

  // Draw
  // Pencil tool
  var drawLine = function (e) {
    var x = e.x - this.offsetLeft,
        y = e.y - this.offsetTop;
    context.lineTo(x, y);
    context.stroke();
  };

  // Rectangle tool
  var rect = { x: 0, y:0, w: 0, h: 0 };

  var drawRect = function (e) {
    var x = e.x - this.offsetLeft,
        y = e.y - this.offsetTop;

    rect.w = x - rect.x;
    rect.h = y - rect.y;

    clearCanvas();

    context.strokeRect(rect.x, rect.y, rect.w, rect.h);
  };


  // Bind mouse events
  // Start drawing on 'mousedown'
  canvas.addEventListener('mousedown', function (e) {
    var x = e.x - this.offsetLeft,
        y = e.y - this.offsetTop;

    // Bind the relevent function to 'mousemove' for the current tool
    switch (selectedTool) {
      case 'pencil':
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


  // On 'mouseup' unbind the 'mousemove' function to stop drawing
  canvas.addEventListener('mouseup', function () {
    switch (selectedTool) {
      case 'pencil':
        context.closePath();
        canvas.removeEventListener('mousemove', drawLine);
        break;

      case 'rectangle':
        canvas.removeEventListener('mousemove', drawRect);
        break;
    }
  });

}());
