"use client";
import { useState } from "react";

const FORM_NAME = "contact";

// Pattern usable in HTML5 `pattern` attribute (letters, spaces, hyphens, apostrophes).
const NAME_PATTERN = "[A-Za-zÀ-ÖØ-öø-ÿ\\s'\\-]{1,60}";
const NAME_RE = new RegExp(`^${NAME_PATTERN}$`);
// Reasonable email regex (not RFC-perfect; rejects obvious garbage).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_MESSAGE_LENGTH = 20;

// Common throwaway / disposable email domains.
const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "tempmail.com",
  "temp-mail.org",
  "10minutemail.com",
  "guerrillamail.com",
  "throwawaymail.com",
  "yopmail.com",
  "trashmail.com",
  "fakeinbox.com",
  "sharklasers.com",
]);

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
    .join("&");
}

function validate(values: Record<string, string>): string | null {
  const firstName = values.firstName?.trim() ?? "";
  const lastName = values.lastName?.trim() ?? "";
  const email = values.email?.trim() ?? "";
  const message = values.message?.trim() ?? "";

  if (!NAME_RE.test(firstName)) {
    return "Please enter a valid first name (letters only).";
  }
  if (!NAME_RE.test(lastName)) {
    return "Please enter a valid last name (letters only).";
  }
  if (!EMAIL_RE.test(email)) {
    return "Please enter a valid email address.";
  }
  const domain = email.split("@")[1]?.toLowerCase() ?? "";
  if (DISPOSABLE_DOMAINS.has(domain)) {
    return "Please use a permanent email address — disposable inboxes are not accepted.";
  }
  if (message.length < MIN_MESSAGE_LENGTH) {
    return `Please write a more complete message (at least ${MIN_MESSAGE_LENGTH} characters).`;
  }
  if (!/\s/.test(message)) {
    return "Your message looks incomplete — please write in full sentences.";
  }
  return null;
}

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload: Record<string, string> = { "form-name": FORM_NAME };
    formData.forEach((v, k) => { payload[k] = v.toString(); });

    const validationError = validate(payload);
    if (validationError) {
      setError(validationError);
      return;
    }

    setBusy(true);
    try {
      const res = await fetch("/__forms.html", {
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
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            pattern={NAME_PATTERN}
            title="Letters, spaces, hyphens, or apostrophes only."
            maxLength={60}
          />
        </div>
        <div className="field">
          <label htmlFor="lastName">Last name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
            pattern={NAME_PATTERN}
            title="Letters, spaces, hyphens, or apostrophes only."
            maxLength={60}
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          pattern="[^\s@]+@[^\s@]+\.[^\s@]{2,}"
          title="Please enter a valid email address."
          maxLength={120}
        />
      </div>
      <div className="field">
        <label htmlFor="institution">Institution / Organization</label>
        <input id="institution" name="institution" type="text" autoComplete="organization" maxLength={120} />
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
          <input id="country" name="country" type="text" autoComplete="country-name" maxLength={60} />
        </div>
      </div>
      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          required
          minLength={MIN_MESSAGE_LENGTH}
          maxLength={4000}
          title={`Please write at least ${MIN_MESSAGE_LENGTH} characters.`}
        />
      </div>
      <div className="form-foot">
        <p className="form-note">Dr. Stead responds personally to all academic and research inquiries.</p>
        <button type="submit" className="btn btn-submit" disabled={busy}>
          {busy ? "Sending…" : "Send Inquiry"}
        </button>
      </div>
      {error && (
        <div
          className="form-success"
          role="alert"
          style={{ borderLeftColor: "var(--rust)", color: "var(--rust-deep)" }}
        >
          {error}
        </div>
      )}
    </form>
  );
}
