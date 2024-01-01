import type { Meta, StoryObj } from "@storybook/react";
import Default from "./default";

const meta = {
  title: "Examples/Default",
  component: Default,
} satisfies Meta<typeof Default>;

export default meta

type Story = StoryObj<typeof meta>;

export const Example: Story = {};
