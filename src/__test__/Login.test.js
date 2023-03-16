import { render,screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login, { validateEmail } from "../Login";

describe("Test Login Component", () => {
 test("render form with 1 button", async () => {
  render(<Login />);
  const buttonList = await screen.findAllByRole("button");
  // console.log(buttonList);
  expect(buttonList).toHaveLength(1);
 });

 test("should be failed on email validation", ()=> {
  const testEmail = "shincode.com";
  expect(validateEmail(testEmail)).not.toBe(true);
 });

  test("should be success on email validation", ()=> {
  const testEmail = "shincode@gmail.com";
  expect(validateEmail(testEmail)).toBe(true);
 });

 test("password input should have type password", ()=> {
  render(<Login />);
  const password = screen.getByPlaceholderText("パスワード入力");
  expect(password).toHaveAttribute("type", "password");
 });

 test("should be able to submit the form", ()=> {
  render(<Login />);
  const submitButton = screen.getByTestId("submit");
  const email = screen.getByPlaceholderText("メールアドレス入力");
  const password = screen.getByPlaceholderText("パスワード入力");

  userEvent.type(email, "shincode@gmail.com");
  userEvent.type(password, "abcdef");

  userEvent.click(submitButton);
  const userInfo = screen.getByText("shincode@gmail.com");
  expect(userInfo).toBeInTheDocument();
 });
});