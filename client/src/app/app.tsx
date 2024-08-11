import { Routes, Route } from 'react-router-dom';
import styles from './app.module.css';
import Tickets from './tickets/tickets';
import Detail from './tickets/detail';
import { AppProvider} from '../context/AppContext';
import { ApiHandler } from './api-handler/ApiHandler';

const App = () => {

  // Very basic way to synchronize state with server.
  // Feel free to use any state/fetch library you want (e.g. react-query, xstate, redux, etc.).

  return (
    <AppProvider>
      <ApiHandler>
        <div className={styles['app']}>
          <h1>Ticketing App</h1>
          <Routes>
            <Route path="/" element={<Tickets />} />
            {/* Hint: Try `npx nx g component TicketDetails --project=client --no-export` to generate this component  */}
            <Route path="/:id" element={<Detail />} />
          </Routes>
        </div>
      </ApiHandler>
    </AppProvider>
  );
};

export default App;
