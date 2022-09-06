ACE(function (ace) {
	var	DOM = ace.get.v('dom');
	
    ace.get('mod', 'mod/ContentUpload.js');

    DOM({
        id: 'main-div',
        cls: 'container-fluid',
        dom: [
            {
                mod: 'ContentUpload',
            },
        ],
    });
});