ACE.mod("customerPortal", function (ace) {
  ace.get("mod", "mod/SwapContent.js");
  ace.get("mod", "mod/navBar.js");
  ace.get("mod", "mod/welcomeMain.js");
  ace.get("mod", "mod/customerPortal/Documents/listAllDocuments.js");
  ace.get("mod", "mod/customerPortal/addAllPolicies.js");
  ace.get("mod", "mod/customerPortal/policyDetails/claim.js");
  ace.get("mod", "mod/customerPortal/policyDetails/transcription.js");
  ace.get("mod", "mod/customerPortal/policyDetails/policyDetails.js");
  ace.get("mod", "mod/customerPortal/policyDetails/basicDetailPolicyInfo.js");
  ace.get("mod", "mod/customerPortal/policyDetails/policyAndAgency.js");
  ace.get("mod", "mod/customerPortal/policyDetails/detailPolicyPayment.js");
  ace.get("mod", "mod/customerPortal/policyDetails/detailPolicyFormsList.js");
  ace.get("mod", "mod/customerPortal/policyDetails/underWriteInfo.js");
  ace.get("mod", "mod/customerPortal/policyDetails/policyDetails.js");

  return customerPortal;

  function customerPortal(cfg) {
    let id = cfg.id || "customer-portal",
      // swapItem = cfg.swapItem,
      swap,
      navBarACI2,
      customerPortalRefACI,
      customerPortalModACI;
    ux = {
      id,
      dom: {
        dom: iniDom(),
        ini: (m) => {
          customerPortalRefACI = m;
        },
      },
      ini: (m) => {
        cfg.ini(m);
        customerPortalModACI = m;
      },
    };
    return ux;

    function iniDom() {
      let dom = [
        {
          dom: {
            mod: "navBar",
            cls: "sticky-top text-center",
            id: "customer-navBar",
            hello: "my1",
            title: "Customer Portal",
            ini: (m) => {
              navBarACI2 = m;
            },
            swapItem,
            itemsData: [
              {
                label: "Profile",
                loc: 1,
              },
              {
                label: "Policies List",
                loc: 1,
              },
              {
                label: "Documents List",
                loc: 2,
              },
              {
                label: "Transcription",
                loc: 4,
              },
              {
                label: "Home",
                loc: 5,
              },
            ],
          },
        },
        {
          mod: "SwapContent",
          ini: (m) => {
            swap = m;
          },
          loc: 1,
          items: [
            {
              mod: "addAllPolicies",
              ini: (m) => (addAllPoliciesACI = m),
              swapItem,
              policyDetails,
            },
            {
              mod: "listAllDocuments",
              ini: (m) => (listAllDocumentsModACI = m),
              swapItem,
            },
            {
              mod: "policyDetails",
              ini: (m) => (basicDetailPolicyInfoACI = m),
              swapItem,
            },
            {
              mod: "transcription",
              ini: (m) => (transcriptionACI = m),
              swapItem,
            },
          ],
        },
      ];
      return dom;
    }
    // function setUserInfo() {
    //   setAfterLoad(() => navBarACI2);
    // }
    // function setAfterLoad(module) {
    //   if (module()) {
    //     customerPortalRefACI.add();
    //   } else {
    //     return setTimeout(() => {
    //       setAfterLoad(module);
    //     }, 0);
    //   }
    // }

    function policyDetails(data) {
      cfg.swapItem(4);
    }
    function swapItem(loc) {
      if (loc === 5) {
        cfg.swapItem(1);
      } else {
        swap.set("loc", loc);
      }
      swap.set("loc", loc);
    }
  }
});
