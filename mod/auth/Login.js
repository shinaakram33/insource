ACE.mod('Login', function (ace) {
  var now = ace.now;

  return Login;

  function Login(config) {
    const id = config.id || 'login' + now(),
      cls = 'login',
      logoGoogle = 'img/google.png',
      logoApple = 'img/apple.png',
			on = config.on || {},
			onSub = is.fnc(config.onClick || on.click || config.onExe || on.exe),
			auth = config.auth,
      ux = {
        id,
        cls,
        dom: iniDom(),
		ini: config.ini,
      };
		var acis = {},
			chkBoxACI,
			emailACI,
			passACI,
			headACI,
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
                lbl: 'Log In',
              },
              {
                cls: 'auth-sub-heading body1',
                typ: 'p',
                lbl: 'Enter your email and password to log in!',
				ini: function(m){ headACI=m; }
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
                lbl: 'E-mail',
                for: 'email',
                cls: 'body1',
              },
              {
                typ: 'input',
                id: id+'-email',
                cls: 'auth-input',
				ini: function(m){ acis.email = emailACI=m; },
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
                cls: 'auth-spaced-between',
                dom: [
                  {
                    cls: 'auth-checkbox-container',
                    dom: [
                      {
                        typ: 'input',
                        type: 'checkbox',
                        id: 'terms',
                        cls: 'auth-checkbox',
						ini: function(m){ acis.chk = chkBoxACI=m; },
						checked: true,
                      },
                      {
                        typ: 'label',
                        cls: 'auth-checkbox-text body2',
                        for: 'terms',
                        lbl: 'Remember me',
                      },
                    ],
                  },
                  {
                    lbl: 'Forget password?',
                    cls: 'body2',
					on: {
						click: function(){ auth.set('page','forgot'); },
					},
                  },
                ],
              },
              {
				// mod: 'Btn',
				cls: 'auth-button body2',
                typ: 'button',
                lbl: 'Log In',
				on: {
					click: onExe,
				},
              },
              {
                cls: 'body2',
                dom: [
                  {
                    typ: 'span',
                    lbl: 'Not registered yet? ',
                  },
                  {
                    typ: 'a',
                    href: '#',
                    lbl: 'Create an Account',
					on: {
						click: function(){ auth.set('page','signup'); },
					},
                  },
                ],
              },
            ],
          },
        ],
		ini: function(m){ me=m; },
      };
      return dom;
    }

		// Triggered when form button is submitted.
		function onExe(){
			var dat = getDat();
			onSub && onSub(dat,(rsp)=>{
				var state = rsp.state,
					failed = state!='auth',
					msg = rsp.msg;
				if (failed) {
					exeMsg(msg);
				}
			});
		}//onExe()


		// Grabs contents of fields and returns as data object.
		function getDat(){
			var ele = chkBoxACI.get.v('ele'),
				chk = ele && ele.checked,
				dat = {
					email: emailACI.get.v('val'),
					pass: passACI.get.v('val'),
					remember: chk,
				};

			return dat;
		}//getDat()
		
		
		function exeMsg(v,r){
			if (!v) { return; }
			var str = is.str(v.msg || v.str || v, 1) || '',
				typ = v.typ || '',
				dat = v.dat || '',
				mode = v.mode || ''  // 'alert',
				msgs = {
					empty: 'Please complete the mandatory fields.'
				},
				msg = str || typ && msgs[typ] || '',
				col = (mode=='alert') && 'red' || '#94a3b8';
			headACI.set('lbl',msg);  // Fix.
			headACI.set('css',{col:col});  // Fix.
			return;
			all(dat,function(o){
				var ref = o.k,
					val = o.v;
				!val && highlightField(ref);
			});
			return msg;
		}//exeMsg()
	  
	  
	  function highlightField(ref,val){
			if (!ref) { return; }
			var aci = acis[ref],
				col = val=='clear' && 'black' || 'red',
				border = '1px solid '+col;
			aci && aci.set('css',{border:border});  // {'bgc':col});
		}//highlightField()

  }
});
