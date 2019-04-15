const debugUtils = auth0 => Component => async namespace => {
  console.log(Component.name, namespace, "auth0", auth0 && auth0.cache && auth0.cache.cache)

  if (
    auth0 &&
    auth0.cache &&
    auth0.cache.cache &&
    auth0.cache.cache["default::openid profile email"]
  ) {
    console.log(
      Component.name,
      namespace,
      "id_token",
      auth0.cache.cache["default::openid profile email"].id_token
    )
  }

  const isAuthenticated = await auth0.isAuthenticated()
  const user = await auth0.getUser()

  console.log(
    Component.name,
    namespace,
    "isAuthenticated",
    isAuthenticated
  )
  console.log(Component.name, namespace, "user", user)
}

export const debugRender = Component =>
  console.log(Component.name, "render");

export default debugUtils
