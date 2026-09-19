import { mySocials } from "../constants";

const Footer = () => {
  return (
    <section className="flex flex-wrap items-center justify-between gap-5 pb-3 text-sm text-neutral-400 c-space">
      <div className="flex flex-wrap items-center gap-3">
        {mySocials.map((social) => (
          <a
            href={social.href || undefined}
            key={social.name}
            aria-label={social.name}
            className="transition-opacity hover:opacity-70"
          >
            <img src={social.icon} className="h-5 w-5" alt={social.name} />
          </a>
        ))}

        <a
          href="mailto:mahsasamie894@gmail.com"
          aria-label="Email Mahsa"
          className="flex items-center gap-2 transition-opacity hover:opacity-70"
        >
          <img src="/assets/email.svg" className="h-5 w-5" alt="Email" />
          <span>mahsasamie894@gmail.com</span>
        </a>

        <a
          href="tel:+989964002962"
          aria-label="Call Mahsa"
          className="flex items-center gap-2 transition-opacity hover:opacity-70"
          dir="ltr"
        >
          <img src="/assets/phone.svg" className="h-5 w-5" alt="Phone" />
          <span>09964002962</span>
        </a>
      </div>
    </section>
  );
};

export default Footer