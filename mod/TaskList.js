ACE.mod('TaskList', function(ace){
    return TaskList

    function TaskList(config){
        ace.get('mod', 'mod/Task.js')
        ace.get('mod', 'mod/SwapContent.js');
        let taskListACI,
        swap = config.swap
        ux = {
            typ: 'ul',
            cls: 'list-group justify-content-between',
            aci: {
                add: {
                    task: addTask
                }
            },
            ini: (m) => { 
                taskListACI = m;
                config.ini(m);
            },
        }

        return ux;

        function addTask(v){
            if(v !== " "){
                taskListACI.add({
                    typ: 'li',
                    mod: 'Task',
                    lbl: v,
                    swap
                })
            }
        }
    }
})