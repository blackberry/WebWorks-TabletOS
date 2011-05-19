(function() {               
	// add js libraries in head section
	var newLib = document.createElement('script');
	newLib.setAttribute('type', 'text/javascript');
	newLib.setAttribute('src', 'html5/WebGL/webgl-test.js');
	var hd = document.getElementsByTagName('head')[0];
	hd.appendChild(newLib);
	

	// add canvas in body section                                      
	var newdiv = document.createElement('div');
	var divIdName = "div_gl_01";
	newdiv.setAttribute('id',divIdName);
	newdiv.innerHTML = '<canvas id="canvas" style="width: 50px; height: 50px;"> </canvas><canvas id="canvas2d" width="40" height="40"> </canvas><canvas id="testbed" width="500px" height="500px"></canvas>';
	var o = document.getElementsByTagName('body')[0];
	o.appendChild(newdiv);
	
	var framework = YUI.framework;
	framework.setupFramework(generateTestCaseCallback);

	
	//We're passing in the Y parameter and expecting back an array of test cases
	function generateTestCaseCallback(Y){
		var testCases = new Array();
		var Assert = Y.Assert;
		
		testCases["suiteName"] = "html5 WebGL tests";

		var canvas;
		var canvas2d;
		var ctx2d;
		var gl;
		var count = 0;
						
		// Check get a 4 value gl parameter as a csv string.
		function getValue4v(name) {
		var v = gl.getParameter(name);
		var result = '' +
			v[0] + ',' +
			v[1] + ',' +
			v[2] + ',' +
			v[3];
		return result;
		}

		function getViewport() {
		return getValue4v(gl.VIEWPORT);
		}

		function getClearColor() {
		return getValue4v(gl.COLOR_CLEAR_VALUE);
		}

		function isAboutEqual(a, b) {
		return Math.abs(a - b) < 0.01;
		}

		function isAboutEqualInt(a, b) {
		return Math.abs(a - b) < 3;
		}
		 
		function checkCanvasContentIs(r3d,g3d,b3d,a3d) {
		var r2d;
		var g2d;
		var b2d;
		var a2d;

			function checkPixel(x, y, r3d,g3d,b3d,a3d) {
			  var offset = (y * 40 + x) * 4;
			  r2d = imgData.data[offset];
			  g2d = imgData.data[offset + 1];
			  b2d = imgData.data[offset + 2];
			  a2d = imgData.data[offset + 3];
			  //debug('' + x + ', ' + y + "(" + offset + ") = " + r2d + ", " + g2d + ", " + b2d + ", " + a2d);
			  return isAboutEqualInt(r2d, r3d) &&
					 isAboutEqualInt(g2d, g3d) &&
					 isAboutEqualInt(b2d, b3d) &&
					 isAboutEqualInt(a2d, a3d);
			}

			function checkPixels(r3d,g3d,b3d,a3d) {
			  return checkPixel(0, 0, r3d, g3d, b3d, a3d) &&
					 checkPixel(0, 39, r3d, g3d, b3d, a3d) &&
					 checkPixel(39, 0, r3d, g3d, b3d, a3d) &&
					 checkPixel(39, 39, r3d, g3d, b3d, a3d) &&
					 checkPixel(0, 0, r3d, g3d, b3d, a3d);
			};

			// Set to just take the color from the 3d canvas
			ctx2d.globalCompositeOperation = 'copy';

			// fill 2d canvas with orange
			ctx2d.fillStyle = "rgb(255,192,128)";
			ctx2d.fillRect (0, 0, 40, 40);

			// get the image data
			var imgData = ctx2d.getImageData(0, 0, 40, 40);

			// check it got cleared.
			if (!checkPixels(255, 192, 128, 255)) {
			  return false;
			}

			// draw 3d canvas on top.
			ctx2d.drawImage(canvas, 0,0, 40, 40);

			// get the image data
			var imgData = ctx2d.getImageData(0, 0, 40, 40);

			// Check it's the expected color.
			if (!checkPixels(r3d, g3d, b3d, a3d)) {
				return false;
			} else {
				return true;
			}
		}
		
		//---------------------------------------------------------------------
		// WebGL basic tests
		//---------------------------------------------------------------------			
		testCases[0] = new Y.Test.Case({
			name: "WebGL basic tests",
			
			setUp : function () {
				//Setup code goes here
				try{
			    

				
					canvas = document.getElementById("canvas");
					canvas2d = document.getElementById("canvas2d");
					ctx2d = canvas2d.getContext("2d");
					gl = create3DContext(canvas);
					count++;

				}catch(err){
//					alert(err.toString());
				}
			},
			 
			tearDown : function () {
				//Teardown code goes here
				
			},
			
			
			"WebGL: this browser should support WebGL" : function(){
				var gl2;
				var re = true;
				try {
				  var canvas2 = document.getElementById("canvas");
				  gl2 = canvas2.getContext('experimental-webgl');
				  gl2.viewportWidth = canvas2.width;
				  gl2.viewportHeight = canvas2.height;
				  re = true;
				} catch(e) {
					re = false;
				}
				if (!gl) {
				  re = false;
				}
				Assert.isTrue(re);

			},
			
			"WebGL canvas: context should exist" : function(){
				var re = false;
				if(!gl){
					re = false;
				}
				else{
					re = true;
				}
				Assert.isTrue(re);
			},
			
			"WebGL canvas: canvas.width should be 300" : function(){
				Assert.areEqual(canvas.width, 300);
			},
			
			"WebGL canvas: canvas.height should be 150" : function(){
				Assert.areEqual(canvas.height, 150);
			},
			
			"WebGL canvas: viewport should be correct" : function(){
				var str = getViewport();
				Assert.areEqual(str, '0,0,300,150');
			},
			
			"WebGL canvas: pixels should be 0 0 0 0" : function(){
				Assert.isTrue(checkCanvasContentIs(0, 0, 0, 0));
			},

			"WebGL canvas: pixels should be new value 64 128 192 255" : function(){
				gl.clearColor(0.25, 0.5, 0.75, 1);
				gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
				Assert.isTrue(checkCanvasContentIs(64, 128, 192, 255));
			},

			"WebGL renderbuffer: internal buffers should be initialized to 0" : function(){
				try{
					var canvas = document.getElementById("testbed");
					var gl = create3DContext(canvas);
					var re = true;
				}catch(e){
//					alert(e.toString());
				}
				if (!gl) {
					re = false;
				}
				
				try{
				
					var buf = new Uint8Array(500 * 500 * 4);
					gl.readPixels(0, 0, 500, 500, gl.RGBA, gl.UNSIGNED_BYTE, buf);
					if (gl.getError() != gl.NO_ERROR) {
						//testFailed('GL error detected after readPixels().');
						re = false;
					}
					var totalBytes = 500 * 500 * 4;
					for (var i = 0; i < totalBytes; ++i) {
						if (buf[i] != 0) {
							//testFailed('WebGL internal buffers are dirty.');
							re = false;
						}
					}
				
				}catch(e){
//					alert(e.toString());
				}
				
				Assert.isTrue(re);
			},					

			"WebGL renderbuffer: user created buffers should be initialized to 0" : function(){
			
				try{
			
					var canvas = document.getElementById("testbed");
					var gl = create3DContext(canvas);
					var re = true;
				
				}catch(e){
//					alert(e.toString());
				}
				
				if (!gl) {
					re = false;
				}

				try{
				
					var buf = new Uint8Array(500 * 500 * 4);
					gl.readPixels(0, 0, 500, 500, gl.RGBA, gl.UNSIGNED_BYTE, buf);
					if (gl.getError() != gl.NO_ERROR) {
						//testFailed('GL error detected after readPixels().');
						re = false;
					}
					var totalBytes = 500 * 500 * 4;
					for (var i = 0; i < totalBytes; ++i) {
						if (buf[i] != 0) {
							//testFailed('WebGL internal buffers are dirty.');
							re = false;
						}
					}
					
					var fbo = gl.createFramebuffer();
					gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
					var colorbuffer = gl.createRenderbuffer();
					gl.bindRenderbuffer(gl.RENDERBUFFER, colorbuffer);
					gl.renderbufferStorage(gl.RENDERBUFFER, gl.RGBA4, 500, 500);
					if (gl.getError() != gl.NO_ERROR) {
						//testFailed('GL error detected after renderbufferStorage(internalformat = RGBA4).');
						re = false;
					}
					gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.RENDERBUFFER, colorbuffer);
					if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) != gl.FRAMEBUFFER_COMPLETE) {
						//testFailed('Framebuffer incomplete.');
						re = false;
					}
					gl.readPixels(0, 0, 500, 500, gl.RGBA, gl.UNSIGNED_BYTE, buf);
					if (gl.getError() != gl.NO_ERROR) {
						//testFailed('GL error detected after readPixels().');
						re = false;
					}
					for (var i = 0; i < totalBytes; ++i) {
						if (buf[i] != 0) {
							//testFailed('User created buffers are dirty.');
							re = false;
						}
					}

				}catch(e){
//					alert(e.toString());
				}
				
				Assert.isTrue(re);
			},	
			
		});

/*		
		testCases[1] = new Y.Test.Case({
			name: "blackberry.app.author Test",
		
			"blackberry.app.author should exist" : function() {
				Assert.isNotUndefined(blackberry.app.author);
			},
		});
*/		
		return testCases;
	}
})();
