declare module "react-simple-maps" {
  import { ReactNode, CSSProperties } from "react";

  interface ComposableMapProps {
    projection?: string;
    projectionConfig?: Record<string, unknown>;
    width?: number;
    height?: number;
    style?: CSSProperties;
    children?: ReactNode;
  }

  interface GeographiesProps {
    geography: string | object;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: (args: { geographies: any[] }) => ReactNode;
  }

  interface GeographyProps {
    geography: unknown;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    style?: {
      default?: CSSProperties & { outline?: string; transition?: string; filter?: string };
      hover?: CSSProperties & { outline?: string; filter?: string };
      pressed?: CSSProperties & { outline?: string };
    };
    key?: string;
  }

  interface MarkerProps {
    coordinates: [number, number];
    children?: ReactNode;
    key?: string;
  }

  export function ComposableMap(props: ComposableMapProps): JSX.Element;
  export function Geographies(props: GeographiesProps): JSX.Element;
  export function Geography(props: GeographyProps): JSX.Element;
  export function Marker(props: MarkerProps): JSX.Element;
}
