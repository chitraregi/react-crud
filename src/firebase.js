import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAllRmJ9XLUUipuIzm2FdRDthCDVfmMn3w",
  authDomain: "react-crud-d333d.firebaseapp.com",
  databaseURL: "https://react-crud-d333d.firebaseio.com",
  projectId: "react-crud-d333d",
  storageBucket: "react-crud-d333d.appspot.com",
  messagingSenderId: "108169852242",
  appId: "1:108169852242:web:bba05a02c819ec73a1b68b",
};

var fireDb = firebase.initializeApp(firebaseConfig);

export default fireDb.database().ref();
