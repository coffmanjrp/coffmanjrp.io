import { Dispatch, FC, FormEvent, SetStateAction } from 'react';

type Props = {
  term: string;
  setTerm: Dispatch<SetStateAction<string>>;
};

const SearchBox: FC<Props> = ({ term, setTerm }) => {
  const handleChange = (e: FormEvent) =>
    setTerm((e.target as HTMLInputElement).value);

  return (
    <div className="block w-full">
      <input
        type="search"
        className="appearance-none border rounded py-2 px-3 leading-tight w-full focus:outline-none focus:ring"
        aria-label="Search Article By Title"
        placeholder="Search Article By Title"
        spellCheck={false}
        value={term}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBox;
