export function Footer() {
  return (
    <footer className="mx-auto mt-auto w-full max-w-2xl px-6 pt-24 pb-12">
      <div className="flex flex-col gap-3 border-t border-faint pt-8 text-sm text-muted sm:flex-row sm:items-baseline sm:justify-between">
        <p className="font-serif italic">Bruno Fevereiro</p>
        <div className="flex gap-6">
          <a
            href="https://github.com/BRUNO-FEVE"
            target="_blank"
            rel="noopener noreferrer"
            className="link-slide hover:text-ink"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/bruno-fevereiro"
            target="_blank"
            rel="noopener noreferrer"
            className="link-slide hover:text-ink"
          >
            LinkedIn
          </a>
          <a
            href="mailto:br.fevereiro@icloud.com"
            className="link-slide hover:text-ink"
          >
            Email
          </a>
          <a
            href="https://wa.me/5511957705558"
            target="_blank"
            rel="noopener noreferrer"
            className="link-slide hover:text-ink"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
