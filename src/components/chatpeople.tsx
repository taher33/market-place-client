import { HiOutlineDotsHorizontal } from "react-icons/hi";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import styles from "../styles/chatpeople.module.scss";
import { ChatUser, Thread } from "../utils/types";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  ChatUsers: Thread[];
}
export function ChatPeople({ setShow, ChatUsers }: Props) {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  return (
    <div onClick={() => setShow(false)} className={styles.container}>
      <div onClick={(e) => e.stopPropagation()} className={styles.sidebar}>
        {ChatUsers.map((user) => {
          return (
            <User
              setShow={setShow}
              key={user._id}
              selectedId={selectedUser}
              setSelected={setSelectedUser}
              user={user.clients[0]}
            />
          );
        })}
      </div>
    </div>
  );
}

interface UserProps {
  selectedId: string | null;
  setSelected: React.Dispatch<React.SetStateAction<null | string>>;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
  user: ChatUser;
}

export function User({
  setSelected,
  selectedId,
  setShow,
  user,
}: UserProps): JSX.Element {
  return (
    <Link key={user._id} to={"/chat?id=" + user._id}>
      <div
        onClick={() => {
          setSelected(user._id);
          setShow!(false);
        }}
        className={`${styles.user} ${
          user._id === selectedId ? styles.selected : null
        }`}
      >
        <img src="food.jpg" alt="user" />
        <div className={user.connected ? styles.connectedUser : ""}>
          <h5>{user.name}</h5>

          {user.notification && <p>notification</p>}
        </div>
        <HiOutlineDotsHorizontal />
      </div>
    </Link>
  );
}
