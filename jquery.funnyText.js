/**
 * funnyText.js 0.1 Beta
 * https://github.com/alvarotrigo/funnyText.js
 * MIT licensed
 *
 * Copyright (C) 2013 alvarotrigo.com - A project by Alvaro Trigo
 */

(function($){
	$.fn.funnyText = function(options){
		
		// Create some defaults, extending them with any options that were provided
		options = $.extend({
			'speed': 700,
			'borderColor': 'black',
			'activeColor': 'white',
			'color': 'black',
			'textSize': '2em'
		}, options);

		var that = $(this);
		
		that.addClass('funnyText');
		
		var original = $(this);
		var characters = $.trim(original.text()).split('');
		
		
		var positionsY = ['top', 'bottom'];
		var positionsX = ['left', 'right'];

		var activePositionX, activePositionY, normalPositionX, normalPositionY;
		var previousPosition;

		original.html('');

		//for each character
		for (var i = 0; i < characters.length; i++){
			normalPositionY = positionsY[getRandom(0, 100) % 2];
			normalPositionX = positionsX[getRandom(0, 100) % 2];

			if(characters[i]  == ' '){
				characters[i] = '&nbsp;';
			}
			
			var visibleChar = '<span class="normal  ' + normalPositionY + ' ' + normalPositionX + '">' + characters[i] + '</span>';

			//avoid repeating the same values two consecutive letters 
			do{
				activePositionXY = getNewPosition(normalPositionX, normalPositionY);
			}while(activePositionXY == previousPosition);

			previousPosition = activePositionXY;

			var activeChar = '<span class="active ' + activePositionXY + '">' + characters[i] + '</span>';

			var newChar = '<div class="charWrap">' + visibleChar + activeChar + '</div>';
			original.append(newChar);
		};


		//setting the width and height of each character to its wrapper
		that.find('.charWrap').each(function (){
			var sizeX = $(this).find('span').width();
			var sizeY = $(this).find('span').height();
		
			$(this).css({
				'width': sizeX * 2 + 'px',
				'height': sizeY * 2 + 'px'
			});

			//adjusting the wrappers positions
			setMargin($(this));

			//creating the "viewport" for each character. 
			$(this).wrap('<div class="character" style="width:' + sizeX + 'px; height: ' + sizeY + 'px"></div>');
		});


		/**
		* Returnsn a random number between two values.
		*/
		function getRandom(from, to){
			return from + Math.floor(Math.random() * (to +1));
		}

		
		/**
		* Gets a new position for the active character in a way it can be scrolled 
		* vertically or horizontally from the position of the original character.
		* (from top left to botom right wouldn't work, for example)
		*/
		function getNewPosition(x, y){
			var result;
			
			if(getRandom(0, 100) % 2){
				if(x == "right" && y == "top"){
					result = "left top moveLeft";
				} else if(x == "right" && y == "bottom"){
					result = "left bottom moveLeft";
				} else if(x == "left" && y == "top"){
					result = "right top moveRight";
				} else if(x == "left" && y == "bottom"){
					result = "right bottom moveRight";
				}

			}else{
				if(x == "right" && y == "top"){
					result = "right bottom moveDown";
				} else if(x == "right" && y == "bottom"){
					result = "right top moveUp";
				} else if(x == "left" && y == "top"){
					result = "left bottom moveDown";
				} else if(x == "left" && y == "bottom"){
					result = "left top moveUp";
				}
			}

			return result;
		}

		
		/**
		* Sets the margin for the characters container depending on the position 
		* of the characters to show.
		*/
		function setMargin(obj){
			if(obj.find('.normal').hasClass('bottom')){
				obj.css('top', '-' + obj.find('.normal').height() + 'px');
			}

			if(obj.find('.normal').hasClass('right')){
				obj.css('left', '-' + obj.find('.normal').width() + 'px');
			}
		}



		//random movement for the characters of the title
		setInterval(function (){
			var randomTime = getRandom(2, 6);
			var previousNum = '';
			do{
				var num = getRandom(0, characters.length - 1);
			}while(num === previousNum);

			previousNum = num;

			setTimer(that.find('.charWrap').eq(num), randomTime);
		}, 1 * options.speed);

		
		/**
		* Sets a timer for a given character for a given time.
		*/
		function setTimer(character, time){
			setTimeout(function (){
				moveCharacter(character);
			}, time * options.speed);
		}

		$('.charWrap').hover(function (){
			if(!$(this).hasClass('moved')){
				moveCharacter($(this));
			}
		});

		
		/**
		* Moves a character to the destination position.
		* Once reached, it will add a class "moved" as an  status indicator.
		*/
		function moveCharacter(characterWrap){
			var sizeY = characterWrap.height() / 2;
			var sizeX = characterWrap.width() / 2;
			var character = characterWrap.find('.active');

			if(character.hasClass('moveRight')){
				if(!characterWrap.hasClass('moved')){
					characterWrap.css('left', '-' + sizeX + 'px');
				}else{
					characterWrap.css('left', '0px');
				}
			} else if(character.hasClass('moveLeft')){
				if(!characterWrap.hasClass('moved')){
					characterWrap.css('left', '0px');
				}else{
					characterWrap.css('left', '-' + sizeX + 'px');
				}
			} else if(character.hasClass('moveUp')){
				if(!characterWrap.hasClass('moved')){
					characterWrap.css('top', '0px');
				}else{
					characterWrap.css('top', '-' + sizeY + 'px');
				}
			} else if(character.hasClass('moveDown')){
				if(!characterWrap.hasClass('moved')){
					characterWrap.css('bottom', sizeY + 'px');
				}else{
					characterWrap.css('bottom', '0px');
				}
			}

			characterWrap.toggleClass('moved');
		}
	};
})(jQuery);