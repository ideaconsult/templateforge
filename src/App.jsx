import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import formatHighlight from "json-format-highlight";
import "./App.css";
import SurveyComponent from "./SurveyComp/SurveyComp";
import ShowPreviewIcon from "./IconsComponents/ShowPreviewIcon";

import DialogComp from "./DialogComp/DialogComp";
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
    <div className="wrapper">
      <DialogComp result={result} />
      <SurveyComponent setResult={setResult} />
      {/* <div className="showPreview">
        <button
          className="showBtn"
          onClick={() => setShowPreview(!showPreview)}
        >
          <ShowPreviewIcon />
          {showPreview ? "Hide Preview" : "Show Preview"}
        </button>
      </div> */}
      {/* <div className="previewSection">
        {result ? JSON.stringify(result, null, 3) : "No preview yet"}
      </div> */}
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
  );
}

export default App;
