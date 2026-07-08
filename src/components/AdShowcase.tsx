import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { showreel, ShowreelVideo } from '../data/showreel';
import { Container, Section, Kicker, Reveal } from './primitives';

const copy = {
  nl: {
    kicker: 'Reclamevideo’s',
    title: 'Een product zonder video blijft onzichtbaar.',
    sub: 'Ik maak reclamevideo’s met AI — beeld, muziek en montage in één productie. Scroll-stoppend materiaal voor je webshop, socials of ads. In dagen, niet weken.',
    cta: 'Vraag je productvideo aan',
    caseLink: 'Bekijk de case →',
  },
  en: {
    kicker: 'Ad videos',
    title: 'A product without video stays invisible.',
    sub: 'I make ad videos with AI — visuals, music and edit in a single production. Scroll-stopping material for your webshop, socials or ads. In days, not weeks.',
    cta: 'Request your product video',
    caseLink: 'See the case →',
  },
};

/** YouTube-URL → embed-URL. */
function youtubeEmbed(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{6,})/);
  return m ? `https://www.youtube-nocookie.com/embed/${m[1]}?rel=0` : null;
}

const VideoFrame: React.FC<{ video: ShowreelVideo; large?: boolean }> = ({ video, large }) => {
  const embed = video.youtube ? youtubeEmbed(video.youtube) : null;
  return (
    <div
      className="overflow-hidden rounded-lg border border-line bg-surface"
      style={{ aspectRatio: video.ratio || '16/9' }}
    >
      {embed ? (
        <iframe
          src={embed}
          title={video.title || 'Reclamevideo'}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      ) : video.mp4 ? (
        <video
          src={video.mp4}
          poster={video.poster}
          className="h-full w-full object-cover"
          controls
          preload="metadata"
          // De grote video speelt stil mee als sfeer; kleinere starten op klik.
          autoPlay={large}
          muted={large}
          loop={large}
          playsInline
        />
      ) : null}
    </div>
  );
};

const AdShowcase: React.FC = () => {
  const { language } = useLanguage();
  const c = copy[language];
  const [first, ...rest] = showreel;

  return (
    <Section id="reclame" className="border-t border-line bg-surface/40">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Kicker className="text-accent">{c.kicker}</Kicker>
            <h2 className="mt-5 text-3xl font-light tracking-display sm:text-4xl lg:text-[2.75rem] lg:leading-snug">
              {c.title}
            </h2>
            <p className="mt-6 max-w-prose text-[15px] leading-relaxed text-muted">
              {c.sub}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-medium text-[#04110f] transition-transform duration-200 ease-editorial hover:-translate-y-0.5"
              >
                {c.cta} →
              </Link>
              <Link
                to="/projects/reclamevideos"
                className="text-sm text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
              >
                {c.caseLink}
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            {first ? (
              <VideoFrame video={first} large />
            ) : (
              <div
                className="overflow-hidden rounded-lg border border-line"
                style={{ aspectRatio: '16/9' }}
              >
                <img
                  src="/images/cases/reclamevideos.webp"
                  alt="Reclamevideo-productie"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </Reveal>
        </div>

        {rest.length > 0 && (
          <div
            className={`mt-10 grid grid-cols-1 gap-6 ${
              rest.every((v) => v.ratio === '9/16')
                ? 'sm:grid-cols-2 lg:grid-cols-3' // verticale social-ads: rij van drie
                : 'lg:grid-cols-2' // liggende commercials: ruim, max twee naast elkaar
            }`}
          >
            {rest.map((v) => (
              <Reveal key={v.id}>
                <VideoFrame video={v} />
                {v.title && <p className="mt-3 text-sm text-muted">{v.title}</p>}
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
};

export default AdShowcase;
