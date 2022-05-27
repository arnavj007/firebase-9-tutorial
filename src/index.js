import { initializeApp } from 'firebase/app'; // ! base firebase import

import { // ! import all firebase modules
	getFirestore, collection, onSnapshot,
	addDoc, deleteDoc, doc,
	query, where
} from 'firebase/firestore';

const firebaseConfig = { // ! firebase config used for initialization
	apiKey: "AIzaSyAenzwec4umdjXzd_pyuFv6HQsXWYvIyww",
	authDomain: "fir-9-tutorial-5df1c.firebaseapp.com",
	projectId: "fir-9-tutorial-5df1c",
	storageBucket: "fir-9-tutorial-5df1c.appspot.com",
	messagingSenderId: "746198913634",
	appId: "1:746198913634:web:05a31314d909f29678773b"
};

// * Initialize Firebase
initializeApp(firebaseConfig); 

// * init services
const db = getFirestore();

// * collection reference
const booksCol = collection(db, 'books');

// * queries - changes snapshot criteria as well as snapshot returned within realtime listener
const q = query(booksCol, where('author', '==', 'jared leto')); // ! pass query instead of collection reference to onSnapshot

// * get collection data
// getDocs(booksCol)
// 	.then(snapshot => { // ! snapshot of the books collection of documents
// 		let books = [];
// 		snapshot.docs.forEach(doc => {
// 			books.push({ ...doc.data(), id: doc.id }); // ! data and id of each document pushed to books array
// 		})
// 		console.log(books);
// 	})
// 	.catch(err => {
// 		console.log(err);
// 	});

// * realtime listener for collection data
onSnapshot(q, snapshot => { // ! real time listener for books collection, similiar to getDocs but not returning a promise
	let books = []; 

	snapshot.docs.forEach(doc => {
		books.push({ ...doc.data(), id: doc.id });
	})

	console.log(books);
})

// adding documents
const addBookForm = document.querySelector('.add'); // ! form reference
addBookForm.addEventListener('submit', e => {
	e.preventDefault();

	const title = addBookForm.title.value;
	const author = addBookForm.author.value;

	addDoc(booksCol, { title, author }) // ! add book to collection
		.then(() => {
			addBookForm.reset();
		})
		.catch(err => {
			console.log(err);
		})
})

// deleting documents
const deleteBookForm = document.querySelector('.delete');
deleteBookForm.addEventListener('submit', e => {
	e.preventDefault();

	const id = deleteBookForm.id.value;
	const docRef = doc(db, 'books', id); // ! reference to document using firestore ref, collection, and id

	deleteDoc(docRef) // ! delete document using document reference
		.then(() => {
			deleteBookForm.reset();
		})
		.catch(err => {
			console.log(err);
		})
})