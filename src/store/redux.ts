// A simple redux store/actions/reducer implementation.
// A true app would be more complex and separated into different files.
import { createStore } from "redux";

// The actions are the "names" of the changes that can happen to the store
export const actions = {
  ARCHIVE_TASK: "ARCHIVE_TASK",
  PIN_TASK: "PIN_TASK",
  ADD_TASK: "ADD_TASK",
};

// The action creators bundle actions with the data required to execute them
export const archiveTask = (id: string) => ({ type: actions.ARCHIVE_TASK, id });
export const addTask = (title: string) => ({ type: actions.ADD_TASK, title });
export const pinTask = (id: string, state: string) => ({
  type: actions.PIN_TASK,
  id,
  state,
});

// All our reducers simply change the state of a single task.
function taskStateReducer(taskState: string) {
  return (state: { tasks: any[] }, action: { id: string }) => {
    return {
      ...state,
      tasks: state.tasks.map((task: { id: string }) =>
        task.id === action.id ? { ...task, state: taskState } : task
      ),
    };
  };
}

function taskAddStateReducer() {
  return (state: { tasks: any[] }, action: { title: string }) => {
    return {...state, tasks: [...state.tasks, {id: state.tasks.length + 1, title: action.title, state: "TASK_INBOX"}] }
  };
}

// The reducer describes how the contents of the store change for each action
export const reducer = (
  state: any,
  action: { type: string; id: string; state: string; title: string }
) => {
  switch (action.type) {
    case actions.ARCHIVE_TASK:
      return taskStateReducer("TASK_ARCHIVED")(state, action);
    case actions.ADD_TASK:
      return taskAddStateReducer()(state, action);
    case actions.PIN_TASK:
      return action.state === "TASK_PINNED"
        ? taskStateReducer("TASK_INBOX")(state, action)
        : taskStateReducer("TASK_PINNED")(state, action);
    default:
      return state;
  }
};

// The initial state of our store when the app loads.
// Usually you would fetch this from a server
const defaultTasks = [
  { id: "1", title: "Task 1", state: "TASK_INBOX" },
  { id: "2", title: "Task 2", state: "TASK_INBOX" },
  { id: "3", title: "Task 3", state: "TASK_INBOX" },
  { id: "4", title: "Task 4", state: "TASK_INBOX" },
  { id: "5", title: "Something", state: "TASK_INBOX" },
  { id: "6", title: "Something more", state: "TASK_INBOX" },
  { id: "7", title: "Something else", state: "TASK_INBOX" },
  { id: "8", title: "Something again", state: "TASK_INBOX" },
];

// We export the constructed redux store
export default createStore(reducer, { tasks: defaultTasks });
