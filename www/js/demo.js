document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
  console.log("hello", navigator.camera)
  }
  ACE(function (ace) {
    var DOM = ace.get.v("dom");
     ace.get('mod', 'mod/Dat.js')
     ace.get("mod", "mod/SwapContent.js");
      ace.get("mod", "mod/mainMenu.js");
  
     window.aceDatSrc = 'https://5dc.us:3032'
    var swap,
      projectDetails,
      projectsListACI,
      ProjectDetailsACI;
  
    DOM({
      id: "main-div",
      dom: [
        {
          mod: "SwapContent",
          ini: (m) => {
              swap = m;
          },
          loc: 1,
          items: [
            {
              mod: 'mainMenu',
              ini: (m)=> (mainMenuACI = m),
              swapItem
            },
            {
              mod: 'createClaim',
              ini: (m)=> (claimModuleACI = m),
              swapItem
            }
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
