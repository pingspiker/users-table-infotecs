import React, { useEffect, useRef, useState } from "react";

const columns = [
  { key: "lastName", label: "Фамилия", sortable: true, sortKey: "fio" },
  { key: "firstName", label: "Имя", sortable: true, sortKey: "fio" },
  { key: "maidenName", label: "Отчество", sortable: true, sortKey: "fio" },
  { key: "age", label: "Возраст", sortable: true, sortKey: "age" },
  { key: "gender", label: "Пол", sortable: true, sortKey: "gender" },
  { key: "phone", label: "Телефон", sortable: true, sortKey: "phone" },
  { key: "email", label: "Email" },
  { key: "country", label: "Страна" },
  { key: "city", label: "Город" },
];

const defaultWidths = {
  lastName: 140,
  firstName: 120,
  maidenName: 140,
  age: 80,
  gender: 90,
  phone: 160,
  email: 220,
  country: 140,
  city: 140,
};

function Table({ users, onSort, sortConfig, onRowClick }) {
  const [widths, setWidths] = useState(defaultWidths);
  const resizeRef = useRef({
    active: false,
    key: "",
    startX: 0,
    startWidth: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!resizeRef.current.active) {
        return;
      }
      const delta = event.clientX - resizeRef.current.startX;
      const nextWidth = Math.max(50, resizeRef.current.startWidth + delta);
      setWidths((prev) => ({
        ...prev,
        [resizeRef.current.key]: nextWidth,
      }));
    };

    const handleMouseUp = () => {
      resizeRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const startResize = (event, key) => {
    resizeRef.current = {
      active: true,
      key,
      startX: event.clientX,
      startWidth: widths[key],
    };
  };

  const getSortMark = (sortKey) => {
    if (sortConfig.key !== sortKey || sortConfig.direction === "none") {
      return "";
    }
    if (sortConfig.direction === "asc") {
      return " ▲";
    }
    return " ▼";
  };

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                style={{ width: widths[column.key] }}
                onClick={column.sortable ? () => onSort(column.sortKey) : undefined}
                className={column.sortable ? "sortable" : ""}
              >
                {column.label}
                {column.sortable ? getSortMark(column.sortKey) : ""}
                <div
                  className="resizer"
                  onMouseDown={(e) => startResize(e, column.key)}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} onClick={() => onRowClick(user)}>
              <td style={{ width: widths.lastName }}>{user.lastName}</td>
              <td style={{ width: widths.firstName }}>{user.firstName}</td>
              <td style={{ width: widths.maidenName }}>{user.maidenName || ""}</td>
              <td style={{ width: widths.age }}>{user.age}</td>
              <td style={{ width: widths.gender }}>{user.gender}</td>
              <td style={{ width: widths.phone }}>{user.phone}</td>
              <td style={{ width: widths.email }}>{user.email}</td>
              <td style={{ width: widths.country }}>{user.address?.country}</td>
              <td style={{ width: widths.city }}>{user.address?.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
