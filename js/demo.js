ACE(function (ace) {
  var DOM = ace.get.v("dom");
  ace.get('mod', 'mod/Dat.js')
  ace.get("mod", "mod/SwapContent.js");
  ace.get("mod", "mod/Project/createProject.js");
  ace.get("mod", "mod/Project/ProjectsList.js");
  ace.get("mod", "mod/Project/viewAllProjects.js");
  ace.get("mod", "mod/Task/createTask.js");
  ace.get("mod", "mod/Task/viewAllTasks.js");
  ace.get("mod", "mod/Task/viewTaskDetails.js");
  ace.get("mod", "mod/Project/ProjectDetailsSection.js");
  ace.get('mod', 'mod/Feature/createFeature.js')
  ace.get('mod', 'mod/Feature/viewAllFeatures.js')
  ace.get('mod', 'mod/Feature/viewFeatureDetails.js')
  ace.get('mod', 'mod/Project/viewProjectDetails.js')

   window.aceDatSrc = 'https://5dc.us:3032'
  var swap,
    projectDetails,
    projectsListACI,
    ProjectDetailsACI,
    createFeatureACI, 
    createTaskACI,
    createProjectACI,
    projectItems = [
      {
        title: "Project 1",
        desc: "Dummy Description",
        status: "To Do",
        teamLead: "Shina Akram",
        teamMembers: ["Muhammad Ali", "Paul", "James", "Shina"],
      },
      {
        title: "Project 2",
        desc: "Dummy Description",
        status: "In Progress",
        teamLead: "Muhammad Ali",
        teamMembers: ["Muhammad Ali", "Paul", "James", "Shina"],
      },
      {
        title: "Project 3",
        desc: "Dummy Description",
        status: "Done",
        teamLead: "Paul",
        teamMembers: ["Muhammad Ali", "Paul", "James", "Shina"],
      },
      {
        title: "Project 4",
        desc: "Dummy Description",
        status: "Done",
        teamLead: "James",
        teamMembers: ["Muhammad Ali", "Paul", "James", "Shina"],
      },
      {
        title: "Project 5",
        desc: "Dummy Description",
        status: "In Progress",
        teamLead: "Jeff",
        teamMembers: ["Muhammad Ali", "Paul", "James", "Shina"],
      },
    ];

  DOM({
    id: "main-div",
    dom: [
      {
        mod: "SwapContent",
        ini: (m) => {
          swap = m;
        },
        loc:6,
        items: [
          {
            mod: 'createFeature',
            ini: (m)=> (createFeatureACI = m)
          },
          {
            mod: 'createProject',
            ini: (m)=> {
              createProjectACI = m;
            }
          },
          {
            mod: "viewAllProjects",
            projectItems,
            viewItemDetails,
            getLocation,
            getProjects,
            ini: (m) => (projectsListACI = m),
          },
          {
            mod: "viewProjectDetails",
            Location: getLocation,
            projectDetails,
            swapItem,
            ini: (m) => (ProjectDetailsACI = m),
          },
          {
            mod: 'createTask',
            getProjects,
            taskModuleSwapping,
            ini: (m)=> {createTaskACI = m}
          },
          
          {
            mod: "viewAllTasks",
            getProjects,
            taskModuleSwapping,
            ini: (m) => (tasksListACI = m),
          },
          {
            mod: "viewTaskDetails",
            taskModuleSwapping,
            Location: getLocation,
            swapItem,
            projectDetails,
            ini: (m) => (taskDetailsACI = m),
          },
        ],
      },
    ],
  });

  function getProjects(callback){
    // if(createProjectACI === undefined){
    //   setTimeout(()=> {getProjects()}, 2000)
    // }else{
    //   console.log('createProject', createProjectACI)
    // console.log(createProjectACI.get.v('projects'))
    // let d =  setTimeout(()=> {createProjectACI.get.v('projects')} , 2000)
    // console.log('d', d)
    // return d;
    // }
    let obj={
          cmd :'get',
          aspect : 'all',
          typ: 'project',
        }
       ace.get.dat(obj, function(dat){
                callback(dat)
        })
  }

  function getLocation(data, loc) {
    projectDetails = data;
    swap.set("loc", loc);
    console.log(data);
    ProjectDetailsACI.set("dat", projectDetails);
  }

  function viewItemDetails(itm, loc){
    swap.set('loc', loc)
    ProjectDetailsACI.set("dat", itm);
  }

  function swapItem(loc){
    swap.set('loc', loc)
  }

  function taskModuleSwapping(loc, data, module){
    if(module === 'CREATE'){
      swapItem(loc)
      

    }else if(module === 'LIST'){
      swapItem(loc)
      tasksListACI.rem('dat')
      tasksListACI.get.v('tasks')

    }else if(module === 'DETAILS'){
      swapItem(loc)
      ProjectDetailsACI.set("dat", data);

    }else if(module === 'UPDATE'){
      swapItem(loc)

    }else if(module === 'DELETE'){
      swapItem(loc)

    }
  }

  function projectModuleSwapping(loc, data, module){
    if(module === 'CREATE'){
      swapItem(loc)

    }else if(module === 'LIST'){
      swapItem(loc)

    }else if(module === 'DETAILS'){
      swapItem(loc)

    }else if(module === 'UPDATE'){
      swapItem(loc)

    }else if(module === 'DELETE'){
      swapItem(loc)

    }
  }

  function featureModuleSwapping(loc, data, module){
    if(module === 'CREATE'){
      swapItem(loc)

    }else if(module === 'LIST'){
      swapItem(loc)

    }else if(module === 'DETAILS'){
      swapItem(loc)

    }else if(module === 'UPDATE'){
      swapItem(loc)

    }else if(module === 'DELETE'){
      swapItem(loc)

    }
  }

});
