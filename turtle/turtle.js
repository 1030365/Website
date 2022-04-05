"use strict;"

// =====================================================================================
  
var color = {black : "#ffffff", red : "#ff0000", green : "#00ff00", blue : "#0000ff", yellow : "#ffff00",  fuchsia : "#ff00ff",  aqua : "#00ffff"}   
  
var turtle = { x: 0, y: 0, angleInRadians: 0, penDown: false, penColor: "#000000", lineWidth: 2};

var canvas = document.getElementById('myDrawing');


  
if (canvas && canvas.getContext)  {     // does the browser support 'canvas'?
  	turtle.ct = canvas.getContext("2d");   // get drawing context
} else {
    alert('You need a browser which supports the HTML5 canvas!');
}  

// =====================================================================================
  


turtle.logPenStatus = function() {
    console.log('x=' + this.x + "; y=" + this.y + '; angle = ' + this.angle + '; penDown = ' + this.penDown);
}

  
turtle.forward = function(length) {
  // console.log('forward(' + length + ')');
  // this.logPenStatus();
   var x0 = this.x,
   y0 = this.y;
   this.x += length * Math.sin(this.angleInRadians);
   this.y += length * Math.cos(this.angleInRadians);
    if (this.ct) {
    if (this.penDown) {
      //this.logPenStatus();
    this.ct.beginPath(); 
    this.ct.lineWidth   = this.lineWidth;
    this.ct.strokeStyle = this.penColor;
    this.ct.moveTo(x0, y0);
    this.ct.lineTo(this.x, this.y);
    this.ct.stroke();
    }
  }
   else
    this.ct.moveTo(this.x, this.y);
   return this;  
  }    

 turtle.backward = function(length) {
        this.forward(-length);
        return this;
 }

 turtle.left = function(angleInDegrees) {
        // console.log('left(' + angleInDegrees + ')');
        // A complete circle, 360º, is equivalent to 2π radians  
        // angleInDegrees is an angle measure in degrees
	this.angleInRadians += angleInDegrees * Math.PI / 180.0;
	return this;
  }

 turtle.right = function(angleInDegrees) {
        this.left(-angleInDegrees);
        return this;
    }


 turtle.angle = function() {   
     // the turtle status is hold in this.angleInRadians;
     // degrees are often more convenient for the display
     return this.angleInRadians * 180.0 / Math.PI; 
 }

turtle.jumpTo = function(newX, newY, penLanding = false) {
    turtle.penDown = false;
    turtle.x = newX;
    turtle.y = newY;
    turtle.penDown = penLanding;
}

turtle.slideTo = function(newX, newY, penLanding = true) {
    turtle.penDown = true;
    let Asquared = Math.pow(newX-turtle.x,2);
    let Bsquared = Math.pow(newY-turtle.y,2);
    let C = Math.pow(Asquared+Bsquared,0.5);
    turtle.face(newX, newY);
    turtle.forward(C);
    turtle.penDown = penLanding;
}

turtle.turnTo = function(degree) {
    turtle.left(degree-turtle.angle()+90);
}

turtle.face = function(pointX, pointY) {
    let dx = pointX-turtle.x;
    let dy = pointY-turtle.y;
    let slope = dy/dx;
    let newAngle = Math.atan(slope) * 180 / Math.PI;
    turtle.turnTo(-newAngle);
    if (pointX<turtle.x) {
        turtle.left(180);
    }
    console.log(newAngle);
}


  
// =====================================================================================
// Some example definitions
// =====================================================================================
  



turtle.drawArrow = function() {  
      turtle.forward(50);
      turtle.left(150);
      turtle.forward(7);
      turtle.backward(7);
      turtle.right(150);
      turtle.right(150);
      turtle.forward(7); 
      turtle.backward(7);
      turtle.left(150);
  }  

turtle.box = function(AcornerX, AcornerY, BcornerX, BcornerY) {
    let width = BcornerX-AcornerX;
    let height = BcornerY-AcornerY;
    turtle.jumpTo(AcornerX, AcornerY, true);
    turtle.turnTo(0);
    for (i=0; i<2; i++) {
        turtle.forward(width);
        turtle.right(90);
        turtle.forward(height);
        turtle.right(90);
    }
}

turtle.shade = function(cornerX, cornerY, cornerA, cornerB) {
    let jumpHeight = Math.sign(cornerY-cornerB); 
    let distance = cornerA - cornerX;
    turtle.jumpTo(cornerX, cornerY, true);
    turtle.turnTo(0);
    for (i=0; i < Math.round((cornerB-cornerY)/2); i++) {
        turtle.forward(distance);
        turtle.left(90);
        turtle.penDown = false;
        turtle.forward(jumpHeight);
        turtle.left(90);
        turtle.penDown = true;
        turtle.forward(distance);
        turtle.right(90);
        turtle.penDown = false;
        turtle.forward(jumpHeight);
        turtle.right(90);
        turtle.penDown = true;
    }
}

turtle.shadeCircle = function(radius) {
    for (i=0; i<360; i++) {
        turtle.forward(radius);
        turtle.left(180);
        turtle.forward(radius);
        turtle.left(179);
    }
}

turtle.circle = function(theAngle) {
    for (i=0; i < (360/theAngle); i++) {
        turtle.forward(1);
        turtle.left(theAngle);
    }
}

turtle.spiral = function(loops) {
    for (i=1; i<=360*loops; i++) {
        turtle.forward(i/360);
        turtle.left(1);
    }
}
 
turtle.hexagon = function(length) {  
    for (i=1; i <= 6; i++) {
      turtle.forward(length);
      turtle.left(60);

    }
  }
  
turtle.polygon = function(length, sides) {
    for (i=0; i<sides; i++) {
        turtle.forward(length);
        turtle.left(360/sides);
    }
}
  
 turtle.drawStar = function() {  
    for (i=0; i < 18; i++) {
      turtle.left(100);
      turtle.forward(80);
    }
  } 

turtle.square = function(length) {  
    for (i=1; i <= 4; i++) {
      turtle.forward(length);
      turtle.left(90);

    }
  }
   
turtle.figure3 = function(count, angle) {    
    var i;  
    for (i=1; i <= count; i++) {
       console.log(i);
       turtle.drawArrow();
       turtle.left(angle);
    }   
  }


turtle.figure4 = function(count, angle, fn) {
    var i;  
    for (i=1; i <= count; i++) {
       console.log(i);
       fn();
       turtle.left(angle);
    }   
 }    

  
// =====================================================================================
// Using the example definitions
// =====================================================================================
  
turtle.jumpTo(300,150,true);


