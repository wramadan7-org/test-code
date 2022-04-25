/**
 * Pagination
 * @param { Array } items
 * @param { Number } currentPage
 * @param { Number } limitItems
 * @returns { Promise <Object> }
 */
const paginate = (items, currentPage, limitItems) => {
  const limitMax = 50;

  const page = parseInt(currentPage) || 1;
  let limit = parseInt(limitItems) || 10;

  if (limit > limitMax) limit = limitMax; // force maximum limit

  const offset = (page - 1) * limit;

  const paginatedItems = items.slice(offset).slice(0, limitItems);
  const totalPages = Math.ceil(items.length / limit);

  return {
    totalData: items.length,
    currentPage: page,
    totalPages,
    limitPage: limit,
    prevPage: page - 1 ? page - 1 : null,
    nextPage: totalPages > page ? page + 1 : null,
    data: paginatedItems,
  };
};

module.exports = paginate;
