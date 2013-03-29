function Block(x_pos, y_pos, arg_width, arg_height) {
	this.position = 				new Position(x_pos, y_pos);
	this.width = 					arg_width;
	this.height = 					arg_height;
	this.image = 					new Image();
	this.visible = 					true;
	this.collision = 				{};
	this.collision.width_offset = 	0;
	this.collision.height_offset = 	0;

	this.draw = function() {
		if(debugging){
			if(this.position.x + this.width >= 0 && this.position.x <= BuckyGame.boundary.x)
			{
				ctx.strokeStyle = "#FF0000";
				ctx.fillStyle = 'rgba(255,0,0, 0.25)';
				ctx.lineWidth = 1;
				ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
				ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
			}
		}
	}

	this.update = function(x_change) {
		// update x and y position
		this.position.x += x_change;
	}
}

function HurtBlock(x_pos, y_pos, arg_width, arg_height) {
	this.position = 				new Position(x_pos, y_pos);
	this.width = 					arg_width;
	this.height = 					arg_height;
	this.image = 					new Image();
	this.visible = 					true;
	this.collision = 				{};
	this.collision.width_offset = 	0;
	this.collision.height_offset = 	0;

	this.draw = function() {
		if(debugging){
			if(this.position.x + this.width >= 0 && this.position.x <= BuckyGame.boundary.x)
			{
				ctx.strokeStyle = "#FFFF00";
				ctx.fillStyle = 'rgba(255,255,0, 0.25)';
				ctx.lineWidth = 1;
				ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
				ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
			}
		}
	}

	this.update = function(x_change) {
		// update x and y position
		this.position.x += x_change;
	}
}

function Item(x_pos, y_pos, passed_image) {
	this.position = 				new Position(x_pos, y_pos);
	this.image = 					passed_image;
	this.width  = 					25;
	this.height = 					25;
	this.visible = 					true;
	this.collision = 				{};
	this.collision.width_offset = 	0;
	this.collision.height_offset = 	0;

	this.draw = function() {
		if(this.visible){
			if(this.position.x + this.width >= 0 && this.position.x <= BuckyGame.boundary.x){
				ctx.drawImage(this.image, Math.floor(this.position.x), Math.floor(this.position.y)+Math.sin(BuckyGame.drunkTime+(this.position.x-BuckyGame.drawOffset)/Math.pow(blocksize, 2)*BuckyGame.drunkPeriod)*BuckyGame.drunkStrength, this.width, this.height);
			}
		}
		if(debugging){
			if(this.position.x + this.width >= 0 && this.position.x <= BuckyGame.boundary.x){
				ctx.strokeStyle = "#0000FF";
				ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
			}
			
		}
   	}

	this.update = function(x_change) {
		// update x and y position
		this.position.x += x_change;
	}
}

function ItemBlock(x_pos, y_pos, item_number, passed_image, passed_image_second) {
	this.contains = 				item_number;
	this.position = 				new Position(x_pos, y_pos);
	this.image = 					passed_image;
	this.width  = 					25;
	this.height = 					25;
	this.state = 					UNHIT;
	this.hit = 						{};
	this.hit.image = 				passed_image_second;
	this.collision = 				{};
	this.collision.width_offset = 	0;
	this.collision.height_offset = 	0;

	this.draw = function() {
		if(this.state == HIT){
			this.image = this.hit.image;
		}

		if(this.position.x + this.width >= 0 && this.position.x <= BuckyGame.boundary.x){
				ctx.drawImage(this.image, Math.floor(this.position.x), Math.floor(this.position.y)+Math.sin(BuckyGame.drunkTime+(this.position.x-BuckyGame.drawOffset)/Math.pow(blocksize, 2)*BuckyGame.drunkPeriod)*BuckyGame.drunkStrength, this.width, this.height);
		}

		if(debugging){
			if(this.position.x + this.width >= 0 && this.position.x <= BuckyGame.boundary.x){
				ctx.strokeStyle = "#00FF00";
				ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
			}
		}
   	}

	this.update = function(x_change) {
		// update x and y position
		this.position.x += x_change;
	}
}

function InfoBox(x_center, y_pos, arg_message) {
	this.width = 					250;
	this.height = 					null;
	this.font = 					"12pt Courier";
	this.pixels = 					{};
	this.pixels.height = 			16;
	this.pixels.width = 			11;
	this.position = 				new Position(x_center, y_pos);
	this.title = 					{};
	this.title.height = 			25;
	this.title.text = 				"Game Hint:"
	this.message = 					arg_message;
	this.wordArray = 				this.message.split(" ");
	this.lineArray = 				Array();
	this.charsPerLine = 			this.width / this.pixels.width;
	this.stroke = 					"#000000";
	this.fill = 					"rgba(150, 150, 255, 0.7)";
	this.padding = 					7;

	// split message up into an array of lines
	var wordPos = 0;
	var linePos = 0;
	this.lineArray[0] = "";
	while(wordPos < this.wordArray.length){
		if( String(this.lineArray[linePos]).length + this.wordArray[wordPos].length <= this.charsPerLine ){
			if(this.wordArray[wordPos] != "\n"){
				this.lineArray[linePos] += this.wordArray[wordPos] + " ";
				wordPos++;
			} else {
				wordPos++;
				linePos++;
				this.lineArray[linePos] = "";
			}
			
		} else {
			linePos++;
			this.lineArray[linePos] = "";
		}
		
	}

	this.update = function(x_change){
   		this.position.x += x_change;
   	}

	this.draw = function() {
    	ctx.strokeStyle = 		this.stroke;
    	ctx.fillStyle = 		this.fill;

		ctx.lineWidth = 		1;
		ctx.font = 				this.font;

    	ctx.fillStyle = 		this.fill;
    	ctx.strokeStyle = 		this.stroke;

    	ctx.fillRect(Math.floor(this.position.x), Math.floor(this.position.y), Math.floor(this.width), Math.floor(this.lineArray.length * this.pixels.height * 1.1 + this.padding + this.title.height));
    	ctx.strokeRect(Math.floor(this.position.x), Math.floor(this.position.y), Math.floor(this.width), Math.floor(this.lineArray.length * this.pixels.height * 1.1 + this.padding + this.title.height));


    	// draw dividier line

    	ctx.beginPath();
		ctx.moveTo(this.position.x, this.position.y + this.title.height - (this.title.height - this.pixels.height)/2);
		ctx.lineTo(this.position.x + this.width, this.position.y + this.title.height);
		ctx.stroke();

    	if(this.clicked()){
    		ctx.fillStyle = "#FF0000";
    	} else {
    		ctx.fillStyle = this.stroke;
    	}

    	// draw title
    	ctx.fillText(this.title.text, this.position.x + this.padding, this.position.y + this.pixels.height);

    	// draw message
    	for(i = 0; i < this.lineArray.length; i++){
    		ctx.fillText(this.lineArray[i], this.position.x + this.padding, this.position.y + this.pixels.height + i * this.pixels.height * 1.1 + this.title.height);
    	}
    	
    	
   
   	}

	this.clicked = function(){
		return Controller.mouse.click.y <= this.position.y+this.height && Controller.mouse.click.y >= this.position.y
		&& Controller.mouse.click.x <= this.position.x+this.width && Controller.mouse.click.x >=this.position.x && Controller.mouse.click.left;
	}
}

function Button(x_pos, y_pos, b_width, b_height, b_stroke, b_fill, b_text, callback) {
	this.visible = 					true;
	this.position = 				new Position(x_pos, y_pos);
	this.width = 					b_width;
	this.height = 					b_height;
	this.text = 					b_text;
	this.stroke = 					b_stroke;
	this.fill = 					b_fill;
	this.callback = 				callback;

	this.draw = function() {

		if(this.visible){
			ctx.strokeStyle = this.stroke;
	    	ctx.fillStyle = this.fill;

			ctx.lineWidth   = 1;
			ctx.font = '20px Calibri';

			var textWidth = ctx.measureText(this.text).width;
			var textHeight = ctx.measureText(this.text).height;
			var textX = this.position.x + this.width/2 - textWidth/2;


			var lingrad = ctx.createLinearGradient(0,0,0,150);
		    lingrad.addColorStop(0, '#00ABEB');
		    lingrad.addColorStop(0.5, '#fff');
		    lingrad.addColorStop(0.5, '#66CC00');
		    lingrad.addColorStop(1, '#fff');

	    	ctx.fillStyle = lingrad;

	    	ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
	    	ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);

	    	if(this.hover()){
	    		ctx.fillStyle = "#00FF00";
	    	} else {
	    		ctx.fillStyle = this.stroke;
	    	}
	    	
	    	ctx.fillText(this.text, textX, this.position.y + this.height/2 + 7);

		}
    	
   
   	}

	this.hover = function(){
		return Controller.mouse.move.y <= this.position.y+this.height && Controller.mouse.move.y >= this.position.y
		&& Controller.mouse.move.x <= this.position.x+this.width && Controller.mouse.move.x >= this.position.x;
	}

	this.clicked = function(){
		if(Controller.mouse.click.y <= this.position.y+this.height && Controller.mouse.click.y >= this.position.y
			&& Controller.mouse.click.x <= this.position.x+this.width && Controller.mouse.click.x >=this.position.x && Controller.mouse.click.left){

			if(this.callback){
				this.callback();
			}
		}
		
	}
}