"use client";
import { useState } from "react";

const FORM_NAME = "contact";

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
    .join("&");
}

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload: Record<string, string> = { "form-name": FORM_NAME };
    formData.forEach((v, k) => { payload[k] = v.toString(); });

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(payload),
      });
      if (res.ok) {
        setSent(true);
        form.reset();
      } else {
        setError("Could not send. Email chuckstead@gmail.com directly.");
      }
    } catch {
      setError("Could not send. Email chuckstead@gmail.com directly.");
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div className="form-success" role="status">
        Message received. Dr. Stead will respond personally — typically within a few days.
      </div>
    );
  }

  return (
    <form
      className="form"
      name={FORM_NAME}
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={onSubmit}
    >
      {/* Required hidden field so Netlify identifies the form on submit */}
      <input type="hidden" name="form-name" value={FORM_NAME} />
      {/* Honeypot — real users won't fill this, bots will */}
      <p hidden>
        <label>Don't fill this out: <input name="bot-field" /></label>
      </p>

      <div className="row">
        <div className="field">
          <label htmlFor="firstName">First name</label>
          <input id="firstName" name="firstName" type="text" required autoComplete="given-name" />
        </div>
        <div className="field">
          <label htmlFor="lastName">Last name</label>
          <input id="lastName" name="lastName" type="text" required autoComplete="family-name" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="institution">Institution / Organization</label>
        <input id="institution" name="institution" type="text" autoComplete="organization" />
      </div>
      <div className="row">
        <div className="field">
          <label htmlFor="inquiry">Nature of inquiry</label>
          <select id="inquiry" name="inquiry" required defaultValue="">
            <option value="" disabled>Select…</option>
            <option>Field Trip</option>
            <option>Lecture / Workshop</option>
            <option>Curriculum Development</option>
            <option>Research Collaboration</option>
            <option>Angola / International Partnership</option>
            <option>Media / Interview</option>
            <option>Other</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="country">Country</label>
          <input id="country" name="country" type="text" autoComplete="country-name" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" required />
      </div>
      <div className="form-foot">
        <p className="form-note">Dr. Stead responds personally to all academic and research inquiries.</p>
        <button type="submit" className="btn btn-submit" disabled={busy}>
          {busy ? "Sending…" : "Send Inquiry"}
        </button>
      </div>
      {error && <div className="form-success" style={{ borderLeftColor: "var(--rust)", color: "var(--rust-deep)" }}>{error}</div>}
    </form>
  );
}
