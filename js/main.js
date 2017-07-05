// Modified from Beautiful Jekyll by Dean Attali
// vim:set ts=4 sw=4:
var main = {
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
	}
};

document.addEventListener('DOMContentLoaded', main.init);
