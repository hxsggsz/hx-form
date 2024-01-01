import type { Meta, StoryObj } from "@storybook/react";
import Checkbox from "./checkbox";

const meta = {
  title: "Examples/Checkbox",
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

export default meta

type Story = StoryObj<typeof meta>;

export const Example: Story = {};
