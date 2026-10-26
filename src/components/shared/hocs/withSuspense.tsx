import {ComponentType, ReactNode, Suspense} from 'react';

function WithSuspense<Props = Record<string, never>>(
  WrappedComponent: ComponentType<Props>,
  option: {fallback: ReactNode;},
) {
  return (props: Props) => {
    return (
      <Suspense fallback={option.fallback}>
        <WrappedComponent {...(props as any)} />
      </Suspense>
    );
  };
}

export default WithSuspense;
