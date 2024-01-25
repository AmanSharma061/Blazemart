import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  publicRoutes: ['/api/webhooks(.*)','/',
  '/api/webhook/clerk',
  '/api/webhook/stripe',
  '/api/uploadthing',
  "/api/razorpay",
  '/api/checkout',
  '/events/:id',
  '/api/category',
  '/api/freeTicket',
  '/api/order'
  
],
ignoredRoutes: [
  '/api/webhook/clerk',
  '/api/webhook/stripe',
  '/api/uploadthing',
  '/api/razorpay',
]
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
