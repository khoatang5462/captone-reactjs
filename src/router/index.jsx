import { useRoutes } from "react-router-dom";
import { UserTemplate } from "../templates/UserTemplate/UserTemplate";
import { Login, Register, UserProfile, HomePage, JobList, Page404 }  from "../pages/index";

export const Router = () => {
    return useRoutes([
        {
            path: "/",
            element: <UserTemplate />,
            children: [
                {
                    path: "/userprofile",
                    element: <UserProfile />
                },
                {
                    path: "/", 
                    element: <HomePage />
                },
                {
                    path: "/login",
                    element: <Login />
                },
                {
                    path: "/register",
                    element: <Register />
                },
                {
                    path: "/joblist",
                    element: <JobList />
                },
            ],
        },
        {
            path: "*",
            element: <Page404 />
        },
    ]);
};
