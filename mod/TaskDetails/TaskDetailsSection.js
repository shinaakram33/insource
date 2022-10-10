ACE.mod('TaskDetailsSection', function(ace){
    ace.get('mod', 'mod/TaskDetails/TaskDetailsItems.js')
    return TaskDetailsSection

    function TaskDetailsSection(cfg){
        let lbl = cfg.lbl,
        ux = {
            dom: iniDom()
        }

        return ux;

        function iniDom(){
            let dom = {
                mod: 'TaskDetailsItems',
                lbl: lbl,
                ini: (m)=> {

                }
            }
            return dom;
        }
    }
})