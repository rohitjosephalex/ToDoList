async function getTasks() {
  return await fetch('http://localhost:8080/api/task/alltask')
    .then(response => {
      if (!response.ok) {
        throw new Error("Request failed.");
      }
      response.json().then(function (result) {
        console.log(result)
        let tasks = result;
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = "";
        tasks.forEach(function (tasks) {
          const listItem = document.createElement("li");
          listItem.innerHTML ="<p>"+ tasks.No + ". " + tasks.event + " (" + tasks.priority + ")" + tasks.status+`<button id='completeButton' onclick='updateStatus("completetask","${tasks.id}")' >Complete</button>   <button id='cancelButton' onclick='updateStatus("canceltask","${tasks.id}")' >Cancel</button>     <button id='deleteButton' onclick='updateStatus("deletetask","${tasks.id}")' >Delete</button>`+"</p>" ;
  
          taskList.appendChild(listItem);
        });

        // document.getElementById("taskList").innerHTML = list;
      })


    })
    .catch(error => {
      console.log("Error:", error);
    });
}
getTasks()

async function updateStatus(status,id){
  console.log(status,id)

  var task={
    "id":id
  }
  return await fetch(`http://localhost:8080/api/task/${status}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Request failed.");
    }
    response.json().then(function (result) {
      alert("Reload for new list")
      console.log(result);
})})
.catch(error => {
  console.log("Error:", error);
});
}

// Function to make a POST request to add a new task
document.getElementById("taskForm").addEventListener("submit", function (e) {
  e.preventDefault();
  // console.log("add task")
  var task = document.getElementById("taskForm").elements[0].value;
  var priority = document.getElementById("taskForm").elements[1].value;
  var x = { task, priority }
  return fetch('http://localhost:8080/api/task/newtask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(x)
  })
    .then(response => {
      if (!response.ok) {
        console.log(response.data)
        throw new Error("Request failed.");
      }
      resetForm();
      alert("Reload for new list")
      return response.json();
    })
    .catch(error => {
      console.error("Error:", error);
    });
});


// Function to reset form
function resetForm() {
  document.getElementById("taskInput").value = "";
  document.getElementById("priorityInput").value = "";
}

// Function to make a PUT request to update a task
function updateTask(taskId, task) {
  return fetch(`https://api.example.com/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Request failed.");
      }
      return response.json();
    })
    .catch(error => {
      console.error("Error:", error);
    });
}






function individualTask(taskStatus,listName) {
  // console.log(taskStatus,listName)
  return fetch(`http://localhost:8080/api/task/${taskStatus}`, {
    method: 'GET'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Request failed.");
      }
      response.json().then(function (result) {
        // console.log(result)
        let tasks = result;
        var eachList = document.getElementById(`${listName}`);
        eachList.innerHTML = "";
        var i=1;
        tasks.forEach(function (tasks) {
          const listItem = document.createElement("li");
          listItem.innerHTML ="<p>"+ i + ". " + tasks.task + " (" + tasks.priority + ")"+"</p>";
          i++;
          eachList.appendChild(listItem);
        });

      })
    })
    .catch(error => {
      console.error("Error:", error);
    });
}
// individualTask("ongoingtask")

async function taskReport() {
  return await fetch('http://localhost:8080/api/task/count')
    .then(response => {
      if (!response.ok) {
        throw new Error("Request failed.");
      }
      response.json().then(function (result) {
        // console.log(result)
        let tasks = result;
       
        const ongoingReport = document.getElementById("ongoingReport");
        ongoingReport.innerHTML = "<p>Pending Tasks: " + tasks.pendingTasks+"</p>" ;
        individualTask("ongoingtask","ongoingList");
      
        const completedReport = document.getElementById("completedReport");
        completedReport.innerHTML = "<p>completed Tasks: " + tasks.completedTasks+"</p>" ;
        individualTask("completedtask","completedList");

        const cancelledReport = document.getElementById("cancelledReport");
        cancelledReport.innerHTML = "<p>canceled Tasks: " + tasks.canceledTasks+"</p>" ;
        individualTask("cancelledtask","cancelledList");

        const deletedReport = document.getElementById("deletedReport")
        deletedReport.innerHTML = "<p>Deleted Tasks: " + tasks.deletedTasks+"</p>" ;
        //   +
        //   "<p>Canceled Tasks: " + tasks.canceledTasks + "</p>" +
        //   "<p>Deleted Tasks: " + tasks.deletedTasks + "</p>" +
        //   "<p>Completed Tasks: " + tasks.completedTasks + "</p>";
        // document.getElementById("taskList").innerHTML = list;
      })


    })
    .catch(error => {
      console.log("Error:", error);
    });
}
taskReport()

