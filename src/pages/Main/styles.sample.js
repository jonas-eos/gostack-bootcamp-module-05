import styled from 'styled-components';

/**
 * CSS sample with JS using styled-components.
 */
export const Title = styled.h1`
  font-size: 24px;

  /* Iff props is on error, back color red, else, return purpple. */
  color: ${props => (props.error ? 'red' : '#7159c1')};
  font-family: Arial, Helvetica, sans-serif;

  /* Manipulate attributes directly by name */
  small {
    font-size: 14px;
    color: #333;
  }
`;
