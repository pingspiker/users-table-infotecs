import React, { useEffect, useState } from "react";
import Table from "./components/Table";
import Filters from "./components/Filters";
import Modal from "./components/Modal";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filters, setFilters] = useState({
    name: "",
    age: "",
    gender: "",
    country: "",
  });
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "none",
  });

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("fetch error");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data.users || []);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key !== key || prev.direction === "none") {
        return { key, direction: "asc" };
      }
      if (prev.direction === "asc") {
        return { key, direction: "desc" };
      }
      return { key: "", direction: "none" };
    });
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredUsers = users.filter((user) => {
    const nameMatch = user.firstName
      .toLowerCase()
      .includes(filters.name.toLowerCase());
    const ageMatch = String(user.age).includes(filters.age.trim());
    const genderMatch = filters.gender ? user.gender === filters.gender : true;
    const countryMatch = filters.country
      ? user.address?.country === filters.country
      : true;

    return nameMatch && ageMatch && genderMatch && countryMatch;
  });

  const sortedUsers = [...filteredUsers];
  if (sortConfig.direction !== "none" && sortConfig.key) {
    sortedUsers.sort((a, b) => {
      let left = "";
      let right = "";

      if (sortConfig.key === "fio") {
        left = `${a.lastName} ${a.firstName} ${a.maidenName || ""}`;
        right = `${b.lastName} ${b.firstName} ${b.maidenName || ""}`;
      }
      if (sortConfig.key === "age") {
        left = a.age;
        right = b.age;
      }
      if (sortConfig.key === "gender") {
        left = a.gender;
        right = b.gender;
      }
      if (sortConfig.key === "phone") {
        left = a.phone;
        right = b.phone;
      }

      if (typeof left === "number" && typeof right === "number") {
        return sortConfig.direction === "asc" ? left - right : right - left;
      }

      const result = String(left).localeCompare(String(right));
      return sortConfig.direction === "asc" ? result : -result;
    });
  }

  const countries = [...new Set(users.map((u) => u.address?.country).filter(Boolean))];

  if (loading) {
    return (
      <div className="container">
        <div className="status-text">Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="status-text">Ошибка загрузки данных</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="app">
        <h1>Пользователи</h1>
        <Filters
          filters={filters}
          onFilterChange={handleFilterChange}
          countries={countries}
        />
        <Table
          users={sortedUsers}
          onSort={handleSort}
          sortConfig={sortConfig}
          onRowClick={setSelectedUser}
        />
        {selectedUser && (
          <Modal user={selectedUser} onClose={() => setSelectedUser(null)} />
        )}
      </div>
    </div>
  );
}

export default App;
