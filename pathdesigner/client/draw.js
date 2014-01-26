
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
      // PD stands for "PathDesigner".
      function PD(){}
      window.PD = PD;
    }

    function initializeAnimation() {
      // We create the Animation functional object.
      function Animation(){}

      // Now we attach requestAnimationFrame to Animation
      Animation.requestAnimationFrame = (function () {
        // This implements request animation frame, using the browser's version
        // of it if it's available.  Use requestAnimFrame() in this project.
        return window.requestAnimationFrame   ||
          window.webkitRequestAnimationFrame  ||
          window.mozRequestAnimationFrame     ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
      })();

      // Finally we attach Animation to the PD namespace.
      PD.Animation = Animation;
    }

    function initializeCanvas() {
      // First we create a functional object to contain
      // our canvas data and methods:
      function Canvas(){}
      
      // Now we add the sub-functional object data to Canvas
      // as well as its containers for data that Canvas uses.
      function Data(){}
      Data.canvases = [];
      Canvas.Data = Data;

      // Now we extend the new canvas sub-namespace to have the
      // functionality we'd like to make accessable to other parts
      // of the program.
      Canvas.create = function(canvasProperties, elementToAppendCanvasTo, twoOrThreeDimension) {
        // This method allows us to create a new canvas.  
        // Canvas propterties takes in an object whose keys are valid canvas properties
        // and values are the values for those properties.
        // The elementToAppendCanvasTo should be a part of the dom to place the canvas
        // on as a child.
        // This also creates a context for the canvas.  The canvas and its context are
        // added to Canvas.Data.canvases, as well as returned.
        // twoOrThreeDimension should be either the string "2d" or "3d".
        
        // First we create a new canvas.
        var newCanvas = document.createElement('canvas');

        // Next we set the canvas' attributes by looping through
        // each element in the canvasProperties object, using the key
        // for that element as the property to set on the canvas and the
        // value attached to the key as the value to assign to that property.
        var properties = Object.keys(canvasProperties);
        for (var i = 0; i < properties.length; i++) {
          newCanvas[properties[i]] = canvasProperties[properties[i]];
        }

        // Now we append the canvas to the designated element.
        elementToAppendCanvasTo.appendChild(newCanvas);

        // Now we create a context for this canvas.
        // If not specified, canvas will default to a 2d context.
        if (twoOrThreeDimension === undefined) {
          var newCanvasContext = newCanvas.getContext("2d");
        }
        else {
          var newCanvasContext = newCanvas.getContext(twoOrThreeDimension);
        }

        // And we create an object that pairs the canvas with its context.
        var newCanvasWithContext = {"canvas" : newCanvas, "context" : newCanvasContext};

        // Now we add the canvas with its context data to Canvas.Data.canvases
        Canvas.Data.canvases.push(newCanvasWithContext);

        // And finally we return the canvas with its context to the caller.
        return newCanvasWithContext;
      } // Canvas.create Ends Here
      
      // This function allows us to grab a canvas/context pair by
      // passing the Id of the canvas.
      Canvas.getCanvasById = function(canvasId) {
        var match;
        _.each(PD.Canvas.Data.canvases, function(canvasContextPair){
           if (canvasContextPair.canvas.id === canvasId) {
             match = canvasContextPair;
           }
        });
        // Failure case
        if (match === undefined){
          console.log("The requested canvas was not found.");
        }
        // Success case
        else {
          return match;
        }
      }

      // Finally we append our fleshed out Canvas subclass to the application's
      // PD namespace.
      window.PD.Canvas = Canvas;
    } // initializeCanvses Ends Here

    function initializeDraw() {
      // Draw contains functions that let us do drawing actions
      // on canvases.

      // First we create the Draw functional object
      function Draw(){}

      // Now we add functionality to Draw.
      

      // Finally we append Draw to the PD namespace.
      PD.Draw = Draw;
    }
    
    function setupUI() {
      // This function is responsible for creating and attaching
      // the various parts of the game's UI.  For example things
      // such as the canvas that maps are displayed on.

      // We're going to need a few values from the browser
      // to set up the UI, so we're grabbing them first.
      var windowHeight = window.innerHeight;
      var windowWidth = window.innerWidth;

      // We need to remove the small padding that is applied to
      // the window by default.
      document.body.setAttribute("style",
        "margin : 0;"
        + "padding : 0;"
        + "overflow: hidden;"
      );

      // We create a div named gameView to hold all of the UI 
      // elements and attach it to the body.
      var divUI = document.createElement('div');
      divUI.id = "UI";
      document.body.appendChild(divUI);

      // We use PD.Canvas.create() to create a canvas that will
      // display the background map.  This map should be sized
      // to the size of the entire browser view, and resize itself
      // to maintain that property.
      // We create the canvas.
      var canvasUIMap = PD.Canvas.create({
        "id" : "UIMap",
        "height" : windowHeight,
        "width" : windowWidth
      }, divUI, "2d");
      // And we attach an event listener to the window to fire whenever
      // the window resizes, causing this element to resize with it.
      window.onresize = function() {
        // First we grab the canvas using PD.Canvas.getCanvasById
        var canvasToResize = PD.Canvas.getCanvasById("UIMap").canvas;
        canvasToResize.height = window.innerHeight;
        canvasToResize.width = window.innerWidth;
      };
    }
  //\\***Function Section Ends Here***

  //\\***Run Section Starts Here***
    initializePDNamespace();
    initializeAnimation();
    initializeCanvas();
    setupUI();
  //\\***Run Section Ends Here***

} // End of start

// This is the main initialization sequence which runs our
// start function.

//\\*** Main Initialization Sequence Starts Here***
  // Everything is enclosed in Meteor.startup so that
  // noting will run until everything is ready.
  Meteor.startup(function(){
    start();
  });
//\\*** Main Initialization Sequence Ends Here***
