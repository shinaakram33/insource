ACE.mod("createTask", function (ace) {
    ace.get("mod", "mod/Feature/createFeature.js");
    return createTask;
  
    function createTask(cfg) {
      let id = cfg.id || "list",
        projectItems = cfg.projectItems || [],
        projectItemACI,
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
      
      function submitTask(v){
       // alert('Hello Task')
       //console.log(featureACI.get.v('dat'))
       
      }
    }
    
  });
  