import Candidates from './components/Candidates/Candidates';
import Selection from './components/Selection/Selection.jsx';
import IconSanta from '@icons/santa.svg?react';
import IconPresent from '@icons/present.svg?react';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';

export default function App() {
  return (
    <>
      <div id="modal-root"></div>
      <div className="App" id="app-root">
        <header className="Header">
          <IconSanta />
          <p>
            <span className="Header--primary">Secret</span>{' '}
            <span className="Header--secondary">Santa</span>
          </p>
          <IconPresent />
        </header>
        <Provider store={store}>
          <div className="App-container">
            <Candidates />
            <Selection />
          </div>
        </Provider>
      </div>
    </>
  );
}
