import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Pokedex from "./Pokedex";
import * as pokeApi from "../../api/pokeApi";

const searchSpy = jest.spyOn(pokeApi, "search");

describe("Pokedex", () => {
  describe("render", () => {
    it("should return a container", () => {
      // arrange
      const { container } = render(<Pokedex />);

      // assert
      expect(container).toBeDefined();
      // expect(container.outerHTML).toBe('<div><div><div><h1>Pokedex</h1></div><div><div><label>Pokemon name:</label><input type=\"text\"></div><div><button>Search</button></div></div><div><p>No Pokemon :(</p></div></div></div>')
    });

    it("should render app title", () => {
      // arrange
      render(<Pokedex />);

      const header = screen.getByTestId("app-header");

      // assert
      expect(header).toHaveTextContent("Pokedex");
    });

    it("should render input section", () => {
      // arrange
      render(<Pokedex />);

      const header = screen.getByTestId("input-section");

      const button = screen.getByRole("button");

      // assert
      expect(header.innerHTML).toContain("button");
      expect(header.childNodes[0]).toHaveTextContent("Pokemon name:");
      expect(button).toHaveTextContent("Search");
    });
  });
  describe("events", () => {
    it("should show pokemon component if result exist", async () => {
      // arrange
      const expectedResponse = {
        name: "mew",
        sprites: {
          front_default: "fake image url",
        },
        stats: [
          {
            stat: {
              name: "attack",
              base_stat: 120,
            },
          },
        ],
      };
      searchSpy.mockResolvedValue(expectedResponse);

      render(<Pokedex />);

      const input = screen.getByRole("textbox");
      const button = screen.getByRole("button");

      // act
      fireEvent.change(input, { target: { value: "pikachu" } });
      fireEvent.click(button);

      await act(() => expectedResponse);

      // assert
      expect(pokeApi.search).toBeCalled();
      expect(pokeApi.search).toBeCalledTimes(1);

      const pokemonComponent = screen.getByTestId("pokemon-component");
      expect(pokemonComponent).toBeDefined();
    });
    it("should show no pokemon label if result do not exist", async () => {
      // arrange
      const expectedResponse = undefined;
      searchSpy.mockResolvedValue(expectedResponse);

      render(<Pokedex />);

      const input = screen.getByRole("textbox");
      const button = screen.getByRole("button");

      // act
      fireEvent.change(input, { target: { value: "pikachu" } });
      fireEvent.click(button);

      await act(() => expectedResponse);

      // assert
      expect(pokeApi.search).toBeCalled();
      expect(pokeApi.search).toBeCalledTimes(1);

      const pTag = screen.getByText('No Pokemon :\(');
      expect(pTag).toBeDefined();
    });
    it('should not trigger search if no value', () => {
      render(<Pokedex />);

      const input = screen.getByRole("textbox");
      const button = screen.getByRole("button");

      // act
      fireEvent.change(input, { target: { value: "" } });
      fireEvent.click(button);

      expect(pokeApi.search).not.toBeCalled();
    })
  });
});
