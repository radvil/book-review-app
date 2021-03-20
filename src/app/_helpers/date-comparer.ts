export function sortByLatest(a: any, b: any) {
  return b.createdAt?.toString().localeCompare(a.createdAt?.toString());
}
