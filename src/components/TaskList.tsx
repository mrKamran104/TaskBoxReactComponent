import React, { useState } from "react";
import Task, { taskTypes } from "./Task";
import { connect } from "react-redux";
import { archiveTask, pinTask, addTask } from "../store/redux";

export interface TaskListTypes {
  tasks?: taskTypes[] | any;
  loading?: boolean;
  onArchiveTask?: Function;
  onPinTask?: Function;
  onAddTask?: Function | any;
}

export function PureTaskList({
  loading = false,
  tasks,
  onPinTask,
  onArchiveTask,
  onAddTask,
}: TaskListTypes) {
  const events = {
    onPinTask,
    onArchiveTask,
  };
  
  // const titleRef = useRef();
  const [title, setTitle] = useState("");
  
  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );
  if (loading) {
    return (
      <div className="list-items">
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }
  if (tasks.length === 0) {
    return (
      <div className="list-items">
        <div className="wrapper-message">
          <span className="icon-check" />
          <div className="title-message">You have no tasks</div>
          <div className="subtitle-message">Sit back and relax</div>
        </div>
      </div>
    );
  }
  const tasksInOrder = [
    ...tasks.filter((t: { state: string }) => t.state === "TASK_PINNED"),
    ...tasks.filter((t: { state: string }) => t.state !== "TASK_PINNED"),
  ];

const handleSubmit = (e: { preventDefault: () => void; }) =>{
  e.preventDefault();
  onAddTask(title)
  setTitle("")
}

  return (
    <div>
      <div style={{margin: "10px 0px", textAlign: "center"}}>
        <form onSubmit={handleSubmit}>
          <input type="string" name="title" value={title} onChange={(e)=>setTitle(e.target.value)} style={{ padding: "5px 10px", width: "350px"}} placeholder="Enter task title"/>
          <button type="submit" style={{ padding: "5px 15px" }}>Add Task</button>
        </form>
      </div>
      <div className="list-items">
        {tasksInOrder.map((task) => (
          <Task key={task.id} task={task} {...events} />
        ))}
      </div>
    </div>
  );
}

export default connect(
  ({ tasks }: { tasks: taskTypes[] }) => ({
    tasks: tasks.filter(
      (t: { state: string }) =>
        t.state === "TASK_INBOX" || t.state === "TASK_PINNED"
    ),
  }),
  (dispatch) => ({
    onArchiveTask: (id: string) => dispatch(archiveTask(id)),
    onPinTask: (id: string, state: string) => dispatch(pinTask(id, state)),
    onAddTask: (title: string) => dispatch(addTask(title)),
  })
)(PureTaskList);
