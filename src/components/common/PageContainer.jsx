const PageContainer = ({ title, children }) => {
  return (
    <div className="max-w-wrap-narrow mx-auto px-[clamp(20px,5vw,64px)] py-16">
      <h1 className="text-d3 text-navy mb-6">
        {title}
      </h1>

      <div className="text-sm md:text-base text-navy/80 leading-relaxed space-y-6">
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
