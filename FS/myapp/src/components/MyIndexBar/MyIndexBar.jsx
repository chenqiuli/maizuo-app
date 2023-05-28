import React, { useRef } from 'react';
import { IndexBar, List } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

function MyIndexBar(props) {
  const { cityList } = props;
  const indexBarRef = useRef(null);

  return (
    <div style={{ height: window.innerHeight }}>
      <IndexBar ref={indexBarRef}>
        {cityList.map((group) => {
          const { title, items } = group;
          return (
            <IndexBar.Panel index={title} title={title} key={title}>
              <List>
                {items.map((item, index) => (
                  <List.Item
                    key={index}
                    onClick={() => {
                      props.history.push(`/cinemas`);
                    }}
                  >
                    {item.name}
                  </List.Item>
                ))}
              </List>
            </IndexBar.Panel>
          );
        })}
      </IndexBar>
    </div>
  );
}

export default withRouter(MyIndexBar);
