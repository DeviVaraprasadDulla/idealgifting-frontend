import { useEffect, useState } from "react";
import { getFilters } from "../../../api/productApi";

function FilterSidebar({ subcategoryId, selectedFilters, setSelectedFilters }) {
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    if (subcategoryId) {
      getFilters(subcategoryId).then((res) => {
        setFilters(res.data);
      });
    }
  }, [subcategoryId]);

  const handleChange = (optionId) => {
    if (selectedFilters.includes(optionId)) {
      setSelectedFilters(selectedFilters.filter((id) => id !== optionId));
    } else {
      setSelectedFilters([...selectedFilters, optionId]);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow mt-6">
      <h2 className="font-semibold mb-4">Filters</h2>

      {filters.map((filter) => (
        <div key={filter.filter_id} className="mb-4">
          <h3 className="font-medium mb-2">{filter.filter_name}</h3>

          {filter.options.map((opt) => (
            <label key={opt.id} className="block text-sm">
              <input
                type="checkbox"
                checked={selectedFilters.includes(opt.id)}
                onChange={() => handleChange(opt.id)}
                className="mr-2"
              />
              {opt.value}
            </label>
          ))}
        </div>
      ))}
    </div>
  );
}

export default FilterSidebar;
