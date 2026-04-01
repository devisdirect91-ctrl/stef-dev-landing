export default function Footer() {
  return (
    <footer
      className="border-t border-border px-6 py-6"
      style={{ backgroundColor: "#050506" }}
    >
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-secondary">
        {/* Left */}
        <span>© 2026 stef-dev.fr</span>

        {/* Center */}
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-text-primary transition-colors duration-200">
            CGV
          </a>
          <a href="#" className="hover:text-text-primary transition-colors duration-200">
            Mentions légales
          </a>
        </div>

        {/* Right */}
        <a
          href="mailto:stefan@stef-dev.fr"
          className="hover:text-text-primary transition-colors duration-200"
        >
          stefan@stef-dev.fr
        </a>
      </div>
    </footer>
  );
}
