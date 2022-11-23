ACE(function (ace) {
  var DOM = ace.get.v("dom");
  ace.get('mod', 'mod/Dat.js')
  ace.get("mod", "mod/SwapContent.js");
  ace.get("mod", "mod/Project/createProject.js");
  ace.get("mod", "mod/Project/ProjectsList.js");
  ace.get("mod", "mod/Project/viewAllProjects.js");
  ace.get("mod", "mod/Task/createTask.js");
  ace.get("mod", "mod/Task/viewAllTasks.js");
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
        loc: 2,
        items: [
          {
            mod: 'createFeature',
            ini: (m)=> (createFeatureACI = m)
          },
          {
            mod: 'createProject',
            ini: (m)=> (createFeatureACI = m)
          },
          {
            mod: 'createTask',
            ini: (m)=> (createFeatureACI = m)
          },
          {
            mod: "viewAllProjects",
            projectItems,
            viewItemDetails,
            getLocation,
            ini: (m) => (projectsListACI = m),
          },
          {
            mod: "viewAllTasks",
            projectItems,
            getLocation,
            ini: (m) => (projectsListACI = m),
          },
          {
            mod: "viewProjectDetails",
            Location: getLocation,
            projectDetails,
            ini: (m) => (ProjectDetailsACI = m),
          },
        ],
      },
    ],
  });

  function getLocation(data, loc) {
    projectDetails = data;
    swap.set("loc", loc);
    console.log(data);
    ProjectDetailsACI.set("dat", projectDetails);
  }

  function viewItemDetails(itm, loc){
    swap.set('loc', 6)
    console.log(itm)
    ProjectDetailsACI.set("dat", itm);
  }
});
