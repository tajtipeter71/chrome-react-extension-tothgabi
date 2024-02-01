
function removeContentBasedOnTextAndImages(): void {
    // Text content search
    const textElements: NodeListOf<Element> = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a');
    textElements.forEach((element: Element) => {
      let textMatch: boolean = element.textContent?.includes('Tóth Gabi') || element.textContent?.includes('Gabi Tóth') || false;
      let hrefMatch: boolean = element.tagName === 'A' && (element.getAttribute('href')?.includes('toth_gabi') || element.getAttribute('href')?.includes('toth-gabi') || element.getAttribute('href')?.includes('tothgabi') || element.getAttribute('href')?.includes('Toth_Gabi')) || false;
      let titleMatch: boolean = element.getAttribute('title')?.includes('toth_gabi') || element.getAttribute('title')?.includes('toth-gabi') || element.getAttribute('title')?.includes('tothgabi') || element.getAttribute('title')?.includes('Toth_Gabi') || false;
      if (textMatch || hrefMatch || titleMatch) {
        let closestDiv: HTMLElement | null = element.closest('div');
        if (closestDiv) {
          closestDiv.style.display = 'none';
          // Hide closest pictures
          const relatedImages: NodeListOf<HTMLImageElement> = closestDiv.querySelectorAll('img');
          relatedImages.forEach((img: HTMLImageElement) => {
            img.style.display = 'none';
          });
        }
      }
    });
  }
  
  
  function observeDOMChanges(): void {    
    chrome.storage.local.get('isTGExtensionActive', (data: { isTGExtensionActive?: boolean }) => {
      // Ellenőrizzük, hogy az isTGExtensionActive értéke létezik-e és nem hamis
      if(data.isTGExtensionActive !== false) {
        removeContentBasedOnTextAndImages();
  
        // MutationObserver to detect DOM changes
        const observer: MutationObserver = new MutationObserver((mutations: MutationRecord[]) => {
          mutations.forEach(() => {
            removeContentBasedOnTextAndImages();
          });
        });
  
        // Start observing
        observer.observe(document.body, { childList: true, subtree: true });
      }      
    });
  }

  observeDOMChanges();

  export {}