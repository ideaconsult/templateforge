export const json = {
  title: "Template Designer",
  description: "Design your template",
  logoPosition: "right",
  pages: [
    {
      name: "page1",
      elements: [
        {
          type: "panel",
          name: "panel_method",
          elements: [
            {
              type: "dropdown",
              name: "PROTOCOL_TOP_CATEGORY",
              title: "Module",
              defaultValue: "P-CHEM",
              choices: [
                {
                  value: "P-CHEM",
                  text: "Physico-chemical",
                },
                {
                  value: "ECOTOX",
                  text: "Ecotox",
                },
                {
                  value: "ENV FATE",
                  text: "Environmental fate",
                },
                {
                  value: "TOX",
                  text: "Toxicity",
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
            {
              type: "text",
              name: "METHOD",
              startWithNewLine: false,
              title: "Method",
              isRequired: true,
            },
          ],
        },
        {
          type: "checkbox",
          name: "METADATA_CONDITIONS",
          title: "Experiment factors",
          defaultValue: ["METHOD_TIMEPOINTS", "METHOD_CONCENTRATION"],
          choices: [
            {
              value: "METHOD_TIMEPOINTS",
              text: "Treatment timeline",
            },
            {
              value: "METHOD_CONCENTRATION",
              text: "Treatment concentration",
            },
            {
              value: "METHOD_FACTORS",
              text: " More experimental factors to be specified",
            },
          ],
        },
        {
          type: "checkbox",
          name: "DATA_TYPE",
          startWithNewLine: false,
          title: "What data will be reported ?",
          defaultValue: ["DATA_RAW", "DATA_RESULTS"],
          choices: [
            {
              value: "DATA_RAW",
              text: "Raw data",
            },
            {
              value: "DATA_RESULTS",
              text: "Results",
            },
          ],
          choicesOrder: "asc",
          showOtherItem: true,
        },
        {
          type: "panel",
          name: "panel_material",
          elements: [
            {
              type: "checkbox",
              name: "METADATA_MATERIAL",
              title: "Materials",
              defaultValue: ["MATERIAL", "DISPERSION"],
              choices: [
                {
                  value: "MATERIAL",
                  text: "Material details",
                },
                {
                  value: "DISPERSION",
                  text: "Sample preparation - Material dispersion",
                },
                {
                  value: "MATERIALS_MORE",
                  text: " More sample preparation details to be specified",
                },
              ],
            },
            {
              type: "checkbox",
              name: "METADATA_MATERIALSNUMBER",
              startWithNewLine: false,
              title: "Number of materials",
              isRequired: true,
              choices: [
                {
                  value: "ONE ",
                  text: " One material ",
                },
                {
                  value: "MANY ",
                  text: " Multiple materials ",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "page2",
      elements: [
        {
          type: "matrixdynamic",
          name: "METADATA_PARAMETERS",
          title: "Define parameters group",
          valueName: "PARAMETER_GROUP",
          isRequired: true,
          showHeader: false,
          columns: [
            {
              name: "name",
              title: "Parameter group",
              cellType: "text",
              isRequired: true,
            },
          ],
          rowCount: 1,
          minRowCount: 1,
          addRowText: "Add parameter group",
        },
        {
          type: "paneldynamic",
          name: "array_parameter_info",
          startWithNewLine: true,
          titleLocation: "hidden",
          valueName: "PARAMETER_GROUP",
          templateElements: [
            {
              type: "panel",
              name: "panel_parameter_info",
              elements: [
                {
                  type: "matrixdynamic",
                  name: "experiment_parameters",
                  title: "Experiment PARAMETERS",
                  titleLocation: "hidden",
                  columns: [
                    {
                      name: "PARAMETER_NAME",
                      title: "Parameter name",
                      cellType: "text",
                      isRequired: true,
                      isUnique: true,
                    },
                    {
                      name: "UNIT",
                      title: "Unit ",
                      cellType: "text",
                    },
                  ],
                  rowCount: 1,
                  confirmDelete: true,
                  addRowLocation: "bottom",
                  addRowText: "Add parameter",
                  removeRowText: "Remove parameter",
                },
              ],
              questionTitleLocation: "top",
            },
          ],
          templateTitle: "* {panel.name} *",
          allowAddPanel: false,
          allowRemovePanel: false,
          renderMode: "progressTop",
        },
      ],
      title: "Experiment PARAMETERS",
    },
    {
      name: "pagem",
    },
  ],
};
