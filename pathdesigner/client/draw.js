
function start () {
  // Code in start will run once generally before other parts of the app.
  // This is the place to initialize things.
  // 
  // Don't run anything directly from its definition if possible, instead,
  // put everything in a well-named function in the Functions section, and
  // only run things in the Run section.
  //
  // The Function sections comes first, the Run section comes last.

  //\\***Function Section Starts Here***
    function initializePDNamespace() {
      // This sets up the main namespace for this project to store what it can
      // in.  For example, this is where global variables which aren't session
      // variables should go.  This is to avoid cluttering/creating conflicts
      // with other libraries.
      //
      // pd stands for "pathdesigner".
      function PD(){}
      window.PD = PD;
    }

    function initializeRequestAnimFrame () {
      window.requestAnimFrame = (function () {
        // This implements request animation frame, using the browser's version
        // of it if it's available.  Use requestAnimFrame() in this project.
        return window.requestAnimationFrame   ||
          window.webkitRequestAnimationFrame  ||
          window.mozRequestAnimationFrame     ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
      })();
    }

    function initializeCanvases() {
      // First we create a functional object in to contain
      // our canvas data and methods:
      function Canvas(){}

      // Now we extend the new canvas sub-namespace to have the
      // functionality we'd like to make accessable to other parts
      // of the program.
      Canvas.prototype.create = function(canvasProperties, elementToAppendCanvasTo) {
        // This method allows us to create a new canvas.  
        // Canvas propterties takes in an object whose keys are valid canvas properties
        // and values are the values for those properties.
        // The elementToAppendCanvasTo should be a part of the dom to place the canvas
        // on as a child.
        var newCanvas = document.createElement('canvas');
        _.each(canvasProperties, function(property) {
          console.log(property);
        });
      }

      // Finally we append our fleshed out Canvas subclass to the application's
      // PD namespace.
      window.PD.Canvas = Canvas;
    }
  //\\***Function Section Ends Here***

  //\\***Run Section Starts Here***
    initializePDNamespace();
    initializeRequestAnimFrame();
    initializeCanvases();
  //\\***Run Section Ends Here***

} // End of start

// This is the main initialization sequence which runs our
// start and update functions.

//\\*** Main Initialization Sequence Starts Here***
  start();
//\\*** Main Initialization Sequence Ends Here***
