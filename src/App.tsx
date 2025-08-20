import './App.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import MainPage from './pages/MainPage';

function App() {
  return (
    <>
      <Provider store={store}>
        <MainPage></MainPage>
      </Provider>
    </>
  );
}

export default App;
