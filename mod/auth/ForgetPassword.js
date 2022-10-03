ACE.mod('ForgetPassword', function (ace) {
  var now = ace.now;

  return ForgetPassword;

  function ForgetPassword(config) {
    let id = config.id || 'forget-password' + now(),
		  cls = 'forget-password',
		  auth = config.auth,
      headACI,
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
                lbl: 'Forget Password?',
              },
              {
				  cls: 'auth-sub-heading body1',
				  typ: 'p',
				  lbl: 'No worries, we’ll send you reset instructions',
				  ini: function(m){ headACI=m; },
              },
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
                id: 'email',
                cls: 'auth-input',
              },
              {
                cls: 'auth-button body2',
                typ: 'button',
                lbl: 'Resset Password',
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
