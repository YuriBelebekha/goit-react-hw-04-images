import { Component } from 'react';
import { HiSearch } from 'react-icons/hi';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleSearchInputChange = e => {
    this.setState({
      searchQuery: e.currentTarget.value.toLowerCase()
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  }

  render() {
    return (
      <header className={css.Searchbar}>
        <form onSubmit={this.handleSubmit} className={css.SearchForm}>
          <button type="submit" className={css.SearchFormBtn}>
            <HiSearch style={{ width: 24, height: 24 }} />
            <span className={css.SearchFormBtnLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            value={this.state.searchQuery}
            onChange={this.handleSearchInputChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"            
          />
        </form>
      </header>
    )
  }  
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};