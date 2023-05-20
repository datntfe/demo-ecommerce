export const reduxActionName = (scope: string, actionName: string) => `${scope}/${actionName.toUpperCase()}`;

export const reduxRequestActionGenerator = (scope: string, actionName: string) => ({
  pending: reduxActionName(scope, `${actionName}_pending`),
  success: reduxActionName(scope, `${actionName}_success`),
  error: reduxActionName(scope, `${actionName}_error`),
});
