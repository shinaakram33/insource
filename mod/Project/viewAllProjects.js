ACE.mod("viewAllProjects", function (ace) {
    ace.get("mod", "mod/Feature/viewAllFeatures.js");
    return viewAllProjects;
  
    function viewAllProjects(cfg) {
      let id = cfg.id || "list",
        projectItems = cfg.projectItems || [],
        projectItemACI,
        Location = cfg.getLocation;
        allProjects = localStorage.getItem('project')
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
            data: allProjects,
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
  