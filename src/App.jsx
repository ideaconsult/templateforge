import { AnimatePresence, motion } from "framer-motion";
import formatHighlight from "json-format-highlight";
import { useState } from "react";
import "./App.css";
import SurveyComponent from "./SurveyComp/SurveyComp";
import TopMenuBar from "./MenuBar/TopMenuBar";
import DialogComp from "./DialogComp/DialogComp";
import LogoBar from "./MenuBar/LogoBar";
const customColorOptions = {
  keyColor: "#3a3a3a",
  numberColor: "blue",
  stringColor: "red",
  trueColor: "#00cc00",
  falseColor: "#ff8080",
  nullColor: "cornflowerblue",
};

function App() {
  const [showPreview, setShowPreview] = useState(false);
  const [result, setResult] = useState(null);
  return (
    <div className="relative mt-12">
      <div className="fixed bg-white z-50 top-0 left-0 right-0">
        <LogoBar />
        <TopMenuBar />
      </div>
      <div className="mt-12">
        <DialogComp result={result} />
        <SurveyComponent setResult={setResult} />

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
  );
}

export default App;
