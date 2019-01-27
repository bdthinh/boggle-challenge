import React from 'react';
import EventListener from 'react-event-listener';
import { connect } from 'react-redux';
import { withState, withProps, setDisplayName, compose } from 'recompose';
import { reduxForm, Field, reset } from 'redux-form';
import debounceHandler from '@hocs/debounce-handler';

import CustomInputOnly from './CustomInputOnly';

import { validateWord, resetSequence } from '../../store/states/sequence';
import { submitWord } from '../../store/states/resultList';

import { VALID_STATE } from '../../store/states/validations/sequenceValidation';

const connectToRedux = connect(
  null,
  {
    onAppendWord: submitWord,
    onValidateWord: validateWord,
    onResetForm: () => reset('boggleForm'),
    onResetSequence: resetSequence,
  },
);

const withValidation = withState('validation', 'setValidation', VALID_STATE);

const upper = value => value && value.toUpperCase();
const withOnValidateFieldWord = withProps(({
  setValidation,
  onValidateWord,
}) => ({
  onValidateFieldWord: ({ target: { value: word } }) => (
    onValidateWord(upper(word)).then(setValidation)
  ),
}));


const withOnSubmit = withProps(({ onAppendWord, onResetForm, onResetSequence }) => ({
  onSubmit: ({ word }) => {
    onAppendWord(word);
    onResetForm();
    onResetSequence();
  },
}));

const withReduxForm = reduxForm({
  form: 'boggleForm',
  enableReinitialize: true,
  destroyOnUnmount: false,
});

const enhance = compose(
  setDisplayName('BoggleForm'),
  connectToRedux,
  withValidation,
  withOnValidateFieldWord,
  withOnSubmit,
  withReduxForm,
  debounceHandler('onValidateWord', 100),
  setDisplayName('PureBoggleForm'),
);

const BoggleForm = ({
  handleSubmit,
  onResetForm,
  validation: { valid, error },
  onValidateFieldWord,
  submitting,
  pristine,
}) => (
  <div className="form">
    <form className={`boggle-form ${!valid && 'field-error'}`} onSubmit={handleSubmit}>
      {valid && <legend>Enter new word</legend>}
      {!valid && <legend className="field-msg-error">
        {error}
      </legend>}

      <div className="fieldset">
        <Field
          component={CustomInputOnly}
          onValidate={[onValidateFieldWord]}
          autoFocus
          autoComplete="off"
          type="text"
          name="word"
          required
          normalize={upper}
        />
      </div>

      <button type="submit" disabled={!valid || submitting || pristine}>
        {submitting ? 'Checking...' : 'Save'}
      </button>
      <button onClick={onResetForm}>Clear</button>
    </form>
    <EventListener
      target="window"
      onKeyUp={e => (e.keyCode === 27 ? handleSubmit() : null)}
    />
  </div>
);

export default enhance(BoggleForm);
