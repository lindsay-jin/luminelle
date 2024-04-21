const landingImages = [
  { name: 'jacket1', imageUrl: '/images/landing4.jpg' },
  { name: 'dress1', imageUrl: '/images/landing3.jpg' },
];

export function Home() {
  return (
    <div>
      {landingImages.map((image) => (
        <img
          className="w-screen"
          key={image.name}
          src={image.imageUrl}
          alt={image.name}
        />
      ))}
    </div>
  );
}
