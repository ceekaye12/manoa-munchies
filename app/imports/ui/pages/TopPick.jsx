import React from 'react';


export default class TopPick extends React.Component {

  render() {
    return (
        <div className={'vendorMid'}>
          <TopMenu/>
          <TopPickMid/>
        </div>
    );
  }
}
ReactDOM.render(<TopPick/>, document.getElementById('root'));
