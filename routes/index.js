import authRoute from './auth.route.js'
import fileRoute from './file.route.js'


export default (router) => {
  router.use("/users",authRoute);
  router.use("/",fileRoute)
   
  return router;
};