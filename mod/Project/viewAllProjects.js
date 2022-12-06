ACE.mod("viewAllProjects", function (ace) {
    ace.get("mod", "mod/Feature/viewAllFeatures.js");
    return viewAllProjects;
  
    function viewAllProjects(cfg) {
      let id = cfg.id || "projects-list",
        viewAllProjectsACI, featureACI;
        aci = {
          set: {
            dat: setDat,
            
          },
          get: {
            dat: getDat,
            projects: getProjects
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
            viewAllProjectsACI = m
          },
        };
  
      return ux;
  
      function iniDom() {
  
        let dom = [
          {
            mod: 'viewAllFeatures',
            featureName: 'Projects',
            data: cfg.getProjects(callback),
            viewItemDetails,
            handleSwapping,
            handleDeletion,
            ini: (m)=>(featureACI = m) 
          },
         
          
        ];
  
        return dom;
      }

      async function addDom(dat){
        viewAllProjectsACI.add({
          mod: 'viewAllFeatures',
            featureName: 'Projects',
            data: dat,
            viewItemDetails,
            handleSwapping,
            handleDeletion,
            ini: (m)=>{featureACI = m}
        })        
    }
  
      function setDat(dat) {
        setTimeout(()=> { featureACI.set('dat', dat)} , 200)
      }

      function getProjects(){
        // ace.get.item({
        //   aspect: 'all',
        //   cmd: 'get',
        //   typ: 'project',
        // }, function(dat){
        //   addDom(dat)
        // })

        ace.get.dat({
          aspect: 'all',
          cmd: 'get',
          typ: 'project',
        }, function(dat){
          addDom(dat)
        })
      }
  
      function getDat() {}

      function remDat(){
        featureACI.del()
      }

      function viewItemDetails(itm){
        cfg.projectModuleSwapping(4, itm, 'DETAILS')
      }

      function callback(dat){
        setDat(dat)
      }

      function handleSwapping(){
        cfg.projectModuleSwapping(2, '', 'CREATE')
      }

      function handleDeletion(itm){
        setTimeout(()=> { cfg.projectModuleSwapping(3, itm, 'DELETE') }, 1000 )
      }
  
    }
    
  });
  