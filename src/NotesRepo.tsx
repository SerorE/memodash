import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { ButtonOutline, ButtonPrimary, Dialog } from "@primer/components";

const NotesRepo = ({ events }: { events: any }) => {
  // const { userData, loading } = useSelector(selectUserData);
  // let location = useLocation();

  const [opened, setOpened] = useState(false);

  useEffect(() => {
    console.log(events);

    events.forEach(function (event: any, index: any) {
      console.log(event.start.dateTime.substring(0, 10));
      console.log("summary");
      console.log(event.summary);
      //   console.log(item, index);
    });

    for (var ev in events) {
      console.log("start");
    }
  }, []);

  const createOrSee = () => {
    const rand = Math.floor(Math.random() * 2);
    console.log(rand);
    if (rand == 0) {
      return (
        <ButtonOutline onClick={() => setOpened(true)}>See memo</ButtonOutline>
      );
    } else {
      return <ButtonPrimary>Create memo</ButtonPrimary>;
    }
  };
  return (
    <div className="memos-repo-container">
      {opened && (
        <Dialog isOpen={opened} onDismiss={() => setOpened(false)}>
          <Dialog.Header>
            <i>
              Last modified by <b>Ulysse Sabbagh</b> at 16:31
            </i>
          </Dialog.Header>

          <div className="dialog">
            <h1>Random Event from yesterday</h1>

            <h4>Attendees Present</h4>

            <p>John Lennon, Paul McCartney, Ringo Starr, and George Harrison</p>

            <h4>Meeting summary</h4>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <h4>Key actionables and owners</h4>

            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
              est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
              velit.
            </p>

            <h4></h4>
          </div>
        </Dialog>
      )}

      <h1>Your Memos</h1>
      {events.map((event: any, item: any) => {
        const date = event.start.dateTime.substring(0, 10);
        const name = event.summary;
        return (
          <>
            {item == 0 && <h2>Today</h2>}
            {item == 1 && <h2>Past week</h2>}

            <div className="memo-box">
              <div className="attributes">
                <h3 className="name">{name}</h3>
                <p className="date">{date}</p>
              </div>

              <div className="buttons">
                {createOrSee()}
                <FontAwesomeIcon className="icon" icon={faShare} />
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default NotesRepo;
