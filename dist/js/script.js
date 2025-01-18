 
// Side bar start
const sidebarToggle = document.querySelector('#sidebar-toggle')
sidebarToggle.addEventListener('click', function () {
  document.querySelector('#sidebar').classList.toggle('collapsed')
})
// Side bar end
// calender start
$(document).ready(function () {
  // Initialize the calendar
  $('#calendar').datetimepicker({
    inline: true,
    format: 'L'
  })
})
// calender end
// Graph start

// Plot Statistics Chart
const plotStatisticsCtx = document
  .getElementById('plotStatisticsChart')
  .getContext('2d')
new Chart(plotStatisticsCtx, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Plots Sold',
        data: [120, 190, 300, 500, 200, 300],
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        tension: 0.4,
        fill: true
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  }
})

// Total Revenue Chart
const revenueCtx = document.getElementById('revenueChart').getContext('2d')
new Chart(revenueCtx, {
  type: 'bar',
  data: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Revenue',
        data: [3000, 4000, 3500, 4250],
        backgroundColor: ['#28a745', '#28a745', '#28a745', '#28a745'],
        borderWidth: 1
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    }
  }
})

// Users Online Chart
const usersOnlineCtx = document
  .getElementById('usersOnlineChart')
  .getContext('2d')
new Chart(usersOnlineCtx, {
  type: 'doughnut',
  data: {
    labels: ['Active Users', 'Idle Users'],
    datasets: [
      {
        data: [21, 10],
        backgroundColor: ['#17a2b8', '#e9ecef'],
        borderWidth: 0
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      }
    }
  }
})

//Total Plots Overview
const ctx1 = document.getElementById('totalPlotsChart').getContext('2d')
new Chart(ctx1, {
  type: 'doughnut',
  data: {
    labels: ['Available', 'Sold', 'Under Negotiation'],
    datasets: [
      {
        data: [150, 100, 30],
        backgroundColor: ['#4CAF50', '#FFC107', '#F44336']
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  }
})

// Area Wise Distribution Chart
const ctx3 = document.getElementById('areaChart').getContext('2d')
new Chart(ctx3, {
  type: 'pie',
  data: {
    labels: ['Downtown', 'Suburban', 'Industrial', 'Rural'],
    datasets: [
      {
        data: [40, 25, 20, 15],
        backgroundColor: ['#FF5722', '#9C27B0', '#00BCD4', '#8BC34A']
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  }
})

// Inquiry Chart
const ctx6 = document.getElementById('inquiryChart').getContext('2d')
new Chart(ctx6, {
  type: 'polarArea',
  data: {
    labels: ['New', 'Followed Up', 'Closed'],
    datasets: [
      {
        data: [50, 30, 20],
        backgroundColor: ['#FFC107', '#03A9F4', '#8BC34A']
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  }
})

// Sold Plots Chart
const ctx7 = document.getElementById('soldPlotsChart').getContext('2d')
new Chart(ctx7, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Sold Plots',
        data: [8, 15, 20, 18, 25],
        borderColor: '#673AB7',
        backgroundColor: 'rgba(103, 58, 183, 0.2)',
        fill: true
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  }
})

// Graph end

// Dahsboard Detail Card

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js'
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  limit
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
const tableBody = document.getElementById('tableBody')
const seeAllButton = document.getElementById('seeAllButton')

const currentDate = new Date()
const currentDateString = `${currentDate.getFullYear()}-${(
  currentDate.getMonth() + 1
)
  .toString()
  .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`

// Fetch and display data for the current date, limited to 5 rows
const fetchInitialData = async () => {
  const collectionRef = collection(db, 'contacts')
  const q = query(
    collectionRef,
    where('submittedAt', '==', currentDateString),
    limit(5)
  )

  try {
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const rows = querySnapshot.docs
        .map(doc => {
          const data = doc.data()
          return `
          <tr>
            <td class="text-center">${data.name}</td>
            <td class="text-center">${data.commission}%</td>
            <td class="text-center">${data.purchaseDate}</td>
            <td class="text-center">${data.contactNumber}</td>
          </tr>
        `
        })
        .join('')
      tableBody.innerHTML = rows
    } else {
      tableBody.innerHTML =
        '<tr><td colspan="4" class="text-center text-danger">No data available for today.</td></tr>'
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    tableBody.innerHTML =
      '<tr><td colspan="4" class="text-center text-success">Error loading data.</td></tr>'
  }
}

fetchInitialData()

seeAllButton.addEventListener('click', () => {
  window.location.href = 'data.html'
})

// Dahsboard Detail Card end

