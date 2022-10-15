const authRoutes = ["/auth/login", "/auth/register"];

const withPrivateRoute = (ctx) => {
  const { req, resolvedUrl } = ctx;
  const { cookies } = req;
  if (cookies.token && resolvedUrl === "/auth/login") {
    ctx.res?.writeHead(302, {
      Location: "/profile",
    });
    ctx.res?.end();
    return false;
  } else if (!cookies.token && !authRoutes.includes(resolvedUrl)) {
    ctx.res?.writeHead(302, {
      Location: "/auth/login",
    });
    ctx.res?.end();
    return false;
  }

  return true;
};

export default withPrivateRoute;
