ACE.mod("loginUser", function (ace) {
    return loginUser;
  
    function loginUser(cfg) {
      let id = cfg.id || "create-user",
        emailACI, passwordACI,
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
                lbl: 'Sign Up',
                cls: 'text-right mt-2 text-secondary bg-light text-decoration-underline border-0 fw-bold float-end mb-3',
                on: {
                  click: ()=> {
                    cfg.swapItem(8)
                  }
                }
              },
              {
                typ:'h4',
                lbl: 'Login to the Portal',
                cls: ' mt-5 text-primary fw-bold mb-5',
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
              cls: 'mb-3 row ',
              dom: [
                {
                  typ:'button',
                  cls: 'col-2 ml-3 btn btn-primary float-end',
                  lbl: 'Log In',
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
          email: emailACI.get.v('val'),
          password: passwordACI.get.v('val'),
        }
      }

      function handleSubmit(){
          let obj = {
              cmd: 'ini',
              aspect: 'itm',
              typ: 'user',
              v: getDat()
          }
          ace.get.item(obj, function(dat){
              console.log('User created on localStorage ', dat)
          })
      }
  
    }
    
  });
  