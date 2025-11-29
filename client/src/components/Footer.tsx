export default function Footer() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="container py-6">
        <div className="flex justify-between items-center text-sm text-muted">
          <p>© 2025 CopyTyping. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground/80 transition-colors duration-200">
              Terms
            </a>
            <a href="#" className="hover:text-foreground/80 transition-colors duration-200">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
