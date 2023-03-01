ACE(function (ace) {
    var DOM = ace.get.v('dom');
    ace.get('mod', 'mod/TodoList.js')
    ace.get('mod', 'mod/SwapContent.js');
    ace.get('mod', 'mod/TaskDetails/TaskDetailsSection.js')
    var swap, taskText, taskDetailsACI, todoListACI;
    DOM({
        id: 'main-div',
        dom: [
            {
                mod: 'SwapContent',
                ini: (m)=>{
                    swap=m;
                },
                loc: 1,
                items: [
                    {
                        mod: 'TodoList',
                        getLocation,
                        ini: (m)=> todoListACI = m
                    },
                    {
                        mod: 'TaskDetailsSection',
                        Location: getLocation,
                        taskText,
                        ini: (m)=> taskDetailsACI = m
                    }   
                ]
            }
        ]
    })

    function getLocation(v){
        taskText = v[1];
        swap.set('loc', v[0])  
        taskDetailsACI.set('dat', taskText)  
    }

})
