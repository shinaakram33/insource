ACE.mod('TaskDetailsItems', function(ace){

    return TaskDetailsItems

    function TaskDetailsItems(cfg){
        let taskText = cfg.taskText,
        data=[],
        taskTextACI,
        aci = {
            set: {
                dat: setDat
            }
        },
        ux = {
            dom: iniDom(),
            aci,
            ini: (m)=>{
                cfg.ini(m)
            }
        }
        return ux;

        function iniDom(){
            let dom = [
                {
                    typ: 'button',
                    cls: 'btn btn-secondary ms-2',
                    lbl: 'Go back',
                    on: {
                        click: (e)=>{
                            data[0] = 1
                            data[1] = ''
                            cfg.Location(data)
                        }
                    }
                },
                {
                    typ: 'h4',
                    lbl: 'Task Details'
                },
                {
                    dom: [
                        {
                            typ: 'p',
                            lbl: taskText,
                            ini: (m)=> {
                                taskTextACI = m
                            }
                        },
                        {
                            typ: 'p',
                            lbl: 'This is dummy description for above mentioned task.'
                        }
                    ]
                }
            ]
            return dom;
        }

        function setDat(v){
            taskTextACI.set('lbl', v)
        }
    }
})