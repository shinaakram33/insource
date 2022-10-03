ACE.mod('CheckEmail', function (ace) {
  var now = ace.now;

  return CheckEmail;

  function CheckEmail(config) {
    var id = config.id || 'check-email' + now(),
      cls = 'check-email',
      email = config.email || '',
			auth = config.auth,
			aci = {
				set: {
					dat: setDat,
				},
			},
      ux = {
        id,
        cls,
				aci,
        dom: iniDom(),
				ini: config.ini,
      },
			msgACI;

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
                lbl: 'An email will be coming soon',  // 'Check Your Email',
              },
              {
                cls: 'auth-sub-heading body1',
                typ: 'p',
                lbl: 'Thanks! We will send a unique link to your email address to activate your account.',
								ini: function(m){ msgACI=m; },
              },
            ],
          },
          {
            id: id + '-form',
            cls: 'auth-form',
            dom: [
              // {
              //   cls: 'auth-button body2',
              //   typ: 'button',
              //   lbl: 'Open Email App',
              // },
              {
                cls: 'auth-spaced-between',
                dom: [
                  // {
                  //   cls: 'auth-back body2',
                  //   lbl: '← Back to log In',
									// 	on: {
									// 		click: function(){ auth.set('page','login'); },
									// 	},
                  // },
                  // {
                  //   cls: 'auth-back body2',
                  //   lbl: 'Didn’t receive the email? ',
                  //   dom: {
                  //     typ: 'a',
                  //     href: '#',
                  //     lbl: 'Click to resend',
									// 		on: {
									// 			click: resend,
									// 		},
                  //   }
                  // },
                ],
              },
            ],
          },
        ],
      };
      return dom;
    }

		function setDat(v,r){
			var ref = v.ref || '',
				mode = v.mode || '',
				email = v.email || '',
				msg = v.msg || 'We sent a unique link to your email address '+email;
			msgACI.set('lbl',msg);
		}//setDat()


		function resend(){
			auth && auth.exe('email');
		}//resend()

  }
});
