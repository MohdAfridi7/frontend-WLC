import React from 'react'
import HeroSection from '../home page/HeroSection'
// import NewsTicker from '../home page/NewsTicker'
import AboutWLC from '../home page/AboutWLC'
import FeaturedVideo from '../home page/FeaturedVideo'
import BlogCarousel from '../home page/BlogCarousel'
import OurWorkSection from '../home page/OurWorkSection'
import LeadershipImpact from '../home page/LeadershipImpact'
import WorldLeadersUpdate from '../home page/WorldLeadersUpdate'
import GlobalDiplomacySection from '../home page/GlobalDiplomacySection'
import WLCGlobalLeadership from '../home page/WLCGlobalLeadership'
import WLCGlobalCouncil from '../home page/WLCGlobalCouncil'
import GlobalDialogue from '../home page/GlobalDialogue'
// import SocialMarquee from '../home page/SocialMarquee'


function Home() {
  return (
  <>
   <HeroSection/>
   {/* <NewsTicker/> */}
   <AboutWLC/>
   <FeaturedVideo/>
   <BlogCarousel/>
   <OurWorkSection/>
   <LeadershipImpact/>
   <WorldLeadersUpdate/>
   <GlobalDiplomacySection/>
   <WLCGlobalLeadership/>
   <WLCGlobalCouncil/>
   <GlobalDialogue/>
   {/* <SocialMarquee/> */}
  
  </>
  )
}

export default Home