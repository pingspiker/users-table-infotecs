import React from "react";

function Filters({ filters, onFilterChange, countries }) {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Фильтр по ФИО"
        value={filters.name}
        onChange={(e) => onFilterChange("name", e.target.value)}
      />
      <input
        type="text"
        placeholder="Фильтр по возрасту"
        value={filters.age}
        onChange={(e) => onFilterChange("age", e.target.value)}
      />
      <select
        value={filters.gender}
        onChange={(e) => onFilterChange("gender", e.target.value)}
      >
        <option value="">Пол: все</option>
        <option value="male">male</option>
        <option value="female">female</option>
      </select>
      <select
        value={filters.country}
        onChange={(e) => onFilterChange("country", e.target.value)}
      >
        <option value="">Страна: все</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filters;
