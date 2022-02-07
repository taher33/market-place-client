import { HiOutlineDotsHorizontal } from "react-icons/hi";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import styles from "../styles/chatpeople.module.scss";
import { ChatUser, Thread } from "../utils/types";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  threads: Thread[];
  setSelectedThread: React.Dispatch<React.SetStateAction<Thread | undefined>>;
  thread_id: string | null;
}
export function ChatPeople({
  thread_id,
  setShow,
  threads,
  setSelectedThread,
}: Props) {
  return (
    <div onClick={() => setShow(false)} className={styles.container}>
      <div onClick={(e) => e.stopPropagation()} className={styles.sidebar}>
        {threads?.map((thread) => {
          return (
            <User
              thread_id={thread_id}
              setShow={setShow}
              key={thread._id}
              setSelectedThread={setSelectedThread}
              thread={thread}
            />
          );
        })}
      </div>
    </div>
  );
}

interface UserProps {
  setSelectedThread: React.Dispatch<React.SetStateAction<Thread | undefined>>;
  thread: Thread;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
  thread_id: string | null;
}

export function User({
  setShow,
  setSelectedThread,
  thread,
  thread_id,
}: UserProps): JSX.Element {
  return (
    <Link key={thread._id} to={"/chat?id=" + thread._id}>
      <div
        onClick={() => {
          setSelectedThread(thread);
          setShow!(false);
        }}
        className={`${styles.user} ${
          thread._id === thread_id ? styles.selected : null
        }`}
      >
        <img src={thread.client.profileImg} alt="thread" />
        <div className={thread.connected ? styles.connectedUser : ""}>
          <h5>{thread.client.name}</h5>
        </div>
        <HiOutlineDotsHorizontal />
      </div>
    </Link>
  );
}
