ACE.mod("createProject", function (ace) {
    ace.get("mod", "mod/Feature/createFeature.js");
    ace.get('mod', 'mod/Dat.js')
    let DATA = ace.ini.itm; // this will save data to localstorage. This needs updated to ace.get.dat to send to data server
                        // instead
    return createProject;    

    function createProject(cfg) {
      
      let id = cfg.id || "list",
        projectItems = cfg.projectItems || [],
        Location = cfg.getLocation,

        featuresACI,
        aci = {
          set: {
            dat: setDat,
            project: setProject
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
            ini: (m)=>{featuresACI = m}
          },          
        ];
  
        return dom;
      }
  
      function setDat() {
        console.log('set data')
      }
  
      function getDat() {}

      // function getAllProjects(){
      //   let proj = []
      //   let obj={
      //         cmd :'get',
      //         aspect : 'all',
      //         typ: 'project',
      //       }
      //      ace.get.dat(obj, function(dat){
      //       for(let ele of dat){
      //          proj.push(ele);
      //       }
      //       //return proj
      //       })
      //       return proj
      //       // setTimeout(()=> {
      //       //   return proj 
      //       // }, 5000)  
      // }

      function setProject(){
      }

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
        
        // console.log(tempData)
        // loadDatModule(DATA)
        // let  obj = {
        //   cmd : 'ini',
        //   val : tempData
        // }
        // DATA(obj)

       
      //  let projectsArray = localStorage.getItem('Projects')
      //  if(projectsArray === null){
      //   projectsArray = []
      //  }else{
      //   projectsArray = JSON.parse(projectsArray)
      //  }
      //  projectsArray.push(obj.aid)
      //  localStorage.setItem('Projects', JSON.stringify(projectsArray))
      // {
      //   title: 'abc2',
      //   description: 'dummy',
      //   acceptance_criteria: 'dummy',
      //   status: 'to-do',
      //   lead: 'ali',
      //   team_members: ['shina'],
      //   tasks: [],
      //   estimated_time: "0",
      //   priority: '',
      //   rating: '3',
      //   created_at: '12-10-2022',
      //   created_by: '12-10-2022',
      //   meta: {
      //     code_versioning_tool: "",
      //     Documentation: "",
      //     Sheets: ""
      //   }
      //   }

      let obj={
        cmd :'ini',
        aspect : 'itm',
        typ: 'project',
        v: tempData
      }
     ace.get.dat(obj, function(dat){
        console.log('All Data: ',dat);				
      })
         obj={
            aci :'get',
          cmd : 'all',
          typ: 'project',
          }
          ace.get.dat(obj, function(dat){
            console.log('All Data: ',dat);				
          })

        
        // var obj = {
        //   cmd: 'get',
        //   typ: 'stories',
        // };
        // ace.get.dat(obj,function(dat){
        //   log('Received response data: ',dat);				
        // });
        // // ace.exe.call({
        // //   tgt: 'dat',
        // //   cmd: 'ini',
        // //   typ: 'maker',
        // //   dat: featuresACI.get.v('dat'),
        // // },function(dat){
        // //   log('iniMaker() completed: ',dat);
        // //   is.fnc(r,dat);
        // // });
        // ace.ini('maker', featuresACI.get.v('dat'))
        //console.log('Hello',ace.get.v('dat', featuresACI.get.v('dat')))
      // console.log(featuresACI.get.v('dat'))
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



  