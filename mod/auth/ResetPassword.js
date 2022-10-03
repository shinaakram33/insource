ACE.mod('ResetPassword', function (ace) {
  var now = ace.now;

  return ResetPassword;

  function ResetPassword(config) {
    const id = config.id || 'reset-password' + now(),
      cls = 'reset-password',
      email = config.email,
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
                lbl: 'Set New Password',
              },
              {
                cls: 'auth-sub-heading body1',
                typ: 'p',
                lbl: 'Your new password must be defferent to previously used passwords',
              },
            ],
          },
          {
            id: id + '-form',
            cls: 'auth-form',
            dom: [
              {
                typ: 'label',
                lbl: 'Password',
                for: 'password',
                cls: 'body1',
              },
              {
                typ: 'input',
                id: 'password',
                type: 'password',
                cls: 'auth-input',
              },
              {
                typ: 'label',
                lbl: 'Confirm Password',
                for: 'confirm-password',
                cls: 'body1',
              },
              {
                typ: 'input',
                id: 'confirm-password',
                type: 'password',
                cls: 'auth-input',
              },
              {
                cls: 'auth-button body2',
                typ: 'button',
                lbl: 'Reset Password',
              },
              {
                cls: 'auth-back body2',
                lbl: '← Back to log In',
								on: {
									click: function(){ auth.set('page','login'); },
								},
              },
            ],
          },
        ],
      };
      return dom;
    }
  }
});
