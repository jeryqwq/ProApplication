import React, { Children, createRef, useLayoutEffect, useState } from "react";
import { compareShapeLocation } from "./helper";
import { prefixCls } from "./index";

declare type SubMenuProps = {
  children: React.ReactNode;
  depth: number;
  prevRects: Array<() => HTMLUListElement>;
}

/**
 * 
 * @param SubMenuProps 
 * @description 负责根据渲染路径计算布局冲突， 进行位置调和
 */

export default function (props : SubMenuProps) {
  const { children, prevRects, depth } = props
  const [_layout, setLayout] = useState<React.CSSProperties>({ position: 'absolute', left: '100%', top: '0', zIndex: depth })
  const rectRef = createRef<HTMLUListElement>()
  prevRects[depth] = () => rectRef.current as HTMLUListElement
  useLayoutEffect(() => {
    const rect = rectRef.current?.getBoundingClientRect()
    // 是否需要解决冲突
    const res = rect && compareShapeLocation(rect)
    let layout: React.CSSProperties = { transform : ''}
    if(res?.right) { // 右侧无法展示， 移到最左侧展示 
      let moveX = 0
      if(depth <= 1) { // 如果当前第二层以前，更好的效果我们渲染到最左边去
        prevRects.forEach((i, idx) => {
          if(idx !== prevRects.length -1 ) {
            moveX += (i?.()?.getBoundingClientRect().width) || 0
          }
        })
        layout.transform += `translateX(calc( -100% - ${moveX}px ))`
      }else{ // 否则直接基于上一次的出来的做累加
        layout.left = 10
      }
    }
    if(res?.bottom) {
      layout.transform += `translateY(-${res.bottom as number + depth * 10}px )`
    }
    (res?.right || res?.bottom ) && setLayout({..._layout, ...layout})
  }, [])
  return (
    <ul
      className={prefixCls + 'wrap'} 
      style={_layout}
      ref={rectRef}
    >
      {
        Children.map(children, (child) => React.cloneElement(child as any, { prevRects }))
      }
    </ul>
  )
}
