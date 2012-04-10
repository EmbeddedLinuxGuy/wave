
var LINE_LENGTH = 75;
var Z_SPACING = 100;
var SEPARATION = 100;
var AMOUNTX = 50;
var AMOUNTY = 50;

var serviceMessageURL = '/wave'

var container, stats;
var camera, scene, renderer, particle;
var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var lines = [];



function init() {

	container = document.createElement( 'div' );
	document.body.appendChild( container );

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 500;

	scene = new THREE.Scene();

	scene.add( camera );

	var PI2 = Math.PI * 2;
	var material = new THREE.ParticleCanvasMaterial( {

		color: 0xffffff,
		program: function ( context ) {

			context.beginPath();
			context.arc( 0, 0, 1, 0, PI2, true );
			context.closePath();
			context.fill();

		}

	} );

	for ( var ix = 0; ix < AMOUNTX; ix++ ) {

		for ( var iy = 0; iy < AMOUNTY; iy++ ) {

			particle = new THREE.Particle( material );
			particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
			particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
			scene.add( particle );
		}
	}

	renderer = new THREE.CanvasRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	container.appendChild( stats.domElement );

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'touchstart', onDocumentTouchStart, false );
	document.addEventListener( 'touchmove', onDocumentTouchMove, false );
	
	lines[0] = drawLine(255, 0, -255, LINE_LENGTH, 0);
	lines[1] = drawLine(135, 255, -255, LINE_LENGTH, Z_SPACING);
	lines[2] = drawLine(255, 0, -255, LINE_LENGTH, Z_SPACING * 2);
	lines[3] = drawLine(255, 0, -255, LINE_LENGTH, Z_SPACING * 3);
	
	//drawLine(255, 0, -255, LINE_LENGTH, 0);
	//drawLine(135, 255, -255, LINE_LENGTH, Z_SPACING);
	//drawLine(255, 0, -255, LINE_LENGTH, Z_SPACING * 2);
	//drawLine(255, 0, -255, LINE_LENGTH, Z_SPACING * 3);
	
}

//

function onDocumentMouseMove(event) {

	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;
}

function onDocumentTouchStart( event ) {

	if ( event.touches.length > 1 ) {

		event.preventDefault();

		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		mouseY = event.touches[ 0 ].pageY - windowHalfY;
	}
}

function onDocumentTouchMove( event ) {

	if ( event.touches.length == 1 ) {

		event.preventDefault();

		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		mouseY = event.touches[ 0 ].pageY - windowHalfY;
	}
}

//

function animate() {

	requestAnimationFrame( animate );

	render();
	stats.update();

}

function render() {

	camera.position.x += ( mouseX - camera.position.x ) * .05;
	camera.position.y += ( - mouseY - camera.position.y ) * .05;
	camera.lookAt( scene.position );
	
	
//	for (var i=0; i<lines.length; i++) {
		
		
//		updateLine(lines[0], 255, 255, 255, LINE_LENGTH, 0);
//		updateLine(lines[1], 255, 255, 255, LINE_LENGTH, Z_SPACING);
//		updateLine(lines[2], 255, 255, 255, LINE_LENGTH, Z_SPACING * 2);
//		updateLine(lines[3], 255, 255, 255, LINE_LENGTH, Z_SPACING * 3);	

//	}
	

	renderer.render( scene, camera );

}

function updateLine(line, t1,t2,t3,l,z) {
	
	var geo = getGeometry(t1, t2, t3, l, z);
		
	line.geometry.vertices[0].position.x = geo.x0;
	line.geometry.vertices[0].position.y = geo.y0;
	line.geometry.vertices[0].position.z = geo.z;	

	line.geometry.vertices[1].position.x = geo.x1;
	line.geometry.vertices[1].position.y = geo.y1;
	line.geometry.vertices[1].position.z = geo.z;

	line.geometry.vertices[2].position.x = geo.x2;
	line.geometry.vertices[2].position.y = geo.y2;
	line.geometry.vertices[2].position.z = geo.z;

	line.geometry.vertices[3].position.x = geo.x3;
	line.geometry.vertices[3].position.y = geo.y3;
	line.geometry.vertices[3].position.z = geo.z;

	line.geometry.vertices[4].position.x = geo.x4;
	line.geometry.vertices[4].position.y = geo.y4;
	line.geometry.vertices[4].position.z = geo.z;
		
}

function getGeometry(t1,t2,t3,l,z) {
	
	//var x0, y0, x1, y1, x2, y2, x3, y3, x4, y4;
	var thisLine = {};

	if (!l) {
		l = 10;
	}
	if (!t1) {
		t1 = 0;
	}
	if (!t2) {
		t2 = 0;
	}
	if (!t3) {
		t3 = 0;
	}
	thisLine.x0 = 0;
	thisLine.y0 = 0;
	thisLine.x1 = thisLine.x0;
	thisLine.y1 = l;

	//x2 = L sin t1 + x1
	//y2 = L cos t1 + y1

	thisLine.x2 = l * (Math.sin(t1 * Math.PI / (6*255))) + thisLine.x1;
	thisLine.y2 = l * (Math.cos(t1 * Math.PI / (6*255))) + thisLine.y1;

	//x3 = L sin t2 + x2
	//y3 = L cos t2 + y2	

	thisLine.x3 = l * (Math.sin(t2 * Math.PI / (6*255))) + thisLine.x2;
	thisLine.y3 = l * (Math.cos(t2 * Math.PI / (6*255))) + thisLine.y2;

	//x4 = L sin t3 + x3
	//y4 = L cos t3 + y3	

	thisLine.x4 = l * (Math.sin(t3 * Math.PI / (6*255))) + thisLine.x3;
	thisLine.y4 = l * (Math.cos(t3 * Math.PI / (6*255))) + thisLine.y3;
	
	thisLine.z = z;
	
	return thisLine;
	
}

function drawLine(t1, t2, t3, l, z) {

	var thisLine = getGeometry(t1,t2,t3,l,z);


	console.log(thisLine)

	//console.log(x0,y0,x1,y1,x2,y2,x3,y3,x4,y4);


    var material = new THREE.LineBasicMaterial({
        color: 0x0000ff,
    });

    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vertex(new THREE.Vector3(thisLine.x0, thisLine.y0, thisLine.z)));
    geometry.vertices.push(new THREE.Vertex(new THREE.Vector3(thisLine.x1, thisLine.y1, thisLine.z)));
    geometry.vertices.push(new THREE.Vertex(new THREE.Vector3(thisLine.x2, thisLine.y2, thisLine.z)));
    geometry.vertices.push(new THREE.Vertex(new THREE.Vector3(thisLine.x3, thisLine.y3, thisLine.z)));
    geometry.vertices.push(new THREE.Vertex(new THREE.Vector3(thisLine.x4, thisLine.y4, thisLine.z)));

    var line = new THREE.Line(geometry, material);

	scene.add(line);

    return line;

};


function serviceCall(thisPackage, json_data, successCB, failureCB) {

   //var url = pip.serviceMessageURL+'/'+thisPackage;
	var url = serviceMessageURL;
   
	var json_text = '';
	
	if (json_data) {
		json_text = JSON.stringify(json_data);
	}
			
				var xmr = $.ajax({
					url     : url, 
					data    : json_text,
					type    : "GET",
					dataType: "json",

					success: function(data, stat) {

						data.result = true;
						if (data.result) successCB(data);
						else             failureCB(data);

					},
					error: function(xhr, stat, err) {

						var syntheticResponse = {result: false, reasonMap: {error:"unexpectedError"}};
						failureCB(syntheticResponse);

					}


				});
			

}

function getDataCB(data) {

	console.log(data);
	
}

$(document).ready(function() {
    // put all your jQuery goodness in here.
	//runScene();
	

	init();
	animate();

 		var timer = $.timer(function() {
                //alert('This message was sent by a timer.');

				serviceCall("", null, getDataCB, getDataCB);
				
				//	updateLine(lines[0], Math.ceil(Math.random()*512)-255, Math.ceil(Math.random()*512)-255, Math.ceil(Math.random()*512)-255, LINE_LENGTH, 0);
				//	updateLine(lines[1], Math.ceil(Math.random()*512)-255, Math.ceil(Math.random()*512)-255, Math.ceil(Math.random()*512)-255, LINE_LENGTH, Z_SPACING);
				//	updateLine(lines[2], Math.ceil(Math.random()*512)-255, Math.ceil(Math.random()*512)-255, Math.ceil(Math.random()*512)-255, LINE_LENGTH, Z_SPACING * 2);
				//	updateLine(lines[3], Math.ceil(Math.random()*512)-255, Math.ceil(Math.random()*512)-255, Math.ceil(Math.random()*512)-255, LINE_LENGTH, Z_SPACING * 3);


        });

        timer.set({ time : 1000, autostart : true });	


});
