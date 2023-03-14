import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";
import React from 'react';
import App from './App';

describe('testing app initial state', () => {

  test("click on 'start' without selecting kana gives error", async () => {
    render(<App />);
    const user = userEvent.setup();
    const start = screen.getByRole("button", { name: "Start" });

    await user.click(start);

    expect(screen.getByText(/select the kana/)).toBeInTheDocument();
  });

  test("click on 'start' after selecting kana starts app", async () => {
    render(<App />);
    const user = userEvent.setup();

    const button = screen.getByRole("button", { name: "Review あ a/い i/う u/え e/お o" });
    const start = screen.getByRole("button", { name: "Start" });

    await user.click(button);
    await user.click(start);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("select and reselect the same option remove kana", async () => {
    render(<App />);
    const user = userEvent.setup();

    const button = screen.getByRole("button", { name: "Review あ a/い i/う u/え e/お o" });
    const start = screen.getByRole("button", { name: "Start" });

    await user.click(button);
    await user.click(button);
    await user.click(start);

    expect(screen.getByText(/select the kana/)).toBeInTheDocument();
  });

});

describe('testing word review', () => {

  test("selected words of kana a, i, u, e, o are less than 10", async () => {
    render(<App />);
    const user = userEvent.setup();

    const button = screen.getByRole("button", { name: "Review あ a/い i/う u/え e/お o" });
    const start = screen.getByRole("button", { name: "Start" });

    await user.click(button);
    await user.click(start);

    expect(screen.queryByText(/10/)).not.toBeInTheDocument();
  });

  test("selected words of kana a, i, u, e, o and other 5 kana are 10", async () => {
    render(<App />);
    const user = userEvent.setup();

    const buttonALine = screen.getByRole("button", { name: "Review あ a/い i/う u/え e/お o" });
    const buttonKaLine = screen.getByRole("button", { name: "Review か ka/き ki/く ku/け ke/こ ko" });
    const start = screen.getByRole("button", { name: "Start" });

    await user.click(buttonALine);
    await user.click(buttonKaLine);
    await user.click(start);

    expect(screen.getByText(/10/)).toBeInTheDocument();
  });

  test("setting to 25 words prints at max 25 words", async () => {
    render(<App />);

    const user = userEvent.setup();

    const buttonALine = screen.getByRole("button", { name: "Review あ a/い i/う u/え e/お o" });
    const buttonKaLine = screen.getByRole("button", { name: "Review か ka/き ki/く ku/け ke/こ ko" });
    const dropdownMenu = screen.getByRole("combobox");
    const start = screen.getByRole("button", { name: "Start" });

    await user.click(buttonALine);
    await user.click(buttonKaLine);
    await user.selectOptions(dropdownMenu, "25");
    await user.click(start);

    expect(screen.queryByText(/10/)).not.toBeInTheDocument();
  });

});