import { render, screen } from '@testing-library/react';
import ProductImageGallery from '../../src/components/ProductImageGallery';

describe('ProductImageGallery', () => {
  it('should be empty if images is not there', () => {
    const { container } = render(
      <ProductImageGallery imageUrls={[]}></ProductImageGallery>
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('should have images if images is there', () => {
    const imageUrls = ['url1', 'url2'];
    render(<ProductImageGallery imageUrls={imageUrls}></ProductImageGallery>);

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    imageUrls.forEach((url, index) => {
      expect(images[index]).toHaveAttribute('src', url);
    });
  });
});
