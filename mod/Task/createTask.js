ACE.mod("createTask", function (ace) {
    ace.get("mod", "mod/Feature/createFeature.js");
    ace.get('mod', 'mod/Dat.js')
    let DATA = ace.ini.itm;
    return createTask;
  
    function createTask(cfg) {
      let id = cfg.id || "list",
        projectItems = cfg.projectItems || [],
        featureACI,
       // projectsList = getProjects(),
        Location = cfg.getLocation;
        aci = {
          set: {
            dat: setDat,
          },
          get: {
            dat: getDat,
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
                    values: ['Fearless Trails', 'Insource Pro', 'Task tracker'],
                    ini: (m)=> (projectACI = m)
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
                    values: ['Muhammad Ali Tahir', 'Paul', 'Shina akram'],
                    ini: (m)=> (assigneesACI = m)
                },
                {
                    type: 'dropdown',
                    label: 'Reporters',
                    ACI: 'reportersACI',
                    multiselect: true,
                    values: ['Muhammad Ali Tahir', 'Paul', 'Shina akram'],
                    ini: (m)=> (reportersACI = m)
                },
            ],
           handleSubmit: submitTask,
           ini: (m)=>(featureACI = m) 
          },
         
          
        ];
  
        return dom;
      }
  
      function setDat() {}
  
      function getDat() {}

      function getProjects(){
        let obj={
              aci :'get',
              cmd : 'all',
              typ: 'project',
            }
           ace.get.dat(obj, function(dat){
              console.log('All Data: ',dat);				
            })
           //s console.log("obj2",obj2)
          //  let  obj = {
          //     cmd : 'get',
          //     key : 'projects'
          //   }
          //  console.log(ace.dat(obj))
      }
      
      function submitTask(){
        let taskData = featureACI.get.v('dat')
        taskData.project_id = featureACI.get.v('dat').additionalFields[0]
        taskData.type = featureACI.get.v('dat').additionalFields[1]
        taskData.assignees = featureACI.get.v('dat').additionalFields[2]
        taskData.reporters = featureACI.get.v('dat').additionalFields[3]
        let obj = {
          cmd: 'ini',
          val: taskData
        }
        loadDatModule(DATA)
        let taskKey = DATA(obj)
        let projects = getProjects()
        projects.forEach(element => {
          if(element === taskData.project_id)
          {
            ace.get.itm(element, function(data){
              data.tasks.push(taskKey)
              localStorage.setItem(element, data)
            })
          }
        });
      //   let obj={
      //     aci :'ini',
      //     cmd : 'itm',
      //     typ: 'task',
      //     v: taskData
      //   }
      //  ace.get.dat(obj, function(dat){
      //     console.log('All Data: ',dat);				
      //   })



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
    }
    
  });
  