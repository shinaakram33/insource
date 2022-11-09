ACE.mod("viewProjectDetails", function (ace) {
  ace.get('mod', 'mod/Feature/viewFeatureDetails.js')
    return viewProjectDetails;
  
    function viewProjectDetails(cfg) {
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
          cls: 'container border border-light bg-light w-75 p-3',
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
            typ:'h3',
            lbl: 'Project Details',
            cls: 'text-center mt-5 text-primary fw-bold'
          },
          {
            cls: 'row g-3 mt-3',
            mod: 'viewFeatureDetails',
            ini: (m)=> (viewFeatureDetailsACI  = m)
          }        
        ];
  
        return dom;
      }
  
      function setDat(itm) {
        viewFeatureDetailsACI.set('dat', itm)
      }
  
      function getDat() {}
  
    }
    
  });
  