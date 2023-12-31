import { act, renderHook } from "@testing-library/react";
import { useForm } from "./../useForm";
import { FormEvent } from "react";

describe("useForm", () => {
  describe("when initialize", () => {
    it("renders the defaults values correctly", () => {
      const defaultValues = {
        test: "",
      };
      const { result } = renderHook(() =>
        useForm({ defaultValues, handleSubmit: () => { } })
      );

      expect(result.current.errors).toBeNull();
      expect(result.current.inputs.test).toBe("");
      expect(result.current.isSubmitting).toBeFalsy();
    });
  });

  describe('when changes the input value', () => {
    describe('when name of the input is correct', () => {
      it('updates the value correctly', () => {
        const defaultValues = {
          test: "",
        };

        const mockEventValue = {
          currentTarget: {
            value: "test value",
            name: "test",
          }
        }
        const { result } = renderHook(() =>
          useForm({ defaultValues, handleSubmit: () => { } })
        );

        act(() => result.current.handleChange(mockEventValue as unknown as FormEvent<HTMLInputElement>))

        expect(result.current.inputs.test).toBe("test value")
        expect(result.current.errors).toBeNull();
      });
    });

    describe('when name of the input is wrong', () => {
      it('does not updates the value', () => {
        const defaultValues = {
          test: "",
        };

        const mockEventValue = {
          currentTarget: {
            value: "test value",
            name: "wrong name input",
          }
        }
        const { result } = renderHook(() =>
          useForm({ defaultValues, handleSubmit: () => { } })
        );

        act(() => result.current.handleChange(mockEventValue as unknown as FormEvent<HTMLInputElement>))

        expect(result.current.inputs.test).toBe("")
        expect(result.current.errors).toBeNull();
      });
    });
  });
});
