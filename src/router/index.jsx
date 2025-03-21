import { useRoutes } from "react-router-dom";
import { UserTemplate } from "../templates/UserTemplate/UserTemplate";
import { Login, Register, UserProfile, HomePage, Page404 } from "../pages/index";
import JobList from "../pages/JobList/JobList";
import JobLink from "../pages/JobLink/jobLink";

export const Router = () => {
    return useRoutes([
        {
            path: "/",
            element: <UserTemplate />,
            children: [
                {
                    path: "userprofile",
                    element: <UserProfile />
                },
                {
                    path: "/", 
                    element: <HomePage />
                },
                {
                    path: "login",
                    element: <Login />
                },
                {
                    path: "register",
                    element: <Register />
                },
                {
                    path: "joblist/:name", 
                    element: <JobList/>
                },
                {
                    path:"/jobs/:id",
                    element:<JobLink/>
                }
            ],
        },
        {
            path: "*",
            element: <Page404 />
        },
    ]);
};