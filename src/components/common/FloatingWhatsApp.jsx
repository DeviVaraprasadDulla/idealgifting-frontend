/**
 * Exact reproduction of the reference's .wa-float button - same size,
 * position, shadow, hover lift/scale, pulsing .wa-float-ping ring (which
 * respects prefers-reduced-motion via CSS), and the reference's own real
 * WhatsApp icon path. No tooltip - the reference button doesn't have one.
 */
const FloatingWhatsApp = () => {
  return (
    <a
      className="wa-float"
      href="https://wa.me/916305540600"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <span className="wa-float-ping" aria-hidden="true" />
      <svg viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z" />
        <path d="M12.02 2C6.5 2 2.02 6.48 2.02 12c0 1.85.5 3.6 1.36 5.1L2 22l5.05-1.32A9.94 9.94 0 0 0 12.02 22c5.52 0 10-4.48 10-10S17.54 2 12.02 2zm0 18.15c-1.61 0-3.19-.43-4.56-1.25l-.33-.19-3.28.86.88-3.2-.21-.33a8.15 8.15 0 0 1-1.25-4.34c0-4.51 3.67-8.18 8.18-8.18a8.13 8.13 0 0 1 5.79 2.4 8.13 8.13 0 0 1 2.4 5.79c0 4.51-3.67 8.18-8.18 8.18z" />
      </svg>
    </a>
  );
};

export default FloatingWhatsApp;
