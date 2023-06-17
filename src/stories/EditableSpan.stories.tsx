import type {Meta, StoryObj} from '@storybook/react';

import {action} from '@storybook/addon-actions'
import {Story} from '@storybook/blocks';
import {EditableSpan} from '../EditableSpan';

const meta: Meta<typeof EditableSpan> = {
    title: 'TODOLIST/EditableSpan',
    component: EditableSpan,
    tags: ['autodocs'],
    args: {
        value: 'sssssssssssssssssssssss'
    }
}

export default meta;
type Story = StoryObj<typeof EditableSpan>;


export const EditableSpanStory: Story = {

};
