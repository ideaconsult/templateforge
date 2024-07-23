import React, { useEffect, useState } from "react";
import "./Select.css";
import SearchIcon from "@/IconsComponents/SearchIcon";
import CloseIcon from "@/IconsComponents/CloseIcon";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useSetProjectID } from "../store/store";

export default function Select({ url, setProjectName, projectName }) {
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState(() => localStorage.getItem("project"));
  // const [projectID, setProjectID] = useState(() =>
  //   localStorage.getItem("projectID")
  // );
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const setProjectID = useSetProjectID();

  const { data, isLoading } = useSWR(url, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  useEffect(
    () =>
      setFiltered(
        data &&
          data.filter((item) =>
            item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
          )
      ),
    [search, data]
  );

  const resetProject = () => {
    setProjectName("");
    setProjectID("");
    localStorage.setItem("project", "");
    localStorage.setItem("projectID", "");
    localStorage.clear();
  };

  return (
    <section>
      <div className="projectName">
        {projectName ? (
          <>
            <span className="projectLabel">Project:</span>
            <span>{projectName}</span>

            <div
              id="cleanProject"
              className="closeBtn"
              onClick={() => resetProject()}
            >
              <CloseIcon />
            </div>
          </>
        ) : null}
      </div>
      <div onClick={() => setOpen(!open)} className="selectBtn">
        <SearchIcon />
        <input
          id="projectSearch"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Search for the project`}
        />
      </div>

      {open && (
        <div className="selectOptions" style={{ scrollbarWidth: "thin" }}>
          {filtered &&
            filtered.map((item) => (
              <p
                data-project={item.id}
                className="selectItem"
                key={item.id}
                onClick={() => {
                  localStorage.setItem("project", item.name);
                  localStorage.setItem("projectID", item.id);
                  setProject(item.name);
                  setProjectID(item.id);
                  setProjectName(item.name);
                  setOpen(false);
                }}
              >
                {item.name}
              </p>
            ))}
        </div>
      )}
    </section>
  );
}
