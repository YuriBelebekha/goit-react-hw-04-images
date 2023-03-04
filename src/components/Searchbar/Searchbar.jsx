import { useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = e => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSubmit = e => {    
    e.preventDefault();
    onSubmit({ searchQuery });
    setSearchQuery('');
  }
  
  return (
    <header className={css.Searchbar}>
      <form onSubmit={handleSubmit} className={css.SearchForm}>
        <button type="submit" className={css.SearchFormBtn}>
          <HiSearch style={{ width: 24, height: 24 }} />
          <span className={css.SearchFormBtnLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          value={searchQuery}
          onChange={handleSearchInputChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"            
        />
      </form>
    </header>
  )    
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};