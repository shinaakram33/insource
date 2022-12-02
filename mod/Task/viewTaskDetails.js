ACE.mod("viewTaskDetails", function (ace) {
  ace.get('mod', 'mod/Feature/viewFeatureDetails.js')
    return viewTaskDetails;
  
    function viewTaskDetails(cfg) {
      let id = cfg.id || "list",
        projectItems = cfg.projectItems || [],
        projectItemACI,successTextACI,deleteTextACI,
        Location = cfg.getLocation;
        aci = {
          set: {
            dat: setDat,
            project: setTask
          },
          get: {
            dat: getDat,
          },
          rem: {
            dat: remDat
          }
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
            lbl: 'Task Details',
            cls: 'text-center mt-5 text-primary fw-bold'
          },
          {
            lbl: 'Task updated successfully',
            cls: 'text-success text-center d-none',
            ini: (m)=> {
              successTextACI = m
            }
          },
          {
            lbl: 'Task Deleted successfully',
            cls: 'text-danger text-center d-none',
            ini: (m)=> {
              deleteTextACI = m
            }
          },
          {
            cls: 'row g-3 mt-3',
            mod: 'viewFeatureDetails',
            handleSubmit,
            goBack,
            handleDelete,
            ini: (m)=> (viewFeatureDetailsACI  = m)
          }        
        ];
  
        return dom;
      }
  
      function setDat(itm) {
        viewFeatureDetailsACI.set('dat', itm)
      }

      function setTask(itm){
        let obj = {
          aspect: 'itm',
          cmd: 'set',
          typ: 'task',
          v: itm
        }

        ace.get.dat(obj, function(dat){
          successTextACI.rem('cls','d-none')
          let clss = successTextACI.get.v('ele')
          clss.classList.add('d-block')
        })
      }

      function remDat(itm){
        let obj = {
          aspect: 'itm',
          cmd: 'del',
          typ: 'task',
          v: itm
        }

        ace.get.dat(obj, function(dat){
          successTextACI.rem('cls','d-block')
          deleteTextACI.rem('cls','d-none')
          let clss = deleteTextACI.get.v('ele')
          clss.classList.add('d-block')
        })
      }
  
      function getDat() {}

      function handleSubmit(){
        let itm = viewFeatureDetailsACI.get.v('dat');
        setTask(itm)
      }

      function goBack(){
        cfg.swapItem(6)
      }

      function handleDelete(){
        let itmId = viewFeatureDetailsACI.get.v('itm');
        remDat(itmId)
      }
  
    }
    
  });
  