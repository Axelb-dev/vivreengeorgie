# Security

This is a static site. No server-side form, credentials, analytics script or third-party runtime is included. Contact fields are encoded into a fixed WhatsApp URL only on submit; no automatic message is sent. External tabs use noopener/noreferrer; the document uses no-referrer.

HTML pages enforce a meta Content Security Policy: scripts, styles, images and network requests are local, objects/frames/workers and native form submission are blocked. The translation renderer permits only br/em formatting and treats other markup as text. Contact notes are bounded to1200 characters.

GitHub Pages serves main at its root with HTTPS enforcement enabled (checked before release). _config.yml excludes tests and internal review documents from publication. Source control must never contain tokens or .env secrets.

GitHub Pages response headers are hosting-controlled. Meta CSP cannot enforce frame-ancestors, and no ineffective meta X-Frame-Options is added. Server-level CSP frame-ancestors, Permissions-Policy and other custom headers would require a hosting/proxy configuration that supports them. Reference: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors

Validation: tests/security.cjs exercises injection rejection, blocked inline scripts and external fetch, plus encoded WhatsApp payload without sending. This is application hardening, not a guarantee against all attacks or an audit of GitHub/WhatsApp.
