import { getLiveTermsWithClasses } from "@/lib/prisma/term";

const formatDate = (date: string) => {
  const parsedDate = new Date(`${date}T00:00:00`);
  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatSchedule = (days: string[], startTime: string, endTime: string) =>
  `${days.join(", ")} ${startTime} - ${endTime}`;

export default async function ClassesPage() {
  const terms = await getLiveTermsWithClasses();
  const hasClasses = terms.some((term) => term.classes.length > 0);

  return (
    <div className="classes-page">
      <header className="classes-page-header">
        <p className="eyebrow">Rooster classes</p>
        <h1>Find your next class</h1>
        <p>Explore the classes currently open for registration.</p>
      </header>

      {!hasClasses && (
        <section className="classes-empty-state">
          <h2>New classes are on the way</h2>
          <p>There are no classes available right now. Please check back soon.</p>
        </section>
      )}

      {terms.map((term) => (
        term.classes.length > 0 && (
          <section className="class-term" key={term.id}>
            <div className="class-term-header">
              <div>
                <p className="eyebrow">Upcoming term</p>
                <h2>{term.name}</h2>
                <p className="term-dates">
                  {formatDate(term.startDate)} - {formatDate(term.endDate)}
                  {term.weeks ? ` · ${term.weeks} weeks` : ""}
                </p>
              </div>
              {term.description && <p className="term-description">{term.description}</p>}
            </div>

            <div className="class-list">
              {term.classes.map((classOffering) => (
                <article className="public-class-card" key={classOffering.id}>
                  <div className="public-class-card-heading">
                    <h3>{classOffering.class.name}</h3>
                    <span className="class-price">${classOffering.price.toFixed(2)}</span>
                  </div>
                  <p className="class-description">
                    {classOffering.termSpecificDescription || classOffering.class.description || "Details coming soon."}
                  </p>
                  <dl className="class-meta">
                    <div>
                      <dt>Schedule</dt>
                      <dd>
                        {classOffering.classInstances.length > 0
                          ? classOffering.classInstances.map((instance) => (
                              <span key={`${instance.startTime}-${instance.endTime}-${instance.daysOfTheWeek.join("-")}`}>
                                {formatSchedule(instance.daysOfTheWeek, instance.startTime, instance.endTime)}
                              </span>
                            ))
                          : "Schedule coming soon"}
                      </dd>
                    </div>
                    <div>
                      <dt>Capacity</dt>
                      <dd>{classOffering.capacity} spots</dd>
                    </div>
                    {classOffering.location && (
                      <div>
                        <dt>Location</dt>
                        <dd>{classOffering.location.name}</dd>
                      </div>
                    )}
                  </dl>
                </article>
              ))}
            </div>
          </section>
        )
      ))}
    </div>
  );
}