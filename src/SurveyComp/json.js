/* eslint-disable no-mixed-spaces-and-tabs */
export const json = {
  showPreviewBeforeComplete: "showAnsweredQuestions",
  title: "Template Designer",
  description: "Designing data entry templates for eNanoMapper",
  logoPosition: "right",
  pages: [
    {
      name: "page_role",
      elements: [
        {
          type: "text",
          name: "template_name",
          visible: true,
          title: "Template name",
          isRequired: true,
        },
        {
          type: "text",
          name: "template_author",
          visible: true,
          startWithNewLine: true,
          title: "Template Author",
          isRequired: true,
        },
        {
          type: "text",
          name: "template_acknowledgment",
          visible: true,
          startWithNewLine: false,
          title: "Template Acknowledgment",
          isRequired: true,
        },
        {
          startWithNewLine: true,
          type: "checkbox",
          name: "user_role",
          title: "I am a ...",
          choices: [
            {
              value: "role_lab",
              text: " Lab researcher",
            },
            {
              value: "role_datamgr",
              text: "Data manager",
            },
          ],
          minSelectedChoices: 1,
        },
      ],
      title: "Welcome",
      navigationTitle: "Welcome",
      navigationDescription: "Please describe your role",
    },
    {
      name: "page1",
      elements: [
        {
          type: "panel",
          name: "panel_method",
          elements: [
            {
              type: "text",
              name: "METHOD",
              startWithNewLine: false,
              title: "Method",
              isRequired: true,
            },
            {
              type: "comment",
              name: "EXPERIMENT",
              title: "Experiment description",
              isRequired: true,
              requiredIf: "{user_role} contains 'role_lab'",
            },
            {
              type: "matrixdynamic",
              name: "conditions",
              title: "Experimental factors, replicates, controls",
              description:
                "Add one row per each experimental factor (e.g. concentration, time), replicates, controls ... Remove the irrelevant rows.",
              _requiredIf: "{user_role} contains 'role_datamgr'",
              defaultValue: [
                {
                  conditon_name: "Concentration",
                  condition_unit: "mg/mol",
                  condition_type: "c_concentration ",
                },
                {
                  conditon_name: "Time",
                  condition_unit: "h",
                  condition_type: "c_time ",
                },
                {
                  conditon_name: "Replicate",
                  condition_type: "c_replicate ",
                },
              ],
              columns: [
                {
                  name: "conditon_name",
                  title: "Name",
                },
                {
                  name: "condition_unit",
                  title: "Unit",
                },
                {
                  name: "condition_type",
                  title: "Type",
                  cellType: "dropdown",
                  choices: [
                    {
                      value: "c_concentration",
                      text: " Concentration",
                    },
                    {
                      value: "c_time",
                      text: " Time",
                    },
                    {
                      value: "c_replicate",
                      text: " Replicate",
                    },
                    {
                      value: "c_replicate_tech",
                      text: " Technical replicate",
                    },
                    {
                      value: "c_replicate_bio",
                      text: " Biological replicate",
                    },
                    {
                      value: "c_experiment",
                      text: " Experiment",
                    },
                    {
                      value: "c_control_positive",
                      text: " Control (positive)",
                    },
                    {
                      value: "c_control_negative",
                      text: " Control (negative)",
                    },
                    {
                      value: "c_control_interference",
                      text: " Control (interference)",
                    },
                    {
                      value: "c_control_blank",
                      text: " Control (blank)",
                    },
                  ],
                },
              ],

              cellType: "text",
              rowCount: 0,
              confirmDelete: true,
              allowRowsDragAndDrop: true,
            },
          ],
        },
        {
          type: "panel",
          name: "panel_experiment",
          elements: [
            {
              type: "dropdown",
              name: "PROTOCOL_TOP_CATEGORY",
              title: "Study type",
              defaultValue: "P-CHEM",
              isRequired: true,
              choices: [
                {
                  value: "P-CHEM",
                  text: "Physico-chemical characterisation",
                },
                {
                  value: "ECOTOX",
                  text: "Ecotoxicity studies",
                },
                {
                  value: "ENV FATE",
                  text: "Environmental fate",
                },
                {
                  value: "TOX",
                  text: "Toxicity studies",
                },
                {
                  value: "EXPOSURE",
                  text: "Exposure",
                },
              ],
              placeholder: "P-CHEM",
            },
            {
              type: "dropdown",
              name: "PROTOCOL_CATEGORY_CODE",
              startWithNewLine: false,
              title: "Endpoint category",
              requiredIf: "{user_role} contains 'role_datamgr'",
              choices: [
                {
                  value: "GI_GENERAL_INFORM_SECTION",
                  text: "4.1.Appearance",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'P-CHEM'",
                },
                {
                  value: "PC_MELTING_SECTION",
                  text: "4.2.Melting point / freezing point",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'P-CHEM'",
                },
                {
                  value: "PC_BOILING_SECTION",
                  text: "4.3.Boiling point",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'P-CHEM'",
                },
                {
                  value: "PC_DENSITY_SECTION",
                  text: "4.4.Density",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'P-CHEM'",
                },
                {
                  value: "PC_GRANULOMETRY_SECTION",
                  text: "4.5.Particle size distribution (Granulometry)",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'P-CHEM'",
                },
                {
                  value: "PC_VAPOUR_SECTION",
                  text: "4.6.Vapour pressure",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'P-CHEM'",
                },
                {
                  value: "SURFACE_TENSION_SECTION",
                  text: "4.10.Surface tension",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'P-CHEM'",
                },
                {
                  value: "PC_PARTITION_SECTION",
                  text: "4.7.Partition coefficient",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'P-CHEM'",
                },
                {
                  value: "PC_WATER_SOL_SECTION",
                  text: "4.8.Water solubility",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'P-CHEM'",
                },
                {
                  value: "PC_SOL_ORGANIC_SECTION",
                  text: "4.9.Solubility in organic solvents",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'P-CHEM'",
                },
                {
                  value: "PC_NON_SATURATED_PH_SECTION",
                  text: "4.20.pH",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'P-CHEM'",
                },
                {
                  value: "PC_DISSOCIATION_SECTION",
                  text: "4.21.Dissociation constant",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'P-CHEM'",
                },
                {
                  value: "PC_VISCOSITY_SECTION",
                  text: "4.22.Viscosity",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'P-CHEM'",
                },
                {
                  value: "PC_UNKNOWN_SECTION",
                  text: "4.99.Physico chemical properties (other)",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'P-CHEM'",
                },
                {
                  value: "TO_PHOTOTRANS_AIR_SECTION",
                  text: "5.1.1.Phototransformation in Air",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'ENV FATE'",
                },
                {
                  value: "TO_PHOTOTRANS_SOIL_SECTION",
                  text: "5.1.2.Phototransformation in soil",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'ENV FATE'",
                },
                {
                  value: "TO_HYDROLYSIS_SECTION",
                  text: "5.1.2.Hydrolysis",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'ENV FATE'",
                },
                {
                  value: "TO_BIODEG_WATER_SCREEN_SECTION",
                  text: "5.2.1.Biodegradation in water - screening tests",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'ENV FATE'",
                },
                {
                  value: "TO_BIODEG_WATER_SIM_SECTION",
                  text: "5.2.2.Biodegradation in water and sediment: simulation tests",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'ENV FATE'",
                },
                {
                  value: "EN_STABILITY_IN_SOIL_SECTION",
                  text: "5.2.3.Biodegradation in Soil",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'ENV FATE'",
                },
                {
                  value: "EN_BIOACCUMULATION_SECTION",
                  text: "5.3.1.Bioaccumulation: aquatic / sediment",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'ENV FATE'",
                },
                {
                  value: "EN_BIOACCU_TERR_SECTION",
                  text: "5.3.2.Bioaccumulation: terrestrial",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'ENV FATE'",
                },
                {
                  value: "EN_ADSORPTION_SECTION",
                  text: "5.4.1.Adsorption / Desorption",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'ENV FATE'",
                },
                {
                  value: "EN_HENRY_LAW_SECTION",
                  text: "5.4.2.Henry's Law constant",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'ENV FATE'",
                },
                {
                  value: "TO_ACUTE_ORAL_SECTION",
                  text: "7.2.1.Acute toxicity - oral",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'TOX'",
                },
                {
                  value: "TO_ACUTE_INHAL_SECTION",
                  text: "7.2.2.Acute toxicity - inhalation",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'TOX'",
                },
                {
                  value: "TO_ACUTE_DERMAL_SECTION",
                  text: "7.2.3.Acute toxicity - dermal",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'TOX'",
                },
                {
                  value: "TO_SKIN_IRRITATION_SECTION",
                  text: "7.3.1.Skin irritation / Corrosion",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'TOX'",
                },
                {
                  value: "TO_EYE_IRRITATION_SECTION",
                  text: "7.3.2.Eye irritation",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'TOX'",
                },
                {
                  value: "TO_SENSITIZATION_SECTION",
                  text: "7.4.1.Skin sensitisation",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'TOX'",
                },
                {
                  value: "TO_SENSITIZATION_INSILICO_SECTION",
                  text: "7.4.1.Skin sensitisation (in silico)",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'TOX'",
                },
                {
                  value: "TO_SENSITIZATION_INVITRO_SECTION",
                  text: "7.4.1.Skin sensitisation (in vitro)",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'TOX'",
                },
                {
                  value: "TO_SENSITIZATION_INCHEMICO_SECTION",
                  text: "7.4.1.Skin sensitisation (in chemico)",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'TOX'",
                },
                {
                  value: "TO_SENSITIZATION_HUMANDB_SECTION",
                  text: "7.4.1.Skin sensitisation (human)",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'TOX'",
                },
                {
                  value: "TO_SENSITIZATION_LLNA_SECTION",
                  text: "7.4.1.Skin sensitisation (LLNA)",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'TOX'",
                },
                {
                  value: "TO_REPEATED_ORAL_SECTION",
                  text: "7.5.1.Repeated dose toxicity - oral",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'TOX'",
                },
                {
                  value: "TO_REPEATED_INHAL_SECTION",
                  text: "7.5.2.Repeated dose toxicity - inhalation",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'TOX'",
                },
                {
                  value: "TO_REPEATED_DERMAL_SECTION",
                  text: "7.5.3.Repeated dose toxicity - dermal",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'TOX'",
                },
                {
                  value: "TO_GENETIC_IN_VITRO_SECTION",
                  text: "7.6.1.Genetic toxicity in vitro",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'TOX'",
                },
                {
                  value: "TO_GENETIC_IN_VIVO_SECTION",
                  text: "7.6.2.Genetic toxicity in vivo",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'TOX'",
                },
                {
                  value: "TO_CARCINOGENICITY_SECTION",
                  text: "7.7.Carcinogenicity",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'TOX'",
                },
                {
                  value: "TO_REPRODUCTION_SECTION",
                  text: "7.8.1.Toxicity to reproduction",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'TOX'",
                },
                {
                  value: "TO_DEVELOPMENTAL_SECTION",
                  text: "7.8.2.Developmental toxicity / teratogenicity",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'TOX'",
                },
                {
                  value: "EC_FISHTOX_SECTION",
                  text: "6.1.1.Short-term toxicity to fish",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'ECOTOX'",
                },
                {
                  value: "EC_CHRONFISHTOX_SECTION",
                  text: "6.1.2.Long-term toxicity to fish",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'ECOTOX'",
                },
                {
                  value: "EC_DAPHNIATOX_SECTION",
                  text: "6.1.3.Short-term toxicity to aquatic invertebrates",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'ECOTOX'",
                },
                {
                  value: "EC_CHRONDAPHNIATOX_SECTION",
                  text: "6.1.4.Long-term toxicity to aquatic invertebrates",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'ECOTOX'",
                },
                {
                  value: "EC_ALGAETOX_SECTION",
                  text: "6.1.5.Toxicity to aquatic algae and cyanobacteria",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'ECOTOX'",
                },
                {
                  value: "EC_BACTOX_SECTION",
                  text: "6.1.7.Toxicity to microorganisms",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'ECOTOX'",
                },
                {
                  value: "EC_SEDIMENTDWELLINGTOX_SECTION",
                  text: "6.2.Sediment toxicity",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'ECOTOX'",
                },
                {
                  value: "EC_SOILDWELLINGTOX_SECTION",
                  text: "6.3.1.Toxicity to soil macroorganisms",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'ECOTOX'",
                },
                {
                  value: "EC_HONEYBEESTOX_SECTION",
                  text: "6.3.2.Toxicity to terrestrial arthropods",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'ECOTOX'",
                },
                {
                  value: "EC_PLANTTOX_SECTION",
                  text: "6.3.3.Toxicity to terrestrial plants",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'ECOTOX'",
                },
                {
                  value: "EC_SOIL_MICRO_TOX_SECTION",
                  text: "6.3.4.Toxicity to soil microorganisms",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'ECOTOX'",
                },
                {
                  value: "PC_THERMAL_STABILITY_SECTION",
                  text: "4.19.Stability (thermal)",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'P-CHEM'",
                },
                {
                  value: "RADICAL_FORMATION_POTENTIAL_SECTION",
                  text: "4.28.12.Radical formation potential",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'P-CHEM'",
                },
                {
                  value: "AGGLOMERATION_AGGREGATION_SECTION",
                  text: "4.24.Nanomaterial agglomeration/aggregation",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'P-CHEM'",
                },
                {
                  value: "CRYSTALLINE_PHASE_SECTION",
                  text: "4.25.Nanomaterial crystalline phase",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'P-CHEM'",
                },
                {
                  value: "CRYSTALLITE_AND_GRAIN_SIZE_SECTION",
                  text: "4.26.Nanomaterial crystallite and grain size",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'P-CHEM'",
                },
                {
                  value: "ASPECT_RATIO_SHAPE_SECTION",
                  text: "4.27.Nanomaterial aspect ratio/shape",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'P-CHEM'",
                },
                {
                  value: "SPECIFIC_SURFACE_AREA_SECTION",
                  text: "4.28.Nanomaterial specific surface area",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'P-CHEM'",
                },
                {
                  value: "ZETA_POTENTIAL_SECTION",
                  text: "4.29.Nanomaterial zeta potential",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'P-CHEM'",
                },
                {
                  value: "SURFACE_CHEMISTRY_SECTION",
                  text: "4.30.Nanomaterial surface chemistry",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'P-CHEM'",
                },
                {
                  value: "DUSTINESS_SECTION",
                  text: "4.31.Nanomaterial dustiness",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'P-CHEM'",
                },
                {
                  value: "POROSITY_SECTION",
                  text: "4.32.Nanomaterial porosity",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'P-CHEM'",
                },
                {
                  value: "POUR_DENSITY_SECTION",
                  text: "4.33.Nanomaterial pour density",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'P-CHEM'",
                },
                {
                  value: "PHOTOCATALYTIC_ACTIVITY_SECTION",
                  text: "4.34.Nanomaterial photocatalytic activity",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'P-CHEM'",
                },
                {
                  value: "CATALYTIC_ACTIVITY_SECTION",
                  text: "4.36.Nanomaterial catalytic activity",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'P-CHEM'",
                },
                {
                  value: "UNKNOWN_TOXICITY_SECTION",
                  text: "BAO_0002189.Toxicity (other)",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'TOX'",
                },
                {
                  value: "RISKASSESSMENT_SECTION",
                  text: "MESH_D018570.Risk assessment",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'TOX'",
                },
                {
                  value: "SUPPORTING_INFO_SECTION",
                  text: "7.999.9.Supporting information",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'TOX'",
                },
                {
                  value: "TRANSCRIPTOMICS_SECTION",
                  text: "OBI_0000424.Transcriptomics",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'TOX'",
                },
                {
                  value: "PROTEOMICS_SECTION",
                  text: "8.100.Proteomics",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'TOX'",
                },
                {
                  value: "ENM_0000068_SECTION",
                  text: "ENM_0000068.Cell Viability",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'TOX'",
                },
                {
                  value: "ENM_0000037_SECTION",
                  text: "ENM_0000037.Oxidative Stress",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'TOX'",
                },
                {
                  value: "ENM_0000044_SECTION",
                  text: "ENM_0000044.Barrier integrity",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'TOX'",
                },
                {
                  value: "NPO_1339_SECTION",
                  text: "NPO_1339.Immunotoxicity",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'TOX'",
                },
                {
                  value: "IMPURITY_SECTION",
                  text: "_.Elemental composition and chemical purity",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'P-CHEM'",
                },
                {
                  value: "ANALYTICAL_METHODS_SECTION",
                  text: "CHMO_0001075.Analytical Methods",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'P-CHEM'",
                },
                {
                  value: "OMICS_SECTION",
                  text: "_.Omics",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'OMICS'",
                },
                {
                  value: "EXPOSURE_SECTION",
                  text: "3.5.0.Use and exposure information",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'EXPOSURE'",
                },
                {
                  value: "EXPOSURE_MANUFACTURE_SECTION",
                  text: "3.5.1.Use and exposure information. Manufacture",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'EXPOSURE'",
                },
                {
                  value: "EXPOSURE_FORMULATION_REPACKAGING_SECTION",
                  text: "3.5.2.Use and exposure information. Formulation or re-packing",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'EXPOSURE'",
                },
                {
                  value: "EXPOSURE_INDUSTRIAL_SITES_SECTION",
                  text: "3.5.3.Use and exposure information. Uses at industrial sites",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'EXPOSURE'",
                },
                {
                  value: "EXPOSURE_PROFESSIONAL_WORKERS_SECTION",
                  text: "3.5.4.Use and exposure information. Widespread use by industrial workers",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'EXPOSURE'",
                },
                {
                  value: "EXPOSURE_CONSUMER_USE_SECTION",
                  text: "3.5.5.Use and exposure information. Consumer use",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'EXPOSURE'",
                },
                {
                  value: "EXPOSURE_SERVICE_LIFE_SECTION",
                  text: "3.5.6.Use and exposure information. Service Life",
                  visibleIf: "{PROTOCOL_TOP_CATEGORY} = 'EXPOSURE'",
                },
              ],
            },
          ],
          title: "Please select the closest categories for your study",
        },
      ],
      title: "Please describe the experimental method",
      description:
        "You will design a data entry template to report result for the method described",
      navigationTitle: "1. Method",
      navigationDescription: "description",
    },
    {
      name: "page_results",
      elements: [
        {
          type: "panel",
          name: "panel_results",
          elements: [
            {
              type: "comment",
              name: "RESULTS",
              title: "Results description",
              requiredIf: "{user_role} contains 'role_lab'",
            },
            {
              type: "boolean",
              name: "raw_data",
              startWithNewLine: false,
              defaultValue: false,
              title: "Include unprocessed (raw data) in the template ?",
            },
            {
              type: "matrixdynamic",
              name: "raw_data_report",
              visibleIf: "{raw_data} = true",
              title: "Unprocessed (Raw data) reporting",
              description:
                "Please provide information of the parameters reported as unprocessed data (if any) e.g. Absorbance, AU",
              requiredIf:
                "{user_role} contains 'role_datamgr ' and {raw_data} = true",
              showCommentArea: true,
              columns: [
                {
                  name: "raw_endpoint",
                  title: "Name",
                  isRequired: true,
                },
                {
                  name: "raw_aggregate",
                  title: "Mark if mean or median",
                  cellType: "dropdown",
                  isRequired: false,
                  defaultValue: "RAW_DATA",
                  choices: [
                    {
                      value: "RAW_DATA",
                      text: "",
                    },
                    {
                      value: "MEAN",
                      text: "Mean",
                    },
                    {
                      value: "MEDIAN",
                      text: "Median",
                    },
                    {
                      value: "MODE",
                      text: "Mode",
                    },
                  ],
                },
                {
                  name: "raw_unit",
                  title: "Unit",
                },
                {
                  name: "raw_endpoint_uncertainty",
                  title: "Uncertainty",
                  cellType: "dropdown",
                  isRequired: false,
                  choices: [
                    {
                      value: "none",
                      text: "",
                    },
                    {
                      value: "SD",
                      text: "Standard Deviation",
                    },
                  ],
                },
                {
                  name: "raw_type",
                  title: "Type",
                  cellType: "dropdown",
                  isRequired: true,
                  choices: [
                    {
                      value: "value_num",
                      text: " numeric",
                    },
                    {
                      value: "value_spectrum",
                      text: " spectrum",
                    },
                    {
                      value: "value_timeseries",
                      text: " time series",
                    },
                    {
                      value: "value_image",
                      text: " image",
                    },
                    {
                      value: "value_1darray",
                      text: " 1D array",
                    },
                    {
                      value: "value_2darray",
                      text: " 2D array",
                    },
                    {
                      value: "value_file",
                      text: " file",
                    },
                    {
                      value: "value_text",
                      text: " text",
                    },
                  ],
                },
              ],
              detailElements: [
                {
                  type: "checkbox",
                  name: "raw_conditions",
                  title: "Please select the experimental factors ...",
                  choicesFromQuestion: "conditions",
                  minSelectedChoices: 0,
                },
              ],
              detailPanelMode: "underRowSingle",
              cellType: "text",
              rowCount: 1,
              allowRowsDragAndDrop: true,
            },
            {
              type: "matrixdynamic",
              name: "question3",
              title: "Results reporting",
              description:
                "Please provide information of the endpoints or descriptors reported as experimental results. e.g. Cell viability , %",
              requiredIf: "{user_role} contains 'role_datamgr'",
              showCommentArea: true,
              columns: [
                {
                  name: "result_name",
                  title: "Name",
                  isRequired: true,
                },
                {
                  name: "result_aggregate",
                  title: "Mark if mean or median",
                  cellType: "dropdown",
                  isRequired: false,
                  defaultValue: "MEAN",
                  choices: [
                    {
                      value: "",
                      text: "",
                    },
                    {
                      value: "MEAN",
                      text: "Mean",
                    },
                    {
                      value: "MEDIAN",
                      text: "Median",
                    },
                    {
                      value: "MODE",
                      text: "Mode",
                    },
                    {
                      value: "PEAK",
                      text: "Peak",
                    },
                    {
                      value: "D25",
                      text: "D25",
                    },
                    {
                      value: "D90",
                      text: "D90",
                    },
                  ],
                },
                {
                  name: "result_unit",
                  title: "Unit",
                },

                {
                  name: "result_endpoint_uncertainty",
                  title: "Uncertainty",
                  cellType: "dropdown",
                  isRequired: false,
                  defaultValue: "",
                  choices: [
                    {
                      value: "",
                      text: "None",
                    },
                    {
                      value: "SD",
                      text: "Standard Deviation",
                    },
                  ],
                },
                {
                  name: "result_type",
                  title: "Type",
                  cellType: "dropdown",
                  isRequired: true,
                  choices: [
                    {
                      value: "value_num",
                      text: " numeric",
                    },
                    {
                      value: "value_spectrum",
                      text: " spectrum",
                    },
                    {
                      value: "value_timeseries",
                      text: " time series",
                    },
                    {
                      value: "value_image",
                      text: " image",
                    },
                    {
                      value: "value_1darray",
                      text: " 1D array",
                    },
                    {
                      value: "value_2darray",
                      text: " 2D array",
                    },
                    {
                      value: "value_file",
                      text: " file",
                    },
                    {
                      value: "value_text",
                      text: " text",
                    },
                  ],
                },
              ],
              detailElements: [
                {
                  type: "checkbox",
                  name: "results_conditions",
                  title: "Please select the experimental factors ...",
                  choicesFromQuestion: "conditions",
                  minSelectedChoices: 0,
                },
              ],

              detailPanelMode: "underRowSingle",
              cellType: "text",
              rowCount: 1,
              minRowCount: 1,
              confirmDelete: true,
              allowRowsDragAndDrop: true,
            },
          ],
          startWithNewLine: false,
        },
      ],
      title: "2. Results",
      description: "Please describe the results expected from {METHOD}",
    },
    {
      name: "page_methodparams",
      elements: [
        {
          type: "matrixdynamic",
          name: "METADATA_PARAMETERS",
          title: "[{METHOD}] Define method parameters",
          titleLocation: "top",
          isRequired: true,
          showCommentArea: true,
          columns: [
            {
              name: "param_name",
              title: "Param name",
              cellType: "text",
              isRequired: true,
              isUnique: true,
            },
            {
              name: "param_unit",
              title: "Unit",
            },
            {
              name: "param_group",
              title: "Group",
              cellType: "dropdown",
              choices: [
                "INSTRUMENT",
                "ENVIRONMENT",
                "MEDIUM",
                "CELL LINE DETAILS",
                "CULTURE CONDITIONS",
                "MONITORING",
                "CALIBRATION",
                {
                  value: "OTHER_METADATA",
                  text: "OTHER METADATA",
                },
                "RESULT_ANALYSIS",
              ],
            },
            {
              name: "param_type",
              title: "Type",
              cellType: "dropdown",
              choices: [
                {
                  value: "value_num",
                  text: "numeric",
                },
                {
                  value: "value_text",
                  text: "text",
                },
                {
                  value: "value_boolean",
                  text: "yes/no",
                },
              ],
            },
          ],
          detailElements: [
            {
              type: "text",
              name: "param_hint",
              title: "Hint, description",
            },
            {
              type: "text",
              name: "param_subgroup",
              title: "Subgroup (if any)",
            },
          ],
          detailPanelMode: "underRowSingle",
          cellType: "text",
          rowCount: 1,
          minRowCount: 1,
          confirmDelete: true,
          addRowText: "Add parameter",
          detailPanelShowOnAdding: true,
          allowRowsDragAndDrop: true,
        },
      ],
      title: "Method parameters",
      navigationTitle: "3. Method parameters",
      navigationDescription: "Method and instrument parameters",
    },
    {
      name: "page_sampleinfo",
      elements: [
        {
          type: "matrixdynamic",
          name: "METADATA_SAMPLE_INFO",
          title: "[{METHOD}] Samples/Materials description",
          titleLocation: "top",
          isRequired: true,
          showCommentArea: true,
          columns: [
            {
              name: "param_sample_name",
              title: "Param name",
              cellType: "text",
              isRequired: true,
              isUnique: true,
            },
            {
              name: "param_sample_unit",
              title: "Unit",
            },
            {
              name: "param_sample_group",
              title: "Group",
              cellType: "dropdown",
              choices: [
                {
                  value: "ID",
                  text: "Identifier",
                },
                {
                  value: "NAME",
                  text: "Name",
                },
                {
                  value: "CASRN",
                  text: "CAS RN",
                },
                {
                  value: "BATCH",
                  text: "Batch",
                },
                {
                  value: "SUPPLIER",
                  text: "Supplier",
                },
                {
                  value: "SUPPLIER identifier",
                  text: "Supplier identifier",
                },
                {
                  value: "OTHER_METADATA",
                  text: "Other",
                },
              ],
            },
          ],
          detailPanelMode: "underRowSingle",
          cellType: "text",
          rowCount: 1,
          minRowCount: 1,
          confirmDelete: true,
          addRowText: "Add parameter",
          detailPanelShowOnAdding: true,
          allowRowsDragAndDrop: true,
        },
      ],
      title: "Sample",
      navigationTitle: "4. Sample",
      navigationDescription: "Sample description",
    },
    {
      name: "page_sampleprep",
      elements: [
        {
          type: "matrixdynamic",
          name: "METADATA_SAMPLE_PREP",
          title: "[{METHOD}] Sample preparation description",
          titleLocation: "top",
          isRequired: true,
          showCommentArea: true,
          columns: [
            {
              name: "param_sampleprep_name",
              title: "Param name",
              cellType: "text",
              isRequired: true,
              isUnique: true,
            },
            {
              name: "param_sampleprep_unit",
              title: "Unit",
            },
            {
              name: "param_sampleprep_group",
              title: "Group",
              cellType: "dropdown",
              choices: [
                {
                  value: "DISPERSION",
                  text: "Dispersion",
                },
                {
                  value: "OTHER_METADATA",
                  text: "Other",
                },
              ],
            },
            {
              name: "param_type",
              title: "Type",
              cellType: "dropdown",
              choices: [
                {
                  value: "value_num",
                  text: "numeric",
                },
                {
                  value: "value_text",
                  text: "text",
                },
                {
                  value: "value_boolean",
                  text: "yes/no",
                },
                {
                  value: "value_date",
                  text: "date",
                },
              ],
            },
          ],
          detailElements: [
            {
              type: "text",
              name: "param_sampleprep_hint",
              title: "Hint, description",
            },
            {
              type: "text",
              name: "param_sampleprep_subgroup",
              title: "Subgroup (if any)",
            },
          ],
          detailPanelMode: "underRowSingle",
          cellType: "text",
          rowCount: 1,
          minRowCount: 1,
          confirmDelete: true,
          addRowText: "Add parameter",
          detailPanelShowOnAdding: true,
          allowRowsDragAndDrop: true,
        },
      ],
      title: "Sample preparation",
      navigationTitle: "5. Sample preparation",
      navigationDescription: "Sample preparation",
    },
    {
      name: "page_preview",
      elements: [
        {
          type: "radiogroup",
          name: "template_status",
          visible: false,
          title: "Template status",
          defaultValue: "DRAFT",
          readonly: false,
          startWithNewLine: true,
          choices: [
            {
              value: "DRAFT",
              text: " Draft",
            },
            {
              value: "FINALIZED",
              text: " Finalized",
            },
          ],
        },
        {
          type: "text",
          name: "template_uuid",
          startWithNewLine: false,
          visible: false,
          readonly: false,
          title: "Internal identifier",
        },
        {
          type: "text",
          name: "parent_uuid",
          startWithNewLine: false,
          visible: false,
          readonly: true,
          title: "Internal identifier of the copied template (if any)",
        },
        {
          type: "checkbox",
          name: "question1",
          choices: [
            {
              value: "agree_to_finalize",
              text: "Message I agree that finalizing  .... (enables the Fnalize button)",
            },
          ],
        },
      ],
      title: "Preview",
      navigationTitle: "Preview",
      navigationDescription: "Preview",
    },
  ],
  showPrevButton: true,
  showQuestionNumbers: "off",
  showTOC: true,
  goNextPageAutomatic: false,
  widthMode: "responsive",
  fitToContainer: true,
  headerView: "advanced",
};
