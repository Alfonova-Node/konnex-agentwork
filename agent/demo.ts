import {createTask,executeTask,validateTask} from "../backend/store";
const task=createTask({title:"Inspect warehouse zone A",description:"Simulated inspection task.",workerId:"robot-sim-01",reward:25});
console.log("1. Task created:",task.id);console.log("2. Worker proof:",executeTask(task.id));console.log("3. Validation + reward:",validateTask(task.id));