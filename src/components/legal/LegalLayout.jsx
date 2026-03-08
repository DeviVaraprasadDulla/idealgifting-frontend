import { useEffect, useState } from "react";

const LegalLayout = ({ title, sections }) => {
  const [active, setActive] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;

      sections.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) {
          if (scrollPos >= el.offsetTop) {
            setActive(section.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 grid lg:grid-cols-[250px,1fr] gap-10">
      {/* Sidebar */}
      <aside className="hidden lg:block sticky top-32 h-fit">
        <h3 className="font-semibold text-[#0B1C2D] mb-4">On this page</h3>

        <ul className="space-y-3 text-sm">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`block transition ${
                  active === s.id
                    ? "text-[#0B1C2D] font-semibold"
                    : "text-gray-500 hover:text-[#0B1C2D]"
                }`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Content */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#0B1C2D] mb-6">
          {title}
        </h1>

        <div className="space-y-10 text-gray-700 leading-relaxed">
          {sections.map((s) => (
            <section key={s.id} id={s.id}>
              {s.content}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LegalLayout;
