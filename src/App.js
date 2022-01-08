import React from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

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

}

function ChatRoom(){
  
}
export default App;
