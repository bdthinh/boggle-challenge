import React from 'react';
import { connect } from 'react-redux';
import { withState, withProps, setDisplayName, compose } from 'recompose';
import { reduxForm, Field, reset } from 'redux-form';
import debounceHandler from '@hocs/debounce-handler';

import CustomInputOnly from './CustomInputOnly';

import { validateWord } from '../../store/states/sequence';
import { appendWord } from '../../store/states/resultList';

import sequenceFunctions from '../../utils/sequenceFunctions';

import { VALID_STATE } from '../../store/states/validations/sequenceValidation';

const connectToRedux = connect(
  null,
  {
    onAppendWord: appendWord,
    onValidateWord: validateWord,
    onResetForm: () => reset('boggleForm'),
  },
);

const withValidation = withState('validation', 'setValidation', VALID_STATE);

const withOnSubmit = withProps(({ onAppendWord, onResetForm }) => ({
  onSubmit: sequenceFunctions(
    onAppendWord,
    onResetForm,
  ),
}));

const withReduxForm = reduxForm({
  form: 'boggleForm',
  enableReinitialize: true,
  destroyOnUnmount: false,
});

const enhance = compose(
  setDisplayName('BoggleForm'),
  withValidation,
  connectToRedux,
  withOnSubmit,
  withReduxForm,
  debounceHandler('onValidateWord', 100),
  setDisplayName('PureBoggleForm'),
);

const BoggleForm = ({
  handleSubmit,
  onCancel,
  validation: { valid, error },
  onValidateWord,
  submitting,
}) => (
  <div className="form">
    <form className={`boggle-form ${!valid && 'field-error'}`} onSubmit={handleSubmit}>
      <div className="fieldset">
        <Field
          component={CustomInputOnly}
          onValidate={[onValidateWord]}
          autoFocus
          autoComplete="off"
          type="text"
          name="word"
        />

        {!valid && <div className="field-msg-error">
          <div className="error-content">{error}</div>
        </div>}
      </div>

      <button type="submit" disabled={!valid}>
        {submitting ? 'Checking...' : 'Save'}
      </button>
      <button className="btn-second-type" onClick={onCancel}>Clear</button>
    </form>
  </div>
);

export default enhance(BoggleForm);
