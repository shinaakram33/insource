ACE.mod("createProject", function (ace) {
    ace.get("mod", "mod/Feature/createFeature.js");
    ace.get('mod', 'mod/Itm.js')
    let DATA = ace.ini.itm; // this will save data to localstorage. This needs updated to ace.get.dat to send to data server
                        // instead
    return createProject;    

    function createProject(cfg) {
      
      let id = cfg.id || "list",
        projectItems = cfg.projectItems || [],
        Location = cfg.getLocation,

        featuresACI,itmACI,
        aci = {
          set: {
            dat: setDat,
          },
          get: {
            dat: getDat,
          },
          ini: {
            dat: iniDat
          }
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
                    ref: 'leadACI',
                    ini: (m)=> (leadACI = m),
                    values: ['Muhammad Ali Tahir', 'Paul', 'Shina akram']
                },
                {
                    type: 'dropdown',
                    label: 'Project Members',
                    ref: 'membersACI',
                    multiselect: true,
                    ini: (m)=> (membersACI = m),
                    values: ['Paul', 'Paul', 'Shina akram']
                }
            ],
            handleSubmit: submitProject,
            handleSwapping,
            ini: (m)=>{featuresACI = m}
          },          
        ];
  
        return dom;
      }
  
      function setDat() {
        console.log('set data')
      }
  
      function getDat() {}

      function iniDat(){
        let tempData = featuresACI.get.v('dat')
        tempData.lead = featuresACI.get.v('dat').additionalFields[0]
        tempData.team_members = featuresACI.get.v('dat').additionalFields[1]
        tempData.tasks = [];
        tempData.meta = {
          code_versioning_tool: featuresACI.get.v('dat').additionalFields[0],
          Documentation: featuresACI.get.v('dat').additionalFields[1],
          Sheets: featuresACI.get.v('dat').additionalFields[1]

        }
        delete tempData.additionalFields
        let obj={
          cmd :'ini',
          aspect : 'itm',
          typ: 'project',
          v: tempData
        }
       ace.get.dat(obj, function(dat){
          console.log('Newly Created Project ID: ',dat);				
        })
      }

      function handleSwapping(){
        setTimeout(()=> { cfg.projectModuleSwapping(3, '', 'LIST')}, 1000)
      }

      async function submitProject(){
        let tempData = featuresACI.get.v('dat')
        tempData.lead = featuresACI.get.v('dat').additionalFields[0]
        tempData.team_members = featuresACI.get.v('dat').additionalFields[1]
        tempData.tasks = [];
        tempData.meta = {
          code_versioning_tool: featuresACI.get.v('dat').additionalFields[0],
          Documentation: featuresACI.get.v('dat').additionalFields[1],
          Sheets: featuresACI.get.v('dat').additionalFields[1]

        }
        delete tempData.additionalFields
         
        if (!ace.get.itms) {
          return submitProject();
        }
        itmACI = ace.get.itms();
        //console.log(ace.set.itms())

        let obj={
          cmd :'ini',
          aspect : 'itm',
          typ: 'project',
          v: tempData
        }
        ace.get.dat(obj, function(dat){
          console.log('Server => New Project ID: ',dat);		
          //setTimeout(()=> { cfg.projectModuleSwapping(3, '', 'LIST') }, 1000)		
        })
        ace.ini.item(obj, function(dat){
          console.log('Localstorage => New Project ID: ',dat);	
          setTimeout(()=> { cfg.projectModuleSwapping(3, '', 'LIST') }, 2000)
          //cfg.projectModuleSwapping(3, '', 'LIST')			
        })
      }

      function loadDatModule(dat){
        if(!ace.is(dat)){
            DATA = ace.dat
        }
      }
    }
    
  });


//RELATIONSHIP of Project and Tasks  
  //Psuedocode
  //save task id into Project's task array
  //when we want to list down all the tasks for a specific project, we'll loop through tasks array of project.
  //for each task id, we'll fetch that task information and display in the list UI.
  // and when any task from list is clicked, details for that task will open.
  //user can make updates in details of that task.


  // Issues
  // ace.dat and ace.get.dat have different implementations
  // in case of local storage, we'll store data in one key-value pair and are pushing new projects info in that key value
  // in case of file system, we are creating a project named file and then for each newly created project, we have unique ids.



  