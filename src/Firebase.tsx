import firebase from 'firebase';


const config ={
    
    apikey: "AIzaSyDlehiaFVVfrj-zG-4lKx-icML2TptmHJY",
    databaseURL: "https://appionfriebasetest.firebaseio.com"

};
firebase.initializeApp(config);

export default firebase;