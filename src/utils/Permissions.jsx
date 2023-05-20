import Cookies from "js-cookie";

export default function hasAnyPermissions(permissions) {
  // get permissions from cookies
  let allPermissions = JSON.parse(Cookies.get("permissions"));

  let hasPermissions = false;

  permissions.forEach(function (item) {
    if (allPermissions[item]) hasPermissions = true;
  });

  return hasPermissions;
}
