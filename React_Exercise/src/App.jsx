import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const tabData = [
  {
    id: 1,
    title: "ITEM 1",
    content: "Authorize the user data ✅",
  },
  {
    id: 2,
    title: "ITEM 2",
    content: "Redirect user to cart page 🛒",
  },
  {
    id: 3,
    title: "ITEM 3",
    content: "Create new payment for the user 💰",
  },
];

function App() {
  const [activeTab, setActiveTab] = useState(1);
  const handleActiveTab = (id) => {
    setActiveTab(id);
  };

  return (
    <div className="tab">
      <div className="tab__header">
        {tabData.map((tab) => (
          <button
            onClick={() => handleActiveTab(tab.id)}
            key={tab.id}
            className={activeTab === tab.id ? "active" : ""}
          >
            <span>{tab.title}</span>
            <span className="tab-indicator"></span>
          </button>
        ))}
      </div>
      <div className="tab__content">{tabData[activeTab - 1].content}</div>
    </div>
  );
}

export default App
