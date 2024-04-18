const landingImages = [
  { name: 'jacket1', imageUrl: '/images/landing4.JPG' },
  { name: 'dress1', imageUrl: '/images/landing3.JPG' },
];

export function Home() {
  return (
    <div>
      {landingImages.map((image) => (
        <img
          key={image.name}
          src={image.imageUrl}
          alt={image.name}
          style={{ width: '1000px' }}
        />
      ))}
    </div>
  );
}
