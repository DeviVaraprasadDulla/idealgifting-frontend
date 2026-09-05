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
    <div className="max-w-wrap mx-auto px-[clamp(20px,5vw,64px)] py-16 grid lg:grid-cols-[250px,1fr] gap-10">
      {/* Sidebar */}
      <aside className="hidden lg:block sticky top-[112px] h-fit">
        <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold mb-4">
          On this page
        </h3>

        <ul className="space-y-3 text-sm">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`block transition-colors ${
                  active === s.id
                    ? "text-navy font-semibold"
                    : "text-muted hover:text-navy"
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
        <h1 className="text-d3 text-navy mb-6">
          {title}
        </h1>

        <div className="space-y-10 text-navy/80 leading-relaxed">
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
