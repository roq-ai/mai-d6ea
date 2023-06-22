const mapping: Record<string, string> = {
  connections: 'connection',
  contents: 'content',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
