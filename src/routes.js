import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";


// Auth Imports
import SignInCentered from "views/auth/signIn";
import AddProperty from "views/admin/default/Property/AddProperty";
import Chat from "views/admin/default/Chat/Chat";
import ChatList from "views/admin/default/Chat/ChatList";

const routes = [
  {
    name: "Main",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
  },
  {
    name: "Add Property",
    layout: "/admin",
    path: "/AddProperty",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: AddProperty,
  },
  {
    name: "Chats",
    layout: "/admin",
    path: "/chats",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: ChatList,
  },
];

export default routes;
