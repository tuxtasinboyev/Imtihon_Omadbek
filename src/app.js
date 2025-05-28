import express from "express";
import "dotenv/config";
import fileUpload from "express-fileupload";

import middleware from "./middleware/errorHandler.js";
import createSuperAdmin from "./service/create_super_admin.js";
import registerLoginRouter from "./routers/register_login_router.js";
import permissionRouters from "./routers/permission.router.js";
import transportRouter from "./routers/transport.roters.js";
import branchRouter from "./routers/branch.router.js";
import adminRouter from "./routers/admin.router.js";
import adminPermissionRouter from "./routers/adminPermission.js";
import userRouter from "./routers/user.routers.js";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(fileUpload());

// createSuperAdmin();

app.use(registerLoginRouter);
app.use(permissionRouters)
app.use(transportRouter)
app.use(branchRouter)
app.use(userRouter)
app.use(adminRouter)
app.use(adminPermissionRouter)

app.use(middleware);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
