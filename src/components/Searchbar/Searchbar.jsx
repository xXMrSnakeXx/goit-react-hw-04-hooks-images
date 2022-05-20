import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { FcSearch } from 'react-icons/fc';

import s from './Searchbar.module.css';

export const Searchbar = ({ changeSearch }) => {
  const [input, setInput] = useState('');
  const handleSearch = e => {
    setInput(e.currentTarget.value.toLowerCase());
  };
  const onSubmit = e => {
    e.preventDefault();
    if (input.trim() === '') {
      return toast.error('Please enter your query in query text box.');
    }
    changeSearch(input);
  };
  return (
    <header className={s.searchbar}>
      <form className={s.form} onSubmit={onSubmit}>
        <button type="submit" className={s.button}>
          <FcSearch className={s.buttonIcon} />
          <span className={s.buttonLabel}>Search</span>
        </button>

        <input
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          value={input}
          onChange={handleSearch}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
Searchbar.propTypes = {
  changeSearch: PropTypes.func.isRequired,
};
