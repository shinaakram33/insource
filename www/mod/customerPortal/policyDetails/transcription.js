ACE.mod("transcription", function (ace) {
  ace.get("mod", "mod/SwapContent.js");
  ace.get("mod", "mod/Dat.js");
  return transcription;
  function transcription(cfg) {
    let id = cfg.id || "speechTranscription",
      transcriptionACI,
      speechref,
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
          transcriptionACI = m;
        },
      });
    return ux;
    function iniDom() {
      let dom = [
        {
          cls: "p-2",
          dom: [
            {
              dom: [
                {
                  cls: "fw-bold my-2 h4",
                  lbl: "Speech Transcription:",
                },
              ],
            },
            {
              cls: " speakText",
              dom: [
                {
                  typ: "text",
                  lbl: "Hello world",
                  id: "transcription",
                  ini: (m) => {
                    speechref = m;
                  },
                },
              ],
            },
            {
              cls: "mt-5",
              dom: [
                {
                  typ: "button",
                  lbl: "Speak",
                  style: "font-size: 15px",
                  cls: "mx-auto d-block text-center",
                  on: {
                    click: () => {
                      testingVoice();
                    },
                  },
                },
              ],
            },
          ],
        },
      ];
      return dom;
    }
    function setDat() {
      speechref.set("lbl", dat);
    }
    function getDat() {}
    function testingVoice() {
      // if (annyang) {
      //   var commands = {
      //     'show transcription *text': function() {
      //       console.log("textttt", text)
      //       // document.getElementById("transcription").innerHTML = text;
      //     }
      //   };
      //   annyang.addCommands(commands);
      //   annyang.start({
      //     autoRestart: true,
      //     continuous: false,
      //     onResult: function(text) {
      //       console.log("sdfsdfsdf")
      //       console.log('Transcription: ' + text);
      //     }
      //   });
      // annyang.start();
      // }else console.log("Speech recognition is not supported in this browser");
      var recognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)(); //get new instance
      recognition.start(); //start it
      // recognition.onend = function () { //a function to restart it when it stops
      //   recognition.start();
      // }
      recognition.onresult = function (event) {
        console.log("video", event);
        var whatWasHeard = event.results[0][0].transcript; //get what was heard
        setDat(whatWasHeard);
        // document.body.innerHTML = whatWasHeard; //original version. Update below
        console.log("whuattttttt", whatWasHeard);
        // alert(whatWasHeard);
      };
      recognition.onerror = function (event) {
        console.error(event.error);
      };
    }
  }
});
