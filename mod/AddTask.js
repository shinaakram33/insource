ACE.mod('AddTask', function(ace){
    var now = ace.now
    return AddTask

    function AddTask(Config){
        let inputData,
        id= Config.id || 'task-'+now,
        cls = 'add-task',
        inputElement,
        addTaskACI,
        tasksObj= {
            tasks: []
        },
        aci = {
            get: {
                dat: getData
            }
        },
        ux = {
            id,
            cls: cls + ' input-group mb-3 d-flex justify-content-between',
            dom: iniDom(),
            aci,
            ini: (m)=> {addTaskACI= m}
        };
        return ux; 

        function iniDom() {
            return [
                {
                    typ: 'input',
                    cls: 'form-control ',
                    type: 'text',
                    placeholder: ' What do you need to do today?',
                    ini: (m)=> {
                        inputElement = m
                    },
                },
                { typ: 'button', cls: 'btn btn-primary ms-2', type: 'submit ', lbl: 'Add', 
                    on: {
                        click: addTask
                    } 
             },
            ];
        }

        function addTask(){
            tasksObj.tasks.push(inputElement.get.v('val'))
            //localStorage.setItem('tasks', JSON.stringify(tasksObj))
            localStorage.setItem('tasks', inputElement.get.v('val'))
            inputElement.set('val', '')
            Config.addtask(addTaskACI);
        }

        function getData(){
            return localStorage.getItem('tasks')
        }
    }
})