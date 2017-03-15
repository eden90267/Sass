$(function() {
	$('.img-item').on('click', function() {
		var that = $(this);
		var animate = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		that.addClass('animated shake')
		    .one('', function() {
		    	that.removeClass('animated shake');
		    });
	});
})