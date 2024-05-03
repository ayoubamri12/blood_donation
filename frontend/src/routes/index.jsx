import Campaign from "@/components/dashboard/Campaign";
import DetailCompagne from "@/components/dashboard/DetailCompagne";
import CampaignList from "@/components/dashboard/CampaignList";
import StartCampaign from "@/components/dashboard/StartCampaign";
import Details from "@/components/dashboard/Details";
import Main from "@/components/dashboard/Main";
import Layout from "@/components/layout/Layout";
import Login from "@/components/login/Login";
import CreateStaff from "@/components/Forms/CreateStaff";
import CreateTeam from "@/components/Forms/CreateTeam";
import { createBrowserRouter } from "react-router-dom";
import AddParticipants from "@/components/dashboard/AddParticipants";

const routes= createBrowserRouter([
    {  
        element:<Layout/>,
       children:[
        {
          path:"/index",
          element:<Main/>
        },
        {
            path:"/settings",
            element:<h1 className="mt-60">home hajhash</h1>
          },
          {
            path:"/createCamp",
            element:<Campaign/>
          },
          {
            path:"/detailCompagne",
            element:<DetailCompagne/>
          },
          {
            path:"/listeCamp",
            element:<CampaignList/>
          },
          {
            path:"/listCamp/:id/details",
            element:<Details/>
          },
          {
            path:"/addParticipants",
            element:<AddParticipants/>
          },
          {
            path:"/detailCompagne",
            element:<StartCampaign/>
          },
          {
            path:"/addStaff",
            element:<CreateStaff/>
          },
          {
            path:"/addTeam",
            element:<CreateTeam/>
          },
      ],
  },{
    path:"/",
    element:<Login/>
  }
   ])
export default routes