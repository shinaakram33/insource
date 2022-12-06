// Client-side module for interacting with data for the app.
ACE.mod('Itm', function(ace){
    ace.get('mod', 'mod/Dat.js')

	var is = ace.is,
		log = ace.log,
		now = ace.now,
		all = ace.all,
		que = ace.que,
		ext = ace.ext,
		tic = ace.tic,
		utl = ace.get.v('utl'),
		env = ace.get.v('env'),
		DOM = ace.get.v('dom'),
		ACI = ace.get.v('aci'),
		COM = ace.get.v('com'),
		CFG = ace.get.v('cfg');


	var cmds = 'get,set,add,rem,ini,del,exe'.split(','),
		cfgVars = window.aceAppVars || window.svVarsObj || '',  // Fix! Use cfg. {},  // The globally accessible environment vars for the app.
		aci = ACI({
			get: {
				// dat: getData,
                itm: getItm
			},
			set: {
				itm: setItm
			},
			ini: {
				itm: iniItm
			},
			del: {
				itm: delItm
			},
		},Itm),
		me;
	
	ace.get.itms = getItms; 
    ace.set.item = setItm;
    ace.ini.item = iniItm;
    ace.get.item = getItm;
    ace.del.item = delItm;

	return Itm;

    function Itm(cfg){
		cfg = cfg || {};
	}
	
	
	function getItms(v,r){
		is.fnc(r||v, aci);
		return aci;
	}

    function getItm(obj, r){
        if(obj.aspect=='all'){
            ace.get.itm(obj.typ, function(dat){
                if(dat){
                    dat = JSON.parse(dat)
                    let data = []
                        dat.forEach(element => {
                            ace.get.itm(element, function(dat1){
                                data.push(dat1)
                            })
                        });
                    r(data)
                }else{
                    r([])
                }
            })
        }else{
            ace.get.itm(obj.v,r)
        }
    }

    function setItm(obj, r){
        console.log('into set')
        ace.set.itm(obj.v, r)
    }

    function iniItm(obj,r){
        ace.ini.itm(obj.v,function(dat){
            ace.get.itm(obj.typ, function(dat1){
                let typArray=[];
                typArray = JSON.parse(dat1)
                if(typArray){
                    typArray.push(dat)
                }else{
                    typArray = []
                    typArray[0] = dat
                }   
                typArray = JSON.stringify(typArray)
                localStorage.setItem(obj.typ, typArray)
                r(dat)
            })
        })
    }

    function delItm(obj,r){
        ace.del.itm(obj.v,()=>{
            ace.get.itm(obj.typ, function(dat){
                dat = JSON.parse(dat);
                const index = dat.indexOf(obj.v)
                if (index > -1) { 
                    dat.splice(index, 1); 
                }
                dat = JSON.stringify(dat)
                localStorage.setItem(obj.typ, dat)
                r(dat)
            })
        })

    }


});
