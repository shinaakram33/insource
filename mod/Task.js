ACE.mod('Task', function(ace){
    var now = ace.now,
        is = ace.is;
       
    return Task

    function Task(cfg){
        let lbl = cfg.lbl,
        id = cfg.id || 'task-' + now(),
        cls = 'task',
        data=[],
        aci = {
            get: {
                description: getDescription
            }
        },
        TaskACI;
        return {
            id,
            cls: cls + ' list-group-item border-top-0',
            dom: iniDom(),
            aci,
            ini: (m)=> { 
                TaskACI = m;
                cfg.ini(m)
            }
        }

        function iniDom() {
            return {
                cls: 'form-check d-flex justify-content-between',
                dom: [
                    {
                        dom: [
                            {
                                typ: 'input',
                                cls: 'form-check-input ',
                                type: 'checkbox',
                                id: 'check1',
                                name: 'option2',
                                value: 'something',
                            },
                            {
                                typ: 'label',
                                cls: 'form-check-label',
                                for: 'check1',
                                lbl: lbl,
                                on: {
                                    click: () => {
                                        data[0] = 2;
                                        data[1] = lbl;
                                        getDescription()
                                    },
                                }
                            },
                        ],
                    },
                    { dom: 
                        { 
                            typ: 'span', 
                            lbl: '&times;',
                            on: {
                                click: deleteTask
                            } 
                        } 
                    }
                ],
            };
        }

        function deleteTask(){
            TaskACI.del()
        }

        function getDescription(){
            cfg.getDesc(data)
        }
    }
})