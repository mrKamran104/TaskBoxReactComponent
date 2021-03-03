import { Story } from "@storybook/react/types-6-0";
import React from "react";
import Task, { taskTypes } from "./../components/Task";

export default {
  component: Task,
  title: "Task",
};

export interface TemplateTask extends taskTypes {
  updatedAt?: Date;
}

export interface TemplateTypes {
  task: TemplateTask;
  onArchiveTask?: Function;
  onPinTask?: Function;
}

const Template: Story<TemplateTypes> = (args) => <Task {...args} />;

export const Default = Template.bind({});
Default.args = {
  task: {
    id: "1",
    title: "Test Task",
    state: "TASK_INBOX",
    updatedAt: new Date(2018, 0, 1, 9, 0),
  },
};

export const Pinned = Template.bind({});
Pinned.args = {
  task: {
    ...Default.args.task,
    state: "TASK_PINNED",
  },
};

export const Archived = Template.bind({});
Archived.args = {
  task: {
    ...Default.args.task,
    state: "TASK_ARCHIVED",
  },
};
