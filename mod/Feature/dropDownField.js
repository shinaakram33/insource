ACE.mod('dropDownField', function(ace){
    return dropDownField;

    function dropDownField(cfg){
        let label = cfg.label,
        data = cfg.data || [],
        selectACI,
        aci = {
            set: {
                dat: setDat
            },
            get: {
                dat: getDat
            }
        },

        ux = {            
            aci, 
            dom: {
                typ: 'select',
                cls: 'form-select',
                dom: iniDom(), 
                ini: m => {
                    selectACI = m
                }
            },
            ini: (m)=> (cfg.ini(m))
        };

        return ux;

        function iniDom(){
            let dom = []
            data.forEach(element => {
                dom.push({
                    typ: 'option',
                    lbl: element,
                    value: element,
                    ini: m=> (optionACI = m)
                })
            });

            return dom;
        }

        function setDat(){
        }

        function getDat(){
            return selectACI.get.v('val')
        }
    }
})