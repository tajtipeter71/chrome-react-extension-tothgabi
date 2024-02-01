
function removeContentBasedOnTextAndImages(): void {

  const regex = /Tóth\s*Gabi|toth[_-]?gabi|Gabi\s*Tóth/i;


    // Text content search
    const textElements: NodeListOf<Element> = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a');
    textElements.forEach((element: Element) => {

      let textMatch: boolean = regex.test(element.textContent || ''); 
      let hrefMatch: boolean = element.tagName === 'A' && regex.test(element.getAttribute('href') || '');
      let titleMatch: boolean = regex.test(element.getAttribute('title') || '');
      
      if (textMatch || hrefMatch || titleMatch) {
        let closestDiv: HTMLElement | null = element.closest('div');
        if (closestDiv) {
          closestDiv.style.display = 'none';
          
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