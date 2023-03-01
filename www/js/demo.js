// document.addEventListener('deviceready', onDeviceReady, false);
// function onDeviceReady() {
//   console.log("hello", navigator.camera)
//   }
ACE(function (ace) {
  var DOM = ace.get.v("dom");
  ace.get("mod", "mod/Dat.js");
  ace.get("mod", "mod/SwapContent.js");
  ace.get("mod", "mod/mainMenu.js");
  ace.get("mod", "mod/welcomeMain.js");
  ace.get("mod", "mod/chatMod.js");
  ace.get("mod", "mod/claim/createClaim.js");
  ace.get("mod", "mod/customerPortal/Documents/listAllDocuments.js");
  ace.get("mod", "mod/customerPortal/Documents/pdfMod.js");
  ace.get("mod", "mod/customerPortal/uploadDocument.js");
  ace.get("mod", "mod/customerPortal/addPolicy.js");
  ace.get("mod", "mod/customerPortal/customerPortal.js");
  ace.get("mod", "mod/customerPortal/addAllPolicies.js");
  ace.get("mod", "mod/dropdown.js");
  ace.get("mod", "mod/form.js");
  ace.get("mod", "mod/formTest.js");
  ace.get("mod", "mod/customerPortal/policyDetails/policyDetails.js");
  ace.get("mod", "mod/customerPortal/policyDetails/transcription.js");
  ace.get("mod", "mod/policyDocs.js");
  ace.get("mod", "mod/navBar.js");
  ace.get("mod", "mod/columnMod.js");
  ace.get("mod", "mod/inputMod.js");
  ace.get("mod", "mod/rowMod.js");

  //  window.aceDatSrc = 'https://5dc.us:3032'
  var swap, navBarACI, mainACI;
  //   projectDetails,
  //   projectsListACI,
  //   ProjectDetailsACI;

  DOM({
    id: "main-div",
    dom: [
      {
        mod: "SwapContent",
        ini: (m) => {
          swap = m;
        },
        loc: 1,
        items: [
          {
            mod: "mainMenu",
            ini: (m) => (mainMenuACI = m),
            swapItem,
          },
          {
            mod: "createClaim",
            ini: (m) => (claimModuleACI = m),
            swapItem,
          },
          {
            mod: "customerPortal",
            ini: (m) => (customerPortalACI = m),
            swapItem,
          },
          {
            mod: "policyDetails",
            ini: (m) => (policyDetailsACI = m),
            swapItem,
          },
          // {
          //   mod: "addAllPolicies",
          //   ini: (m) => (addAllPoliciesACI = m),
          //   swapItem,
          //   policyDetails,
          // },
          // {
          //   mod: "listAllDocuments",
          //   ini: (m) => (claimModuleACI = m),
          //   swapItem,
          // },

          // {
          //   mod: "welcomeMain",
          //   ini: (m) => (welcomeMainACI = m),
          //   swapItem,
          // },
          // {
          //   mod: "listAllDocuments",
          //   ini: (m) => (listAllDocumentsModACI = m),
          //   swapItem,
          // },
          {
            mod: "chatMod",
            ini: (m) => (chatModModACI = m),
            swapItem,
          },
          {
            mod: "transcription",
            ini: (m) => (transcriptionACI = m),
            swapItem,
          },
        ],
      },
    ],
    ini: (m) => {
      mainACI = m;
    },
  });

  function updatePolicies() {
    swapItem(1);
    let data = [
      {
        name: "shina",
        property: "asgjas ajjsajg agsakj",
        file: 123456,
        status: "Pending",
        date: "31-01-2023",
      },
      {
        name: "asad",
        property: "asgjas ajjsajg agsakj",
        file: 123456,
        status: "Pending",
        date: "31-01-2023",
      },
      {
        name: "ali tahir",
        property: "asgjas ajjsajg agsakj",
        file: 123456,
        status: "Pending",
        date: "31-01-2023",
      },
      {
        name: "abu bakar",
        property: "asgjas ajjsajg agsakj",
        file: 123456,
        status: "Pending",
        date: "31-01-2023",
      },
    ];
    addAllPoliciesACI.add("dat", data);
  }

  function policyDetails(data) {
    swapItem(3);
  }

  function listFormPolicyDetail(data) {
    detailPolicyFormsListACI.add("dat", data);
  }

  function paymentPolicyDetail(data) {
    detailPolicyPaymentACI.add("dat", data);
  }

  function agencyAndPolicy(data) {
    policyAndAgencyACI.add("dat", data);
  }

  function listAllDocuments() {
    swapItem(1);
    let data = [];
    listAllDocumentsACI.add("dat", data);
  }

  function swapItem(loc) {
    swap.set("loc", loc);
  }
});
