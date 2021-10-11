import { Dispatch, FC, FormEvent, SetStateAction } from 'react';

type Props = {
  term: string;
  setTerm: Dispatch<SetStateAction<string>>;
  placeholder: string;
};

const SearchBox: FC<Props> = ({ term, setTerm, placeholder }) => {
  const handleChange = (e: FormEvent) =>
    setTerm((e.target as HTMLInputElement).value);

  return (
    <div className="block mb-5 w-full">
      <input
        type="search"
        className="appearance-none border rounded py-2 px-3 leading-tight w-full focus:outline-none focus:ring"
        aria-label={placeholder}
        placeholder={placeholder}
        spellCheck={false}
        value={term}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBox;
