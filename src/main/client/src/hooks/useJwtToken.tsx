
export interface JwtToken {
  authorities: { authority: string }[];
  sub: string;
  iat: number;
  exp: number;
}

function parseJwt (token: string): JwtToken {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}
export const useJwtToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  return { parsedToken: parseJwt(token), token: token };
}