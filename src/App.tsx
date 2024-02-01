import React, { useEffect, useState } from 'react';
import './popup.css';

function App() {
  // Definiálunk egy helyi állapotot a checkbox és az állapot szövegének kezelésére
  const [isTGExtensionActive, setIsTGExtensionActive] = useState(false);  

  useEffect(() => {
    // Kezdeti állapot lekérdezése
    chrome.storage.local.get('isTGExtensionActive', (data) => {
      setIsTGExtensionActive(data.isTGExtensionActive !== false);      
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {    
    // Frissítjük az állapotot a checkbox állapotának megfelelően
    const checked = event.target.checked;
    setIsTGExtensionActive(checked);
    chrome.storage.local.set({ isTGExtensionActive: checked }, () => {
      // Küld egy üzenetet a content scriptnek, ha szükséges
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0].id !== undefined) {
          chrome.tabs.reload(tabs[0].id);
        }
      });
    });
  };

  return (

    <div className="main">		
		<div>
			<h4 className="blue" id="state">{isTGExtensionActive !== false ? "Nincs TG :)" : "Van TG :("}</h4>
		</div>
		<div className="control">
      <input type="checkbox" id="toggle" className="checkbox" checked={isTGExtensionActive} onChange={handleChange} />
			<label htmlFor="toggle" className="switch"></label>
		</div>
		
		<div className="control">				
		   <a href="https://www.buymeacoffee.com/petke" target="_blank"><img src="https://img.buymeacoffee.com/button-api/?text=kérek  1 pizzát :)&emoji=🍕&slug=petke&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" /></a>							
		</div>
	
	</div>
    
  );
}

export default App;
