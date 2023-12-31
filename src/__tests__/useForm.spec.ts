import { act, renderHook } from "@testing-library/react";
import { useForm } from "./../useForm";
import { z } from "zod";

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
        } as unknown as React.FormEvent<HTMLInputElement>
        const { result } = renderHook(() =>
          useForm({ defaultValues, handleSubmit: () => { } })
        );

        act(() => result.current.handleChange(mockEventValue))

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
        } as unknown as React.FormEvent<HTMLInputElement>
        const { result } = renderHook(() =>
          useForm({ defaultValues, handleSubmit: () => { } })
        );

        act(() => result.current.handleChange(mockEventValue))

        expect(result.current.inputs.test).toBe("")
        expect(result.current.errors).toBeNull();
      });
    });

    describe('when submit', () => {
      it('calls the submit function parameter', async () => {
        const defaultValues = {
          test: "",
        };

        const sumbmitEventMock = {
          preventDefault: vi.fn()
        } as unknown as React.FormEvent<HTMLFormElement>

        const submitMock = vi.fn()

        const { result } = renderHook(() =>
          useForm({
            defaultValues, handleSubmit: submitMock
          })
        );

        act(() => result.current.onSubmit(sumbmitEventMock))

        expect(submitMock).toHaveBeenCalled()
        expect(result.current.isSubmitting).toBeFalsy()
      });
    });

    describe('when has validation', () => {
      describe('the validation breaks', () => {
        it('get errors with function validation', () => {
          const defaultValues = {
            test: "submit test",
          };

          const sumbmitEventMock = {
            preventDefault: vi.fn()
          } as unknown as React.FormEvent<HTMLFormElement>

          const submitMock = vi.fn()

          const { result } = renderHook(() =>
            useForm({
              defaultValues, handleSubmit: submitMock, validation: (inputs, errors) => {
                if (inputs.test === 'submit test') {
                  errors.test = 'error message'
                }
              }
            })
          );

          act(() => result.current.onSubmit(sumbmitEventMock))

          expect(result.current.errors).not.toBeNull()
          expect(result.current.errors?.test).toBe('error message')
        })
      });

      describe('zod validation breaks', () => {
        describe('custom message error', () => {
          it('get errors with zod', () => {
            const defaultValues = {
              test: "submit test",
            };

            const sumbmitEventMock = {
              preventDefault: vi.fn()
            } as unknown as React.FormEvent<HTMLFormElement>

            const submitMock = vi.fn()

            const testSchema = z.object({
              test: z.string().max(3, 'custom message error')
            })
            const { result } = renderHook(() =>
              useForm({
                defaultValues, handleSubmit: submitMock, schema: testSchema
              })
            );

            act(() => result.current.onSubmit(sumbmitEventMock))

            expect(result.current.errors).not.toBeNull()
            expect(result.current.errors?.test).toBe('custom message error')
          })
        });

        describe('default message error', () => {
          it('get errors with zod', () => {
            const defaultValues = {
              test: "submit test",
            };

            const sumbmitEventMock = {
              preventDefault: vi.fn()
            } as unknown as React.FormEvent<HTMLFormElement>

            const submitMock = vi.fn()

            const testSchema = z.object({
              test: z.string().max(3)
            })
            const { result } = renderHook(() =>
              useForm({
                defaultValues, handleSubmit: submitMock, schema: testSchema
              })
            );

            act(() => result.current.onSubmit(sumbmitEventMock))

            expect(result.current.errors).not.toBeNull()
            expect(result.current.errors?.test).toBe('String must contain at most 3 character(s)')
          })
        });
      });
    });
  });
});
