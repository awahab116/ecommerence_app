import { twMerge } from "tailwind-merge";

interface LargeGridIconProps {
  className?: string;
}

const LargeGridIcon = ({ className }: LargeGridIconProps) => {
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
      <path d="M0 0h35v35H0z"></path>
    </svg>
  );
};

export default LargeGridIcon;
