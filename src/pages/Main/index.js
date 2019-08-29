import React, { Component } from 'react';

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import { Container, Form, SubmitButton, List } from './styles';

export default class Main extends Component {
  // State values.
  constructor(props) {
    super(props);
    this.state = {
      newRepo: '',
      repositories: [],
      loading: false,
    };
  }

  /**
   * Load datas from localStorage.
   */
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({
        repositories: JSON.parse(repositories),
      });
    }
  }

  /**
   * Save datas on localStorage.
   */
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  /**
   * Input Handler:
   * This handle attr values to state.newRepo
   */
  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  /**
   * Submit Handler:
   * This handler add a new repo on state.
   */
  handleSubmit = async e => {
    e.preventDefault();

    // Check if page are on loading status.
    this.setState({ loading: true });

    // Get attr from state.newRepo and state.repositories
    const { newRepo, repositories } = this.state;

    // Get values from API(github).
    const response = await api.get(`/repos/${newRepo}`);

    // Set data with full_name values from response.
    const data = {
      name: response.data.full_name,
    };

    // Save data on state, and disable loading status.
    this.setState({
      repositories: [...repositories, data],
      newRepo: '',
      loading: false,
    });
  };

  render() {
    const { newRepo, repositories, loading } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositories
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Add repository"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>

        {/* List all repositories. */}
        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
