ACE.mod('TaskList', function(ace){
    return TaskList

    function TaskList(cfg){
        ace.get('mod', 'mod/Task.js')
        let taskListACI,
        swap = cfg.swap,
        taskACI,
        ux = {
            typ: 'ul',
            cls: 'list-group justify-content-between',
            aci: {
                add: {
                    task: addTask
                },
                get: {
                    desc: getDesc
                }
            },
            ini: (m) => { 
                taskListACI = m;
                cfg.ini(m);
            },
        }

        return ux;

        function addTask(v){
            if(v !== " "){
                taskListACI.add({
                    typ: 'li',
                    mod: 'Task',
                    lbl: v,
                    getDesc,
                    ini: (m)=>{
                        taskACI = m;
                    },
                })
            }
        }

        function getDesc(v){
             cfg.getTaskDescription(v)
        }
    }
})