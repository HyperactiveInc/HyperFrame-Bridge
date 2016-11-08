var Hyper = Hyper || {};

Hyper.Main = (function() {

    var pub = {
        init: init,
        toggle: toggle,
	};

    function toggle() {
        if ($('#target').hasClass('hidden')) {
            $('#target').removeClass('hidden');
            $('#trigger').html('Hide');
        } else {
            $('#target').addClass('hidden');
            $('#trigger').html('Show');
        }
    }

    function handleShowButton() {
        console.log('handleShowButton')

        toggle();
        Hyper.Bridge.mirror('toggle');
    }

	function init() {

        $('#trigger').on('click', handleShowButton);

    	Hyper.Bridge.init();
    }

    return pub;

})();

window.onload = Hyper.Main.init();
