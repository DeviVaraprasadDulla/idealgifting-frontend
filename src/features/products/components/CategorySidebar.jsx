import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCategories } from "../../../api/categoryApi";

function CategorySidebar() {
  const { categorySlug } = useParams();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories(); // ✅ already response.data
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]); // fallback safety
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-semibold mb-4">Categories</h2>

      <div className="space-y-2">
        <Link
          to="/products"
          className={`block ${!categorySlug ? "font-bold text-blue-600" : ""}`}
        >
          All Products
        </Link>

        {categories?.map((cat) => (
          <Link
            key={cat.id}
            to={`/products/${cat.slug}`}
            className={`block ${
              categorySlug === cat.slug ? "font-bold text-blue-600" : ""
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategorySidebar;
