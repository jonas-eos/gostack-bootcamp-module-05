import React from 'react';

import { Title } from './styles';

export default function Main() {
  return (
    <>
      <Title>
        <small>Small</small>
        Main
      </Title>

      {/* Tittle with error value sample */}
      <Title error>Error main!</Title>
    </>
  );
}
