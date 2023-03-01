ACE.mod('TaskDetailsSection', function(ace){
    ace.get('mod', 'mod/TaskDetails/TaskDetailsItems.js')
    return TaskDetailsSection

    function TaskDetailsSection(cfg){
        let taskText = cfg.taskText,
        Location = cfg.Location,
        taskDetailsACI,
        aci = {
            set: {
                dat: setDat
            }
        },
        ux = {
            dom: iniDom(),
            ini,
            aci
        }

        return ux;

        function ini(m){
            cfg.ini(m)
        }

        function iniDom(){
            let dom = {
                cls: 'container p-5 ',
                dom: {
                    mod: 'TaskDetailsItems',
                    taskText,
                    Location,
                    ini: (m)=> {
                        taskDetailsACI = m
                    }
                }
            }
            return dom;
        }

        function setDat(v){
            taskDetailsACI.set('dat', v)
        }
    }
})