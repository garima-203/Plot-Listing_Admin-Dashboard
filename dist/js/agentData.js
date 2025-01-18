import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js'
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js'

const firebaseConfig = {
  apiKey: 'AIzaSyD5PhVdnXunUw-4ihwJ9OE6dsqaGYBdEBk',
  authDomain: 'real-estate-fecff.firebaseapp.com',
  projectId: 'real-estate-fecff',
  storageBucket: 'real-estate-fecff.appspot.com',
  messagingSenderId: '1058779905381',
  appId: '1:1058779905381:web:1584bee9cacddbfb63b58c',
  measurementId: 'G-99YNWHVJVM'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const dataTable = document.getElementById('dataTable')
const datePicker = document.getElementById('datePicker')

 
const currentDate = new Date()
const currentDateString = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`
datePicker.value = currentDateString

 
const fetchData = async (selectedDate) => {
  dataTable.innerHTML = '<tr><td colspan="5" class="py-6 text-center text-gray-400">Loading...</td></tr>'

  const collectionRef = collection(db, 'contacts')
  const q = query(collectionRef, where('submittedAt', '==', selectedDate))

  try {
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const rows = querySnapshot.docs.map((doc, index) => {
        const data = doc.data()
        return `
          <tr>
            <td class="text-center">${data.name}</td>
            <td class="text-center">${data.commission}</td>
            <td class="text-center">${data.purchaseDate}</td>
            <td class="text-center">${data.contactNumber}</td> 
          </tr>
        `
      }).join('')

      dataTable.innerHTML = rows
    } else {
      dataTable.innerHTML = '<tr><td colspan="5" class="py-6 text-center text-gray-400">No data available for this date.</td></tr>'
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    dataTable.innerHTML = '<tr><td colspan="5" class="py-6 text-center text-red-500">Error loading data.</td></tr>'
  }
}

 
fetchData(currentDateString)

 
datePicker.addEventListener('change', (e) => {
  const selectedDate = e.target.value
  fetchData(selectedDate)
})