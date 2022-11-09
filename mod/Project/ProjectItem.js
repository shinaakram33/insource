ACE.mod("ProjectItem", function (ace) {
  return ProjectItem;

  function ProjectItem(cfg) {
    let id = cfg.id,
      data = cfg.itm || [],
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
        typ: "row",
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
          typ: "td",
          lbl: data.title,
          on: {
            click: () => {
              cfg.Location(data, 2);
            },
          },
        },
        { typ: "span",cls:'col', lbl: data.desc },
        { typ: "span", cls:'col',lbl: data.teamLead },
        { typ: "span", cls: 'col',lbl: data.status },
      ];
      return dom;
    }

    function setDat() {}

    function getDat() {}
  }
});
