import { sort } from "@/utils/sort";
import { expect, test } from "vitest";

test("sorting string array", () => {
  const unsortedArray: string[] = ["One", "Two", "three", "four"];
  const actualResult = unsortedArray.sort((a, b) => sort(a, b));
  const expectedResult = unsortedArray.sort();
  expect(actualResult).toBe(expectedResult);
});

test("sorting different types", () => {
  const unsortedArray: [string, number] = ["hello", 1];
  const actualResult = unsortedArray.sort((a, b) => sort(a, b));
  const expectedResult = unsortedArray.sort();
  expect(actualResult).toBe(expectedResult);
});
