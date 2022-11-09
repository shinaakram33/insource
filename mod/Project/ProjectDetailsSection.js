ACE.mod('ProjectDetailsSection', function(ace){
    ace.get('mod', 'mod/Project/ProjectDetailsItem.js');
    return ProjectDetailsSection

    function ProjectDetailsSection(cfg){
        let id = cfg.id || 'details',
        projectItems = cfg.projectItems || [],
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
            cls: 'container mt-5',
            dom: iniDom(),
            ini: (m)=> {
                cfg.ini(m)
            },
            aci
        };
        
        return ux;

        function iniDom(){
            let dom = [
                {
                    cls: 'row mt-4',
                    typ: 'h1',
                    lbl: 'Project Details'
                },
                {
                    cls: 'container mt-4',
                    dom: {
                        mod: 'ProjectDetailsItem',
                        ini: (m)=> {
                            projectItemACI = m
                        }
                    }
                }
            ]
            return dom;
        }

        function setDat(data){
            projectItemACI.set('dat', data)

        }
        
        function getDat(){

        }
    }
})