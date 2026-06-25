import { ClassDetailProps } from "@/lib/props";
import { Button } from "@/components/_ui/Button";
import { Select } from "@/components/_ui/Select";
interface PublicClassNameListProps {
  classDetailsList: ClassDetailProps[];
  gridView?: boolean;
}

export const PublicClassNameList = ({
  classDetailsList,
  gridView = false }: PublicClassNameListProps) => {

    const classItemContent = (details: ClassDetailProps) => (
      <>
        {details.classInstances.length > 1 ? (
          <div>
            <Select
              label="select-class-day-time"
              options={details.classInstances.map((instance) => `${instance.dayOfTheWeek}: ${instance.startTime} - ${instance.endTime}`)}
              value={`${details.classInstances[0].dayOfTheWeek}: ${details.classInstances[0].startTime} - ${details.classInstances[0].endTime}`}
              onChange={() => {}}
              small
              topBottomMargin={gridView}
            />
          </div>
        ) : (
          <div>
            {details.classInstances[0].dayOfTheWeek}: {details.classInstances[0].startTime} - {details.classInstances[0].endTime}
          </div>
        )}
        <div>
          <Button>
            Add to Cart
          </Button>
        </div>
      </>
    );

  return (
    <div className="class-name-list-container">
      {classDetailsList.length === 0 ? (
        <p>No classes scheduled for this term.</p>
      ) : (
        <div className={gridView ? "class-name-grid" : "class-name-list"}>
          {classDetailsList.map((details, index) => (
            <div key={index} className="class-name-item">
              <strong>{details.class.name}</strong>
              {gridView ? (
                classItemContent(details)
              ) : (
                <div className="class-item-details">
                  {classItemContent(details)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};