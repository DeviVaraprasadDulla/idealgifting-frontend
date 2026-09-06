import Button from "../../components/ui/Button";

const SERVICES = ["Custom trophies", "Employee recognition", "Event awards", "Bulk orders"];

function CorporatePromo() {
  return (
    <section className="py-[clamp(56px,7.5vw,110px)]">
      <div className="max-w-wrap mx-auto px-[clamp(20px,5vw,64px)]">
        <div data-world="corporate" className="bg-world-soft rounded-rxl p-[clamp(26px,4vw,58px)]">
          <span className="inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-world-deep">
            Ideal Gifting for teams
          </span>
          <h2 className="text-d2 text-navy mt-3 max-w-lg">Recognition, made personal.</h2>
          <p className="text-muted mt-3 max-w-md">
            From milestone celebrations to awards and employee recognition, we turn your
            appreciation into keepsakes people keep on the desk.
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            {SERVICES.map((s) => (
              <span key={s} className="bg-paper px-4 py-2 rounded-full text-sm text-navy shadow-card">
                {s}
              </span>
            ))}
          </div>

          <div className="mt-8">
            <Button to="/corporate" variant="world">
              Plan your corporate gifting →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CorporatePromo;
