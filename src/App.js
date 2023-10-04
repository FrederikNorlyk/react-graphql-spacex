import { useState } from "react";
import "./App.css";
import { useQuery, gql } from "@apollo/client";

const GET_LAUNCHES = gql`
  query {
    launches {
      id
      mission_name
      details
      rocket {
        rocket_name
      }
    }
  }
`;

function ShipGrid(props) {
  const GET_SHIPS = gql`
    query {
      ships {
        id
        model
        name
        type
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_SHIPS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.ships.map((ship) => (
    <div className="col-auto p-3 bg-white" key={ship.id}>
      <h3 className="text-2xl">{ship.name}</h3>
      <p>Model: {ship.model ?? 'Unknown'}</p>
      <p>Type: {ship.type ?? 'Unknown'}</p>
    </div>
  ));
}

function LaunchGrid(props) {
  const { loading, error, data } = useQuery(GET_LAUNCHES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.launches.map((launch) => (
      <div className="col-auto p-3 bg-white" key={launch.id}>
        <h3 className="text-2xl">{launch.mission_name}</h3>
        <p>{launch.details}</p>
      </div>
    ));
}

function GridData(props) {
  if (props.shownType === 'ship') {
    return <ShipGrid />
  }

  return <LaunchGrid />
}

function App() {

  const [ shownType, setShownType ] = useState('ship');
  const [ query, setQuery ] = useState('');

  function onSelectChanged(event) {
    setShownType(event.target.value);
  }

  function onQueryChanged(event) {
    setQuery(event.target.value);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl text-white">SpaceX GraphQL</h1>

      <div className="ml-4 mr-4 space-y-6">
        <div className="space-x-1 flex">
          <select value={shownType} className="text-xl rounded-sm pl-2" name="type" onChange={onSelectChanged}>
            <option value={'ship'}>Ships</option>
            <option value={'launch'}>Launches</option>
          </select>
          <input value={query} onChange={onQueryChanged} placeholder="Search" className="grow text-xl rounded-sm p-2" name="query"></input>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <GridData shownType={shownType} query={query} />
        </div>
      </div>
    </div>
  );
}

export default App;
