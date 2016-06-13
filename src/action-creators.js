export function gbmReset() {
  return {
    type: "RESET_GBM"
  }
}

export function gbmChange(params) {
  return {
    type: "CHANGE_GBM",
    params
  }
}
