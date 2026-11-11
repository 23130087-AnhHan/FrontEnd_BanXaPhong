import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.js'
import rootReducer from './store/reducers/rootReducer'
import { Provider } from 'react-redux'
import { createStore} from 'redux'

const reduxStore = createStore(rootReducer)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={reduxStore}>
      <App />
    </Provider>
  </StrictMode>,
)
