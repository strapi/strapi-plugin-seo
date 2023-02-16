

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_PONCTUAL':
      return {
        ...state,
        [action.value.entity]: {
          color: action.value?.color,
          message: action.value?.message,
        },
      };
    case 'UPDATE_FOR_PREVIEW':
      return action.value;
    default:
      throw new Error();
  }
}

export default reducer;
