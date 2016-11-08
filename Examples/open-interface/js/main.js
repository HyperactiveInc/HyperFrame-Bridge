var Hyper = Hyper || {};

Hyper.Main = (function() {

    var pub = {
        init: init,
	};

    function handleButton() {
        var interface_id = $(this).data('id');
        Hyper.Bridge.presentInterface(interface_id);
    }

	function init() {

        $('.present.interface').on('click', handleButton);

    	Hyper.Bridge.init();
    }

    return pub;

})();

window.onload = Hyper.Main.init();
