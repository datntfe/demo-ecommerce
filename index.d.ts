declare module '*.svg' {
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare module 'react-facebook-login/dist/facebook-login-render-props' {
  export interface RenderProps {
    onClick: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
    isDisabled: boolean;
    isProcessing: boolean;
    isSdkLoaded: boolean;
  }

  interface ReactFacebookLoginProps {
    appId: string;
    callback(userInfo: ReactFacebookLoginInfo): void;
    onFailure?(response: ReactFacebookFailureResponse): void;

    autoLoad?: boolean;
    buttonStyle?: React.CSSProperties;
    containerStyle?: React.CSSProperties;
    cookie?: boolean;
    cssClass?: string;
    disableMobileRedirect?: boolean;
    fields?: string;
    icon?: string | React.ReactNode;
    isDisabled?: boolean;
    language?: string;
    onClick?(event: React.MouseEvent<HTMLDivElement>): void;
    reAuthenticate?: boolean;
    redirectUri?: string;
    scope?: string;
    size?: 'small' | 'medium' | 'metro';
    textButton?: string;
    typeButton?: string;
    version?: string;
    xfbml?: boolean;
    isMobile?: boolean;
    tag?: Node | React.Component<any>;
    render(props: RenderProps): void;
  }

  interface ReactFacebookFailureResponse {
    status?: string;
  }

  interface ReactFacebookLoginInfo {
    id: string;
    accessToken: string;
    name?: string;
    email?: string;
  }

  interface ReactFacebookLoginState {
    isSdkLoaded?: boolean;
    isProcessing?: boolean;
  }

  // eslint-disable-next-line react/prefer-stateless-function
  export default class ReactFacebookLogin extends React.Component<ReactFacebookLoginProps, ReactFacebookLoginState> {}
}
