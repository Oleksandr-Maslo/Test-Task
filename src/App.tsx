import { Form } from './components/Form/Form';
import { Table } from './components/Table/Table';
import './App.scss';
import { useAppSelector } from './app/hooks';

function App() {
  const isLogged = useAppSelector<boolean>(state => state.isLogged.isLogged);

  return (
    isLogged ? <Table /> : <Form />
  );
};

export default App;
