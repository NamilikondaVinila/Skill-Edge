/** Reusable section title block: small eyebrow label, heading and intro text. */
export default function SectionHeading({ eyebrow, title, intro, light = false, align = 'center', id }) {
  return (
    <div className={`section-heading section-heading--${align} ${light ? 'section-heading--light' : ''} reveal`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id}>{title}</h2>
      {intro && <p className="section-heading__intro">{intro}</p>}
    </div>
  );
}
