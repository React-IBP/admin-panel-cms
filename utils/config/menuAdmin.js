// menuAdmin.js
const menuAdmin = [
  {
    title: "Home",
    icon: "fas fa-fw fa-home-alt",
    link: "/dashboard"
  },
  {
    title: "Users",
    icon: "fas fa-fw fa-users",
    submenu: [
      { title: "Users", link: "/dashboard/users", icon:"fa-solid fa-users-viewfinder" },
      { title: "Add user", link: "/dashboard/users/add",  icon:"fa-solid fa-user-plus"}
    ]
  },
  {
    title: "Articles",
    icon: "fas fa-fw fa-newspaper",
    submenu: [
      { title: "Articles", link: "/dashboard/articles", icon: "fa-regular fa-rectangle-list"  },
      { title: "Add articles", link: "/dashboard/articles/add",icon: "fas fa-plus" },
      { title: "Animations", link: "/utilities-animation" },
      { title: "Other", link: "/utilities-other" }
    ]
  },
  {
    title: "Pages",
    icon: "fas fa-fw fa-folder",
    submenu: [
      { title: "Login", link: "/login" },
      { title: "Register", link: "/register" },
      { title: "Forgot Password", link: "/forgot-password" },
      { title: "404 Page", link: "/404" },
      { title: "Blank Page", link: "/blank" }
    ]
  },
  {
    title: "Charts",
    icon: "fas fa-fw fa-chart-area",
    link: "/charts"
  },
  {
    title: "Tables",
    icon: "fas fa-fw fa-table",
    link: "/tables"
  }
];

export default menuAdmin;
