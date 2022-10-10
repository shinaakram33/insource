ACE.mod('Task', function(ace){
    var now = ace.now,
        is = ace.is;
       
    return Task

    function Task(config){
        //let data = JSON.parse(localStorage.getItem('tasks')),
        ace.get('mod', 'mod/SwapContent.js');
        let lbl = config.lbl,
        id = config.id || 'task-' + now(),
        cls = 'task',
        Delete = config.onDelete,
        swap = config.swap,
        TaskACI;
        return {
            id,
            cls: cls + ' list-group-item border-top-0',
            dom: iniDom(),
            ini: (m)=> { 
                TaskACI = m;
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
                                        console.log(swap)
                                        //swap.set('loc', 2);
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
    }
})