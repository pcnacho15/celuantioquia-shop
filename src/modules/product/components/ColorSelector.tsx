import clsx from "clsx";

interface Props {
  selectedColor?: string | undefined;
  availableColor: string[] | undefined;
  onColorChanged: (color: string) => void;
}

export const ColorSelector = ({
  availableColor = [],
  selectedColor = "",
   onColorChanged
}: Props) => {
  return (
    <div className="mb-10">
      {availableColor.length > 0 && (
        <h3 className="font-bold mb-4 text-lg">Colores disponibles:</h3>
      )}

      <div className="flex gap-5">
        {availableColor.map((color) => (
          <button
            onClick={() => onColorChanged( color )}
            key={color}
            className={clsx("hover:underline text-lg capitalize", {
              'underline scale-105 transition-all duration-100': color === selectedColor,
            })}
          >
            {color}
          </button>
        ))}
      </div>
    </div>
  );
};
