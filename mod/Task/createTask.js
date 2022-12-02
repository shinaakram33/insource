ACE.mod("createTask", function (ace) {
    ace.get("mod", "mod/Feature/createFeature.js");
    ace.get('mod', 'mod/Dat.js')
    let DATA = ace.ini.itm;
    return createTask;
  
    function createTask(cfg) {
      let id = cfg.id || "list",
        projectItems = cfg.projectItems || [],
        featureACI,projectACI,
        getData, projectData,
        Location = cfg.getLocation;
        aci = {
          set: {
            dat: setDat,
          },
          ini: {
            dat: iniDat
          },
          
        },
        ux = {
          id,
          aci,
          dom: iniDom(),
          ini: (m) => {
            cfg.ini(m);
          },
        };

  
      return ux;
  
      function iniDom() {
  
        let dom = [
          {
            mod: 'createFeature',
            additionalFields: true,
            featureName: 'Task',
            data: [
                {
                    type: 'dropdown',
                    label: 'Select Project',
                    multiselect: false,
                    ACI: 'projectACI',
                    values: cfg.getProjects(loading),
                    ini: (m)=> {projectACI = m},
                    // on: {
                    //   load: getProjects()
                    // },
                    
                },
                {
                    type: 'dropdown',
                    label: 'Task Type',
                    multiselect: false,
                    ACI: 'taskTypeACI',
                    values: ['Epic', 'Story', 'Task', 'Sub Task'],
                    ini: (m)=> (taskTypeACI = m)
                },
                {
                    type: 'dropdown',
                    label: 'Assignees',
                    multiselect: false,
                    ACI: 'assigneesACI',
                    values: ['a', 'b', 'c'],
                    ini: (m)=> (assigneesACI = m)
                },
                {
                    type: 'dropdown',
                    label: 'Reporters',
                    ACI: 'reportersACI',
                    multiselect: true,
                    values: ['A', 'B', 'C'],
                    ini: (m)=> (reportersACI = m)
                },
            ],
           handleSubmit: submitTask,
           ini: (m)=>(featureACI = m) 
          },
         
          
        ];
  
        return dom;
      }
  
      function setDat(dat) {
        projectACI.set('dat', dat)
      }

      function iniDat(){
        let taskData = featureACI.get.v('dat')
        taskData.project_id = featureACI.get.v('dat').additionalFields[0]
        taskData.type = featureACI.get.v('dat').additionalFields[1]
        taskData.assignees = featureACI.get.v('dat').additionalFields[2]
        taskData.reporters = featureACI.get.v('dat').additionalFields[3]
        delete taskData.additionalFields
        let obj={
          cmd :'ini',
          aspect : 'itm',
          typ: 'task',
          v: taskData
        }
       ace.get.dat(obj, function(dat){
          console.log('All Data: ',dat);
          cfg.taskModuleSwapping(6,'', 'LIST')
          // obj = {
          //   cmd :'get',
          //   aspect : 'itm',
          //   typ: 'project',
          //   v: taskData.project_id
          // }
          // ace.get.dat(obj, async function(dat1){
          //   console.log('mongo project', dat1)
          //   dat1.tasks.push(dat)
          //   dat1.id = dat1._id
          //  delete dat1._id
          //   console.log('dat1', dat1)
          //   obj = {
          //     cmd: 'set',
          //     aspect: 'itm',
          //     typ: 'project',
          //     v: dat1
          //   }
            
          //   await ace.get.dat(obj, function(dat2){
          //     console.log('project updated')
          //     console.log(dat2)
          //     cfg.taskModuleSwapping(6,'', 'LIST')
          //   })
          // })				
        })
        // let obj={
        //   cmd :'rem',
        //   aspect : 'itm',
        //   typ: 'project',
        // }
        // ace.get.dat(obj, function(dat){
        //   console.log(dat)
        // })
      }

      
      function submitTask(){
      //   let taskData = featureACI.get.v('dat')
      //   taskData.project_id = featureACI.get.v('dat').additionalFields[0]
      //   taskData.type = featureACI.get.v('dat').additionalFields[1]
      //   taskData.assignees = featureACI.get.v('dat').additionalFields[2]
      //   taskData.reporters = featureACI.get.v('dat').additionalFields[3]
      //   delete taskData.additionalFields
      //   let obj={
      //     cmd :'ini',
      //     aspect : 'itm',
      //     typ: 'task',
      //     v: taskData
      //   }
      //  ace.get.dat(obj, function(dat){
      //     console.log('All Data: ',dat);
      //     obj = {
      //       cmd :'get',
      //       aspect : 'itm',
      //       typ: 'project',
      //       v: taskData.project_id
      //     }
      //     ace.get.dat(obj, function(dat1){
      //       console.log('mongo project', dat1)
      //       dat1.tasks.push(dat)
      //       console.log('dat1', dat1)
      //       obj = {
      //         cmd: 'set',
      //         aspect: 'itm',
      //         typ: 'project',
      //         v: dat1
      //       }
      //       ace.get.dat(obj, function(dat2){
      //         console.log('project updated')
      //         console.log(dat2)
      //       })
      //     })				
      //   })

      iniDat()

        // let obj = {
        //   cmd: 'ini',
        //   val: taskData
        // }
        // loadDatModule(DATA)
        // let taskKey = DATA(obj)
        // let projects = getProjects()
        // projects.forEach(element => {
        //   if(element === taskData.project_id)
        //   {
        //     ace.get.itm(element, function(data){
        //       data.tasks.push(taskKey)
        //       localStorage.setItem(element, data)
        //     })
        //   }
        // });


        // get all fileds value of task
        // get the project name from fields
        // get the task array of that project from localstorage/ file system
        // push this task into tasks localstorage/file system
        // push this newly created task id into task array of project and update the project into local storage/file system 
       
      }

      function loadDatModule(dat){
        if(!ace.is(dat)){
            DATA = ace.dat
        }
      }

      function loading(dat){
        setDat(dat)
      }
    }
    
  });
  