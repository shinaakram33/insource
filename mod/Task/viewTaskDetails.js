ACE.mod("viewTaskDetails", function (ace) {
    return viewTaskDetails;
  
    function viewTaskDetails(cfg) {
      let id = cfg.id || "list",
        projectItems = cfg.projectItems || [],
        projectItemACI,
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
            lbl: 'Features Details',
            cls: 'text-center mt-5 text-primary fw-bold'
          },
          {
            cls: 'row g-3 mt-3',
            dom: [
              { 
                cls: 'col-sm-6 col-md-8',
                dom: [
                  {
                    lbl: 'Title *',
                    type: 'label',
                    for: 'formFile',
                    cls: 'form-label fw-bold'
                  },
                  {
                    val: 'Enter Name',
                    typ: 'input',
                    cls: 'mb-3 form-control border-0',
                    id:"formFile"
                  },
                  {
                    lbl: 'Description ',
                    type: 'label',
                    for: 'formFile',
                    cls: 'form-label fw-bold'
                  },
                  {
                    val: '',
                    typ: 'textarea',
                    cls: 'mb-3 form-control border-0',
                    id:"formFile"
                  },
                  {
                    lbl: 'Acceptance Criteria ',
                    type: 'label',
                    for: 'formFile',
                    cls: 'form-label fw-bold'
                  },
                  {
                    val: '',
                    typ: 'textarea',
                    cls: 'mb-3 form-control border-0',
                    id:"formFile"
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
                            for: 'formFile',
                            cls: 'form-label fw-bold'
                          },
                          {
                            typ: 'input',
                            type: 'date',
                            cls: 'form-control border-0',
                            id:"formFile"
                          }
                        ]
                      },
                      {
                        cls: 'col-6',
                        dom: [
                          {
                            lbl: 'Due Date',
                            type: 'label',
                            for: 'formFile',
                            cls: 'form-label fw-bold'
                          },
                          {
                            typ: 'input',
                            type: 'date',
                            cls: 'form-control border-0',
                            id:"formFile"
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
                            for: 'formFile',
                            cls: 'form-label fw-bold'
                          },
                          {
                            typ: 'input',
                            type: 'date',
                            cls: 'form-control border-0',
                            id:"formFile"
                          }
                        ]
                      },
                      {
                        cls: 'col-6',
                        dom: [
                          {
                            lbl: 'Estimated Time (h)',
                            type: 'label',
                            for: 'formFile',
                            cls: 'form-label fw-bold'
                          },
                          {
                            typ: 'input',
                            type: 'number',
                            cls: 'form-control border-0',
                            id:"formFile"
                          }
                        ]
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
  
      function setDat() {}
  
      function getDat() {}
  
    }
    
  });
  