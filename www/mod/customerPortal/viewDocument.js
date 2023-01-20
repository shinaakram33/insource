ACE.mod('moduleName', function(ace){
    ace.get('mod', 'mod/SwapContent.js');
    return moduleName;

    function moduleName(cfg){
        let id = cfg.id || '',
        mainMenuACI,
        aci = {
            set: {
                dat: setDat
            },
            get: {
                dat: getDat
            }
        },
        ux = {
            id,
            aci,
            dom: iniDom(),
            ini: (m)=> {
                cfg.ini(m);
                mainMenuACI = m;
            }
        };
        return ux;

        function iniDom(){
            return {
                typ: 'span',
                lbl: ''
            }
        }

        function setDat(dat){}

        function getDat(){}
    }
})
        