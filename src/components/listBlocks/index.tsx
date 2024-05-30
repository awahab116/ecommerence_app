export default function ListBlock({
  title,
  listItems,
}: {
  title: string;
  listItems: string[];
}) {
  return (
    <div>
      <h2 className="text-[16px] font-bold mb-[15px]">{title}</h2>
      <ul>
        {listItems.map((item, index) => (
          <li key={`${title}-${index}`} className="py-1">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
