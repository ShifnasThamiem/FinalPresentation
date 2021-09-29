//fucntion to return the HTML for individual task

function createTaskHtml (id, name, assignedto, duedate, description, status){
   const html = `  <!-- card one starts -->
  <div class=carditem data-task-id="${id}">
       <!-- bootstrap card code starts -->
       <div class="card" style="width: 100%;">
        <div class="card-header">
          ${name}
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">${assignedto}</li>
          <li class="list-group-item">${duedate}</li>
        </ul>
        <div class="card-body">
           <p class="card-text">${description}</p>
           <h5 class="card-title" >${status}</h5>
           <button type="button" class="done-button btn btn-outline-primary btn-sm
           ">Markasdone</button>
           <button type="button" class="delete-button btn btn-outline-primary btn-sm
           ">Delete</button>
        </div>
      </div>
       <!-- bootstrap card code ends -->
  </div>
    <!-- card one ends -->
  `

  //return HTML from the fucntion
  return html;  // this gives a card with details in html

};








// Create the TaskManager class
class TaskManager {
    constructor(currentId = 0) {
      this.currentId =currentId;
      this.tasks = [];
     
    }

    //getter method to access array value  safely
    // get tasks() {
    //   return this._tasks;
    // }


    addnewTask (taskname, assignedto, duedate, description, status ){

      let newTaskObj = {
        id : this.currentId,
        taskkname: taskname,
        assiggnTo: assignedto,
        dueDdte : duedate,
        descptn : description,
        stus: status
      }
      
     //incrementing id
     this.currentId++;
     

     //pushing the new object to the array-referencing to get method
     this.tasks.push(newTaskObj);
    

    } 

    getTaskById(taskId) {
      
      let foundTask;
      
      for (let i = 0; i < this.tasks.length; i++) {      
        const taskk = this.tasks[i];        
        if (taskk.id === taskId) {          
          foundTask = taskk;
        }
      }
      
      return foundTask;
    }
   

    //to desplay the  html card (task)
    
    render (){
      //creating empty array to hold all the html task
      let todoArray = [];
      let inprogArray = [];
      let reviewArray= [];
      let doneArry = [];


      //creating loop to loop over tasks array (which holds objects)
      for(let i=0; i<this.tasks.length; i++) {
        
        let task = this.tasks[i];

        // Format the date
        console.log(task.dueDdte)
      const date = new Date(task.dueDdte);
      console.log(date);
      const formattedDate =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
        console.log(formattedDate);

        


        // Create the task html to store the html of current task
      let taskHtml = createTaskHtml(
        task.id,
        task.taskkname,
        task.assiggnTo,
        formattedDate,
        task.descptn,
        task.stus,
       
      );

      // Push it to the tasksHtmlList array
      if(task.stus==="To Do"){
        todoArray.push(taskHtml);
        taskHtml = todoArray.join("\n");
      } else if(task.stus==="Review"){
        reviewArray.push(taskHtml);
        reviewArray.join("\n");

      }else if(task.stus==="In Progress"){
        inprogArray.push(taskHtml);
        inprogArray.join("\n");

      }else if(task.stus==="Done"){
        doneArry.push(taskHtml);
        doneArry.join("\n");
}
      }
        let todoflexitem = document.querySelector("#taskstodo");
        let progfelxitem = document.querySelector("#taskinprog");
        let reviewflexitem = document.querySelector("#taskreview");
        let doneflexitem = document.querySelector("#taskdone");

      todoflexitem.innerHTML = todoArray;              
      progfelxitem.innerHTML = inprogArray;            
      reviewflexitem.innerHTML = reviewArray;               
      doneflexitem.innerHTML = doneArry;






      //waved off coding//-------
    // // Create the tasksHtml by joining each item in the tasksHtmlList
    // // with a new line in between each item.
    // let tasksHtml = taskToDoList.join("\n");

    // // Set the inner html of the tasksList on the page
    // document.querySelector("#taskstodo").innerHTML = tasksHtml;

    //  tasksHtml = taskReviewList.join("\n");

    // // Set the inner html of the tasksList on the page
    // document.querySelector("#taskreview").innerHTML = tasksHtml;

    // tasksHtml = taskInProgressList.join("\n");

    // // Set the inner html of the tasksList on the page
    // document.querySelector("#taskinprog").innerHTML = tasksHtml;

    // tasksHtml = taskDoneList.join("\n");

    // // Set the inner html of the tasksList on the page
    // document.querySelector("#taskdone").innerHTML = tasksHtml;



    
      }

      //--task9------------------------------------

      save() {
        // Create a JSON string of the tasks
        const tasksJson = JSON.stringify(this.tasks);
    
        // Store the JSON string in localStorage
        localStorage.setItem("tasks", tasksJson);
    
        // Convert the currentId to a string;
        const currentId = String(this.currentId);
    
        // Store the currentId in localStorage
        localStorage.setItem("currentId", currentId);
      }
      
      load() {
        // Check if any tasks are saved in localStorage
        if (localStorage.getItem("tasks")) {
          // Get the JSON string of tasks in localStorage
          const tasksJson = localStorage.getItem("tasks");
    
          // Convert it to an array and store it in our TaskManager
          this.tasks = JSON.parse(tasksJson);
        }
    
        // Check if the currentId is saved in localStorage
        if (localStorage.getItem("currentId")) {
          // Get the currentId string in localStorage
          const currentId = localStorage.getItem("currentId");
    
          // Convert the currentId to a number and store it in our TaskManager
          this.currentId = Number(currentId);
        }

      }

      deleteTask(taskId) {
        
        const newTasks = [];   
        
        for (let i = 0; i < this.tasks.length; i++) {          
          const task = this.tasks[i];              
          if (task.id !== taskId) {            
            newTasks.push(task);
          }
        }        
        this.tasks = newTasks;
      }

    };


  


//exporting this file to index.js
//module.exports = TaskManager

