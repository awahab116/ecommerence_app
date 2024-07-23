import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/lib/mock-redux-wrapper";
import ReviewSection from "@/components/reviewSection";

describe("Redux toolkit working, review section", () => {
  it("check if stars render or not", () => {
    renderWithProviders(<ReviewSection />);
    const allStars = screen.getAllByAltText("Star Icon");
    const firstStar = allStars[0];

    expect(firstStar).toBeInTheDocument();
  });

  it("check if number of reviews render or not", () => {
    renderWithProviders(<ReviewSection />);
    const reviews = screen.getByText(/Based on 62 Reviews/i);

    expect(reviews).toBeInTheDocument();
  });

  it("check if search input render or not", () => {
    renderWithProviders(<ReviewSection />);
    const input = screen.getByPlaceholderText(/Search for name or content/i);

    expect(input).toBeInTheDocument();
  });

  it("check if write review button render or not", () => {
    renderWithProviders(<ReviewSection />);
    const button = screen.getByText(/Write a Review/i);

    expect(button).toBeInTheDocument();
  });

  it("check if userSection render or not", () => {
    renderWithProviders(<ReviewSection />);
    const userSections = screen.getAllByText(/Gender:/i);

    expect(userSections).toHaveLength(4);
  });
});
