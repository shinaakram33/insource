ACE(function (ace) {
    var DOM = ace.get.v('dom');
    ace.get('mod', 'mod/TodoList.js')
    ace.get('mod', 'mod/SwapContent.js');
    ace.get('mod', 'mod/TaskDetails/TaskDetailsSection.js')
    let swap;
    DOM({
        id: 'main-div',
        dom: [
            {
                lbl: 'Task List',
                on: {
                    click: ()=> {
                        console.log('hello')
                        swap.set('loc',2)
                    }
                }
            },
            {
                lbl: 'Task Description',
                on: {
                    click: ()=>{
                        console.log('hgsjagd')
                        swap.set('loc',1)
                    }
                }
            },
            {
                mod: 'SwapContent',
                ini: (m)=>{
                    swap=m;
                },
                loc: 1,
                items: [
                    {
                        mod: 'TodoList',
                    },
                    {
                        mod: 'TaskDetailsSection',
                    }
                ]
            }
        ]
    })
})
