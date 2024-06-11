import { twMerge } from "tailwind-merge";

interface SmallGridIconProps {
  className?: string;
}

const SmallGridIcon = ({ className }: SmallGridIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      role="presentation"
      viewBox="0 0 35 35"
      className={twMerge(
        "w-6 h-6 fill-gray-300 hover:fill-gray-600",
        className
      )}
    >
      <path d="M0 0h15v15H0zm20 0h15v15H20zM0 20h15v15H0zm20 0h15v15H20z"></path>
    </svg>
  );
};

export default SmallGridIcon;
