import React from 'react';
const level = [1, 2, 3, 4, 5];
export default ({num, size = 36, color = 'color7', className, onChange}) => <div className={`flex-wrp ${className}`}>
  {level.map((n, i) => <i className={`i i-star size${size} ${num >= n ? color : 'color12'}`} key={i}
                          onTouchEnd={() => onChange && onChange(n)}/>)}
</div>