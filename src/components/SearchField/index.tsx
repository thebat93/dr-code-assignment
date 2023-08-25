import { ChangeEventHandler, useState, InputHTMLAttributes } from "react";
import s from "./styles.module.css";

type Props = {
  name: string;
  label: string;
  onSearch: (newQuery: string) => void;
  defaultQuery?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "type" | 'name'>;

const SearchField = ({ name, label, onSearch, defaultQuery = "", ...restProps }: Props) => {
  const [query, setQuery] = useState(defaultQuery);

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const newQuery = event.target.value;

    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <label className={s.container} htmlFor={name}>
      <span className="visuallyHidden">{label}</span>
      <input
        id={name}
        name={name}
        type="search"
        className={s.search}
        value={query}
        onChange={onChange}
        {...restProps}
      />
    </label>
  );
};

export { SearchField };
