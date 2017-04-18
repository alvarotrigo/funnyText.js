funnyText.js
============
![preview](https://raw.github.com/alvarotrigo/funnyText.js/master/imgs/intro.jpg)
Create funny and crazy moving texts in a simple way.

- [Living Demo](http://alvarotrigo.com/funnyText/)
- [Temporal website](http://alvarotrigo.com/blog/creating-funnytext-js-plugin-for-jquery/)

## Usage
As you can see in the `example.html` file, you will need to include the JavaScript file `jquery.funnyText.js` and the css file `jquery.funnyText.css` of the plugin, as well as [jQuery](http://jquery.com/).

### Including files:
```html
<link rel="stylesheet" type="text/css" href="jquery.funnyText.css" />

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
	
<script type="text/javascript" src="jquery.funnyText.js"></script>
```

### Required HTML structure
The funny text effect will be applied to the text under your custom selector which will be used as well in the initialization.
```html
<div class="mySelector">funnText is applied here</div>
```

### Initialization 
All you need to do is call the plugin inside a `$(document).ready` function using the selector 
in which the text is contained.

```javascript
$(document).ready(function() {
	$('.mySelector').funnyText();
});
```

A more complex initialization with all the options set could look like this:
```javascript
$(document).ready(function() {
	$('.mySelector').funnyText({
		speed: 700,
		borderColor: 'black',
		activeColor: 'white',
		color: 'black',
		fontSize: '7em',
		direction: 'both'
	});
});
```

## Options
- `speed`: (default `700`) Defines the speed in which the letters change in milliseconds.

- `borderColor`: (default `black`) Defines the color of the border when the text is active. This option won't take effect when if the browser doesn't support CSS3. 

- `activeColor`: (default `white`) Defines the color of the text when it is active.

- `color`: (default `black`) Defines the color of the text on start.

- `fontSize`: (default `7em`) Defines the size of the font.

- `direction` : (default `both`) Defines the direction of the letters movement. It can be `both`, `horizontal` or `vertical`.
