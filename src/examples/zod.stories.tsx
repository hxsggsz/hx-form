import type { Meta, StoryObj } from "@storybook/react";
import Zod from "./zod";

const meta = {
  title: "Examples/Zod",
  component: Zod,
} satisfies Meta<typeof Zod>;

export default meta

type Story = StoryObj<typeof meta>;

export const Example: Story = {};
