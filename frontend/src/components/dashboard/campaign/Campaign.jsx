import { useState } from 'react';
import CampaignDetails from './CampaignDetails';
import StartCampaign from './StartCampaign';

export default function Campaign() {
    const [campaign, setCampaign] = useState("");
  return (
    <div className='w-4/3 mx-auto p-5'>
      {
        campaign? 
        <StartCampaign data={campaign}/>
        :
        <CampaignDetails  setState={setCampaign}/>
      }
    </div>
  );
}