import Header from '../../components/header/header.component'
import About from '../../components/about/about.component'
import Targets from '../../components/targets/targets.component'
import Tasks from '../../components/tasks/tasks.component'
import Mentors from '../../components/mentors-info/mentors-info.component'
import Footer from '../../components/footer/footer.component'

import './main-page.styles.scss'

const MainPage = () => {
  return (
    <div className="app">
      <Header />
      <div className="container">
        <About />
        <Targets />
        <Tasks />
        <Mentors />
      </div>
      <Footer />
    </div>
  )
}
export default MainPage