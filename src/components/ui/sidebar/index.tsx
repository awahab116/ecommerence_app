import RadioGroupFilter from "../../radioGroupFilter";

export default function Sidebar(): JSX.Element {
  return (
    <div className="hidden sm:block pr-[10px] pb-5">
      <RadioGroupFilter />
    </div>
  );
}
