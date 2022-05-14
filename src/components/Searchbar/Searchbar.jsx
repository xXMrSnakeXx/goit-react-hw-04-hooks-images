import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { FcSearch } from 'react-icons/fc';

import s from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    input: '',
  };
  static propTypes = {
    changeSearch: PropTypes.func.isRequired,
  };

  handleSearch = e => {
    this.setState({ input: e.currentTarget.value.toLowerCase() });
  };
  onSubmit = e => {
    e.preventDefault();
    const { input } = this.state;
    const { changeSearch } = this.props;
    if (input.trim() === '') {
      return toast.error('Please enter your query in query text box.');
    }
    changeSearch(input);
    this.setState({ input: '' });
  };

  render() {
    const { input } = this.state;
    return (
      <header className={s.searchbar}>
        <form className={s.form} onSubmit={this.onSubmit}>
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
            onChange={this.handleSearch}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
