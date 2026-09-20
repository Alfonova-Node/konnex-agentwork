import express from "express";
import { createTask, executeTask, getTask, listTasks, validateTask } from "./store";

const app=express(); app.use(express.json());
app.get("/health",(_req,res)=>res.json({ok:true,service:"konnex-agentwork"}));
app.get("/tasks",(_req,res)=>res.json(listTasks()));
app.post("/tasks",(req,res)=>{const {title,description,workerId,reward}=req.body??{};if(!title||!workerId||typeof reward!=="number")return res.status(400).json({error:"title, workerId and numeric reward are required"});return res.status(201).json(createTask({title,description:description??"",workerId,reward}));});
app.post("/tasks/:id/execute",(req,res)=>{if(!getTask(req.params.id))return res.status(404).json({error:"task not found"});return res.json(executeTask(req.params.id));});
app.post("/tasks/:id/validate",(req,res)=>{if(!getTask(req.params.id))return res.status(404).json({error:"task not found"});return res.json(validateTask(req.params.id));});
app.get("/reputation/:workerId",(req,res)=>{const list=listTasks().filter(t=>t.workerId===req.params.workerId);const completed=list.filter(t=>t.status==="validated").length;res.json({workerId:req.params.workerId,completed,score:Math.min(100,completed*10)});});
const port=Number(process.env.PORT??3000);app.listen(port,()=>console.log(`Konnex AgentWork API listening on :${port}`));