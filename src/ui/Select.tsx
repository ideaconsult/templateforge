import React, { useEffect, useState } from "react";
import "./Select.css";
import SearchIcon from "@/IconsComponents/SearchIcon";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function Select({ url }) {
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState(() => localStorage.getItem("project"));
  const [projectID, setProjectID] = useState(() =>
    localStorage.getItem("projectID")
  );
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

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

  localStorage.setItem("project", project);
  localStorage.setItem("projectID", projectID);

  const storedProject = localStorage.getItem("project");

  return (
    <section>
      <div className="projectName">
        <span className="projectLabel">Project:</span>
        <span>{storedProject}</span>
      </div>
      <div onClick={() => setOpen(!open)} className="selectBtn">
        <SearchIcon />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Search for the project`}
        />
      </div>

      {open && (
        <div className="selectOptions">
          {filtered &&
            filtered.map((item) => (
              <p
                key={item.id}
                onClick={() => {
                  setProject(item.name);
                  setProjectID(item.id);
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
