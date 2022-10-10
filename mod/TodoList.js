ACE.mod('TodoList', function(ace){
    var now = ace.now,
        is = ace.is;
    return TodoList

    function TodoList(cfg){
        ace.get('mod', 'mod/AddTask.js')
        ace.get('mod', 'mod/TaskList.js')
        ace.get('mod', 'mod/SwapContent.js');
        let id = cfg.id || 'todo-list-' + now(),
            cls = 'todo-list',
            me,
            swap = cfg.swap,
            tasksACI,
            addTasksACI
            ux = {
                id,
                dom: iniDom(),
                ini,
            };

        return ux;

        function ini(m) {
            me = m;
            is.fnc(cfg.ini, m);
        }

        function iniDom() {
            return [
                {
                    cls: 'container p-5 ',
                    dom: [
                        {
                            cls: 'card bg-light p-4',
                            dom: [
                                { typ: 'h5', lbl: 'Todo List' },
                                {
                                    dom: {
                                        mod: 'AddTask',
                                        task: tasksACI,
                                        addtask: linkTask,
                                        ini: (m)=> { addTasksACI = m }
                                    },
                                },
                                {
                                    typ: 'ul',
                                    mod: 'TaskList',
                                    ini: (m) => { 
                                        tasksACI = m;
                                    }
                                },
                            ],
                        },
                    ],
                },
            ];
        }

        function linkTask(addTaskACI){
            tasksACI.add('task',  addTaskACI.get.v('dat'))
        }
    }
})