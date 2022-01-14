const IMAGE_LIST = 'IMAGE_LIST' // 提示框

const set = res => ({
  type: IMAGE_LIST,
  res,
})

export const setImageList = res => (dispatch) => {
  dispatch(
    set(res),
  )
}

export const imageList = (
  state = [],
  action,
) => {
  switch (action.type) {
    case IMAGE_LIST:
      return action.res
    default:
      return state
  }
}