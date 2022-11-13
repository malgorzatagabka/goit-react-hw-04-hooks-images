import React from 'react';
import PropTypes from 'prop-types';
import style from "./SearchBar.module.css"

const SearchBar = ({ handleMakeRequest }) => (
        <header className={style.Searchbar}>
        <form className={style.SearchForm} onSubmit={handleMakeRequest}>
          <button type="submit" className={style.SearchFormButton}>
            <span className={style.SearchFormBtnLabel}>Search</span>
          </button>
      <input
        className={style.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchValue"
          />
        </form>
      </header>
    );


SearchBar.propTypes = {
handleMakeRequest: PropTypes.func.isRequired,
};

export default SearchBar;


