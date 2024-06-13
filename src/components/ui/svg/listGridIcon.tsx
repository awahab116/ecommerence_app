import { twMerge } from "tailwind-merge";

interface IconProps {
  className?: string;
}

const ListGridIcon = ({ className }: IconProps) => {
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
      <path
        d="M0 0h35v8H0zm0 13h35v8H0zm0 14h35v8H0z"
        data-name="Layer 2"
      ></path>
    </svg>
  );
};

export default ListGridIcon;
