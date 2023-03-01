ACE.mod("chatMod", function (ace) {
  ace.get("mod", "mod/SwapContent.js");
  ace.get("mod", "mod/Dat.js");
  return chatMod;

  function chatMod(cfg) {
    let id = cfg.id || "main-menu",
      chatModACI,
      chatRefACI,
      formACI,
      swap;
    (aci = {
      set: {
        dat: setDat,
      },
      get: {
        dat: getDat,
      },
    }),
      (ux = {
        id,
        aci,
        dom: iniDom(),
        ini: (m) => {
          cfg.ini(m);
          chatModACI = m;
        },
      });

    return ux;

    function iniDom() {
      let dom = [
        {
          cls: "chatMain",
          dom: [
            {
              typ: "label",
              cls: "chat-btn",
              for: "check",
              on: {
                click: () => {
                  openChat();
                },
              },
              dom: [
                {
                  typ: "i",
                  cls: "fa fa-commenting-o comment",
                },
              ],
            },
            {
              cls: "wrapper",
              dom: [
                {
                  cls: "header d-flex justify-content-between align-items-center",
                  dom: [
                    { typ: "h6", lbl: "Let's Chat - Online" },
                    {
                      typ: "h6",
                      on: {
                        click: () => {
                          closeChat();
                        },
                      },
                      lbl: "×",
                      style: "font-size:30px;cursor:pointer",
                    },
                  ],
                },
                {
                  cls: "text-center p-2",
                  dom: [
                    {
                      typ: "span",
                      lbl: "Please fill out the form to start chat!",
                    },
                  ],
                },
                {
                  cls: "chat-form",
                  dom: [
                    {
                      typ: "input",
                      cls: "form-control",
                      type: "text",
                      placeholder: "Name",
                    },
                    {
                      typ: "input",
                      cls: "form-control",
                      type: "text",
                      placeholder: "Email",
                    },
                    {
                      typ: "textarea",
                      cls: "form-control",
                      placeholder: "Your Text Message",
                    },
                    {
                      typ: "button",
                      cls: "btn btn-success btn-block",
                      lbl: "Submit",
                    },
                  ],
                },
              ],
              ini: (m) => {
                chatRefACI = m;
              },
            },
          ],
        },
      ];
      return dom;
    }

    function openChat() {
      setDat();
    }

    function closeChat() {
      chatRefACI.set("style", "display: none;");
    }

    function setDat() {
      chatRefACI.set("style", "display: block;");
    }

    function getDat() {}
  }
});
