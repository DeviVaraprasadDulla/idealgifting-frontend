const PageContainer = ({ title, children }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-[#0B1C2D] mb-6">
        {title}
      </h1>

      <div className="text-sm md:text-base text-gray-700 leading-relaxed space-y-6">
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
