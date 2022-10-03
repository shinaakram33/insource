ACE.mod('ConfirmPassword', function (ace) {
  var now = ace.now;

  return ConfirmPassword;

  function ConfirmPassword(config) {
    const id = config.id || 'confirm-password' + now(),
      cls = 'confirm-password',
			auth = config.auth,
      ux = {
        id,
        cls,
        dom: iniDom(),
				ini: config.ini,
      };

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
                lbl: 'Password Reset',
              },
              {
                cls: 'auth-sub-heading body1',
                typ: 'p',
                lbl: 'Your password has been successuly reset. Click below to log in magicaly',
              },
            ],
          },
          {
            id: id + '-form',
            cls: 'auth-form',
            dom: [
              {
                cls: 'auth-button body2',
                typ: 'button',
                lbl: 'Continue',
								on: {
									// click: logIn,
								},
              },
              {
                cls: 'auth-back body2',
                lbl: '← Back to log In',
              },
            ],
          },
        ],
      };
      return dom;
    }
  }
});
