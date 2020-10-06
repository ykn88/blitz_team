import { SessionContext } from "blitz"
import db, { FindManyCategoryArgs } from "db"

type GetCategoriesInput = {
  where?: FindManyCategoryArgs["where"]
  orderBy?: FindManyCategoryArgs["orderBy"]
  skip?: FindManyCategoryArgs["skip"]
  take?: FindManyCategoryArgs["take"]
  // Only available if a model relationship exists
  // include?: FindManyCategoryArgs['include']
}

export default async function getCategories(
  { where, orderBy, skip = 0, take }: GetCategoriesInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const categories = await db.category.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.category.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    categories,
    nextPage,
    hasMore,
  }
}
