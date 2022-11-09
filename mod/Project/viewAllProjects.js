ACE.mod("viewAllProjects", function (ace) {
    ace.get("mod", "mod/Feature/viewAllFeatures.js");
    return viewAllProjects;
  
    function viewAllProjects(cfg) {
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
            featureName: 'Projects',
            data: [
                {
                    label: 'Fearless Trails',
                    desc: 'This project is about a contest where users upload stories',
                    creation_date: '01-11-2022'
                },
                {
                    label: 'Shared Vision',
                    desc: 'This project is about This project is about This project is about ',
                    creation_date: '01-11-2022'
                },
                {
                    label: 'Task Tracker',
                    desc: 'This project is about project management tool. All tasks are managed here',
                    creation_date: '01-11-2022'
                },
                
            ],
            viewItemDetails,
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

      function viewItemDetails(itm, loc){
        cfg.viewItemDetails(itm, loc)
      }
  
    }
    
  });
  