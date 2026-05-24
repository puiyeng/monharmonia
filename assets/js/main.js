/*
	Verti by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ null,      '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			mode: 'fade',
			noOpenerFade: true,
			speed: 300
		});

	// Nav.

		// Toggle.
			$(
				'<div id="navToggle">' +
					'<a href="#navPanel" class="toggle" aria-label="Toggle navigation"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

})(jQuery);

// Gallery handlers
$(document).ready(function() {
	if (typeof Fancybox !== 'undefined') {
		Fancybox.bind("[data-fancybox='gallery']", {
			Thumbs: {
				type: "modern"
			},

			Toolbar: {
				display: {
					left: [],
					middle: ["zoomIn", "zoomOut", "toggle1to1"],
					right: ["slideshow", "fullscreen", "thumbs", "close"]
				}
			}
		});
	}
});

// Carousel handlers
function moveCarousel(direction) {
	const track = document.getElementById('carouselTrack');

	if (!track) return;

	track.style.transition = 'transform 0.4s ease';

	if (direction === 1) {

		track.style.transform = 'translateX(-40px)';

		setTimeout(() => {
			const firstCard = track.firstElementChild;
			track.appendChild(firstCard);

			track.style.transition = 'none';
			track.style.transform = 'translateX(40px)';

			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					track.style.transition = 'transform 0.4s ease';
					track.style.transform = 'translateX(0)';
				});
			});
		}, 400);

	} else {

		track.style.transform = 'translateX(40px)';

		setTimeout(() => {
			const lastCard = track.lastElementChild;
			track.insertBefore(lastCard, track.firstElementChild);

			track.style.transition = 'none';
			track.style.transform = 'translateX(-40px)';

			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					track.style.transition = 'transform 0.4s ease';
					track.style.transform = 'translateX(0)';
				});
			});
		}, 400);
	}
}

// Animation
$(function() {
	const revealItems = document.querySelectorAll(
		'#signup-hero, #objective, #features-wrapper, #ensembles, #main-wrapper, .event-card, .carousel-card, .gallery-item'
	);

	revealItems.forEach(function(item) {
		item.classList.add('reveal');
	});

	const observer = new IntersectionObserver(function(entries) {
		entries.forEach(function(entry) {
			if (entry.isIntersecting) {
				entry.target.classList.add('reveal-visible');
			}
		});
	}, {
		threshold: 0.15
	});

	revealItems.forEach(function(item) {
		observer.observe(item);

		if (item.getBoundingClientRect().top < window.innerHeight) {
			item.classList.add('reveal-visible');
		}
	});
});

// Objective handlers
let objectiveIndex = 0;

function showObjective(index) {
	const track = document.getElementById("objectiveTrack");
	const dots = document.querySelectorAll(".objective-dots button");

	if (!track) return;

	objectiveIndex = index;

	track.style.transform = `translateX(-${objectiveIndex * 100}%)`;

	if (dots.length > 0 && dots[objectiveIndex]) {
		dots.forEach(dot => dot.classList.remove("active"));
		dots[objectiveIndex].classList.add("active");
	}
}

setInterval(function () {
	const totalObjectives = document.querySelectorAll(".objective-slide").length;

	if (totalObjectives === 0) return;

	objectiveIndex = (objectiveIndex + 1) % totalObjectives;
	showObjective(objectiveIndex);
}, 3500);