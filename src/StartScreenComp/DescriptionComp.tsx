import React from "react";

export default function DescriptionComp() {
  return (
    <div>
      <p className="description">
        Are you in search of the{" "}
        <a href="https://enanomapper.adma.ai/help/#templatewizard" target="enm">
          Template Wizard
        </a>{" "}
        within the{" "}
        <a href="https://enanomapper.adma.ai" target="enm">
          Nanosafety Data Interface
        </a>
        ? Perhaps the existing templates don't quite align with your experiment
        requirements.
        <br />
        Enter the <a href="">Template Designer</a>, a powerful tool that enables
        you to create a 'blueprint' for your data entry template, tailored to
        report experiment results. Once your 'blueprint' is ready, both you and
        fellow researchers can effortlessly generate and download Excel
        templates based on your specifications. The templates generated adhere
        to the{" "}
        <a href="https://enanomapper.adma.ai/fair/" target="enm">
          FAIR
        </a>{" "}
        data principles, including machine readability, and can be can be
        seamlessly converted to formats such as JSON and{" "}
        <a href="https://www.nexusformat.org/" target="_blank">
          NeXus
        </a>
        . The templates can be effortlessly imported into the{" "}
        <a href="https://enanomapper.adma.ai/" target="enm">
          eNanoMapper database
        </a>
        , enhancing the efficiency and interoperability of your research data.
        Elevate your data reporting experience with the{" "}
        <a href="">Template Designer</a> app.
        <br />
      </p>
    </div>
  );
}
