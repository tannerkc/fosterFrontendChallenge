import './App.css';
import React, { useState } from 'react';
import InputWithMentions from './components/InputWithMentions';
import Comments from './components/Comments';
import { appContext } from './contextProvider'

function App() {
  function uuidv4() {
    return 'xxxyxxxx9xxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(14);
    });
  }

  const usersData = [
    {
      name: "Dennis Ritchie",
      username: "dRitchie",
      avatar: "https://i.pravatar.cc/30"
    },
    {
      name: "Tanner Cottle",
      username: "fosterNewHire",
      avatar: "https://i.pravatar.cc/30"
    },
    {
      name: "Stew Fortier",
      username: "bossMan",
      avatar: "https://i.pravatar.cc/30"
    },
    {
      name: "Foster User",
      username: "fosterUser",
      avatar: "https://i.pravatar.cc/30"
    },
  ]

  const commentsData = [
    {
      username: "dRitchie",
      roomId: 1243,
      content: 'Hello world!',
      date: '2/22/1978  2:21PM',
      uuid: uuidv4()
    },
    {
      username: "fosterNewHire",
      roomId: 123,
      content: '<span class="inputMention">@bossMan</span> Glad to be hear!',
      date: '7/23/2021 3:21PM',
      uuid: uuidv4()
    },
    {
      username: "bossMan",
      roomId: 123,
      content: '<span class="inputMention">@fosterNewHire</span> Welcome to the team!',
      date: '7/23/2021 3:09PM',
      uuid: uuidv4()
    },
  ]

  const [users, setUsers] = useState(usersData)
  const [comments, setComments] = useState(commentsData)

  return (
    <appContext.Provider value={{users, setUsers,comments, setComments}}>
      <div className="App">
        <Comments room={123} />
        <InputWithMentions data={users} />    
      </div>
    </appContext.Provider>
  );
}

export default App;
