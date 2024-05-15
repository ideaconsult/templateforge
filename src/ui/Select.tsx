import React, { useEffect, useState } from "react";
import "./Select.css";
import SearchIcon from "@/IconsComponents/SearchIcon";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function Select({ url, name }) {
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState(() => localStorage.getItem("project"));
  const [materials, setMaterials] = useState(null);
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
  if (name === "Project") {
    localStorage.setItem("project", project);
  }
  const storedProject = localStorage.getItem("project");

  return (
    <section>
      <div className="projectName">
        <span className="projectLabel">{name}:</span>
        <span>
          {name === "Materials" && materials}
          {name === "Project" && storedProject}
        </span>
      </div>
      <div onClick={() => setOpen(!open)} className="selectBtn">
        <SearchIcon />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Search for the ${name}`}
        />
      </div>

      {open && (
        <div className="selectOptions">
          {filtered &&
            filtered.map((item) => (
              <p
                key={item.id}
                onClick={() => {
                  if (name === "Project") {
                    setProject(item.name);
                  }
                  if (name === "Materials") {
                    setMaterials(item.name);
                  }
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
