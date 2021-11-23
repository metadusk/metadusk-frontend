import './assets/css/index.less'
import Routers from '../src/pages/index'
import 'antd/dist/antd.css'
import { ContextProvider } from './reducer'
function App() {
  return (
    <ContextProvider>
      <Routers />
    </ContextProvider>
  )
}

export default App;
