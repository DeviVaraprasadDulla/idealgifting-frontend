import Button from "../components/ui/Button";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-wrap-narrow text-center">
        <div className="text-5xl mb-4">🧭</div>
        <h1 className="text-d3 text-navy mb-3">
          Oops. This gift took a wrong turn.
        </h1>
        <p className="text-muted mb-8">
          The page you're looking for doesn't exist or may have moved.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button to="/" variant="primary">
            Take me home
          </Button>
          <Button to="/products" variant="ghost">
            Browse gifts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
