ACE(function (ace) {
  var DOM = ace.get.v("dom");
   ace.get('mod', 'mod/Dat.js')
   ace.get('mod', 'mod/Itm.js')
  ace.get("mod", "mod/SwapContent.js");
  ace.get("mod", "mod/Project/createProject.js");
  ace.get("mod", "mod/Project/viewAllProjects.js");
  ace.get("mod", "mod/Task/createTask.js");
  ace.get("mod", "mod/Task/viewAllTasks.js");
  ace.get("mod", "mod/Task/viewTaskDetails.js");
  ace.get("mod", "mod/Project/ProjectDetailsSection.js");
  ace.get('mod', 'mod/Feature/createFeature.js')
  ace.get('mod', 'mod/Feature/viewAllFeatures.js')
  ace.get('mod', 'mod/Feature/viewFeatureDetails.js')
  ace.get('mod', 'mod/Project/viewProjectDetails.js')
  ace.get('mod', 'mod/User/createUser.js')

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
          cls: 'sticky-top mb-5',
          dom: [
              {
                  cls: 'navbar-customize',
                  dom: [
                      {
                          typ: 'nav',
                          cls: 'navbar navbar-light ',
                          dom: [
                              {
                                  cls: 'container-fluid',
                                  dom: [
                                      {
                                          typ: 'a',
                                          cls: 'navbar-brand website-logo',
                                          dom: [
                                              { typ: 'span', lbl: 'TASK TRACKER' },
                                              { typ: 'br' },
                                          ],
                                          on: {
                                              click: () => {
                                                  swap.set('loc', 1);
                                              },
                                          },
                                      },
                                      {
                                          typ: 'a',
                                          cls: 'navbar-brand navbar-link',
                                          dom: [
                                              { typ: 'span', lbl: 'Features' },
                                              { typ: 'br' },
                                          ],
                                          on: {
                                              click: () => {
                                                  swap.set('loc', 1);
                                              },
                                          },
                                      },
                                      {
                                          typ: 'a',
                                          cls: 'navbar-brand navbar-link',
                                          dom: [
                                              { typ: 'span', lbl: 'Projects' },
                                              { typ: 'br' },
                                          ],
                                          on: {
                                            click: () => {
                                                swap.set('loc', 2);
                                            },
                                        },
                                      },
                                      {
                                          typ: 'a',
                                          cls: 'navbar-brand navbar-link',
                                          dom: [
                                              { typ: 'span', lbl: 'Tasks' },  // 'EAT AND' },
                                              { typ: 'br' },
                                          ],
                                          on: {
                                            click: () => {
                                                swap.set('loc', 5);
                                            },
                                        },
                                      },
                                      {
                                          typ: 'a',
                                          cls: 'navbar-brand navbar-link',
                                          dom: [
                                              { typ: 'span', lbl: 'Users' },
                                              { typ: 'br' },
                                          ],
                                          on: {
                                              click: () => {
                                                swap.set('loc', 8);
                                              },
                                          },
                                      },
                                  ],
                              },
                          ],
                      },
                  ],
              },
          ],
        },
        {
          mod: "SwapContent",
          ini: (m) => {
            swap = m;
          },
          loc: 8,
          items: [
            {
              mod: 'createFeature',
              ini: (m)=> (createFeatureACI = m)
            },
            {
              mod: 'createProject',
              projectModuleSwapping,
              loadModule,
              ini: (m)=> {
                createProjectACI = m;
              }
            },
            {
              mod: "viewAllProjects",
              getProjects,
              projectModuleSwapping,
              ini: (m) => (projectsListACI = m),
            },
            {
              mod: "viewProjectDetails",
              projectModuleSwapping,
              swapItem,
              loadModule,
              ini: (m) => (ProjectDetailsACI = m),
            },
            {
              mod: 'createTask',
              getProjects,
              taskModuleSwapping,
              loadModule,
              ini: (m)=> {createTaskACI = m}
            },
            
            {
              mod: "viewAllTasks",
              getProjects,
              taskModuleSwapping,
              loadModule,
              ini: (m) => (tasksListACI = m),
            },
            {
              mod: "viewTaskDetails",
              taskModuleSwapping,
              swapItem,
              loadModule,
              ini: (m) => (taskDetailsACI = m),
            },
            {
              mod: "createUser",
              loadModule,
              ini: (m) => (taskDetailsACI = m),
            },
          ],
        },
    ],
  });

  function getProjects(callback){
    let obj={
          cmd :'get',
          aspect : 'all',
          typ: 'project',
        }
        //SERVER SIDE
       ace.get.dat(obj, function(dat){
          console.log('server dat', dat)
          callback(dat)
        })

        // ace.get.item(obj, function(dat){
        //   //console.log('get all dat from localstorage', dat)
        //   callback(dat)
        // })
  }

  function swapItem(loc){
    swap.set('loc', loc)
  }

  function taskModuleSwapping(loc, data, module){
    if(module === 'CREATE'){
      swapItem(loc)

    }else if(module === 'LIST'){
      swapItem(loc)
      setTimeout(()=> {
        tasksListACI.rem('dat')
        tasksListACI.get.v('projects')
      }, 1000)

    }else if(module === 'DETAILS'){
      swapItem(loc)
      // setTimeout(()=> { 
        taskDetailsACI.set("dat", data)
      // }, 500);

    }else if(module === 'UPDATE'){
      swapItem(loc)

    }else if(module === 'DELETE'){
      swapItem(loc)
      // setTimeout(()=> { 
        taskDetailsACI.rem('dat', data) 
      // }, 500)

    }
  }

  function projectModuleSwapping(loc, data, module){
    if(module === 'CREATE'){
      swapItem(loc)
    }
    else if(module === 'LIST'){
      if(projectsListACI){
        swapItem(loc)
        projectsListACI.rem('dat')
        projectsListACI.get.v('projects')
      }else{
        setTimeout(()=> {
          console.log('loc', loc)
          projectModuleSwapping(loc, '', 'LIST')
        }, 1000)
      }
    }
    else if(module === 'DETAILS'){
      if(ProjectDetailsACI){
        swapItem(loc)
        ProjectDetailsACI.set("dat", data)
      }else{
        setTimeout(()=> {
          projectModuleSwapping(loc, '', 'DETAILS')
        })
      }     
    }
    else if(module === 'UPDATE'){
      swapItem(loc)
    }
    else if(module === 'DELETE'){
      if(ProjectDetailsACI){
        swapItem(loc)
        ProjectDetailsACI.rem('dat', data) 
      }else{
        projectModuleSwapping(loc, '', 'DELETE')
      }
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

  function loadModule(module){
    if(module()){
      return true;
    }else{
      setTimeout(()=> { loadModule(module)}, 1000 )
    }
  }

});
