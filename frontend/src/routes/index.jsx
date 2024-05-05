
import Main from "@/components/dashboard/Main";
import AddParticipants from "@/components/dashboard/campaign/AddParticipants";
import CampaignDetails from "@/components/dashboard/campaign/CampaignDetails";
import CampaignList from "@/components/dashboard/campaign/CampaignList";
import CampaignModifs from "@/components/dashboard/campaign/CampaignModifs";
import Details from "@/components/dashboard/campaign/Details";
import StartCampaign from "@/components/dashboard/campaign/StartCampaign";
import Layout from "@/components/layout/Layout";
import Login from "@/components/login/Login";
import { createBrowserRouter } from "react-router-dom";


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
            element:<CampaignDetails/>
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
            path:"/campaign/:id/addParticipants",
            element:<AddParticipants/>
          },
          {
            path:"/campaign/:id/modify",
            element:<CampaignModifs/>
          },
          {
            path:"/startCampaign",
            element:<StartCampaign/>
          },
         
      ],
  },{
    path:"/",
    element:<Login/>
  }
   ])
export default routes