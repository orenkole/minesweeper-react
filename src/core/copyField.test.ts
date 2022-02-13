import { copyField } from "./copyField";
import { Field, fieldGenerator } from "./Field"


describe("Check copyField", () => {
	it("Object sohuld be different, data the same", () => {
		const prevField = fieldGenerator(9, 0.5) as Field;
		const nextField = copyField(prevField);

		expect(prevField).not.toBe(nextField);
		expect(prevField).toEqual(nextField);
	})
})