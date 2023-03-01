ACE.mod("createUser", function (ace) {
      return createUser;
    
      function createUser(cfg) {
        let id = cfg.id || "create-user",
          firstNameACI, lastNameACI, emailACI, passwordACI, phoneNoACI,
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
              dom: [
                {
                  typ:'button',
                  lbl: 'View All Users',
                  cls: 'text-right mt-2 text-secondary bg-light text-decoration-underline border-0 fw-bold float-end mb-3',
                  on: {
                    click: ()=> {
                    }
                  }
                },
                {
                  typ:'h4',
                  lbl: 'Register yourself',
                  cls: ' mt-5 text-primary fw-bold mb-5',
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
                      lbl: 'First Name',
                      type: 'label',
                      cls: 'form-label fw-bold'
                    },
                    {
                      typ: 'input',
                      type: 'text',
                      cls: 'form-control',
                      ini: m=> (firstNameACI = m)
                    }
                  ]
                },
                {
                  cls: 'col-6',
                  dom: [
                    {
                      lbl: 'Last Name',
                      type: 'label',
                      cls: 'form-label fw-bold'
                    },
                    {
                      typ: 'input',
                      type: 'text',
                      cls: 'form-control',
                      ini: m=> (lastNameACI = m)
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
                      lbl: 'Email',
                      type: 'label',
                      cls: 'form-label fw-bold'
                    },
                    {
                      typ: 'input',
                      type: 'email',
                      cls: 'form-control',
                      ini: m=> (emailACI = m)
                    }
                  ]
                },
                {
                  cls: 'col-6',
                  dom: [
                    {
                      lbl: 'Password',
                      type: 'label',
                      cls: 'form-label fw-bold'
                    },
                    {
                      typ: 'input',
                      type: 'text',
                      cls: 'form-control',
                      ini: m=> (passwordACI = m)
                    }
                  ]
                }
              ]
            },
            { 
                cls: 'mb-3 row',
                dom:[
                  {
                    cls: 'col-6',
                    dom: [
                      {
                        lbl: 'Phone No',
                        type: 'label',
                        cls: 'form-label fw-bold'
                      },
                      {
                        typ: 'input',
                        type: 'text',
                        cls: 'form-control',
                        ini: m=> (phoneNoACI = m)
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
                    cls: 'col-6 btn btn-light text-decoration-underline',
                    lbl: 'Already have an Account? Login ',
                    on: {
                      click: ()=> {
                        cfg.swapItem(9)
                      }
                    }
                  },
                  {
                    typ:'button',
                    cls: 'col-2 btn btn-primary float-end',
                    lbl: 'Sign Up',
                    on: {
                      click: ()=> {
                        handleSubmit()
                      }
                    }
                  }
                ]
            },    
          ];
    
          return dom;
        }
    
        function setDat() {
        }
    
        function getDat() {
          return  {
            first_name: firstNameACI.get.v('val'),
            last_name: lastNameACI.get.v('val'),
            email: emailACI.get.v('val'),
            password: passwordACI.get.v('val'),
            phone_no: phoneNoACI.get.v('val'),
          }
        }

        function handleSubmit(){
            let obj = {
                cmd: 'ini',
                aspect: 'itm',
                typ: 'user',
                v: getDat()
            }
            ace.ini.item(obj, function(dat){
                console.log('User created on localStorage ', dat)
            })
        }
    
      }
      
    });
    