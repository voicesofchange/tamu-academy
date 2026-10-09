import React from 'react';

const initialsOf = (name) =>
  String(name)
    .split(/[\s,]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');

/**
 * The two people behind the platform. A photograph is shown when one has been
 * added to the record; otherwise the profile shows a monogram, so no
 * photograph is invented and the layout stays the same either way.
 */
export default function FoundationProfiles({ content, photos }) {
  const people = [
    { name: content.tex_name, role: content.tex_role, bio: content.tex_bio, photo: photos.tex },
    { name: content.hussein_name, role: content.hussein_role, bio: content.hussein_bio, photo: photos.hussein },
  ];

  return (
    <section aria-labelledby="foundation-people-heading" className="academy-people">
      <header className="academy-section-head">
        <h2 id="foundation-people-heading" className="academy-h2 font-heading">
          {content.people_heading}
        </h2>
      </header>
      <ul className="academy-people-grid">
        {people.map((person) => (
          <li key={person.name} className="academy-person">
            <div className="academy-person-photo">
              {person.photo ? (
                <img src={person.photo} alt={`Portrait of ${person.name}`} loading="lazy" />
              ) : (
                <span className="academy-person-initials font-heading" aria-hidden="true">
                  {initialsOf(person.name)}
                </span>
              )}
            </div>
            <h3 className="academy-person-name font-heading">{person.name}</h3>
            <p className="academy-person-role font-body">{person.role}</p>
            <p className="academy-person-bio font-body">{person.bio}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}