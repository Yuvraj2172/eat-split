import { React, useState } from "react";

import "./index.css";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

const App = () => {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);

  const handleShowAddFriend = () => {
    setShowAddFriend(!showAddFriend);
  };
  const handleAddFriend = (friend) => {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  };
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList friends={friends} />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
};

export default App;

const FriendList = ({ friends }) => {
  return (
    <ul>
      {friends.map((friend) => {
        return <Friend key={friend.id} friend={friend} />;
      })}
    </ul>
  );
};

const Friend = ({ friend }) => {
  return (
    <li key={friend.id}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}rs
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}rs
        </p>
      )}
      {friend.balance == 0 && <p>You and {friend.name} are even</p>}
      <Button>Select</Button>
    </li>
  );
};
const Button = ({ children, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};
const FormAddFriend = ({ onAddFriend }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID;
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    setName("");
    setImage("https://i.pravatar.cc/48?u=499476");
    onAddFriend(newFriend);
  };
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👯🧑‍🤝‍🧑 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <label>🖼️ Image Url </label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
};

const FormSplitBill = () => {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>
      <label htmlFor="">💰Bill Value</label>
      <input type="text" />
      <label htmlFor="">👨🏻‍🦱Your Expenses</label>
      <input type="text" />
      <label htmlFor="">🧑‍🤝‍🧑X's Expense</label>
      <input type="text" disabled />
      <label htmlFor="">🤑Whos is paying the bill ? </label>
      <select name="" id="">
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
};
