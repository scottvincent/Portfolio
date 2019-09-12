// Scott Vincent Design
// French Vanilla Bean and Java Scripts

// Theme Picker
var themeChooser = document.getElementById('themeSelect');
var main = document.getElementById('main');
var elementsToShow = document.getElementsByClassName('project-animate');

function setTheme(x) {
	var i;
	for (i = 0; i < themeChooser.options.length; i++) {
		// Remove the other theme classes
		document.documentElement.classList.remove(themeChooser.options[i].value);
	}
	// Add the theme of the new selection
	document.documentElement.classList.add(x);
}

function mainPageChange() {
	var i;
	var pages = ['story', 'web', 'branding', 'music', 'contact'];
	for (i = 0; i < pages.length; i++) {
		// Remove the other theme classes
		main.classList.remove(pages[i]);
	}
	// Add the theme of the new selection
	main.classList.add( location.hash.substr(1) );

	if( location.hash === '#web' ) {
		if (elementsToShow !== null) { animateLoop() };
	}

	setTimeout(function() {
		//window.scrollTo(0,0);
	}, 1)
}

window.onload = function(e){
	// Grab the stored theme from local storage
	var storedTheme = localStorage.getItem('svTheme');

	// If we got a theme back, set it and change the select to that value, otherwise randomize the theme on load (except for print theme)
	if (storedTheme) {
		setTheme(storedTheme);
		themeChooser.value = storedTheme;
	} else {
		var randomTheme = themeChooser.options[Math.floor(Math.random() * (themeChooser.options.length))].value;
		setTheme(randomTheme);
		themeChooser.value = randomTheme;
	}

	// If you come in on the home page without a :target, set to the first page.
	if (!location.hash.length) {
		location.hash = '#story';
	}

	mainPageChange();
};

// Listen to the change in theme selector and change html class accordingly. If the user interacts with this, set the preference in local storage
themeChooser.addEventListener('change', (event) => {
	setTheme(event.target.value);
	localStorage.setItem('svTheme', event.target.value);
});

window.addEventListener('hashchange', (event) => {
	mainPageChange();
});

// Web Projects Animations

// Detect request animation frame
var scroll = window.requestAnimationFrame ||
	// IE Fallback
	function(callback){
		window.setTimeout(callback, 1000/60)
	};


function animateLoop() {
	var i;
	for (i = 0; i < elementsToShow.length; i++) {
		if (isElementInViewport(elementsToShow[i])) {
			elementsToShow[i].classList.add('project-animate--active');
		} else {
			elementsToShow[i].classList.remove('project-animate--active');
		}
	}

	scroll(animateLoop);
}



// Helper function from: http://stackoverflow.com/a/7557433/274826
function isElementInViewport(el) {
	var rect = el.getBoundingClientRect();

	return (
		(rect.top <= 0
			&& rect.bottom >= 0)
		||
		(rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
			rect.top <= (window.innerHeight || document.documentElement.clientHeight))
		||
		(rect.top >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
		);
}
