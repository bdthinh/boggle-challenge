const sequence = (...functions) => initialValues => functions.reduce(
  (soFar, f) => soFar.then(f),
  functions[0](initialValues),
);

export default sequence;
