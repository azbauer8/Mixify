declare module "remix-routes" {
  type URLSearchParamsInit = string | string[][] | Record<string, string> | URLSearchParams;
  // symbol won't be a key of SearchParams
  type IsSearchParams<T> = symbol extends keyof T ? false : true;
  
    type ExportedQuery<T> = IsSearchParams<T> extends true ? T : URLSearchParamsInit;
  

  export interface Routes {
  
    "/": {
      params: {
      
      },
      query: ExportedQuery<import('../pages/home').SearchParams>,
    };
  
    "/artists": {
      params: {
      
      },
      query: ExportedQuery<import('../pages/artists').SearchParams>,
    };
  
    "/callback": {
      params: {
      
      },
      query: ExportedQuery<import('../pages/auth/callback').SearchParams>,
    };
  
    "/login": {
      params: {
      
      },
      query: ExportedQuery<import('../pages/auth/login').SearchParams>,
    };
  
    "/logout": {
      params: {
      
      },
      query: ExportedQuery<import('../pages/auth/logout').SearchParams>,
    };
  
    "/recent": {
      params: {
      
      },
      query: ExportedQuery<import('../pages/recent').SearchParams>,
    };
  
    "/tracks": {
      params: {
      
      },
      query: ExportedQuery<import('../pages/tracks').SearchParams>,
    };
  
    "/welcome": {
      params: {
      
      },
      query: ExportedQuery<import('../pages/welcome').SearchParams>,
    };
  
  }

  type RoutesWithParams = Pick<
    Routes,
    {
      [K in keyof Routes]: Routes[K]["params"] extends Record<string, never> ? never : K
    }[keyof Routes]
  >;

  export type RouteId =
    | 'layout/RootLayout'
    | 'pages/artists'
    | 'pages/auth/callback'
    | 'pages/auth/login'
    | 'pages/auth/logout'
    | 'pages/home'
    | 'pages/recent'
    | 'pages/tracks'
    | 'pages/welcome'
    | 'root';

  export function $path<
    Route extends keyof Routes,
    Rest extends {
      params: Routes[Route]["params"];
      query?: Routes[Route]["query"];
    }
  >(
    ...args: Rest["params"] extends Record<string, never>
      ? [route: Route, query?: Rest["query"]]
      : [route: Route, params: Rest["params"], query?: Rest["query"]]
  ): string;

  export function $params<
    Route extends keyof RoutesWithParams,
    Params extends RoutesWithParams[Route]["params"]
  >(
      route: Route,
      params: { readonly [key: string]: string | undefined }
  ): {[K in keyof Params]: string};

  export function $routeId(routeId: RouteId): RouteId;
}