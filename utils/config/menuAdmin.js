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
      { title: "Users", link: "/users" },
      { title: "Add user", link: "/add-user" }
    ]
  },
  {
    title: "Articles",
    icon: "fas fa-fw fa-newspaper",
    submenu: [
      { title: "Articles", link: "/articles" },
      { title: "Add artilces", link: "/add-article" },
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
