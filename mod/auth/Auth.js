ACE.mod('Auth', function (ace) {
	var now = ace.now,
		log = ace.log,
		tic = ace.tic;

	ace.get('mod', 'mod/Auth/Signup.js');
	ace.get('mod', 'mod/Auth/Login.js');
	ace.get('mod', 'mod/Auth/ForgetPassword.js');
	ace.get('mod', 'mod/Auth/CheckEmail.js');
	ace.get('mod', 'mod/Auth/ResetPassword.js');
	ace.get('mod', 'mod/Auth/ConfirmPassword.js');

	return Auth;

	function Auth(c) {
		const id = c.id || 'auth' + now(),
			hit = c.hit || window.hitHashKey || '',  // Fix.
			urlObj = window.urlObj || '',  // Fix.
			chkIP = '76.196.245.63',  // Fix.
			cls = 'auth',
			logo = c.logo || 'img/full-logo.png',
			authMod = c.authMod,
			on = c.on || {},
			onLogin = is.fnc(c.onLogin || on.login),
			onLogout = is.fnc(c.onLogout || on.logout),
			aci = {
				get: {
					page: getPage,
				},
				set: {
					page: setPage,
				},
				exe: {
					email: exeEmail,
				}
			},
			ux = {
				id,
				cls,
				aci,
				// dom: iniDom(),
				css: c.css,
				ini: ini,
			};
		var loc = 1,
			sent = '',
			activeKey,  // Currently active key for server transmissions.
			oldKey,  // The most recently used activeKey.
			callQue = [],  // Queues secure calls until exeHit is called.
			outCall,  // True if there is an outgoing secure call waiting for a response. 
			swap,
			signupACI,
			emailACI,
			loginACI,
			forgotACI,
			resetACI,
			confirmACI,
			me;
			
		ace.exe.cal = ace.exe.call = exeCall;
		ace.exe.logout = logOut;
		
		exeHit();
		return ux;


		function ini(m){
			me = m;
			iniDom();
			is.fnc(c.ini,m);
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
						mod: 'SwapContent',	// authMod,
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
								onExe: iniUser,
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
			if (!swap) { return tic(function(){ setPage(v); }); }
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


		// Identifies whether debugging mode is active, and if so what mode.
		function chkDebug(v){
			var urlObj = window.urlObj || '',
				hash = urlObj.hash || '';
			return hash=='tst' && hash;  // Fix.  onLogin,   iniUser
		}//chkDebug()

		
		
		function iniUser(v){
			// log('iniUser()',v);
			var obj = sent = {
				tgt: 'auth',
				cmd: 'ini',
				typ: 'act',
				dat: enc(v),
			};
			ace.get.dat(obj,function(dat){
				log('Received response data: ',dat);
				var email = dat && dat.email;
				email && ace.dat({  // Fix?
					cmd: 'set',
					key: 'userEmail',
					val: email,
				});
				return setPage('email',{msg:'A unique activation link has been sent to your email.'});
				onLogin && onLogin(dat);  // If we want to allow immediate login, bypassing email verification.
			});
			

			// Encodes/Encrypts the data, adding the correct key to the output.
			function enc(v){
				v.hash = iniHash(v.email+v.pass);
				return v;  // Fix! Encrypt before sending data to server. Use salt obtained during handshake
			}//enc()

		}//iniUser()
		
		
		
		function tryLogin(v){
			log('Auth.js tryLogin()', v);
			// if (!chkDebug()) { return; }  // Fix.
			v.hit = getKey('hit');
			// v.dev = getKey('dev');
			// v.act = getKey('act');
			// v.ses = getKey('ses');
			var obj = {
				tgt: 'auth',
				cmd: 'exe',
				typ: 'login',
				dat: enc(v),
			};
			exeCall(obj,function(dat){
				log('tryLogin() received response data: ',dat);
								
				if (dat && dat.usr && dat.state=='auth') {
					onLogin && onLogin(dat);
				} else {
					// loggedIP==chkIP && onLogin(dat);
					loginFailed(dat);
				}
			});
			// swap.set('loc','signup');

			// Encodes/Encrypts the data, adding the correct key to the output.
			function enc(v){
				return v;  // Fix! Encrypt before sending data to server. Use salt obtained during handshake
			}//enc()

		}//tryLogin()
		
		
		function logOut(){
			log('logOut() executing...');
			exeCall({
				tgt: 'auth',
				cmd: 'exe',
				typ: 'logout',
				dat: {},
			},(dat)=>{
				window.logOut();
				log('logOut() completed. dat: ',dat);
			});	
		}//logOut()
		
		
		function loginFailed(dat){
			log('loginFailed()',dat);
			// Fix. Handle.
		}//loginFailed()
		


		function iniHash(str,salt){
			salt = salt || getSalt();
			return salt;  // Fix!
		}//iniHash()


		// Obtains the salt to be used to encrypt/decrypt a given item.
		function getSalt(ref){
			ref = ref || getRef();
			return iniAID();  // Fix.

			function getRef(){
				return ''; // Fix.
			}//getRef()

		}//getSalt()


		// Initializes a secure channel with server, for use with this hit. Runs automatically as soon as the script loads.
		function exeHit(v){
			var usr = ace.dat('userHash'),
				email = ace.dat('userEmail'),
				dat = {
					hit: getKey('hit'),
					dev: getKey('dev'),
					// ses: getKey('ses'),
					key: urlObj.key || '',  // This is the key passed in the url if applicable.
					// old: getKey('old'),
					// usr,
					// email,
				},
				obj = {
					tgt: 'auth',
					cmd: 'exe',
					typ: 'hit',
					dat: dat,
				};
			outCall = 1;
			ace.get.dat(obj,handleDat);

			function handleDat(dat){
				dat = dat || '';
				var dev = dat.dev || '',
					act = dat.act || '',
					state = dat.state || '',
					loggedIn = state=='auth',
					iniDat = dat.iniDat || '',
					ip = window.loggedIP = dat.ip || '';  // Fix.
				log('exeHit() received response data: ',dat);
				if (!dat || !act || !dev) {
					return handleIssues(dat);
				}
				dev && setKey('dev',dev);
				setKey('act',act);
				outCall = 0;
				tic(nxtCall);
				handleAuth();
				// setTimeout(handleAuth,300);  // Fix. Send on fin()

				function handleAuth(){
					// return;  // if (ip!=chkIP) { return; }  // Fix!
					if (loggedIn) {
						onLogin(iniDat);
					} else {
						onLogout();
					}
				}//handleAuth()
				
				function handleIssues(dat){
					log('exeHit() handleDat() had issue with response data: ',{dat,act,dev});  // Fix. Handle.
				}//handleIssues()
				
			}//handleDat()
		}//exeHit()
		
		
		// Makes secure call to server using act key.
		function exeCall(v,r){
			log('exeCall()',v);
			if (!activeKey || outCall) { return queCall(v,r); }
			v.act = getKey();
			outCall = 1;
			ace.get.dat(v,function(dat){
				if (!dat || dat.err) {
					log('ISSUE with secure call.',{v,dat});  // Fix. Handle
				}
				var act = dat && dat.act;
				outCall = 0;
				if (act) { 
					setKey('act',act);
					delete dat.act;
				} else {
					log('Secure call returned no active key!',dat); //
					exeHit();  // Fix?
				}
				is.fnc(r,dat);
				callQue.length && nxtCall();
			});
			
				
			// Encodes/Encrypts the data, adding the correct key to the output.
			function enc(dat){
				return dat;  // Fix! Encrypt before sending data to server. Use salt obtained during handshake
			}//enc()
			
			function queCall(){
				var obj = {v,r};
				log('Auth.js queCall() deferred executing call: ',obj);
				callQue.push(obj);
			}//queCall()
			
		}//exeCall()
		
		
		// Executes each call in the secure call que
		function nxtCall(){  // Fix. Handle timeouts.
			if (outCall) { return setTimeout(nxtCall,500); }  // Fix? 
			var obj = callQue.length && callQue.shift(),
				v = obj && obj.v,
				r = obj && obj.r;
			log('Auth.js nxtCall()',obj);
			obj && exeCall(v,r);
		}//nxtCall()

		
		// Synchronous function, returns the specified key or defaults to 'act'.
		function getKey(v,r){
			var typ = v && is.str(v,1) || 'act',
				fncs = {
					act: getAct,
					hit: getHit,
					dev: getDev,
					old: getOld,
					ses: getSes,
				},
				fnc = fncs[typ],
				key = fnc && fnc();
				// log('Auth.js getKey('+typ+'): '+key);
				is.fnc(r,key);
				return key;

				function getAct(){
					return activeKey || '';
				}//getAct()

				function getOld(){
					return oldKey || (oldKey = ace.dat('oldHashKey') || '');
				}//getOld()

				function getHit(){
					return hit;
				}//getHit()

				function getDev(){
					return ace.dat('devHashKey') || '';
				}//getDev()
			
				function getSes(){
					var ses = ace.dat('sesHashKey') || '';
					if (!ses) {
						ses = iniAID();
						setKey('ses',ses);
					}
					return ses;
				}//getDev()

		}//getKey()
		
		
		function setKey(typ,val){
			val = val || '';
			if (!val) { 
				return log('ALERT! Auth.js setKey('+(typ||'_')+') received empty value. Returning without updating key.'); 
			}
			if (typ=='act') {
				activeKey && setKey('old',''+activeKey);
				activeKey = val;
			} else if (typ=='old') {  // Fix? May not want to allow manually setting.
				ace.dat({
					cmd: 'set',
					key: 'oldHashKey',
					val: oldKey = val,
				});
			} else if (typ=='dev') {
				ace.dat({
					cmd: 'set',
					key: 'devHashKey',
					val: val,
				});
			} else if (typ=='ses') {
				ace.dat({
					cmd: 'set',
					key: 'sesHashKey',
					val: val,
				});
			} else {
				log('No typ passed',val);
			}
		}//setKey()
		
		


		function exeEmail(v){
			// Fix! Complete. Needs to directly re-trigger last email sent.
		}//exeEmail()



		function onHelp(){
			return onLogin();
			onClk();
			log('ace.ini: ', ace.ini);
			ace.ini.maker({});
		}//onHelp()


		function onLogo(){
			onBak();
		}//onLogo()


		// Temporary fnc to cycle through pages.
		function onClk(){
			// swap.exe('next');
		}//onClk()


		// Temporary fnc to cycle through pages.
		function onBak(){
			// swap.exe('prev');
		}//onBak()


	}//Auth()


	// Fix. Standardize these:



	// Fix. Move into central module.
	function iniAID(){
		var aid = randStr();  // Fix. Check for existing AID.
		return aid;
	}//iniAID()


	// Receives a numeric now() input and returns a time string formatted to EST. If typ is 'time' or 'date', only that segment will be returned.
	function strEST(v,typ){
		var ms = v && v!='time' && v!='date' && v || +now(),
			dif = 4,  // Fix. Make dynamic bast on DST if applicable.
			zone = 'America/New_York',  // 'Eastern Time',  // 'EST' // ''
			local = ''+ms+' '+zone,
			calc = ms-3600000*dif,
			str = new Date(calc).toISOString().replace('T',' ').replace('Z',' EST'),
			arr = str.split(' '),
			date = arr[0],
			time = arr[1],
			res = v=='date' && date || v=='time' && time || str;
		// log('strEST',{ms:ms,str:str,arr:arr,date:date,time:time,res:res});
		return res;
	}//strEST()


	function randNum(cfg) {
		cfg = cfg || {};
		var num = is.num(cfg) && cfg,
			max = num || cfg.max || _max,
			min = num ? 0 : (cfg.min || _min);
		return min+Math.floor(Math.random()*(1+max-min));  // Fix? Never hits 0
	}//randNum()


	// Generate random string.
	function randStr(len) {
	  len = len || 30;
	  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz",  // Fix?  "0123456789" "!@#$%^&*()-+_={}|[]"
	    max = chars.length,
	    arr = [];
	  if (max && len>0){
	    for (var i=len; i; i--) {
	      arr.push(chars[randNum(max)]);
	    }
	  }
	  return arr.join('');
	}//randStr()


});
