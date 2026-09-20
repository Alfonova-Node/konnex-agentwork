import { randomUUID } from "node:crypto";
import { simulateWork } from "../simulator/worker";
import { validateProof } from "../validator/proof";
export type TaskStatus="created"|"executed"|"validated"|"rejected";
export interface Task{id:string;title:string;description:string;workerId:string;reward:number;status:TaskStatus;proof?:ReturnType<typeof simulateWork>;validation?:ReturnType<typeof validateProof>}
const tasks=new Map<string,Task>();
export function createTask(input:Omit<Task,"id"|"status">):Task{const task={...input,id:randomUUID(),status:"created" as TaskStatus};tasks.set(task.id,task);return task;}
export function getTask(id:string){return tasks.get(id)}
export function listTasks(){return [...tasks.values()]}
export function executeTask(id:string){const task=tasks.get(id);if(!task)return{error:"task not found"};task.proof=simulateWork(task);task.status="executed";return task}
export function validateTask(id:string){const task=tasks.get(id);if(!task)return{error:"task not found"};if(!task.proof)return{error:"task has no proof"};task.validation=validateProof(task,task.proof);task.status=task.validation.valid?"validated":"rejected";return{taskId:task.id,status:task.status,rewardEvent:task.validation.valid?{workerId:task.workerId,amount:task.reward,currency:"KONNEX_PENDING",settlement:"off-chain-demo"}:null,reputationDelta:task.validation.valid?10:-5}}