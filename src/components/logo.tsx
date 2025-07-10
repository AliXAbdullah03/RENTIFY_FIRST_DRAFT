import * as React from 'react';

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M361.3,213.67A105.13,105.13,0,1,0,256.17,318.8,105.13,105.13,0,0,0,361.3,213.67Z" style={{'fill': 'hsl(var(--primary))'}} />
      <path d="M200.67,468.3a105.13,105.13,0,1,0-95.2-156.46A105.13,105.13,0,0,0,200.67,468.3Z" style={{'fill': 'hsl(var(--accent))'}}/>
      <path d="M200.67,43.7A105.13,105.13,0,1,0,305.8,148.83,105.13,105.13,0,0,0,200.67,43.7Z" style={{'fill': 'hsl(var(--accent))', 'opacity': '0.75'}} />
    </svg>
  );
}
