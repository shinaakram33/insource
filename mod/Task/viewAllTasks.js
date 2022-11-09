ACE.mod("viewAllTasks", function (ace) {
    ace.get("mod", "mod/Feature/viewAllFeatures.js");
    return viewAllTasks;
  
    function viewAllTasks(cfg) {
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
            mod: 'viewAllFeatures',
            featureName: 'Tasks',
            data: [
                {
                    label: 'Auth Module',
                    desc: 'Authentication module should be implemented using itm module',
                    creation_date: '01-11-2022'
                },
                {
                    label: 'Project Module',
                    desc: 'CRUD operations should be performed for project module',
                    creation_date: '01-11-2022'
                },
                {
                    label: 'Feature Module',
                    desc: 'CRUD operations for feature module should be generic enough',
                    creation_date: '01-11-2022'
                },
                
            ],
            handleSubmit: submitProject,
            ini: (m)=>(featureACI = m) 
          },
         
          
        ];
  
        return dom;
      }
  
      function setDat() {}
  
      function getDat() {}

      function submitProject(v){
        alert('Hello Project')
      }
  
    }
    
  });
  