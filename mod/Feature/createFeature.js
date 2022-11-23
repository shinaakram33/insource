ACE.mod("createFeature", function (ace) {
  ace.get("mod", "mod/Feature/dropDownField.js");
    return createFeature;
  
    function createFeature(cfg) {
      let id = cfg.id || "list",
        additionalFields = cfg.additionalFields || false,
        featureName = cfg.featureName || 'Feature',
        data = cfg.data || [],
        additionalFieldsData = [],
        titleACI, descACI, acceptanceACI, startDateACI, dueDateACI, creationDateACI, estimatedACI
        Location = cfg.getLocation;
        aci = {
          set: {
            dat: setDat,
          },
          get: {
            dat: getDat
          },
        },
        ux = {
          id,
          cls: 'container border border-light bg-light w-50 p-3',
          aci,
          dom: {
            dom: iniDom()
          },
          ini: (m) => {
            cfg.ini(m);
          },
        };
  
      return ux;
  
      function iniDom() {
  
        let dom = [
          {
            typ:'h3',
            lbl: 'Create New '+featureName,
            cls: 'text-center mt-5 text-primary fw-bold'
          },
          { 
            cls: 'mb-3',
            dom: [
              {
                lbl: 'Title *',
                type: 'label',
                cls: 'form-label fw-bold'
              },
              {
                typ: 'input',
                type:'text',
                cls: 'form-control',
                ini: (m)=> {titleACI = m}
              }
            ]
          },
          { 
            cls: 'mb-3',
            dom: [
              {
                lbl: 'Description',
                type: 'label',
                cls: 'form-label fw-bold'
              },
              {
                typ: 'textarea',
                lbl: '',
                cls: 'form-control',
                ini: (m) => (descACI = m)
              }
            ]
          },
          { 
            cls: 'mb-3',
            dom: [
              {
                lbl: 'Acceptance Criteria',
                type: 'label',
                cls: 'form-label fw-bold'
              },
              {
                typ: 'textarea',
                cls: 'form-control',
                ini: m=> (acceptanceACI = m)
              }
            ]
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
                    cls: 'form-control',
                    ini: m=> (startDateACI = m)
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
                    cls: 'form-control',
                    ini: m=> (dueDateACI = m)
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
                    type: 'date',
                    cls: 'form-control',
                    ini: m=> (creationDateACI = m)
                  }
                ]
              },
              {
                cls: 'col-6',
                dom: [
                  {
                    lbl: 'Estimated Time (h)',
                    type: 'label',
                    cls: 'form-label fw-bold'
                  },
                  {
                    typ: 'input',
                    type: 'number',
                    cls: 'form-control',
                    ini: m=> (estimatedACI = m)
                  }
                ]
              }
            ]
          },     
        ];

        if(additionalFields === true){
          data.forEach((element)=> {
            if(element.type == 'dropdown'){
              dom.push({
                cls: 'mb-3',
              dom: [
                {
                  lbl: element.label,
                  type: 'label',
                  for: 'formFile',
                  cls: 'form-label fw-bold'
                },
                {
                  mod: 'dropDownField',
                  data: element.values,
                  ini: (m)=> {
                    element.ACI = m
                  }
                }
              ]
              })
            }
          })
        }

        dom.push(
          { 
            cls: 'mb-3 row',
            dom:[
              {
                cls: 'col-6',
                dom: [
                  {
                    lbl: 'Status',
                    type: 'label',
                    for: 'formFile',
                    cls: 'form-label fw-bold'
                  },
                  {
                    typ: 'select',
                    cls: 'form-select',
                    dom: [
                      {
                        typ: 'option',
                        lbl: 'To do',                
                      },
                      {
                        typ: 'option',
                        lbl: 'In Progress', 
                      },
                      {
                        typ: 'option',
                        lbl: 'Done',                
                      }
                    ],
                    ini: m=> (statusACI = m)
                  }
                ],
              }
            ]
          },
          { 
            cls: 'mb-3',
            dom: [
              {
                lbl: 'Priority',
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
                    lbl: 'Low',                
                  },
                  {
                    typ: 'option',
                    lbl: 'High',                
                  },
                  {
                    typ: 'option',
                    lbl: 'Medium',                
                  }
                ],
                ini: (m)=> (priorityACI = m)
              }
            ],
          },
          { 
            cls: 'mb-3',
            dom: [
              {
                lbl: 'Rating',
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
                    lbl: 1,                
                  },
                  {
                    typ: 'option',
                    lbl: 2,                
                  },
                  {
                    typ: 'option',
                    lbl: 3,                
                  },
                  {
                    typ: 'option',
                    lbl: 4,                
                  },
                  {
                    typ: 'option',
                    lbl: 5,                
                  }
                ],
                ini: (m)=> (ratingACI = m)
              }
            ],
          },
          {
            cls: 'mb-3 row ',
            dom: [
              {
                typ:'button',
                cls: 'col-2 btn btn-light text-decoration-underline',
                lbl: 'Cancel',
                on: {
                  click: ()=> {
                    handleCancle()
                  }
                }
              },
              {
                typ:'button',
                cls: 'col-2 btn btn-primary align-self-end',
                lbl: 'Create',
                on: {
                  click: ()=> {
                    cfg.handleSubmit()
                  }
                }
              }
            ]
          },
        )
  
        return dom;
      }
  
      function setDat() {
      }
  
      function getDat() {
        if(additionalFields === true){
          if(additionalFieldsData.length > 0){
            additionalFieldsData = [];
          }
          data.forEach((ele)=> {
            additionalFieldsData.push(ele.ACI.get.v('dat'))
          })
        }
        return  {
          title: titleACI.get.v('val'),
          description: descACI.get.v('val'),
          acceptance_criteria: acceptanceACI.get.v('val'),
          start_date: startDateACI.get.v('val'),
          due_date: dueDateACI.get.v('val'),
          created_at: creationDateACI.get.v('val'),
          created_by: "",
          estimated_time: estimatedACI.get.v('val'),
          status: statusACI.get.v('val'),
          priority: priorityACI.get.v('val'),
          rating: ratingACI.get.v('val'),
          additionalFields: additionalFieldsData
        }
      }
  
    }
    
  });
  