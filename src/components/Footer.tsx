import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t bg-muted/30 py-12">
    <div className="container grid gap-8 md:grid-cols-4">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-display font-bold">D</div>
          <span className="font-display text-lg font-bold">Dimless <span className="text-primary">IntervoAI</span></span>
        </div>
        <p className="text-sm text-muted-foreground">AI-powered interview practice for students. Build confidence, crack interviews.</p>
      </div>
      <div>
        <h4 className="font-display font-semibold mb-3">Platform</h4>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <Link to="/interview" className="hover:text-foreground transition-colors">AI Interview</Link>
          <Link to="/custom-test" className="hover:text-foreground transition-colors">Custom Tests</Link>
          <Link to="/company-prep" className="hover:text-foreground transition-colors">Company Prep</Link>
          <Link to="/analytics" className="hover:text-foreground transition-colors">Analytics</Link>
        </div>
      </div>
      <div>
        <h4 className="font-display font-semibold mb-3">Resources</h4>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <span>Help Center</span>
          <span>Blog</span>
          <span>Community</span>
        </div>
      </div>
      <div>
        <h4 className="font-display font-semibold mb-3">Legal</h4>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Contact Us</span>
        </div>
      </div>
    </div>
    <div className="container mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
      © 2026 Dimless IntervoAI. All rights reserved.
    </div>
  </footer>
);

export default Footer;
