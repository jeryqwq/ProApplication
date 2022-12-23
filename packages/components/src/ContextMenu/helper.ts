export const compareShapeLocation = function (b: DOMRect) {
  let ret: Record<string, boolean | number> = {
    left: false,
    top: false,
    bottom: false,
    right: false
  }
  0 > b.left && (ret.left = true)
  0 > b.top && (ret.top = true)
  window.innerWidth < b.right && (ret.right = b.right - window.innerWidth)
  window.innerHeight < (b.bottom ) && (ret.bottom = (b.bottom) - window.innerHeight)
  return ret
}

export const reconcileLocation = function () {

}
