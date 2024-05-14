import React, { useEffect, useState } from "react";
import "./Select.css";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

// async function getTemplateInfo() {
//   // const apiUrl = config.apiUrl;
//   const response = await fetch(`https://enanomapper.adma.ai/api/projects.json`);
//   const data = await response.json();
//   return data;
// }

export default function Select() {
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState(() => localStorage.getItem("project"));
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useSWR(
    `https://enanomapper.adma.ai/api/projects.json`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

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

  const storedProject = localStorage.getItem("project");

  return (
    <section>
      <div className="projectName">
        <span className="projectLabel">Project:</span>
        <span>{storedProject ? storedProject : project}</span>
      </div>
      <div onClick={() => setOpen(!open)} className="selectBtn">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for the project"
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
