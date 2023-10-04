export function Toolbar(props) {
    return (
        <div className="space-x-1 flex">
          <select value={props.shownType} className="text-xl rounded-sm pl-2" name="type" onChange={props.onSelectChanged}>
            <option value={'ship'}>Ships</option>
            <option value={'launch'}>Launches</option>
          </select>
          <input value={props.query} onChange={props.onQueryChanged} placeholder="Search" className="grow text-xl rounded-sm p-2" name="query"></input>
        </div>
    );
}