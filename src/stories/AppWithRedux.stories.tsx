import type {Meta, StoryObj} from '@storybook/react';
import {Story} from '@storybook/blocks';
import AppWithRedux from '../AppWithRedux';
import {ReduxStoreProviderDecorator} from '../state/ ReduxStoreProviderDecorator';

const meta: Meta<typeof AppWithRedux> = {
    title: 'TODOLIST/AppWithRedux',
    component: AppWithRedux,
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator]
}

export default meta;
type Story = StoryObj<typeof AppWithRedux>;


export const AppWithReduxStory: Story = {

};
