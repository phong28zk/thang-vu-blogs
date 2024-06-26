//sanity/utils.ts
interface BuildQueryParams {
    type: string;
    query: string;
    tags: string;
    page: number;
    perPage?: number;
  }
  
  export const buildQuery = (params: BuildQueryParams) => {
    const { type, query, tags, page = 1, perPage = 20 } = params;
  
    const conditions = [`*[_type=="${type}"`];
  
    if (query) conditions.push(`title match "*${query}*"`);
  
    if (tags && tags !== "all") {
      conditions.push(`tags == "${tags}"`);
    }
  
    //pagination
    const offset = (page - 1) * perPage;
    const limit = perPage;
  
    return conditions.length > 1
      ? `${conditions[0]} && (${conditions
          .slice(1)
          .join(" && ")})][${offset}...${limit}]`
      : `${conditions[0]}][${offset}...${limit}]`;
  };
  