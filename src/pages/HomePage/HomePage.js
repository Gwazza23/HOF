import ExploreMore from '../ExploreMore/ExploreMore'
import Hero from '../Hero/Hero'
import NewReleases from '../NewReleases/NewReleases'

function HomePage() {
  return (
    <div>
        <Hero /> 
        <NewReleases />
        <ExploreMore />
    </div>
  )
}

export default HomePage