ACE.mod("updateFeature", function (ace) {
    return updateFeature;
  
    function updateFeature(cfg) {
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
            // typ: "table",
            cls: "container",
  
            dom: [
              {
                typ: "row",
                dom: [
                  {
                    // typ: "tr",
                    dom: [
                      { typ: "p", cls: "col", lbl: "Project Name" },
                      { typ: "p", cls: "col", lbl: "Project Description" },
                      { typ: "p", cls: "col", lbl: "Project Lead" },
                      { typ: "p", cls: "col", lbl: "Status" },
                    ],
                  },
                ],
              },
              {
                typ: "row",
                dom: rows,
              },
            ],
          },
        ];
  
        return dom;
      }
  
      function setDat() {}
  
      function getDat() {}
  
    }
    
  });
  