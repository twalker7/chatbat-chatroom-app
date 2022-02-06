import React from 'react';
import './App.css';


import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  //configure the firebase app object using this custom object from the site 

  apiKey: "AIzaSyB2mdr218tcjRTKqH9YROVjQyYmbGa4bns",
  authDomain: "chatbat-chatroom.firebaseapp.com",
  projectId: "chatbat-chatroom",
  storageBucket: "chatbat-chatroom.appspot.com",
  messagingSenderId: "931014347027",
  appId: "1:931014347027:web:6f1fd747e08e75d46e32e6",
  measurementId: "G-N9MH9VFHKZ"


});



//we make these firebase SDK's global variables 
const auth = firebase.auth();
const firestore = firebase.firestore();





function App() {
  //user will be an object when signed in null when signed out and it 
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header className="App-header">
       
      </header>

      <section>
        {user ? <ChatRoom/> : <SignIn/>}
      </section>
    </div>
  );
}

function SignIn(){
  const signInWithGoogle= ()=>{
      console.log("signin button worked?");
      
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    
  }

  return(
    <button onClick={signInWithGoogle}> Sign in using Google</button>
  )
}



function ChatRoom(){
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  //react will rerender whenever this data is changed
   const [messages] = useCollectionData(query, {idField: 'id'});

   return(
     <>
     <SignOut/>
        <div>
          {messages && messages.map(m=> <ChatMessage key={m.id} message={m}/>)}
        </div>
     </>
   )
}

function ChatMessage(props){
  const {text, uid} = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  return(
   <p>{text}</p>
  )
}

function SignOut(){
  return auth.currentUser && (

    <button onClick={()=> auth.signOut()}> Sign Out </button>
  )
}
export default App;
