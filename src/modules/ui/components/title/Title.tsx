import { fontTitle } from "@/utils";

interface Props {
  title: string;
  subtitle?: string;
  className?: string;
  icon?: React.ReactNode;
}

export const Title = ({ title, subtitle, className, icon }: Props) => {
  return (
    <div className={`mt-3 ${className}`}>
      <div className="sm:flex sm:items-center sm:gap-3">
        <h1
          className={`${fontTitle.className} antialiased text-4xl font-semibold mt-7 mb-3`}
        >
          {title}
        </h1>
        <div className="absolute top-36 left-32 sm:relative sm:top-0 sm:left-0 sm:mt-6">
          {icon}
        </div>
      </div>
      {subtitle && <h3 className="text-xl mb-5">{subtitle}</h3>}
    </div>
  );
};
