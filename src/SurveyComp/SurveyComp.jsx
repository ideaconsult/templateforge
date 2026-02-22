import { useEffect, useState } from "react";
import { Model, FunctionFactory } from "survey-core";
import { Survey } from "survey-react-ui";
import { themeJson } from "./theme";

import $ from "jquery";
import * as SurveyCore from "survey-core";
import { autocomplete } from "surveyjs-widgets";

import { postRequestUUID } from "../lib/request";
import {
  useIsShosen,
  useUuid,
  useSetIntermediateData,
  useViewMode,
} from "../store/store";

import { useLocation } from "react-router-dom";
import config from "../utils/config";

import "survey-core/defaultV2.min.css";
import "../App.css";


const orcidPattern = /^\d{4}-\d{4}-\d{4}-(\d{4}|[Xx])$/;

function isValidOrcid([ORCID]) {
  return orcidPattern.test(ORCID);
}
FunctionFactory.Instance.register("isValidOrcid", isValidOrcid);

// eslint-disable-next-line react/prop-types
function SurveyComponent({ setResult }) {
  const [surveyJson, setSurveyJson] = useState(null);
  const [survey, setSurvey] = useState(null);

  const UUID = useUuid();
  const idShosen = useIsShosen();
  const setIntermediateData = useSetIntermediateData();
  const viewMode = useViewMode();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const uuidParams = queryParams.get("uuid");
  const viewParams = queryParams.get("mode");

  const id = idShosen ? idShosen : UUID || uuidParams;

  // Load schema once (from localStorage or API)
  useEffect(() => {
    async function loadSchema() {
      try {
        const response = await fetch(`${config.apiUrl}/../definition/template_designer`);
        const json = await response.json();
        localStorage.setItem("surveyJson", JSON.stringify(json));
        setSurveyJson(json);
      } catch (err) {
        console.error("Failed to fetch survey schema", err);
      }
    }

    loadSchema();
  }, []);

  // Create Survey model once JSON is available
  useEffect(() => {
    if (!surveyJson) return;

    const model = new Model(surveyJson);
    // window._surveyModel = model;  
    model.applyTheme(themeJson);
    initOntologyMapping(model);

    window["$"] = window["jQuery"] = $;
    autocomplete(SurveyCore);

    model.addNavigationItem({
      id: "sv-nav-clear-page",
      title: "Clear Page",
      action: () => {
        model.currentPage.questions.forEach((question) => {
          question.value = undefined;
        });
      },
      css: "nav-button",
      innerCss: "sd-btn nav-input",
    });

    model.addLayoutElement({
      id: "new-el",
      component: "sv-progressbar-percentage",
      container: "sd-action-bar",
      data: model,
    });

    const storageItemKey = "my-survey";

    function saveSurveyData(survey) {
      postRequestUUID(survey.data, id);
      setIntermediateData(survey.data);
    }

    function saveinLocalSurveyData(survey) {
      setIntermediateData(survey.data);
      const data = survey.data;
      data.pageNo = survey.currentPageNo;
      window.localStorage.setItem(storageItemKey, JSON.stringify(data));
    }

    model.onValueChanged.add(saveinLocalSurveyData);
    model.onCurrentPageChanged.add(saveSurveyData);

    model.onComplete.add(() => {
      window.localStorage.setItem(storageItemKey, "");
    });

    model.completedHtml = "Thank you for finalizing the template";

    model.onComplete.add(function (sender, options) {
      if (model.validationAllowComplete) {
        setResult(sender.data);
        options.showSaveInProgress();
        postRequestUUID(sender.data, id);
      }
    });

    setSurvey(model);
  }, [surveyJson]);

  // Fetch survey data (answers) by ID
  useEffect(() => {
    async function getTemplateInfo() {
      if (!survey) return;

      try {
        const apiUrl = config.apiUrl;
        const response = await fetch(`${apiUrl}/${id}`);
        const data = await response.json();

        setIntermediateData(data);
        survey.data = data;
        if (viewMode || !viewParams) {
          survey.mode = "display";
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getTemplateInfo();
  }, [survey, id, viewMode, viewParams, setIntermediateData]);

  if (!survey) return <div>Loading survey...</div>;

  return <Survey model={survey} />;
}



// ─────────────────────────────────────────────────────────────────────────────
// Ontology mapping handler for Template Designer
// Attach to the survey model ONCE after model is created:
//   initOntologyMapping(model);
// ─────────────────────────────────────────────────────────────────────────────

function initOntologyMapping(survey) {

    const SOURCE_LABELS = {
        "conditions":           "Experimental condition / factor",
        "raw_data_report":      "Raw data endpoint",
        "question3":            "Processed result endpoint",
        "calibration_report":   "Calibration curve endpoint",
        "METADATA_PARAMETERS":  "Method parameter",
        "METADATA_SAMPLE_INFO": "Sample descriptor",
        "METADATA_SAMPLE_PREP": "Sample preparation parameter",
        "units":                "Unit"
    };

    const NAME_QUESTION = {
        "conditions":           "onto_field_name_conditions",
        "raw_data_report":      "onto_field_name_raw",
        "question3":            "onto_field_name_results",
        "calibration_report":   "onto_field_name_calibration",
        "METADATA_PARAMETERS":  "onto_field_name_params",
        "METADATA_SAMPLE_INFO": "onto_field_name_sample",
        "METADATA_SAMPLE_PREP": "onto_field_name_sampleprep",
        "units":                "onto_field_name_unit"
    };

    function getSelectedTermLabel(survey) {
        const q = survey.getQuestionByName("onto_search_result");
        if (!q) return "";
        const item = q.selectedItem;
        if (!item) return q.value ?? "";
        return item.text ?? item.title ?? q.value;
    }

            
    window.addOntologyRow = function () {
        const sourceType  = survey.getValue("onto_source_type")   ?? "";
        const scope       = survey.getValue("onto_scope")         ?? "";
        const termId      = survey.getValue("onto_search_result") ?? "";
        const sourceLabel = SOURCE_LABELS[sourceType]             ?? sourceType;

        const nameQName  = NAME_QUESTION[sourceType];
        const nameQ      = nameQName ? survey.getQuestionByName(nameQName) : null;
        const fieldName  = nameQ?.value ?? "";

        const searchQ   = survey.getQuestionByName("onto_search_result");
        // selectedItem.label is the custom property set in onChoicesLazyLoad
        // selectedItem.text is the display text — try both
        const selectedItem = searchQ?.selectedItem;
        console.log("selectedItem:", selectedItem);
        const termLabel = selectedItem?.label ?? selectedItem?.text ?? termId;
        const termUri   = selectedItem?.iri   ?? "";

        if (!sourceType)           { alert("Please select a source type.");    return; }
        if (!fieldName)            { alert("Please select a field name.");     return; }
        if (!termId || !termLabel) { alert("Please select an ontology term."); return; }

        const matrix = survey.getQuestionByName("onto_mappings");
        if (!matrix) { console.error("onto_mappings not found"); return; }

        const newRowData = {
            onto_map_source_key:   sourceType,
            onto_map_source_label: sourceLabel,
            onto_map_field_name:   fieldName,
            onto_map_term_label:   termLabel,
            onto_map_term_id:      termId,
            onto_map_ontology:     scope.toUpperCase(),
            onto_map_uri:          termUri
        };

        matrix.value = [...(matrix.value ?? []), newRowData];
        survey.setValue("onto_search_result", null);
    };
    
    survey.onChoicesLazyLoad.add((sender, options) => {
        if (options.question.name !== "onto_search_result") return;

        const filter = options.filter ?? "";
        if (filter.length < 2) { options.setItems([], 0); return; }

        const scope = sender.getValue("onto_scope") ?? "";
        if (!scope) { options.setItems([], 0); return; }

        const url = "https://www.ebi.ac.uk/ols4/api/search"
            + "?q="         + encodeURIComponent(filter)
            + "&ontology="  + scope
            + "&rows=25"
            + "&fieldList=label,obo_id,iri"
            + "&type=class";

        fetch(url)
            .then(r => r.json())
            .then(data => {
                const docs = data?.response?.docs ?? [];
                const items = docs.map(d => ({
                    value: d.obo_id ?? d.label,
                    text:  d.label  ?? d.obo_id,
                    obo_id: d.obo_id ?? "",
                    iri:    d.iri    ?? "",
                    label:  d.label  ?? ""
                }));
                options.setItems(items, data?.response?.numFound ?? 0);
            })
            .catch(() => options.setItems([], 0));
    });   
}

export default SurveyComponent;
