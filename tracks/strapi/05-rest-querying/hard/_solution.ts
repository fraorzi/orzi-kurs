export interface Pagination { page: number; pageSize: number; pageCount: number; total: number }
export function solve(value: Pagination): Pagination {
  const expected = value.total === 0 ? 0 : Math.ceil(value.total / value.pageSize);
  if (!Number.isInteger(value.pageSize) || value.pageSize < 1 || value.pageCount !== expected || value.page < 1 || (value.pageCount > 0 && value.page > value.pageCount)) throw new Error("Niespójna paginacja");
  return { ...value };
}

