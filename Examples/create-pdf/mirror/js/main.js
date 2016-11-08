var Hyper = Hyper || {};

Hyper.Main = (function($) {

    var pub = {
        init: init,
		sequences: [],
		currentIndex: 0,
		runCurrentSequence: runCurrentSequence,
	};

	/*
	 * array of animations
	 * enter x value (as percent from center) for each circle
	 * [0, 0, 0, 0] is all center
	 * [0, 0, 0, 100] is all center, except bottom is pushed fully right
	 * [-100, 0, 0, 0] is all center, except top is pushed fully left
	 */
	var script = [
		[10, 10, 10, 10],
		[50, 50, 50, 50],
		[10, 100, 100, 10],
	];

	function x(value) {
		/*
		 * translates percentage to X value
		 * for translations on this track
		 */
		return 3.8 * value;
	}

	function sceneFromSequence(xvals) {
		/*
		 * returns velocity.js UI pack sequence
		 * for running multiple animations at once
		 */
		var array = [];
		$.each(xvals, function(index, val) {
			var sequence = {
				e: $('#circle' + index),
				p: {
					translateX: x(val),
				},
				o: {
					duration: 1000,
					sequenceQueue: false,
				},
			};
			array.push(sequence);
		});
		return array;
	}

	function updateIndex() {
		pub.currentIndex >= pub.sequences.length - 1 ? pub.currentIndex = 0
													 : pub.currentIndex ++;
	}

	function runCurrentSequence() {
		$.Velocity.RunSequence(pub.sequences[pub.currentIndex]);
	}

	function play() {
		runCurrentSequence();
		updateIndex();
		Hyper.Bridge.mirrorEvent('runCurrentSequence');
	}

	function init() {
			$.each(script, function(index, sequence) {
				pub.sequences.push(sceneFromSequence(sequence))
			});

			$('.box').on('click', play);

    	Hyper.Bridge.init();
    }

    return pub;

})(jQuery);

$(document).ready(function(){
    Hyper.Main.init();
});
