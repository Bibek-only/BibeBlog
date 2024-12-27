function disableClickEvents(event: MouseEvent):void {
    event.stopPropagation(); // Prevent event from bubbling up
    event.preventDefault();  // Prevent default action
  }
  
  // Disable all click events
  export function disableClick() {
    document.addEventListener('click', disableClickEvents, true); // Capture phase
  }
  
  // Enable all click events
  export function enableClick() {
    document.removeEventListener('click', disableClickEvents, true);
  }