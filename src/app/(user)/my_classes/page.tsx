import { isSignedIn } from "@/helpers/isSignedIn";
import { getSession } from "@/lib/get-session";
import { getCurrentRosterDetailsByUserId } from "@/lib/prisma/rosterItem";

const formatDate = (date: string) => new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export default async function MyClassesPage() {
  await isSignedIn();

  const session = await getSession();
  const classes = session?.user
    ? await getCurrentRosterDetailsByUserId(session.user.id)
    : [];

  return (
    <div className="my-classes-page">
      <header className="my-classes-header">
        <p className="eyebrow">Your schedule</p>
        <h1>My classes</h1>
        <p>Classes you are currently signed up for.</p>
      </header>

      {classes.length === 0 ? (
        <section className="my-classes-empty-state">
          <h2>No current classes</h2>
          <p>You are not signed up for any active classes.</p>
        </section>
      ) : (
        <div className="my-classes-list">
          {classes.map(({ rosterEntryId, classDetails }) => {
            if (!classDetails) return null;

            return (
              <article className="my-class-card" key={rosterEntryId}>
                <div className="my-class-heading">
                  <div>
                    <p className="eyebrow">{classDetails.term.name}</p>
                    <h2>{classDetails.class.name}</h2>
                  </div>
                  <span>${classDetails.price.toFixed(2)}</span>
                </div>
                <p className="my-class-description">
                  {classDetails.termSpecificDescription || classDetails.class.description || "Details coming soon."}
                </p>
                <dl className="my-class-meta">
                  <div>
                    <dt>Term</dt>
                    <dd>{formatDate(classDetails.term.startDate)} - {formatDate(classDetails.term.endDate)}</dd>
                  </div>
                  <div>
                    <dt>Schedule</dt>
                    <dd>
                      {classDetails.classInstances.length > 0
                        ? classDetails.classInstances.map((instance) => (
                            <span key={instance.id}>
                              {instance.daysOfTheWeek.join(", ")} {instance.startTime} - {instance.endTime}
                            </span>
                          ))
                        : "Schedule coming soon"}
                    </dd>
                  </div>
                  {classDetails.location && (
                    <div>
                      <dt>Location</dt>
                      <dd>{classDetails.location.name}</dd>
                    </div>
                  )}
                </dl>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}