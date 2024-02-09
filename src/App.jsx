import { AnimatePresence, motion } from "framer-motion";
import formatHighlight from "json-format-highlight";
import { useState } from "react";
import "./App.css";
import SurveyComponent from "./SurveyComp/SurveyComp";
import TopMenuBar from "./MenuBar/TopMenuBar";
import DialogComp from "./DialogComp/DialogComp";
import LogoBar from "./MenuBar/LogoBar";
import StartScreenComp from "./StartScreenComp/StartScreenComp";

import { useShowStartScreen } from "./store/store";

const customColorOptions = {
  keyColor: "#3a3a3a",
  numberColor: "blue",
  stringColor: "red",
  trueColor: "#00cc00",
  falseColor: "#ff8080",
  nullColor: "cornflowerblue",
};

function App() {
  const [saveSurvey, setSaveSurvey] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [result, setResult] = useState(null);
  const [surveyReset, setSurveyReset] = useState(false);
  const [templateURL, setTemplateURL] = useState("");

  const startScreen = useShowStartScreen();

  return (
    <>
      {startScreen ? (
        <StartScreenComp
          setSurveyReset={setSurveyReset}
          surveyReset={surveyReset}
          setTemplateURL={setTemplateURL}
        />
      ) : (
        <div className="wrapper">
          <div className="headerWrap">
            <LogoBar startScreen={false} />
            <TopMenuBar
              setSurveyReset={setSurveyReset}
              setTemplateURL={setTemplateURL}
            />
          </div>
          <div className="mainWrap">
            <DialogComp result={result} />
            <SurveyComponent
              setResult={setResult}
              surveyReset={surveyReset}
              templateURL={templateURL}
              saveSurvey={saveSurvey}
            />

            {showPreview && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="portalWrapper"
                >
                  <div className="previewModal">
                    <p
                      className="modalJson"
                      dangerouslySetInnerHTML={{
                        __html: formatHighlight(
                          result && "<pre>\n" + result + "\n</pre>",
                          customColorOptions
                        ),
                      }}
                    />
                    {/* {result} */}
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
