ACE(function (ace) {
    var DOM = ace.get.v('dom');

    var authMainSwap,
        authSect,
        mainSect,
        src = '/',
        hitStr = '';

    ace.get('mod', 'mod/PageLayout.js');
    ace.get('mod', src+'mod/SwapContent.js');
	ace.get('mod', src+'mod/Auth/Auth.js');
    ace.get('mod', src+'mod/Dat.js');

    iniApp();

    function iniApp(){
		DOM({
			id: 'portal-container',
			flo: {h:1,w:1,t:0,l:0},
			css: {
				margin: 0,
				padding: 0,
				minWidth: 410,
			},
			dom: [
				{
					mod: 'SwapContent',
					id: 'auth-main-swap',
					ini: function(m){
						authMainSwap=m;
					},
					loc: 1,
					items: [
						{
							mod: 'Auth',
							hit: hitStr,
							onLogin: logIn,
							onLogout: logOut,
							ini: function(m){
								authSect=m;
							},
						},
						{
							mod: 'PageLayout',
							id: 'main-sect',
							onLogin: logIn,
							onLogout: logOut,
							ini: function(m){
								mainSect=m;
							},
						},
					],
				},
			],
		});

	}//iniApp()

    function logIn(v){
		if (!mainSect || !authSect) { return tic(logIn); }
		if (v) {
			log('portal.js logIn() received data: ',v);
			setMakerData(v);
		} else {
			log('portal.js logIn() received NO data.');
		}
		authMainSwap.set('loc',2);
		// authSect.exe('hide');
		// mainSect.exe('show');
	}//logIn()


	function logOut(v){
		if (!mainSect || !authSect) { return tic(logOut); }
		ace.makerDat = makerDat = '';  // Fix?
		authSect.set('page', 'login');
		authMainSwap.set('loc',1);
		mainSect.exe('clear');
	}//logOut()
});
