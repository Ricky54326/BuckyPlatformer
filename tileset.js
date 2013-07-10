/*

IMG ARRAY TILE ORDER
single-bottom		1
single-right		2
bottom-right		3
single-left			4
bottom-left			5
single-h-middle		6
bottom-middle		7
single-top			8
single-v-middle		9
top-right			10
middle-right		11
top-left			12
middle-left			13
top-middle			14
middle-middle		15

*/

var Tileset = (function(Preloader){

	// constructor
	// argImgArray is an array with a bunch of img src strings
	//   we do this so we can query a preloader for the image object, or
	//   make it if it isn't found
	var Tileset = function(argType, argImgArray, argPattern, argClips){
		this.type = argType;
		this.images = [];
		this.pattern = argPattern;
		this.clips = argClips;

		for(var i = 0, len = argImgArray.length; i++){

			if(Preloader.hasImage(argImgArray[i])){
				// check preloader for image first
				this.images[i] = Preloader.getImage(argImgArray[i]);
			} else {
				// if preloader doesn't have it, load it in
				// realistically, if one preloads properly right, this doesn't execute,
				// this is a fallback for forgetting to preload an image
				this.images[i] = new Image();
				this.images[i].src = argImgArray[i]
			}
		}
	};

	Tileset.prototype = {

		constructor: Tileset,

		get: function(elementNumber) {
			return elements[elementNumber];
		}

	};

	return Tileset;

})(Preloader);