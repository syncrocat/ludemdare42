# ludemdare42

Summary:
- Removed developer shortcuts/cheats left in unintentionally
-  Smoothed out lines in level 3 so that it isnt broken

Deleted code:
 app.key["1"] = app.keyboard(49);
    app.key["1"].press = function() {
        app.movement.one = true;
        app.levelNum = 1;
        app.ready = false;
        app.loadMap(app.levelNum, () => {
            console.log("loaded");
            app.ready = true;
        });
    };
    app.key["1"].release = function() {
        app.movement.one = false;
    };
     app.key["2"] = app.keyboard(50);
    app.key["2"].press = function() {
        app.movement.two = true;
        app.levelNum = 2;
        app.ready = false;
        app.loadMap(app.levelNum, () => {
            console.log("loaded");
            app.ready = true;
        });
    };
    app.key["2"].release = function() {
        app.movement.two = false;
    };
     app.key["3"] = app.keyboard(51);
    app.key["3"].press = function() {
        app.movement.three = true;
        app.levelNum = 3;
        app.ready = false;
        app.loadMap(app.levelNum, () => {
            console.log("loaded");
            app.ready = true;
        });
    };
    app.key["3"].release = function() {
        app.movement.three = false;
    };
     app.key["4"] = app.keyboard(52);
    app.key["4"].press = function() {
        app.movement.four = true;
        app.levelNum = 4;
        app.ready = false;
        app.loadMap(app.levelNum, () => {
            console.log("loaded");
            app.ready = true;
        });
    };
    app.key["4"].release = function() {
        app.movement.four = false;
    };
     app.key["5"] = app.keyboard(53);
    app.key["5"].press = function() {
        app.movement.five = true;
        app.levelNum = 5;
        app.ready = false;
        app.loadMap(app.levelNum, () => {
            console.log("loaded");
            app.ready = true;
        });
    };
    app.key["5"].release = function() {
        app.movement.five = false;
    };
     app.key["6"] = app.keyboard(54);
    app.key["6"].press = function() {
        app.movement.six = true;
        app.levelNum = 6;
        app.ready = false;
        app.loadMap(app.levelNum, () => {
            console.log("loaded");
            app.ready = true;
        });
    };
    app.key["6"].release = function() {
        app.movement.six = false;
    };
     app.key["7"] = app.keyboard(55);
    app.key["7"].press = function() {
        app.movement.seven = true;
        app.levelNum = 7;
        app.ready = false;
        app.loadMap(app.levelNum, () => {
            console.log("loaded");
            app.ready = true;
        });
    };
    app.key["7"].release = function() {
        app.movement.seven = false;
    };
     app.key["8"] = app.keyboard(56);
    app.key["8"].press = function() {
        app.movement.eight = true;
        app.levelNum = 8;
        app.ready = false;
        app.loadMap(app.levelNum, () => {
            console.log("loaded");
            app.ready = true;
        });
    };
    app.key["8"].release = function() {
        app.movement.eight = false;
    };
     app.key["9"] = app.keyboard(57);
    app.key["9"].press = function() {
        app.movement.nine = true;
        app.levelNum = 9;
        app.ready = false;
        app.loadMap(app.levelNum, () => {
            console.log("loaded");
            app.ready = true;
        });
    };
    app.key["9"].release = function() {
        app.movement.nine = false;
    };
     app.key["0"] = app.keyboard(48);
    app.key["0"].press = function() {
        app.movement.zero = true;
        app.levelNum = 10;
        app.ready = false;
        app.loadMap(app.levelNum, () => {
            console.log("loaded");
            app.ready = true;
        });
    };
    app.key["0"].release = function() {
        app.movement.zero = false;
    };
    
    
    
    Changed code (the first ones are replaced with what is after the //):
        app.movement.q = true;
        app.lineDrawStartX = app.mouse_x;
        app.lineDrawStartY = app.mouse_y;
        //app.movement.q = true;
        //app.lineDrawStartX = app.mouse_x;
        //app.lineDrawStartY = app.mouse_y;
        
        
        app.movement.q = false;
        app.drawLinePlz = true;
        //app.movement.q = false;
        //app.drawLinePlz = true;
        
         app.movement.space = true;
        /*app.movement.space = true;
        
         }
        }*/
        
        
        app.movement.z = true;
        //app.movement.z = true;
        
        
        app.movement.z = false;
       // app.movement.z = false;
       
       
       app.movement.x = true;
       //app.movement.x = true;
        
        app.movement.x = false;
        ///app.movement.x = false;
        
        
         app.movement.c = true;
        //app.movement.c = true;
        
        
         app.movement.c = false;
        //app.movement.c = false;
        
        
         app.movement.v = true;
        app.drawingLines = !app.drawingLines;
        console.log("Drawing lines:", app.drawingLines);
       // app.movement.v = true;
       // app.drawingLines = !app.drawingLines;
      //  console.log("Drawing lines:", app.drawingLines);
      
      
       app.movement.v = false;
        //app.movement.v = false;
        
        
        
        
    
