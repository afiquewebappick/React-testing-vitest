import { render, screen } from '@testing-library/react';
import ExpandableText from '../../src/components/ExpandableText';
import userEvent from '@testing-library/user-event';

describe('ExpandableText', () => {
  const shortText = 'Short text';
  const longText = 'A'.repeat(300);
  it('should render full text when text is shorter than limit', () => {
    render(<ExpandableText text={shortText}></ExpandableText>);

    expect(screen.getByText(shortText)).toBeInTheDocument();
    expect(screen.queryByRole('button')).toBeNull();
  });

  it("should show truncated text when longer than limit", () => {
    render(<ExpandableText text={longText} />);

    const truncated = longText.substring(0, 255) + "...";

    expect(screen.getByText(truncated)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /show more/i })).toBeInTheDocument();
  });

  it("should expand when clicking 'Show More'", async () => {
    render(<ExpandableText text={longText} />);

    await userEvent.click(screen.getByRole("button", { name: /show more/i }));

    expect(screen.getByText(longText)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /show less/i })).toBeInTheDocument();
  });

  it("should collapse when clicking 'Show Less'", async () => {
    render(<ExpandableText text={longText} />);

    const button = screen.getByRole("button", { name: /show more/i });

    await userEvent.click(button);

    await userEvent.click(screen.getByRole("button", { name: /show less/i }));

    const truncated = longText.substring(0, 255) + "...";

    expect(screen.getByText(truncated)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /show more/i })).toBeInTheDocument();
  });
});
