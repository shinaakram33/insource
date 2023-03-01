ACE.mod("mainMenu", function (ace) {
  ace.get("mod", "mod/SwapContent.js");
  ace.get("mod", "mod/claim/createClaim.js");
  ace.get("mod", "mod/Dat.js");
  return mainMenu;

  function mainMenu(cfg) {
    let id = cfg.id || "main-menu",
      mainMenuACI,
      scriptACI,
      swap,
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
          mainMenuACI = m;
        },
      };

    return ux;

    function iniDom() {
      let dom = [
        // {
        //   mod: "chatMod",
        //   ini: (m) => (chatModModACI = m),
        // },
        {
          cls: "mb-2",
          dom: [
            {
              cls: "navbar-customize",
              dom: [
                {
                  typ: "nav",
                  cls: "navbar",
                  dom: [
                    {
                      cls: "container-fluid ",
                      dom: [
                        {
                          typ: "a",
                          cls: "navbar-brand website-logo lead py-2",
                          dom: [
                            { typ: "span", lbl: "Ohio FAIR Plan" },
                            { typ: "br" },
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
        {
          typ: "img",
          src: "./img/logo.png",
          css: { w: "70%" },
          cls: "mx-auto d-block mt-3",
          ini: (m) => {
            imageACI = m;
          },
        },
        {
          cls: "mainMenu",
          dom: [
            {
              cls: "row",
              dom: [
                {
                  cls: "w-50 col-sm-6",
                  dom: [
                    {
                      typ: "img",
                      src: "./img/claim.png",
                      cls: "mx-auto d-block mb-2 mainMenuImg",
                      ini: (m) => {
                        imageACI = m;
                      },
                    },
                    {
                      typ: "span",
                      lbl: "SUBMIT A CLAIM",
                      style: "font-size: 15px",
                      cls: "mx-auto d-block text-center",
                    },
                  ],
                  on: {
                    click: () => {
                      cfg.swapItem(2);
                    },
                  },
                },
                {
                  cls: "w-50 col-sm-6 ml-5 text-center",
                  dom: [
                    {
                      typ: "label",
                      for: "fileInput",
                      cls: " mt-2",
                      style: "width: 45%",
                      dom: {
                        cls: "w-100 mb-2",
                        typ: "img",
                        src: "./img/upload.png",
                        ini: (m) => {
                          imageACI = m;
                        },
                      },
                    },
                    {
                      typ: "label",
                      cls: "custom-file-upload",
                      dom: [
                        {
                          typ: "input",
                          type: "file",
                          id: "fileInput",
                          cls: "fileChange",
                          accept: "image/png, image/gif, image/jpeg",
                        },
                        {
                          typ: "span",
                          lbl: " UPLOAD PHOTOS",
                          style: "font-size: 15px",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              cls: "row mt-4",
              dom: [
                {
                  cls: "w-50 col-sm-6",
                  dom: [
                    {
                      typ: "img",
                      src: "./img/call.png",
                      cls: "mx-auto d-block mb-2 mainMenuImg",
                      ini: (m) => {
                        imageACI = m;
                      },
                    },
                    {
                      typ: "span",
                      lbl: "CALL US",
                      style: "font-size: 15px",
                      cls: "mx-auto d-block text-center",
                    },
                  ],
                  on: {
                    click: () => {
                      cordova.plugins.phonedialer.call(
                        "2125551212",
                        function (success) {
                          console.log("Dialing succeeded");
                        },
                        function (err) {
                          if (err == "empty")
                            console.log("Unknown phone number");
                          else console.log("Dialer Error:" + err);
                        },
                        onSpeakerOn,
                        appChooser
                      );
                    },
                  },
                },
                {
                  typ: "a",
                  href: "https://www.ohiofairplan.com/",
                  target: "_blank",
                  cls: "w-50 col-sm-6 text-dark text-decoration-none",
                  dom: [
                    {
                      typ: "img",
                      src: "./img/website.png",
                      cls: "mx-auto d-block mb-2 mainMenuImg",
                      ini: (m) => {
                        imageACI = m;
                      },
                    },
                    {
                      lbl: "OUR WEBSITE",
                      style: "font-size: 15px",
                      cls: "mx-auto d-block text-center",
                    },
                  ],
                },
              ],
            },
            {
              cls: "row my-4",
              dom: [
                {
                  cls: "w-50 col-6",
                  dom: [
                    {
                      typ: "img",
                      src: "./img/customer-portal.jpg",
                      cls: "mx-auto d-block mb-2 mainMenuImg",
                      ini: (m) => {
                        imageACI = m;
                      },
                    },
                    {
                      // typ: "a",
                      lbl: "CUSTOMER PORTAL",
                      style: "font-size: 15px",
                      cls: "mx-auto d-block text-center",
                      href: "https://www.ohiofairplan.com/",
                    },
                  ],
                  on: {
                    click: () => {
                      cfg.swapItem(3);
                    },
                  },
                },
                {
                  typ: "a",
                  href: "https://ipn2.paymentus.com/cp/ofpu",
                  target: "_blank",
                  cls: "w-50 col-6 text-dark text-decoration-none",
                  dom: [
                    {
                      typ: "img",
                      src: "./img/payment.png",
                      cls: "mx-auto d-block mb-2 mainMenuImg",
                      ini: (m) => {
                        imageACI = m;
                      },
                    },
                    {
                      lbl: "PAYMENT",
                      style: "font-size: 15px",
                      cls: "mx-auto d-block text-center ",
                    },
                  ],
                  // on: {
                  //   click: () => {
                  //     cfg.swapItem(3);
                  //   },
                  // },
                },
              ],
            },
            {
              typ: "script",
              id: "parent",
              cls: "hhey",
            },
          ],
        },
      ];
      // const mutationObserver = new MutationObserver(() => {
      //   let node = document.querySelector("#transparent-button");
      //   node.css("background-color", "blue");
      //   parent.appendChild(node);
      // });
      return dom;
    }

    function setDat(dat) {
      //set the phone number
      // set website link
    }

    function getDat() {}

    function onSpeakerOn(result) {
      console.log(result);
    }

    function appChooser(result) {
      console.log(result);
    }
  }
});
function chat() {
  var se = document.createElement("script");
  se.type = "text/javascript";
  se.async = true;

  se.id = "chat";

  var body = document.querySelector("body");

  body.appendChild(se);

  se.src =
    "https://storage.googleapis.com/code.snapengage.com/js/ea4db09d-9f5b-4d08-b682-4c5b45a3567a.js";

  var done = false;

  se.onload = se.onreadystatechange = function () {
    const mutationObserver = new MutationObserver(() => {
      var iframe = document.getElementById("iframe-designstudio-button");
      var elmnt = iframe.contentWindow.document.getElementById(
        "designstudio-button-image-mobile"
      );
      elmnt.src = "img/chat-icon.png";
    });
    const parent = document.querySelector("body");
    mutationObserver.observe(parent, { childList: true });
    if (
      !done &&
      (!this.readyState ||
        this.readyState === "loaded" ||
        this.readyState === "complete")
    ) {
      done = true;

      /* Place your SnapEngage JS API code below */

      /* SnapEngage.allowChatSound(true); Example JS API: Enable sounds for Visitors. */
    }
  };
  document.getElementById("parent").appendChild(se);
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(se, s);
}
chat();