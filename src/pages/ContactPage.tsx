import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { contactInfo } from '../data/contact';
import { supabase } from '../lib/supabase';
import { Container, Section, Kicker } from '../components/primitives';

const t = {
  nl: {
    kicker: 'Contact',
    title: 'Vertel me het probleem.',
    lead: 'Een proces dat te veel handwerk kost, een tool die er nog niet is, een merk dat niet opvalt — beschrijf het in een paar zinnen. Ik reageer meestal binnen 24 uur.',
    name: 'Naam',
    namePh: 'Je naam',
    email: 'E-mail',
    emailPh: 'jij@bedrijf.nl',
    subject: 'Onderwerp',
    subjectPh: 'Waar gaat het over?',
    message: 'Bericht',
    messagePh: 'Wat kost je nu tijd, geld of klanten?',
    send: 'Verstuur',
    sending: 'Versturen…',
    successTitle: 'Bericht ontvangen.',
    successBody: 'Ik neem zo snel mogelijk contact met je op.',
    again: 'Nog een bericht sturen',
    error: 'Er ging iets mis. Probeer het opnieuw of mail direct naar',
    direct: 'Liever direct?',
    elsewhere: 'Elders',
  },
  en: {
    kicker: 'Contact',
    title: 'Tell me the problem.',
    lead: 'A process eating up manual work, a tool that doesn’t exist yet, a brand that doesn’t stand out — describe it in a few sentences. I usually reply within 24 hours.',
    name: 'Name',
    namePh: 'Your name',
    email: 'Email',
    emailPh: 'you@company.com',
    subject: 'Subject',
    subjectPh: 'What is it about?',
    message: 'Message',
    messagePh: 'What is costing you time, money or customers right now?',
    send: 'Send',
    sending: 'Sending…',
    successTitle: 'Message received.',
    successBody: 'I’ll get back to you as soon as possible.',
    again: 'Send another message',
    error: 'Something went wrong. Try again or email directly at',
    direct: 'Prefer direct?',
    elsewhere: 'Elsewhere',
  },
};

const inputClass =
  'w-full rounded-md border border-line bg-surface px-4 py-3 text-[15px] text-ink placeholder:text-muted/60 transition-colors duration-200 focus:border-accent focus:outline-none';

const ContactPage: React.FC = () => {
  const { language } = useLanguage();
  const c = t[language];

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const { error: supabaseError } = await supabase.from('contact_messages').insert([
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          created_at: new Date().toISOString(),
        },
      ]);
      if (supabaseError) throw supabaseError;
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Contact form error:', err);
      setError(`${c.error} ${contactInfo.email}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const socials = [
    { label: 'LinkedIn', href: contactInfo.linkedin },
    { label: 'GitHub', href: contactInfo.github },
    { label: 'Instagram', href: contactInfo.instagram || '#' },
  ];

  return (
    <main className="pt-16">
      <Section>
        <Container>
          <Kicker>{c.kicker}</Kicker>
          <h1 className="mt-5 max-w-3xl text-4xl font-extralight tracking-display sm:text-5xl lg:text-6xl">
            {c.title}
          </h1>
          <p className="mt-6 max-w-prose text-[15px] leading-relaxed text-muted">{c.lead}</p>

          <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-12">
            {/* Formulier */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="border-t border-line pt-10">
                  <h2 className="text-2xl font-light tracking-display text-ink">
                    {c.successTitle}
                  </h2>
                  <p className="mt-3 text-[15px] text-muted">{c.successBody}</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
                  >
                    {c.again}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="kicker mb-2 block">
                        {c.name}
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={c.namePh}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="kicker mb-2 block">
                        {c.email}
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={c.emailPh}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="kicker mb-2 block">
                      {c.subject}
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={c.subjectPh}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="kicker mb-2 block">
                      {c.message}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={c.messagePh}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {error && (
                    <p className="border-l-2 border-accent pl-4 text-sm text-muted">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 rounded-md bg-accent px-8 py-3 text-sm font-medium text-[#04110f] transition-transform duration-200 ease-editorial hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? c.sending : `${c.send} →`}
                  </button>
                </form>
              )}
            </div>

            {/* Direct + socials */}
            <aside className="lg:col-span-5">
              <div className="border-t border-line pt-6">
                <Kicker>{c.direct}</Kicker>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="mt-3 block text-lg text-ink underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                  {contactInfo.email}
                </a>
              </div>
              <div className="mt-10 border-t border-line pt-6">
                <Kicker>{c.elsewhere}</Kicker>
                <ul className="mt-3 space-y-2">
                  {socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[15px] text-muted transition-colors hover:text-ink"
                      >
                        {s.label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </main>
  );
};

export default ContactPage;
