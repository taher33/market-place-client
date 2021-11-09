import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

import styles from "../styles/chatpeople.module.scss";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
const people = [1, 2, 3, 4, 5, 6];
export function ChatPeople({ setShow }: Props) {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  return (
    <div onClick={() => setShow(false)} className={styles.container}>
      <div onClick={(e) => e.stopPropagation()} className={styles.sidebar}>
        <FontAwesomeIcon icon={faTimes} onClick={() => setShow(false)} />
        {people.map((el) => {
          return (
            <User
              setShow={setShow}
              id={el}
              key={el}
              selectedId={selectedUser}
              setSelected={setSelectedUser}
            />
          );
        })}
      </div>
    </div>
  );
}

interface UserProps {
  id: number;
  selectedId: number | null;
  setSelected: React.Dispatch<React.SetStateAction<null | number>>;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function User({
  id,
  setSelected,
  selectedId,
  setShow,
}: UserProps): JSX.Element {
  // const isSelected = id === selectedId;
  return (
    <div
      key={id}
      className={`${styles.user} `}
      onClick={() => {
        setSelected(id);
        setShow!(false);
      }}
    >
      <img src="food.jpg" alt="user" />
      <div>
        <h5>john doe</h5>
        <p>last message</p>
      </div>
    </div>
  );
}
