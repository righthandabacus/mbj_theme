// Modified from Beautiful Jekyll by Dean Attali
// vim:set ts=4 sw=4:
var main = {
	bigImgEl : null,
	numImgs : null,
	currentImg : null,

	init : function() {
		// Minimise navbar after scrolling a little bit down
		$(window).scroll(function() {
			if ($(".navbar-fixed-top").offset().top > 50) {
				$(".navbar-fixed-top").addClass("navbar-minimised");
			} else {
				$(".navbar-fixed-top").removeClass("navbar-minimised");
			}
		});

		// On mobile, hide the avatar when expanding the navbar menu
		$('#main-navbar').on('show.bs.collapse', function () {
			$(".navbar-fixed-top").addClass("navbar-expanded");
		});
		$('#main-navbar').on('hidden.bs.collapse', function () {
			$(".navbar-fixed-top").removeClass("navbar-expanded");
		});

		// On mobile, when clicking on a multi-level navbar menu, show the child links
		$('#main-navbar').on("click", ".navlinks-parent", function(e) {
			var target = e.target;
			$.each($(".navlinks-parent"), function(key, value) {
				if (value == target) {
					$(value).parent().toggleClass("show-children");
				} else {
					$(value).parent().removeClass("show-children");
				}
			});
		});

		// Ensure nested navbar menus are not longer than the menu header
		var menus = $(".navlinks-container");
		if (menus.length > 0) {
			// Temporarily add a fake-menu to find max word-in-item width
			var fakeMenuHtml = "<li class='fake-menu' style='display:none;'><a></a></li>";
			$("#main-navbar ul").append(fakeMenuHtml);
			var fakeMenu = $(".fake-menu");
			// find max word width, set as min menu width
			$.each(menus, function(i) {
				var parent = $(menus[i]).find(".navlinks-parent");
				var children = $(menus[i]).find(".navlinks-children a");
				var words = [];
				$.each(children, function(idx, el) { words = words.concat($(el).text().trim().split(/\s+/)); });
				var maxwidth = 0;
				$.each(words, function(id, word) {
					fakeMenu.html("<a>" + word + "</a>");
					maxwidth = Math.max(maxwidth, fakeMenu.width());
				});
				$(menus[i]).css('min-width', maxwidth + 'px')
			});
			fakeMenu.remove();
		};

		// show the big header image
		main.initImgs();
	},

	initImgs : function() {
		if ($("#header-banners").length == 0) {
			return
		};

		// Function to load a different image in case of multiple
		// For better UX, prefetch the next image so that it will already be loaded when we want to show it
		var getNextImg = function() {
			while(true) {
				var imgInfo = main.getRandomImg();
				if (imgInfo.src != main.currentImg) {
					main.currentImg = imgInfo.src;
					break;
				}
			}
			var prefetchImg = new Image();
			prefetchImg.src = imgInfo.src;
			// if I want to do something once the image is ready: `prefetchImg.onload = function(){}`

			setTimeout(function(){
				var img = $("<div></div>").addClass("banner-transition").css("background-image", 'url(' + imgInfo.src + ')');
				$(".intro-header.banner").prepend(img);

				// after the animation of fading in the new image is done, prefetch the next one
				//img.one("transitioned webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
				setTimeout(function() {
					main.setImg(imgInfo.src, imgInfo.desc);
					img.hide();
					getNextImg();
					img.remove();
				}, 1000); 
			}, 6000);
		};

		// If the page has large images to randomly select from, choose an image
		main.bigImgEl = $("#header-banners");
		main.numImgs = main.bigImgEl.attr("data-num-img");

		// set an initial image
		var imgInfo = main.getRandomImg();
		main.setImg(imgInfo.src, imgInfo.desc);

		// If there are multiple images, cycle through them
		if (main.numImgs > 1) {
			getNextImg();
		};
	},
  
	getRandomImg : function() {
		// Randomly pick one image
		var randNum = Math.floor((Math.random() * main.numImgs) + 1);
		var src = main.bigImgEl.attr("data-img-src-" + randNum);
		var desc = main.bigImgEl.attr("data-img-desc-" + randNum);
		return {src:src, desc:desc}
	},
  
	setImg : function(src, desc) {
		$(".intro-header.banner").fadeTo('fast', 0.6, function() {
			$(this).css('background-image', 'url('+src+')');
			if (desc != undefined && desc !== false) {
				$(".img-desc").text(desc).show();
			} else {
				$(".img-desc").hide();
			}
		}).fadeTo('fast', 1);
	}
};

document.addEventListener('DOMContentLoaded', main.init);
