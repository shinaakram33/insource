ACE.mod("createProject", function (ace) {
    ace.get("mod", "mod/Feature/createFeature.js");
    return createProject;
  
    function createProject(cfg) {
      let id = cfg.id || "list",
        projectItems = cfg.projectItems || [],
        Location = cfg.getLocation,
        featuresACI,
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
            featureName: 'Project',
            data: [
                {
                    type: 'dropdown',
                    label: 'Project Lead',
                    multiselect: false,
                    ACI: 'leadACI',
                    values: ['Muhammad Ali Tahir', 'Paul', 'Shina akram']
                },
                {
                    type: 'dropdown',
                    label: 'Project Members',
                    ACI: 'membersACI',
                    multiselect: true,
                    values: ['Paul', 'Paul', 'Shina akram']
                }
            ],
            handleSubmit: submitProject,
            ini: (m)=>{featuresACI = m}
          },
         
          
        ];
  
        return dom;
      }
  
      function setDat() {}
  
      function getDat() {}

      function submitProject(){
       console.log(featuresACI.get.v('dat'))
      }
  
    }
    
  });
  