ACE.mod('Signup', function (ace) {
  var now = ace.now;

  return Signup;

  function Signup(config) {
    const id = config.id || 'signup' + now(),
      cls = 'signup',
      logoGoogle = 'img/google.png',
      logoApple = 'img/apple.png',
			on = config.on || {},
			onSub = is.fnc(config.onClick || on.click || config.onExe || on.exe),
			auth = config.auth,
			mandatory = {  // Fix. Use CFG.
				name: 1,
				user: 1,
				email: 1,
				pass: 1,
				remember: 1,
			},
			acis = {},
      ux = {
        id,
        cls,
        dom: iniDom(),
				ini: config.ini,
      };
		var badEmail,
			chkBoxACI,
			headACI,
			nameACI,
			userACI,
			emailACI,
			passACI,
			btnACI,
			me;

    return ux;

    function iniDom() {
      let dom = {
        cls: cls + '-container',
        dom: [
          {
            cls: cls + '-head',
            dom: [
              {
                typ: 'h3',
                cls: 'auth-heading',
                lbl: 'Sign Up',
              },
              {
                cls: 'auth-sub-heading body1',
                typ: 'p',
                lbl: 'Enter your data to Sign Up!',
								ini: function(m){ headACI=m; },
              },
              // {
              //   cls: 'sso-container',
              //   dom: [
              //     {
              //       cls: 'apple-sso',
              //       dom: {
              //         cls: 'sso-logo',
              //         typ: 'img',
              //         src: logoApple,
              //       },
              //     },
              //     {
              //       cls: 'google-sso',
              //       dom: {
              //         cls: 'sso-logo',
              //         typ: 'img',
              //         src: logoGoogle,
              //       },
              //     },
              //   ],
              // },
              // {
              //   cls: 'auth-separator',
              //   dom: [
              //     {
              //       typ: 'span',
              //       lbl: 'or',
              //     },
              //   ],
              // },
            ],
          },
          {
            id: id + '-form',
            cls: 'auth-form',
            dom: [
              {
                typ: 'label',
                lbl: 'Your name',
                for: 'name',
                cls: 'body1',
              },
              {
                typ: 'input',
                id: id+'-name',
                cls: 'auth-input',
								ini: function(m){ acis.name = nameACI = m; },
              },
              {
                typ: 'label',
                lbl: 'E-mail',
                for: 'email',
                cls: 'body1',
              },
              {
                typ: 'input',
                id: id+'-email',
                cls: 'auth-input',
								ini: function(m){ acis.email = emailACI=m; },
								on: {
									change: onEmailMod,
								},
              },
              {
                typ: 'label',
                lbl: 'Username',
                for: 'username',
                cls: 'body1',
              },
              {
                typ: 'input',
                id: id+'-username',
                cls: 'auth-input',

								ini: function(m){ acis.user = userACI=m; },
              },
              {
                typ: 'label',
                lbl: 'Password',
                for: 'password',
                cls: 'body1',
              },
              {
                typ: 'input',
                id: id+'-password',
                type: 'password',
                cls: 'auth-input',
								ini: function(m){ acis.pass = passACI=m; },
              },
              {
                cls: 'auth-checkbox-container',
                dom: [
                  {
                    typ: 'input',
                    type: 'checkbox',
                    id: 'terms',
                    cls: 'auth-checkbox',
										ini: function(m){ acis.remember = chkBoxACI=m; },
                  },
                  {
                    typ: 'label',
                    cls: 'auth-checkbox-text body2',
                    for: 'terms',
                    dom: [
                      {
                        typ: 'span',
                        lbl: 'By creating an account you agree to the ',
                      },
                      {
                        typ: 'a',
                        href: '#',
                        lbl: 'terms of use',
                      },
                      {
                        typ: 'span',
                        lbl: ' and our ',
                      },
                      {
                        typ: 'a',
                        href: '#',
                        lbl: 'privacy policy.',
                      },
                    ],
                  },
                ],
              },
              {
                cls: 'auth-button body2',
                typ: 'button',
                lbl: 'Create account',
								on: {
									click: onExe,
								},
								ini: function(m){ btnACI=m; },
              },
              {
                cls: 'body2',
                dom: [
                  {
                    typ: 'span',
                    lbl: 'Already have an account? ',
                  },
                  {
                    typ: 'a',
                    href: '#',
                    lbl: 'Log In',
										on: {
											click: function(){ auth.set('page','login'); },
										},
                  },
                ],
              },
            ],
          },
        ],
      };
      return dom;
    }


		// Triggered when form button is submitted.
		function onExe(){
			var dat = getDat(),
				chk = checkDat(dat);
			if (chk) {
				return exeMsg({typ:'empty',dat});
			}
			if (badEmail) {
				return;
			}
			onSub && onSub(dat);
		}//onExe()


		// Alerts of missing fields.
		function checkDat(v){
			var chk = [];
			all.snc(mandatory,function(o){
				var ref = o.k,
					val = o.v,
					cmp = v[ref];
				ref && !cmp && chk.push(ref);
			});
			return chk.length && chk || '';
		}//checkDat()


		// Grabs contents of fields and returns as data object.
		function getDat(){
			var dat = {
				name: nameACI.get.v('val'),
				user: userACI.get.v('val'),
				email: emailACI.get.v('val'),
				pass: passACI.get.v('val'),
				remember: chkBoxACI.get.v('val'),
			};

			// dat = {  // Fix!
			// 	name: 'Test User',
			// 	user: 'tester',
			// 	email: 'jeff@insource.pro',
			// 	pass: 'P@$$',
			// 	remember: 1,
			// };

			return dat;
		}//getDat()


		function onEmailMod(v){
			var email = emailACI.get.v('val'),
				obj = {
					tgt: 'auth',
					cmd: 'exe',
					typ: 'usr',
					dat: email,
				};
			email && ace.get.dat(obj,function(dat){
				var chk = dat.chk;
				// log('Signup onEmailMod() Received response data: ',dat);
				if (chk) {
					exeMsg('This email address is already in use for another creator account.  Please choose another.');
					highlightField('email');
					badEmail = 1;
				} else {
					badEmail = 0;
					exeMsg({msg:'Enter your data to Sign Up!',mode:'reset'});
					highlightField('email', 'clear');
				}
			});
		}//onEmailMod()


		function exeMsg(v,r){
			if (!v) { return; }
			var str = is.str(v,1) || v.msg || v.str || '',
				typ = v.typ,
				dat = v.dat,
				mode = v.mode || 'alert',
				msgs = {
					empty: 'Please complete the mandatory fields.'
				},
				msg = str || typ && msgs[typ] || '',
				col = mode=='alert' && 'red' || '#94a3b8';
			headACI.set('lbl',msg);  // Fix.
			headACI.set('css',{col:col});  // Fix.
			all(dat,function(o){
				var ref = o.k,
					val = o.v;
				!val && highlightField(ref);
			});
			return msg;
		}//exeMsg()


		//
		function highlightField(ref,val){
			if (!ref) { return; }
			var aci = acis[ref],
				col = val=='clear' && 'black' || 'red',
				border = '1px solid '+col;
			aci && aci.set('css',{border:border});  // {'bgc':col});
		}//highlightField()


  }
});
