import { fontTitle } from "@/utils";

interface Props {
  title: string;
  subtitle?: string;
  className?: string;
}

export const Title = ({ title, subtitle, className }: Props) => {
  return (
    <div className={`mt-3 ${className}`}>
      <h1
        className={`${fontTitle.className} antialiased text-4xl font-semibold mt-7 mb-3`}
      >
        {title}
      </h1>
      {subtitle && <h3 className="text-xl mb-5">{subtitle}</h3>}
    </div>
  );
};
