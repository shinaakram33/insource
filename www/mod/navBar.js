ACE.mod("navBar", function (ace) {
  ace.get("mod", "mod/SwapContent.js");
  ace.get("mod", "mod/Dat.js");
  return navBar;

  function navBar(cfg) {
    let id = cfg.id,
      navBarModACI,
      navBarOpenACI,
      navBarCloseACI,
      navBarTitleACI;
    (aci = {
      set: {
        dat: setOpDat,
      },
    }),
      (ux = {
        id,
        aci,
        dom: iniDom(),
        ini: (m) => {
          cfg.ini(m);
          cfg.setUserInfo();
          navBarModACI = m;
        },
      });

    return ux;

    function iniDom() {
      let itemsDom = [];
      cfg.itemsData?.forEach((element) => {
        itemsDom.push({
          typ: "a",
          lbl: element.label,
          on: {
            click: () => {
              navBarTitleACI.set("lbl", element.label);
              cfg.swapItem(element.loc);
              closeNav();
            },
          },
        });
      });
      let dom = [
        {
          cls: "sticky-top text-center",
          dom: [
            {
              cls: "navbar-customize",
              dom: [
                {
                  typ: "nav",
                  cls: "navbar",

                  dom: [
                    {
                      cls: "container-fluid",
                      dom: [
                        {
                          typ: "a",
                          cls: "navbar-brand website-logo lead",
                          dom: [
                            {
                              typ: "span",
                              lbl: cfg.title,
                              ini: (m) => {
                                navBarTitleACI = m;
                              },
                            },
                            { typ: "br" },
                          ],
                        },
                        {
                          dom: [
                            {
                              cls: "overlay",
                              id: cfg.hello,
                              dom: [
                                {
                                  typ: "a",
                                  cls: "closebtn",
                                  href: "javascript:void(0)",
                                  on: {
                                    click: () => {
                                      closeNav();
                                    },
                                  },
                                  lbl: "×",
                                },
                                {
                                  cls: "overlay-content",
                                  dom: itemsDom,
                                },
                              ],
                              ini: (m) => {
                                navBarOpenACI = m;
                              },
                            },
                            {
                              typ: "span",
                              style: "font-size:30px;cursor:pointer",
                              cls: "text-white",
                              on: {
                                click: () => {
                                  openNav();
                                  console.log("hello dunya");
                                },
                              },
                              lbl: "☰",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ];

      return dom;
    }

    function openNav() {
      setOpDat();
    }

    function closeNav() {
      // document.getElementById(`${cfg.hello}`).style.width = "0%";
      navBarOpenACI.set("style", "width: 0%;");
    }

    function setOpDat() {
      navBarOpenACI.set("style", "width:100%;");
    }
  }
});
