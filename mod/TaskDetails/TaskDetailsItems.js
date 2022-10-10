ACE.mod('TaskDetailsItems', function(ace){

    return TaskDetailsItems

    function TaskDetailsItems(cfg){
        let taskText = cfg.lbl,
        aci = {

        },
        ux = {
            id: '',
            aci,
            dom: iniDom(),
            ini: (m)=>{

            }
        }

        function iniDom(){
            let dom = [
                {
                    typ: 'button',
                    cls: '',
                    on: {
                        click: (e)=>{

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
                            typ: 'h5',
                            lbl: taskText
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
    }
})