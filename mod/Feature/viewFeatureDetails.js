ACE.mod("viewFeatureDetails", function (ace) {
  return viewFeatureDetails;

  function viewFeatureDetails(cfg) {
    let id = cfg.id || "list",
      projectItems = cfg.projectItems || [],
      titleACI, descACI, acceptanceACI, startDateACI, dueDateACI, estimationACI, creationDateACI,
      Location = cfg.getLocation,
      data;
      aci = {
        set: {
          dat: setDat,
        },
        get: {
          dat: getDat,
          itm: getItm
        },
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
          cls: 'row g-3 mt-3',
          dom: [
            { 
              cls: 'col-sm-6 col-md-8',
              dom: [
                {
                  lbl: 'Title *',
                  type: 'label',
                  cls: 'form-label fw-bold'
                },
                {
                  typ: 'input',
                  cls: 'mb-3 form-control border-0',
                  ini: (m)=> {titleACI = m}
                },
                {
                  lbl: 'Description ',
                  type: 'label',
                  cls: 'form-label fw-bold'
                },
                {
                  val: '',
                  typ: 'textarea',
                  cls: 'mb-3 form-control border-0',
                  ini: (m)=> {descACI = m}
                },
                {
                  lbl: 'Acceptance Criteria ',
                  type: 'label',
                  cls: 'form-label fw-bold'
                },
                {
                  val: '',
                  typ: 'textarea',
                  cls: 'mb-3 form-control border-0',
                  ini: (m)=> {acceptanceACI = m}
                },
                { 
                  cls: 'mb-3 row',
                  dom: [
                    {
                      cls: 'col-6',
                      dom: [
                        {
                          lbl: 'Start Date',
                          type: 'label',
                          cls: 'form-label fw-bold'
                        },
                        {
                          typ: 'input',
                          type: 'date',
                          cls: 'form-control border-0',
                          ini: (m)=> {startDateACI = m}
                        }
                      ]
                    },
                    {
                      cls: 'col-6',
                      dom: [
                        {
                          lbl: 'Due Date',
                          type: 'label',
                          cls: 'form-label fw-bold'
                        },
                        {
                          typ: 'input',
                          type: 'date',
                          cls: 'form-control border-0',
                          ini: (m)=> {dueDateACI = m}
                        }
                      ]
                    }
                    
                  ],
                },
                { 
                  cls: 'mb-3 row',
                  dom:[
                    {
                      cls: 'col-6',
                      dom: [
                        {
                          lbl: 'Creation Date',
                          type: 'label',
                          cls: 'form-label fw-bold'
                        },
                        {
                          typ: 'input',
                          type: 'text',
                          cls: 'form-control border-0',
                          ini: (m)=> {creationDateACI = m}
                        }
                      ]
                    },
                    {
                      cls: 'col-6 mb-3',
                      dom: [
                        {
                          lbl: 'Estimated Time (h)',
                          type: 'label',
                          cls: 'form-label fw-bold'
                        },
                        {
                          typ: 'input',
                          type: 'number',
                          cls: 'form-control border-0',
                          ini: (m)=> {estimationACI = m}
                        }
                      ]
                    }
                  ]
                },
                {
                  cls: 'mb-3 row ',
                  dom: [
                    {
                      typ:'button',
                      cls: 'col-3 btn btn-light text-decoration-underline',
                      lbl: 'Go Back',
                      on: {
                        click: ()=> {
                          goBack()
                        }
                      }
                    },
                    {
                      typ:'button',
                      cls: 'col-3 btn btn-primary align-self-end',
                      lbl: 'Update',
                      on: {
                        click: ()=> {
                          handleSubmit()
                        }
                      }
                    },
                    {
                      typ:'button',
                      cls: 'col-3 mx-3 btn btn-primary align-self-end',
                      lbl: 'Delete',
                      on: {
                        click: ()=> {
                          handleDelete()
                        }
                      }
                    }
                  ]
                },
              ]
            },
            { 
              cls: 'col-6 col-md-4',
              dom: [
                { 
                  cls: 'mb-3',
                  dom: [
                    {
                      lbl: 'Show',
                      type: 'label',
                      for: 'formFile',
                      cls: 'form-label fw-bold'
                    },
                    {
                      cls: 'form-select',
                      typ: 'select',
                      dom: [
                        {
                          typ: 'option',
                          lbl: 'Comments',                
                        },
                        {
                          typ: 'option',
                          lbl: 'History',                
                        },
                        {
                          typ: 'option',
                          lbl: 'All',                
                        }
                      ]
                    }
                  ],
                  ini: (m)=> (ratingACI = m)
                },
                {
                  lbl: '',
                  typ: 'textarea',
                  cls: 'form-control',
                  id:"formFile"
                },
                
              ]
            },
          ]
        }        
      ];

      return dom;
    }

    function setDat(itm) {
      data=itm;
      titleACI.set('val', itm.title)
      descACI.set('val', itm.description)
      acceptanceACI.set('val', itm.acceptance_criteria)
      startDateACI.set('val', itm.start_date)
      dueDateACI.set('val', itm.due_date)
      creationDateACI.set('val', itm.created_at)
      estimationACI.set('val', itm.estimated_time)
    }

    function getDat() {
      data.title = titleACI.get.v('val')

      return data
    }

    function getItm(){
      return data._id
    }

    function handleSubmit(){
      cfg.handleSubmit()   
    }

    function goBack(){
      cfg.goBack()
    }

    function handleDelete(){
      cfg.handleDelete()
    }

  }
  
});
