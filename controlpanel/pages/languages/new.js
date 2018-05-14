import React from 'react';
import { Container } from 'semantic-ui-react';
import App from '../../components/AppContainer';
import FormNewLanguage from '../../components/languages/FormNewLanguage';
import connectApollo from '../../lib/connectApollo';

export default connectApollo(({ onSuccess, ...rest }) => (
  <App {...rest}>
    <Container>
      <p>Sprache hinzufügen</p>
      <FormNewLanguage />
    </Container>
  </App>
));
