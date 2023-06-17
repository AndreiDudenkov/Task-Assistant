import type {Meta, StoryObj} from '@storybook/react';

import {action} from '@storybook/addon-actions'
import {Story} from '@storybook/blocks';
import {Task} from '../Task';

const meta: Meta<typeof Task> = {
    title: 'TODOLIST/Task',
    component: Task,
    tags: ['autodocs'],
    args: {
        changeTaskStatus: action('Status changed inside Task'),
        changeTaskTitle: action('Title changed inside Task'),
        removeTask: action('Remove Button clicked changed inside Task'),
        task: {id: 'js12-fkf1-f2jg', title: 'JS', isDone: false},
        todolistId: '5gjk-g2hf-de2g'
    }
}

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsNotDoneStory: Story = {};
export const TaskIsDoneStory: Story = {
    args: {
        task: {id: 'css15-fkf1-f2jg', title: 'CSS', isDone: true}
    },
};
