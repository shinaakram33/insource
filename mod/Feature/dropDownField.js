ACE.mod('dropDownField', function(ace){
    return dropDownField;

    function dropDownField(cfg){
        let label = cfg.label,
        data = cfg.data || [],
        selectACI,dropdownACI
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
            ini: (m)=> {
                cfg.ini(m)
            }
        };

        return ux;

        function iniDom(){
            //  console.log('dropdown', data)
            let dom = []
            data.forEach(element => {
                if(element.title == undefined){
                    element = {
                    title: element,
                    id :element
                    }
                }
                dom.push({
                    typ: 'option',
                    lbl: element.title,
                    value: element._id,
                    ini: m=> (element.ACI = m)
                })
            });

            return dom;
        }

        function setDat(dat){
            data = dat;
            //  console.log('dropdown data', data)
            data.forEach(element => {
                selectACI.add({
                    typ: 'option',
                    lbl: element.title,
                    value: element._id,
                    ini: m=> (element.ACI = m)
                })
            });
        }

        function getDat(){
            return selectACI.get.v('val')
        }
    }
})