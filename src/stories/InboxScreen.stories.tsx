import React from "react";
import { Provider } from "react-redux";
import { action } from "@storybook/addon-actions";
import PureInboxScreen from "./../components/InboxScreen";
import * as TaskListStories from "./TaskList.stories";
import { Story } from "@storybook/react/types-6-0";

// A super-simple mock of a redux store
const store = {
  getState: () => {
    return {
      tasks: TaskListStories.Default.args?.tasks,
    };
  },
  subscribe: () => 0,
  dispatch: action("dispatch"),
};

export default {
  component: PureInboxScreen,
  decorators: [
    (story: () => React.ReactNode) => (
      <Provider store={store as any}>{story()}</Provider>
    ),
  ],
  title: "InboxScreen",
};

const Template: Story<{ error: any }> = (args) => (
  <PureInboxScreen {...args} />
);

export const Default = Template.bind({});

export const Error = Template.bind({});
Error.args = {
  error: "Something",
};
