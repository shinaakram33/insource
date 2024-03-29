ACE.mod("viewAllTasks", function (ace) {
    ace.get("mod", "mod/Feature/viewAllFeatures.js");
    return viewAllTasks;
  
    function viewAllTasks(cfg) {
      let id = cfg.id || "list",
        projectItems = cfg.projectItems || [],
        projectItemACI,selectProjectACI,selectedProjectACI,viewAllTasksACI, featureACI,
        Location = cfg.getLocation;
        aci = {
          ini: {
            dat: iniDat
          },
          set: {
            dat: setDat,
            project: setProject
          },
          get: {
            dat: getDat,
            tasks: getAllTasks
          },
          rem: {
            dat: remDat
          }
        },
        ux = {
          id,
          aci,
          dom: iniDom(),
          ini: (m) => {
            cfg.ini(m);
            viewAllTasksACI = m
          },
        };
  
      return ux;
  
      function iniDom() {
  
        let dom = [
          { 
            cls: 'container border border-light bg-light w-50 mb-3 mt-3',
            dom:[
              {
                cls: 'w-100',
                dom: [
                  {
                    lbl: 'View Tasks: ',
                    type: 'label',
                    for: 'formFile',
                    cls: 'form-label fw-bold'
                  },
                  {
                    typ: 'select',
                    cls: 'form-select',
                    dom: [
                      {
                        typ: 'option',
                        lbl: 'All Tasks',
                        value: 'alltasks'                
                      },
                      {
                        typ: 'option',
                        lbl: 'By Project', 
                        value: 'byproject'
                      }
                    ],
                    ini: m=> (viewTasksACI = m),
                    on: {
                      load:  getAllTasks() 
                    },
                    on: {
                      change: ()=>{
                          getTasksFilterValue()
                      }
                    }
                  }
                ],
              }
            ],
          },
          {
            cls: 'container border border-light bg-light w-50 mb-3 mt-3 d-none',
            dom: [
              {
                style: 'width: 40%',
                cls: 'w-100 float-start',
                dom: [
                  {
                    lbl: 'Select Project',
                    type: 'label',
                    for: 'formFile',
                    cls: 'form-label fw-bold'
                  },
                  {
                    mod: 'dropDownField',
                    data: cfg.getProjects(callback),
                    ini: (m)=> {
                      selectedProjectACI = m
                    },
                    
                    
                  },
                ],
                on:{
                  change : ()=> {
                    getTasksFilterValue()
                  }
                }   
              }, 
                          
            ],
            ini: (m)=> {selectProjectACI = m}
          },
          
        ];
  
        return dom;
      }
  
       function getTasksFilterValue(){
        if(selectProjectACI !== undefined){
          var clss = selectProjectACI.get.v('ele'),
          tasksListData = [];
        }
        if(viewTasksACI.get.v('val') === 'byproject'){ 
          selectProjectACI.rem('cls','d-none')
          clss.classList.add('d-block')
          let selectedProject = selectedProjectACI.get.v('dat')
          console.log('selected', selectedProject)
          // ace.get.item({
          //   aspect: 'all',
          //   cmd: 'get',
          //   typ: 'task',
          //   v: selectedProject
          // }, async function(dat){
          //   featureACI.del()
          //    dat.forEach(element => {
          //     if(element.project_id === selectedProject){
          //       tasksListData.push(element)
          //     }
          //    });
          //    console.log('task list data', dat)
          //   //  if(dat.tasks.length > 0){
          //   //   for(let ele of dat.tasks){
          //   //     await ace.get.dat({
          //   //              aspect: 'itm',
          //   //              cmd: 'get',
          //   //              typ: 'task',
          //   //              v: ele
          //   //            }, function(dat){
          //   //              console.log('task dat', dat)
          //   //                tasksListData.push(dat)
          //   //            })
          //   //    }
          //     //  if(featureACI !== undefined){
          //       //  featureACI.del()
          //     //  }
          //      setTimeout(()=> {
          //        addDom(tasksListData)
          //      },800)
          //    //}
              
          // })

          // SERVER SIDE
          
          ace.get.dat({
            aspect: 'alltask',
            cmd: 'get',
            typ: 'task',
            v: selectedProject
          }, async function(dat){
            console.log('project tasks', dat)
            featureACI.del()
             tasksListData = dat
             console.log('task list data', dat)
            //  if(dat.tasks.length > 0){
            //   for(let ele of dat.tasks){
            //     await ace.get.dat({
            //              aspect: 'itm',
            //              cmd: 'get',
            //              typ: 'task',
            //              v: ele
            //            }, function(dat){
            //              console.log('task dat', dat)
            //                tasksListData.push(dat)
            //            })
            //    }
              //  if(featureACI !== undefined){
                //  featureACI.del()
              //  }
               setTimeout(()=> {
                 addDom(tasksListData)
               },800)
             //}
              
          })

        }else{
          selectProjectACI.rem('cls','d-block')
          clss.classList.add('d-none')
          // ace.get.item({
          //   aspect: 'all',
          //   cmd: 'get',
          //   typ: 'task',
          // }, function(dat){
          //     featureACI.del()
          //   console.log('all', dat)
          //   addDom(dat)
          // })

          // SERVER SIDE
          ace.get.dat({
            aspect: 'all',
            cmd: 'get',
            typ: 'task',
          }, function(dat){
              featureACI.del()
            console.log('all', dat)
            addDom(dat)
          })
        }
      }

      function getAllTasks(){
        // ace.get.item({
        //   aspect: 'all',
        //   cmd: 'get',
        //   typ: 'task',
        // }, function(dat){
        //   addDom(dat)
        // })

        //SERVER SIDE
        ace.get.dat({
          aspect: 'all',
          cmd: 'get',
          typ: 'task',
        }, function(dat){
          addDom(dat)
        })
      }

      function remDat(){
        featureACI.del()
      }

      async function addDom(dat){
          setTimeout(()=> {viewAllTasksACI.add({
            cls: 'featurecls',
            mod: 'viewAllFeatures',
              featureName: 'Tasks',
              data: dat,
              viewItemDetails,
              handleSwapping,
              handleDeletion,
              ini: (m)=>{featureACI = m}
          })    
        },1000)    
      }

      function iniDat(taskObj) {
        // ace.ini.item({
        //   aspect: 'itm',
        //   cmd: 'ini',
        //   typ: 'task',
        //   v: taskObj
        // }, function(dat){
        //   return dat
        // }) 

        //SERVER SIDE
        ace.get.dat({
          aspect: 'itm',
          cmd: 'ini',
          typ: 'task',
          v: taskObj
        }, function(dat){
          return dat
        })   
      }

      function setDat(taskObj) {
        // ace.set.item({
        //   aspect: 'itm',
        //   cmd: 'set',
        //   typ: 'task',
        //   v: taskObj
        // }, function(dat){
        //   return dat
        // })

        //SERVER SIDE
        ace.get.dat({
            aspect: 'itm',
            cmd: 'set',
            typ: 'task',
            v: taskObj
          }, function(dat){
            return dat
          })
       
      }

      function setProject(dat){
        setTimeout(()=> { selectedProjectACI.set('dat', dat)}, 500)
      }
  
      function getDat(taskId) {
        // ace.get.item({
        //   aspect: 'itm',
        //   cmd: 'get',
        //   typ: 'task',
        //   v: taskId
        // }, function(dat){
        //   return dat
        // })

        //SERVER SIDE
        ace.get.dat({
          aspect: 'itm',
          cmd: 'get',
          typ: 'task',
          v: taskId
        }, function(dat){
          return dat
        })
      }


      function viewItemDetails(itm){
        console.log('itm', itm)
        cfg.taskModuleSwapping(7, itm, 'DETAILS')
      }

      function callback(dat){
        setProject(dat)
      }

      function handleSwapping(){
        cfg.taskModuleSwapping(5, '', 'CREATE')
      }

      function handleDeletion(itm){
        cfg.taskModuleSwapping(6, itm, 'DELETE')
      }
  
    }
    
  });
  