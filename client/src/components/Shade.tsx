export type Props = {
  isVisible: boolean;
  onClick: () => void;
};

export function Shade({ isVisible, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={`fixed inset-0 bg-black opacity-50 z-40 ${
        isVisible ? 'block' : 'hidden'
      }`}
    />
  );
}
