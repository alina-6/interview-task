import { render, screen } from "@testing-library/react";
import EpisodePerformance from "./EpisodePerformance";


test("renders the EpisodePerformance component", () => {
  render(<EpisodePerformance />);
  expect(
    screen.getByText(/Best & Worst Performing Episodes/i)
  ).toBeInTheDocument();
});