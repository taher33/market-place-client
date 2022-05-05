import { useState } from "react";
import styles from "../styles/chat.module.scss";
import { Thread } from "../utils/types";
import { trimStrings } from "../utils/useFullFunctions";

interface ThreadProps {
  thread: Thread;
  thread_id: string | null;
  selectedUser: Thread | undefined;
  setSelectedThread: React.Dispatch<React.SetStateAction<Thread | undefined>>;
  connectedUsers: string[] | undefined;
}

function ThreadUi({
  thread,
  setSelectedThread,
  selectedUser,
  connectedUsers,
  thread_id,
}: ThreadProps) {
  const [unreadMessages, setUnreadMessages] = useState(thread.unreadMsg);
  thread.connected = connectedUsers?.includes(thread.client._id);

  //ui
  return (
    <div
      onClick={() => {
        setSelectedThread(thread);
        setUnreadMessages(0);
      }}
      className={`${styles.user} ${
        thread._id === selectedUser?._id ? styles.selected : null
      }`}
    >
      <img
        src={
          thread.productThread
            ? thread.product?.pictures[0]
            : thread.client.profileImg
        }
        alt="user"
      />
      <div className={thread.connected ? styles.connectedUser : ""}>
        <h5>{thread.client.name}</h5>
        <p>
          {trimStrings(
            thread.lastMessage ? thread.lastMessage.content : "",
            20
          )}
        </p>
        {!!unreadMessages && (
          <div className={styles.unread}>
            <span>{unreadMessages}</span>
          </div>
        )}
      </div>
    </div>
  );
}
export default ThreadUi;
