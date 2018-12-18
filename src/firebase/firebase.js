import firebase from 'firebase/app';
require('firebase/firestore');

const settings = { timestampsInSnapshots: true };

// Initialize Firebase
var config = {};

firebase.initializeApp(config);

const database = firebase.firestore();

database.settings(settings);

export default database;
