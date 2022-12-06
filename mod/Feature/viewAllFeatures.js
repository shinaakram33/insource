ACE.mod("viewAllFeatures", function (ace) {
  return viewAllFeatures;

  function viewAllFeatures(cfg) {
    let id = cfg.id || "list",
    featureItems = cfg.data || [],
    featureName = cfg.featureName || 'Features',
    featureItemsACI,
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
        cls: 'container border border-light bg-light w-50 p-3',
        aci,
        dom: iniDom(),
        ini: (m) => {
          cfg.ini(m);
          featureItemsACI = m
        },
      };

    return ux;

    function iniDom() {
      let rowDom = [];
      let dom = [
        {  
          dom: [
            {
              typ:'button',
              lbl: 'Create '+featureName,
              cls: 'text-right mt-2 text-secondary bg-light text-decoration-underline border-0 fw-bold float-end mb-3',
              on: {
                click: ()=> {
                  cfg.handleSwapping()
                }
              }
            },
            {
              typ:'h4',
              lbl: 'All '+featureName,
              cls: ' mt-5 text-primary fw-bold mb-5',
            }
          ]
        },
      ]
      featureItems.forEach((itm)=> {
        rowDom.push({ 
          typ: 'a',
          href: '#',
          cls: 'list-group-item list-group-item-action',
          dom: [
            {
              cls: 'd-flex w-100 justify-content-between',
              dom: [
                {
                  typ: 'h5',
                  lbl: itm.title,
                  on: {
                    click: ()=>{
                      cfg.viewItemDetails(itm)
                    }
                  }
                },
                {
                  typ: 'small',
                  lbl: 'x',
                  cls: 'text-danger fw-bold',
                  on: {
                    click: ()=> {
                      // alert('Do you want to delete?')
                      let action = prompt('Do you want to delete this item?', 'yes')
                      if(action == 'yes'){
                        cfg.handleDeletion(itm.aid)
                      }
                    }
                  }
                }
              ]
            },
            {
              typ: 'p',
              cls: 'mb-1',
              lbl: itm.description,
            },
            {
              typ: 'small',
              lbl: 'created at: '+itm.creation_date
            }
          ]
      })
    })
    dom.push(
      {
        cls: 'list-group mt-3',
        dom: rowDom
      })
      return dom;
    }

    function setDat(dat) {
      dat.forEach((itm)=> {
        featureItemsACI.add({ 
          typ: 'a',
          href: '#',
          cls: 'list-group-item list-group-item-action',
          dom: [
            {
              cls: 'd-flex w-100 justify-content-between',
              dom: [
                {
                  typ: 'h5',
                  lbl: itm.title,
                  on: {
                    click: ()=>{
                      cfg.viewItemDetails(itm)
                    }
                  }
                },
                {
                  typ: 'small',
                  lbl: 'x',
                  cls: 'text-danger fw-bold',
                  on: {
                    click: ()=> {
                      // alert('Do you want to delete?')
                      let action = prompt('Do you want to delete this item?', 'yes')
                      if(action == 'yes'){
                        cfg.handleDeletion(itm.aid)
                      }
                    }
                  }
                }
              ]
            },
            {
              typ: 'p',
              cls: 'mb-1',
              lbl: itm.description,
            },
            {
              typ: 'small',
              lbl: 'created at: '+itm.created_at
            }
          ]
      })
    })

    }

    function getDat() {}

  }
  
});
