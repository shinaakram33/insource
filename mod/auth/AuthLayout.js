ACE.mod('AuthLayout', function (ace) {
  var now = ace.now,
		log = ace.log;

  ace.get('mod', 'mod/auth/Signup.js');
  ace.get('mod', 'mod/auth/Login.js');
  ace.get('mod', 'mod/auth/ForgetPassword.js');
  ace.get('mod', 'mod/auth/CheckEmail.js');
  ace.get('mod', 'mod/auth/ResetPassword.js');
  ace.get('mod', 'mod/auth/ConfirmPassword.js');

  return AuthLayout;

  function AuthLayout(config) {
    const id = config.id || 'auth' + now(),
      cls = 'auth',
      logo = config.logo || 'img/full-logo.png',
      authMod = config.authMod,
			on = config.on || {},
			onLogin = is.fnc(config.onLogin || on.login),
			aci = {
				get: {
					page: getPage,
				},
				set: {
					page: setPage,
				},
			},
      ux = {
        id,
        cls,
				aci,
        // dom: iniDom(),
				css: config.css,
				ini: ini,
      };
		var loc = 1,
			swap,
			signupACI,
			emailACI,
			loginACI,
			forgotACI,
			resetACI,
			confirmACI,
			me;

    return ux;


		function ini(m){
			me = m;
			iniDom();
			is.fnc(config.ini,m);
		}//ini()


    function iniDom() {
      let dom = [
        {
          cls: cls + '-head',
          dom: [
            {
              typ: 'img',
              src: logo,
              cls: cls + '-logo',
							on: {
								click: onLogo,
							},
            },
            {
              lbl: 'Having troubles? ',
              dom: [
                {
                  typ: 'a',
                  href: '#help',
                  lbl: 'Get help',
									on: {
										click: onHelp,
									},
                },
              ],
            },
          ],
        },
        {
          cls: cls + '-content',
          dom: {
            mod: 'SwapContent',  // authMod,
            // email: 'anhelina.petsko@gmail.com',
						flo: {
							w: .8,
							h: .9,
							b: 0,
							l: .1,
						},
						ini: function(m){ swap=m; },
						loc: loc,  // Fix?
						items: [
							{
								mod: 'Signup',
								ref: 'signup',
								onExe: onLogin,  // Fix!!!  iniUser,
								ini: function(m){ signupACI=m; },
								auth: me,
							},
							{
								mod: 'CheckEmail',
								ref: 'email',
								// onExe: iniUser,
								ini: function(m){ emailACI=m; },
								auth: me,
							},
							{
								mod: 'Login',
								ref: 'login',
								onExe: tryLogin,
								ini: function(m){ loginACI=m; },
								auth: me,
							},
							{
								mod: 'ForgetPassword',
								ref: 'forgot',
								// onExe: tryLogin,
								ini: function(m){ forgotACI=m; },
								auth: me,
							},
							{
								mod: 'ResetPassword',
								ref: 'reset',
								// onExe: tryLogin,
								ini: function(m){ resetACI=m; },
								auth: me,
							},
							{
								mod: 'ConfirmPassword',
								ref: 'confirn',
								// onExe: tryLogin,
								ini: function(m){ confirmACI=m; },
								auth: me,
							},
						],
          },
        },
      ];
      me.add(dom);
    }//iniDom()


		function getPage(v,r){

		}//getPage()


		function setPage(v,r){
			var refs = [
					'signup',
					'email',
					'login',
					'forgot',
					'reset',
					'confirm',
				],
				loc = is.int(v,1) || refs.indexOf(v)+1 || 0;
			loc && swap.set('loc',loc);
		}//setPage()


		function tryLogin(dat){
			// var dat = loginACI.get.v('dat');
			// log('Auth tryLogin()', dat);
			var obj = {
				typ: 'login',
				dat: dat,  // Fix! Encrypt before sending data to server. Use salt obtained during handshake
			};
			ace.get.dat(obj,function(dat){
				dat = {
					usr: 'test',
					ok: 1,
					name: 'Test User',
		      account: 'Free',
		      avatar: 'img/avatar.png',
				};  // Fix!
				log('Received response data: ',dat);
				if (dat && dat.usr && dat.ok) {

					onLogin && onLogin(dat);
				} else {

				}
			});
			swap.set('loc','signup');

		}//tryLogin()


		function iniUser(dat){
			var obj = {
				typ: 'user',
				dat: dat,
			};
			ace.get.dat(obj,function(dat){
				log('Received response data: ',dat);
			});
			swap.set('loc',6);  // 'confirm');
		}//iniUser()


		function onHelp(){
			// onClk();
			// aci.ini.maker({});
		}//onHelp()


		function onLogo(){
			onBak();
		}//onLogo()


		// Temporary fnc to cycle through pages.
		function onClk(){
			swap.exe('next');
		}//onClk()


		// Temporary fnc to cycle through pages.
		function onBak(){
			swap.exe('prev');
		}//onBak()


  }
});
