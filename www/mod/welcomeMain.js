// ACE.mod("welcomeMain", function (ace) {
//   ace.get("mod", "mod/SwapContent.js");
//   ace.get("mod", "mod/chatMod.js");
//   ace.get("mod", "mod/claim/createClaim.js");
//   ace.get("mod", "mod/Dat.js");
//   return welcomeMain;

//   function welcomeMain(cfg) {
//     let id = cfg.id || "main-menu",
//       swapItem = cfg.swapItem,
//       welcomeMainACI,
//       welcomeMainRefACI,
//       swap,
//       ux = {
//         id,
//         dom: {
//           dom: iniDom(),
//           ini: (m) => {
//             welcomeMainRefACI = m;
//           },
//         },
//         ini: (m) => {
//           cfg.ini(m);
//           welcomeMainACI = m;
//         },
//       };

//     return ux;

//     function iniDom() {
//       let dom = [
//         // {
//         //   mod: "chatMod",
//         //   ini: (m) => (chatModModACI = m),
//         //   swapItem,
//         // },
//         {
//           mod: "navBar",
//           cls: "sticky-top text-center",
//           id: "policy-navBar",
//           hello: "my3",
//           title: "Ohio Fair Plan",
//           ini: (m) => {
//             navBarACI1 = m;
//           },
//           swapItem,
//           itemsData: [
//             {
//               label: "Customer Portal",
//               loc: 1,
//             },
//             {
//               label: "Submit Claim",
//               loc: 4,
//             },
//             {
//               label: "Upload Photos",
//               loc: 0,
//             },
//             {
//               label: "Call Us",
//               loc: 0,
//             },
//           ],
//           setUserInfo,
//         },
//       ];
//       return dom;
//     }

//     function setUserInfo() {
//       setAfterLoad(() => navBarACI1);
//     }
//     function setAfterLoad(module) {
//       if (module()) {
//         welcomeMainRefACI.add({
//           mod: "SwapContent",
//           ini: (m) => {
//             swap = m;
//           },
//           loc: 2,
//           items: [
//             {
//               mod: "addAllPolicies",
//               ini: (m) => (addAllPoliciesACI = m),
//               swapItem,
//             },
//             {
//               mod: "mainMenu",
//               ini: (m) => (mainMenuACI = m),
//               swapItem,
//             },
//           ],
//         });
//       } else {
//         return setTimeout(() => {
//           setAfterLoad(module);
//         }, 0);
//       }
//     }

//     // function swapItem(loc) {
//     //   swap.set("loc", loc);
//     // }
//   }
// });
